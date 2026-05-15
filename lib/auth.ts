import { cookies } from "next/headers";
import {
  createHmac,
  pbkdf2Sync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { getJson, setJson } from "./storage";

const COOKIE_NAME = "skv_admin";
const ONE_DAY = 24 * 60 * 60 * 1000;
const SESSION_TTL_MS = 7 * ONE_DAY;

const CREDENTIALS_KEY = "credentials";

// Security code required to change the admin password — Sir's policy.
export const PASSWORD_CHANGE_SECURITY_CODE = "AllaH";

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

// ── Token / session ────────────────────────────────────────────────────

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

// ── Password hashing (PBKDF2-SHA256) ───────────────────────────────────

type StoredCredentials = {
  username: string;
  passwordHash: string;
  salt: string;
  algo: "pbkdf2-sha256";
  iterations: number;
  updatedAt: string;
};

function hashPassword(
  password: string,
  salt?: string,
  iterations = 100_000,
): { hash: string; salt: string; iterations: number } {
  const s = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, s, iterations, 32, "sha256").toString(
    "hex",
  );
  return { hash, salt: s, iterations };
}

async function readCredentials(): Promise<StoredCredentials | null> {
  const stored = await getJson<StoredCredentials | null>(
    CREDENTIALS_KEY,
    null,
  );
  // getJson returns the fallback when KV is empty and no seed file exists.
  // Validate the returned object actually has the expected shape.
  if (
    stored &&
    typeof stored === "object" &&
    "passwordHash" in stored &&
    "salt" in stored
  ) {
    return stored;
  }
  return null;
}

async function writeCredentials(c: StoredCredentials): Promise<void> {
  await setJson(CREDENTIALS_KEY, c);
}

function constantTimeStringEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function verifyAgainstEnv(username: string, password: string): boolean {
  const envUser = process.env.ADMIN_USERNAME ?? "admin";
  const envPass = process.env.ADMIN_PASSWORD;
  if (!envPass) return false;
  return (
    constantTimeStringEquals(username, envUser) &&
    constantTimeStringEquals(password, envPass)
  );
}

function verifyAgainstStored(
  username: string,
  password: string,
  stored: StoredCredentials,
): boolean {
  if (!constantTimeStringEquals(username, stored.username)) return false;
  const computed = pbkdf2Sync(
    password,
    stored.salt,
    stored.iterations,
    32,
    "sha256",
  ).toString("hex");
  return safeEqualHex(computed, stored.passwordHash);
}

export async function checkCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  // Stored credentials file is the source of truth (created when admin
  // changes password locally). On serverless / read-only environments
  // the file won't exist, in which case we fall back to env vars without
  // attempting to write anything.
  const stored = await readCredentials();
  if (stored) {
    return verifyAgainstStored(username, password, stored);
  }
  return verifyAgainstEnv(username, password);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  securityCode: string,
): Promise<{ ok: boolean; error?: string }> {
  if (securityCode !== PASSWORD_CHANGE_SECURITY_CODE) {
    return { ok: false, error: "Invalid security code" };
  }
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: "New password must be at least 6 characters" };
  }

  const admin = getCurrentAdmin();
  if (!admin) return { ok: false, error: "Not authenticated" };

  // Verify current password
  const ok = await checkCredentials(admin.username, currentPassword);
  if (!ok) return { ok: false, error: "Current password is incorrect" };

  // Save new password
  const { hash, salt, iterations } = hashPassword(newPassword);
  const next: StoredCredentials = {
    username: admin.username,
    passwordHash: hash,
    salt,
    algo: "pbkdf2-sha256",
    iterations,
    updatedAt: new Date().toISOString(),
  };
  try {
    await writeCredentials(next);
  } catch (err) {
    return {
      ok: false,
      error:
        "Could not save new password. Storage may be misconfigured — check Vercel KV / disk permissions.",
    };
  }
  return { ok: true };
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
