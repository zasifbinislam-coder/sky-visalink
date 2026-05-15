/**
 * Application data store.
 *
 * All functions go through `lib/storage.ts` which routes reads/writes to
 * either Vercel KV + Blob (production) or the local filesystem (dev).
 */

import {
  deleteFileIfManaged,
  getJson,
  newId,
  setJson,
  uploadFile,
  type UploadResult,
} from "./storage";

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

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

export type InquiryVisaType =
  | "tourist"
  | "student"
  | "business"
  | "work"
  | "general";

export type InquirySource =
  | "quick-inquiry"
  | "contact-form"
  | "country-detail"
  | "book-consultant";

export type InquiryStatus = "new" | "in-progress" | "closed";

export type Inquiry = {
  id: string;
  visaType: InquiryVisaType;
  source: InquirySource;
  status: InquiryStatus;
  name: string;
  email?: string;
  phone: string;
  country?: string;
  countrySlug?: string;
  passport?: string;
  travellers?: number;
  travelDate?: string;
  travelClass?: string;
  estimatePrice?: number;
  purpose?: string;
  message?: string;
  createdAt: string;
};

export type Settings = {
  pricing: {
    regionFallback: Record<string, number>;
    countryBase: Record<string, number>;
    classMultiplier: Record<string, number>;
  };
};

const DEFAULT_SETTINGS: Settings = {
  pricing: {
    regionFallback: {
      "South Asia": 45000,
      "Southeast Asia": 55000,
      "Middle East": 75000,
      "East Asia": 130000,
      Europe: 155000,
      "North America": 185000,
      Oceania: 165000,
    },
    countryBase: {},
    classMultiplier: {
      Economy: 1,
      "Economy+": 1.18,
      Business: 1.65,
      First: 2.6,
    },
  },
};

// Re-export helper used by auth.ts
export { newId as genId };

// ──────────────────────────────────────────────────────────────────────────
// Gallery
// ──────────────────────────────────────────────────────────────────────────

export async function listGallery(): Promise<GalleryItem[]> {
  return getJson<GalleryItem[]>("gallery", []);
}

export async function addGalleryItem(
  item: Omit<GalleryItem, "id" | "createdAt">,
): Promise<GalleryItem> {
  const items = await listGallery();
  const next: GalleryItem = {
    id: newId("g"),
    createdAt: new Date().toISOString(),
    ...item,
  };
  items.unshift(next);
  await setJson("gallery", items);
  return next;
}

export async function deleteGalleryItem(
  id: string,
): Promise<GalleryItem | null> {
  const items = await listGallery();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await setJson("gallery", items);
  return removed;
}

// ──────────────────────────────────────────────────────────────────────────
// Packages
// ──────────────────────────────────────────────────────────────────────────

export async function listPackages(): Promise<PackageItem[]> {
  return getJson<PackageItem[]>("packages", []);
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
    id: newId("pkg"),
    createdAt: new Date().toISOString(),
    ...item,
  };
  items.unshift(next);
  await setJson("packages", items);
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
  await setJson("packages", items);
  return items[idx];
}

export async function deletePackage(
  id: string,
): Promise<PackageItem | null> {
  const items = await listPackages();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await setJson("packages", items);
  return removed;
}

// ──────────────────────────────────────────────────────────────────────────
// Inquiries
// ──────────────────────────────────────────────────────────────────────────

export async function listInquiries(): Promise<Inquiry[]> {
  const items = await getJson<Inquiry[]>("inquiries", []);
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addInquiry(
  item: Omit<Inquiry, "id" | "createdAt" | "status">,
): Promise<Inquiry> {
  const items = await getJson<Inquiry[]>("inquiries", []);
  const next: Inquiry = {
    id: newId("inq"),
    createdAt: new Date().toISOString(),
    status: "new",
    ...item,
  };
  items.unshift(next);
  await setJson("inquiries", items);
  return next;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<Inquiry | null> {
  const items = await getJson<Inquiry[]>("inquiries", []);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], status };
  await setJson("inquiries", items);
  return items[idx];
}

export async function deleteInquiry(id: string): Promise<Inquiry | null> {
  const items = await getJson<Inquiry[]>("inquiries", []);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await setJson("inquiries", items);
  return removed;
}

// ──────────────────────────────────────────────────────────────────────────
// Settings
// ──────────────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<Settings> {
  const raw = await getJson<Partial<Settings>>("settings", {});
  return {
    pricing: {
      regionFallback: {
        ...DEFAULT_SETTINGS.pricing.regionFallback,
        ...(raw.pricing?.regionFallback ?? {}),
      },
      countryBase: {
        ...DEFAULT_SETTINGS.pricing.countryBase,
        ...(raw.pricing?.countryBase ?? {}),
      },
      classMultiplier: {
        ...DEFAULT_SETTINGS.pricing.classMultiplier,
        ...(raw.pricing?.classMultiplier ?? {}),
      },
    },
  };
}

export async function updateSettings(patch: Settings): Promise<Settings> {
  await setJson("settings", patch);
  return patch;
}

// ──────────────────────────────────────────────────────────────────────────
// Upload helpers (re-exported with friendlier names)
// ──────────────────────────────────────────────────────────────────────────

export async function saveUpload(
  buffer: Buffer,
  originalName: string,
  subfolder: "gallery" | "packages",
  contentType?: string,
): Promise<string> {
  const result: UploadResult = await uploadFile(
    buffer,
    originalName,
    subfolder,
    contentType,
  );
  return result.url;
}

export async function deleteUploadIfLocal(publicPath: string): Promise<void> {
  // Name kept for backward-compat; actually deletes Vercel Blob too if applicable.
  return deleteFileIfManaged(publicPath);
}
