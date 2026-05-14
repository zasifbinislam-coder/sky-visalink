import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  deletePackage,
  deleteUploadIfLocal,
  getPackage,
  saveUpload,
  updatePackage,
} from "@/lib/store";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const existing = await getPackage(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const form = await req.formData();
  const destination = (form.get("destination") as string | null)?.trim();
  const duration = (form.get("duration") as string | null)?.trim();
  const tag = (form.get("tag") as string | null)?.trim();
  const priceRaw = form.get("price") as string | null;
  const highlightsRaw = form.get("highlights") as string | null;
  const file = form.get("file");
  const imageUrl = (form.get("image") as string | null)?.trim();

  const patch: Record<string, unknown> = {};
  if (destination) patch.destination = destination;
  if (duration) patch.duration = duration;
  if (tag) patch.tag = tag;
  if (priceRaw) {
    const p = Number(priceRaw);
    if (!Number.isFinite(p) || p <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 },
      );
    }
    patch.price = p;
  }
  if (typeof highlightsRaw === "string") {
    patch.highlights = highlightsRaw
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  let newImage: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 8 MB)" },
        { status: 400 },
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    newImage = await saveUpload(buffer, file.name, "packages");
  } else if (imageUrl) {
    newImage = imageUrl;
  }

  if (newImage && newImage !== existing.image) {
    patch.image = newImage;
    await deleteUploadIfLocal(existing.image);
  }

  const updated = await updatePackage(params.id, patch);
  revalidatePath("/");
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const removed = await deletePackage(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await deleteUploadIfLocal(removed.image);
  revalidatePath("/");
  return NextResponse.json({ ok: true, removed });
}
