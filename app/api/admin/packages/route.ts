import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addPackage, listPackages, saveUpload } from "@/lib/store";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

export async function GET() {
  const items = await listPackages();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const destination = (form.get("destination") as string | null)?.trim();
  const duration = (form.get("duration") as string | null)?.trim();
  const tag = (form.get("tag") as string | null)?.trim() || "Featured";
  const priceRaw = form.get("price") as string | null;
  const highlightsRaw = (form.get("highlights") as string | null) || "";
  const file = form.get("file");
  const existingImage = (form.get("image") as string | null)?.trim() || "";

  if (!destination || !duration || !priceRaw) {
    return NextResponse.json(
      { error: "Destination, duration and price are required" },
      { status: 400 },
    );
  }
  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json(
      { error: "Price must be a positive number" },
      { status: 400 },
    );
  }

  let image = existingImage;
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
    image = await saveUpload(buffer, file.name, "packages");
  }
  if (!image) {
    return NextResponse.json(
      { error: "Image is required (upload a file or provide a URL)" },
      { status: 400 },
    );
  }

  const highlights = highlightsRaw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const item = await addPackage({
    image,
    destination,
    duration,
    price,
    tag,
    highlights,
  });

  revalidatePath("/");
  return NextResponse.json({ item });
}
