import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  addGalleryItem,
  listGallery,
  saveUpload,
} from "@/lib/store";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function GET() {
  const items = await listGallery();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  const alt = (form.get("alt") as string | null)?.trim() || "Gallery photo";

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Image file is required" },
      { status: 400 },
    );
  }
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
  const src = await saveUpload(buffer, file.name, "gallery");
  const item = await addGalleryItem({ src, alt });

  revalidatePath("/");
  return NextResponse.json({ item });
}
