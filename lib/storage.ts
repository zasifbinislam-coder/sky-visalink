/**
 * Storage abstraction for SKY VISALink.
 *
 * In production (Vercel) we use:
 *   - Vercel KV (Upstash Redis) for JSON data
 *   - Vercel Blob for uploaded files
 *
 * Locally (or anywhere KV / Blob env vars aren't set) we transparently
 * fall back to the local filesystem under `data/` and `public/uploads/`.
 *
 * Each KV key is bootstrapped from the corresponding `data/*.json` shipped
 * with the deployment, so existing local content is automatically seeded
 * into KV on the first read in production.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOAD_BASE = path.join(process.cwd(), "public", "uploads");

export const hasKV = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
);
export const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// ──────────────────────────────────────────────────────────────────────────
// JSON KV — read/write JSON-serialisable values
// ──────────────────────────────────────────────────────────────────────────

async function readFileJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeFileJson<T>(file: string, data: T): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      path.join(DATA_DIR, file),
      JSON.stringify(data, null, 2),
      "utf8",
    );
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
      console.warn(
        `[storage] Skipping FS write of ${file} (${code}) — read-only filesystem.`,
      );
      return;
    }
    throw err;
  }
}

/**
 * Read a JSON value. In KV mode, falls back to the bundled file once
 * (on first read) to seed the KV store.
 */
export async function getJson<T>(key: string, fallback: T): Promise<T> {
  if (hasKV) {
    const { kv } = await import("@vercel/kv");
    const existing = (await kv.get(key)) as T | null;
    if (existing !== null && existing !== undefined) return existing;
    // First read — seed from bundled file if available
    const seed = await readFileJson<T>(`${key}.json`, fallback);
    try {
      await kv.set(key, seed);
    } catch (err) {
      console.warn(`[storage] Could not seed KV[${key}]:`, err);
    }
    return seed;
  }
  return readFileJson<T>(`${key}.json`, fallback);
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  if (hasKV) {
    const { kv } = await import("@vercel/kv");
    await kv.set(key, value);
    return;
  }
  await writeFileJson(`${key}.json`, value);
}

// ──────────────────────────────────────────────────────────────────────────
// File uploads
// ──────────────────────────────────────────────────────────────────────────

export type UploadResult = { url: string };

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  subfolder: "gallery" | "packages",
  contentType?: string,
): Promise<UploadResult> {
  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
  const filename = `${Date.now()}_${randomBytes(4).toString("hex")}${safeExt}`;
  const pathName = `${subfolder}/${filename}`;

  if (hasBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(pathName, buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: contentType,
    });
    return { url: blob.url };
  }

  // Local filesystem fallback (works in dev, will throw EROFS on Vercel
  // without BLOB env var)
  const dir = path.join(UPLOAD_BASE, subfolder);
  const full = path.join(dir, filename);
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(full, buffer);
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
      throw new Error(
        "Cannot upload here — no Blob token configured and filesystem is read-only. Add BLOB_READ_WRITE_TOKEN env var (enable Vercel Blob in the dashboard).",
      );
    }
    throw err;
  }
  return { url: `/uploads/${subfolder}/${filename}` };
}

export async function deleteFileIfManaged(publicUrl: string): Promise<void> {
  if (!publicUrl) return;

  // Vercel Blob URL — delete via SDK
  if (publicUrl.includes(".public.blob.vercel-storage.com") && hasBlob) {
    try {
      const { del } = await import("@vercel/blob");
      await del(publicUrl);
    } catch (err) {
      console.warn("[storage] Blob delete failed:", err);
    }
    return;
  }

  // Local /uploads/* — delete from public folder
  if (publicUrl.startsWith("/uploads/")) {
    const full = path.join(
      process.cwd(),
      "public",
      publicUrl.replace(/^\//, ""),
    );
    try {
      await fs.unlink(full);
    } catch {
      // Ignore — already missing or read-only
    }
  }
}

export function newId(prefix: string): string {
  return `${prefix}_${randomBytes(5).toString("hex")}`;
}
