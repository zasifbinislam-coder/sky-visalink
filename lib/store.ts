import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

// JSON-file backed store. Lives at the repo root in /data.
const DATA_DIR = path.join(process.cwd(), "data");

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  createdAt: string;
};

export type PackageItem = {
  id: string;
  image: string;
  destination: string;
  duration: string;
  price: number;
  tag: string;
  highlights: string[];
  createdAt: string;
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, file),
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

export function genId(prefix: string): string {
  return `${prefix}_${randomBytes(5).toString("hex")}`;
}

// ── Gallery ───────────────────────────────────────────────────────────
export async function listGallery(): Promise<GalleryItem[]> {
  return readJson<GalleryItem[]>("gallery.json", []);
}

export async function addGalleryItem(
  item: Omit<GalleryItem, "id" | "createdAt">,
): Promise<GalleryItem> {
  const items = await listGallery();
  const next: GalleryItem = {
    id: genId("g"),
    createdAt: new Date().toISOString(),
    ...item,
  };
  items.unshift(next);
  await writeJson("gallery.json", items);
  return next;
}

export async function deleteGalleryItem(id: string): Promise<GalleryItem | null> {
  const items = await listGallery();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await writeJson("gallery.json", items);
  return removed;
}

// ── Packages ──────────────────────────────────────────────────────────
export async function listPackages(): Promise<PackageItem[]> {
  return readJson<PackageItem[]>("packages.json", []);
}

export async function getPackage(id: string): Promise<PackageItem | null> {
  const items = await listPackages();
  return items.find((p) => p.id === id) ?? null;
}

export async function addPackage(
  item: Omit<PackageItem, "id" | "createdAt">,
): Promise<PackageItem> {
  const items = await listPackages();
  const next: PackageItem = {
    id: genId("pkg"),
    createdAt: new Date().toISOString(),
    ...item,
  };
  items.unshift(next);
  await writeJson("packages.json", items);
  return next;
}

export async function updatePackage(
  id: string,
  patch: Partial<Omit<PackageItem, "id" | "createdAt">>,
): Promise<PackageItem | null> {
  const items = await listPackages();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  await writeJson("packages.json", items);
  return items[idx];
}

export async function deletePackage(id: string): Promise<PackageItem | null> {
  const items = await listPackages();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await writeJson("packages.json", items);
  return removed;
}

// ── Upload helpers ────────────────────────────────────────────────────
const UPLOAD_BASE = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(
  buffer: Buffer,
  originalName: string,
  subfolder: "gallery" | "packages",
): Promise<string> {
  const dir = path.join(UPLOAD_BASE, subfolder);
  await fs.mkdir(dir, { recursive: true });

  const ext = path.extname(originalName).toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    ? ext
    : ".jpg";
  const name = `${Date.now()}_${randomBytes(4).toString("hex")}${safeExt}`;
  const full = path.join(dir, name);

  await fs.writeFile(full, buffer);
  // Public URL path served by Next.js from /public
  return `/uploads/${subfolder}/${name}`;
}

export async function deleteUploadIfLocal(publicPath: string): Promise<void> {
  if (!publicPath.startsWith("/uploads/")) return;
  const full = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  try {
    await fs.unlink(full);
  } catch {
    // Ignore if file already missing.
  }
}
