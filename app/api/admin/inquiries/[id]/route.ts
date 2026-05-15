import { NextResponse } from "next/server";
import {
  deleteInquiry,
  updateInquiryStatus,
  type InquiryStatus,
} from "@/lib/store";

export const runtime = "nodejs";

const VALID_STATUS: InquiryStatus[] = ["new", "in-progress", "closed"];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  let body: { status?: InquiryStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }
  if (!body.status || !VALID_STATUS.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const updated = await updateInquiryStatus(params.id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const removed = await deleteInquiry(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, removed });
}
