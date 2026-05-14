import { NextResponse } from "next/server";
import { checkCredentials, issueToken, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  if (!checkCredentials(username, password)) {
    // Small delay to slow naive brute-forcing
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = issueToken(username);
  setSessionCookie(token);
  return NextResponse.json({ ok: true, username });
}
