import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Wallet,
  Calendar,
  Repeat,
  TrendingUp,
  MapPin,
  Info,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VisaRequirementsList from "@/components/VisaRequirementsList";
import VisaInquiryForm from "@/components/VisaInquiryForm";
import {
  countries,
  getCountry,
  isValidVisaType,
  VISA_TYPES,
} from "@/lib/visa/data";
import { VISA_TYPE_META } from "@/lib/visa/types";

export function generateStaticParams() {
  const params: { type: string; country: string }[] = [];
  for (const type of VISA_TYPES) {
    for (const c of countries) {
      if (c.visas[type]) params.push({ type, country: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { type: string; country: string };
}): Promise<Metadata> {
  if (!isValidVisaType(params.type)) return { title: "Visa" };
  const country = getCountry(params.country);
  if (!country) return { title: "Visa" };
  const meta = VISA_TYPE_META[params.type];
  return {
    title: `${country.name} ${meta.label} | SKY VISALink`,
    description: `Complete ${meta.label.toLowerCase()} requirements for ${country.name} — documents, fees, processing time, and inquiry form.`,
  };
}

export default function CountryVisaPage({
  params,
}: {
  params: { type: string; country: string };
}) {
  if (!isValidVisaType(params.type)) notFound();
  const country = getCountry(params.country);
  if (!country) notFound();

  const info = country.visas[params.type];
  if (!info) notFound();

  const meta = VISA_TYPE_META[params.type];

  // Find other visa types this country offers (for cross-linking)
  const otherTypes = VISA_TYPES.filter(
    (t) => t !== params.type && country.visas[t],
  );

  const stats = [
    { icon: Clock, label: "Processing", value: info.processingTime },
    { icon: Calendar, label: "Validity", value: info.validity },
    { icon: MapPin, label: "Stay Duration", value: info.stayDuration },
    { icon: Repeat, label: "Entry Type", value: info.entryType },
    { icon: Wallet, label: "Fee Range", value: info.feeRange },
    ...(info.successRate
      ? [{ icon: TrendingUp, label: "Success Rate", value: info.successRate }]
      : []),
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar />

      {/* Hero header with country image */}
      <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 -z-20">
          <Image
            src={country.image}
            alt={country.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 to-transparent" />

        <div className="container-x relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/#visa-services" className="hover:text-white">
              Visa Services
            </Link>
            <span>/</span>
            <Link
              href={`/visa/${params.type}`}
              className="hover:text-white"
            >
              {meta.label}
            </Link>
            <span>/</span>
            <span className="text-white">{country.name}</span>
          </nav>

          <div className="mt-6 flex items-start gap-4">
            <div className="text-5xl leading-none drop-shadow-lg sm:text-6xl">
              {country.flag}
            </div>
            <div className="flex-1">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-200 backdrop-blur-md">
                {country.region} · {meta.label}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {country.name}
              </h1>
              <p className="mt-1 text-sm text-white/70">
                {country.capital} · {country.currency}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                {country.shortDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {country.popularFor.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur-md"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stat grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-dark rounded-2xl p-4"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gold-200">
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </div>
                <div className="mt-1.5 text-sm font-semibold text-white">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <Link
            href={`/visa/${params.type}`}
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all {meta.label.toLowerCase()} destinations
          </Link>
        </div>
      </section>

      {/* Main content: requirements + form */}
      <section className="bg-gradient-to-b from-white via-gold-50/30 to-white py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: requirements */}
            <div className="lg:col-span-8">
              <div className="mb-2">
                <span className="section-eyebrow">Document Checklist</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
                Required documents for {country.name} {meta.label}
              </h2>
              <p className="mt-2 text-sm text-navy-700/80">
                {info.requirements.length} items in total. Filter by category or
                review the complete checklist below.
              </p>

              <div className="mt-8">
                <VisaRequirementsList requirements={info.requirements} />
              </div>

              {/* Eligibility */}
              {info.eligibility.length > 0 && (
                <div className="mt-12 rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy-950">
                      Eligibility Criteria
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {info.eligibility.map((e, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-navy-800"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes / tips */}
              {info.notes && info.notes.length > 0 && (
                <div className="mt-6 rounded-3xl border border-amber-100 bg-amber-50/60 p-6 shadow-soft sm:p-8">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-amber-900">
                      Helpful Notes
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {info.notes.map((n, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-amber-900"
                      >
                        <Info className="mt-0.5 h-4 w-4 flex-none text-amber-600" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cross-link other visa types */}
              {otherTypes.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-lg font-bold text-navy-950">
                    Also available for {country.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {otherTypes.map((t) => {
                      const tMeta = VISA_TYPE_META[t];
                      return (
                        <Link
                          key={t}
                          href={`/visa/${t}/${country.slug}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-800 transition-all duration-300 hover:border-gold-300 hover:text-gold-700 hover:shadow-soft"
                        >
                          <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-br ${tMeta.accent}`} />
                          {tMeta.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky inquiry form */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <VisaInquiryForm
                  countryName={country.name}
                  countryFlag={country.flag}
                  visaType={params.type}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white pb-16">
        <div className="container-x">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-900">
            <strong>Disclaimer:</strong> The information above is a general
            guideline based on commonly published embassy requirements. Visa
            rules, document checklists, fees, and processing times change
            frequently and may differ based on individual circumstances. Always
            confirm the latest requirements with the official embassy / visa
            application centre, or contact SKY VISALink for personalised
            consultation.
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
