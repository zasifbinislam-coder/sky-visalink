import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "skv_admin";

// Web Crypto HMAC-SHA256 (Edge-runtime compatible)
async function hmacHex(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;

  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = await hmacHex(secret, payload);
  if (!safeEqual(expected, sig)) return false;

  const [, expiryStr] = payload.split(":");
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false;

  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");

  // Public sub-routes inside the gate
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (!isAdminApi && !isAdminPage) return NextResponse.next();
  if (isLoginPage || isLoginApi) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const ok = await isValid(token);

  if (ok) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
