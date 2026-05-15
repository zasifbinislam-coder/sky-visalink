import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSettings, updateSettings, type Settings } from "@/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: Request) {
  let body: { settings?: Partial<Settings> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.settings || !body.settings.pricing) {
    return NextResponse.json(
      { error: "Missing settings.pricing" },
      { status: 400 },
    );
  }

  // Coerce numeric values (form inputs may arrive as strings)
  const p = body.settings.pricing;
  const toNumMap = (m: Record<string, unknown>) => {
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(m)) {
      const n = typeof v === "number" ? v : Number(v);
      if (Number.isFinite(n) && n > 0) out[k] = n;
    }
    return out;
  };

  const next: Settings = {
    pricing: {
      regionFallback: toNumMap(p.regionFallback ?? {}),
      countryBase: toNumMap(p.countryBase ?? {}),
      classMultiplier: toNumMap(p.classMultiplier ?? {}),
    },
  };

  const saved = await updateSettings(next);
  revalidatePath("/");
  return NextResponse.json({ settings: saved });
}
