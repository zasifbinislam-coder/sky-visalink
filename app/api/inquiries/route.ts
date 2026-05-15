import { NextResponse } from "next/server";
import { addInquiry, type InquirySource, type InquiryVisaType } from "@/lib/store";

export const runtime = "nodejs";

const VALID_TYPES: InquiryVisaType[] = [
  "tourist",
  "student",
  "business",
  "work",
  "general",
];
const VALID_SOURCES: InquirySource[] = [
  "quick-inquiry",
  "contact-form",
  "country-detail",
  "book-consultant",
];

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const visaType = (body.visaType as InquiryVisaType) ?? "general";
  if (!VALID_TYPES.includes(visaType)) {
    return NextResponse.json(
      { error: "Invalid visaType" },
      { status: 400 },
    );
  }
  const source = (body.source as InquirySource) ?? "contact-form";
  if (!VALID_SOURCES.includes(source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 },
    );
  }

  const item = await addInquiry({
    visaType,
    source,
    name,
    phone,
    email: body.email ? String(body.email).trim() : undefined,
    country: body.country ? String(body.country).trim() : undefined,
    countrySlug: body.countrySlug
      ? String(body.countrySlug).trim()
      : undefined,
    passport: body.passport ? String(body.passport).trim() : undefined,
    travellers:
      typeof body.travellers === "number"
        ? body.travellers
        : body.travellers
          ? Number(body.travellers) || undefined
          : undefined,
    travelDate: body.travelDate ? String(body.travelDate).trim() : undefined,
    travelClass: body.travelClass
      ? String(body.travelClass).trim()
      : undefined,
    estimatePrice:
      typeof body.estimatePrice === "number"
        ? body.estimatePrice
        : body.estimatePrice
          ? Number(body.estimatePrice) || undefined
          : undefined,
    purpose: body.purpose ? String(body.purpose).trim() : undefined,
    message: body.message ? String(body.message).trim() : undefined,
  });

  return NextResponse.json({ ok: true, id: item.id }, { status: 201 });
}
