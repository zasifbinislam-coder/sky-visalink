import { NextResponse } from "next/server";
import { countries } from "@/lib/visa/data";

export const runtime = "nodejs";

export async function GET() {
  // Lightweight payload — used by /admin/settings for the per-country price editor
  const items = countries.map((c) => ({
    slug: c.slug,
    name: c.name,
    flag: c.flag,
    region: c.region,
  }));
  return NextResponse.json({ items });
}
