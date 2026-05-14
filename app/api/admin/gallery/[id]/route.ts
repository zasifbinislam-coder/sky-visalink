import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteGalleryItem, deleteUploadIfLocal } from "@/lib/store";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const removed = await deleteGalleryItem(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await deleteUploadIfLocal(removed.src);
  revalidatePath("/");
  return NextResponse.json({ ok: true, removed });
}
