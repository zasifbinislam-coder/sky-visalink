import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "skv_admin";
const ONE_DAY = 24 * 60 * 60 * 1000;
const SESSION_TTL_MS = 7 * ONE_DAY;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "AUTH_SECRET env var is missing or too short — set it in .env.local",
    );
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, "hex");
    const bBuf = Buffer.from(b, "hex");
    if (aBuf.length !== bBuf.length) return false;
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

// Build a token of shape: base64(username):base64(expiryMs).signature
export function issueToken(username: string): string {
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = `${Buffer.from(username).toString("base64url")}:${expiry}`;
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyToken(
  token: string | undefined,
): { username: string; expiry: number } | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return null;
  }
  if (!safeEqualHex(expected, sig)) return null;

  const [userB64, expiryStr] = payload.split(":");
  if (!userB64 || !expiryStr) return null;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return null;

  return {
    username: Buffer.from(userB64, "base64url").toString("utf8"),
    expiry,
  };
}

// ── Server helpers (Node runtime) ───────────────────────────────────
export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getCurrentAdmin(): { username: string } | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  const verified = verifyToken(token);
  if (!verified) return null;
  return { username: verified.username };
}

export function checkCredentials(
  username: string,
  password: string,
): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return false;

  // Constant-time compare on both
  const userOK =
    Buffer.from(username).length === Buffer.from(expectedUser).length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser));
  const passOK =
    Buffer.from(password).length === Buffer.from(expectedPass).length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass));

  return userOK && passOK;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
