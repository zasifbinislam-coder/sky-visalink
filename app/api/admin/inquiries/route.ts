import { NextResponse } from "next/server";
import { listInquiries } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const items = await listInquiries();
  return NextResponse.json({ items });
}
