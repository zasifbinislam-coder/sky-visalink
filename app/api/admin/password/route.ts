import { NextResponse } from "next/server";
import { changePassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    securityCode?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const currentPassword = body.currentPassword ?? "";
  const newPassword = body.newPassword ?? "";
  const confirmPassword = body.confirmPassword ?? "";
  const securityCode = body.securityCode ?? "";

  if (!currentPassword || !newPassword || !confirmPassword || !securityCode) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { error: "New password and confirmation do not match" },
      { status: 400 },
    );
  }

  const result = await changePassword(
    currentPassword,
    newPassword,
    securityCode,
  );

  if (!result.ok) {
    // 400/401-ish; use 401 if it's a credential issue to keep semantics close
    const isAuthIssue =
      result.error === "Current password is incorrect" ||
      result.error === "Invalid security code" ||
      result.error === "Not authenticated";
    return NextResponse.json(
      { error: result.error ?? "Failed" },
      { status: isAuthIssue ? 401 : 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
