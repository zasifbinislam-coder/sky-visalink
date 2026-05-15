"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Plane,
  Star,
  Users,
  Globe,
  MapPin,
  FileText,
  Stamp,
} from "lucide-react";
import { countries } from "@/lib/visa/data";
import type { Region, VisaType } from "@/lib/visa/types";
import { businessInfo } from "@/lib/data";

// ── Pricing defaults (used if no settings are passed in) ───────────────
const DEFAULT_REGION_BASE: Record<Region, number> = {
  "South Asia": 45000,
  "Southeast Asia": 55000,
  "Middle East": 75000,
  "East Asia": 130000,
  Europe: 155000,
  "North America": 185000,
  Oceania: 165000,
};

const DEFAULT_CLASS_MULTIPLIER: Record<string, number> = {
  Economy: 1,
  "Economy+": 1.18,
  Business: 1.65,
  First: 2.6,
};

const CLASS_OPTIONS = ["Economy", "Economy+", "Business", "First"];

export type QuickInquiryPricing = {
  regionFallback: Record<string, number>;
  countryBase: Record<string, number>;
  classMultiplier: Record<string, number>;
};
const TRAVELLER_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

const VISA_TYPE_OPTIONS: { value: VisaType; label: string }[] = [
  { value: "tourist", label: "Tourist Visa" },
  { value: "student", label: "Student Visa" },
  { value: "business", label: "Business Visa" },
  { value: "work", label: "Work Permit" },
];

const REGIONS_ORDER: Region[] = [
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "East Asia",
  "Europe",
  "North America",
  "Oceania",
];

function formatBDT(n: number): string {
  return `৳ ${Math.round(n).toLocaleString("en-IN")}`;
}

export default function QuickInquiry({
  pricing,
}: {
  pricing?: QuickInquiryPricing;
} = {}) {
  const regionBase = pricing?.regionFallback ?? DEFAULT_REGION_BASE;
  const countryBase = pricing?.countryBase ?? {};
  const classMul = pricing?.classMultiplier ?? DEFAULT_CLASS_MULTIPLIER;

  const [visaType, setVisaType] = useState<VisaType>("tourist");
  const [slug, setSlug] = useState("uae");
  const [travellers, setTravellers] = useState(2);
  const [cls, setCls] = useState("Economy");
  const [passport, setPassport] = useState("");

  // Filter countries to ones that offer the selected visa type
  const availableCountries = useMemo(
    () => countries.filter((c) => c.visas[visaType]),
    [visaType],
  );

  // If current slug not available for new visa type, switch to first available
  const country = useMemo(() => {
    const found = availableCountries.find((c) => c.slug === slug);
    return found ?? availableCountries[0] ?? countries[0];
  }, [slug, availableCountries]);

  const estimate = useMemo(() => {
    // Per-country base price overrides region fallback
    const base =
      countryBase[country.slug] ??
      regionBase[country.region] ??
      DEFAULT_REGION_BASE[country.region];
    const mul = classMul[cls] ?? DEFAULT_CLASS_MULTIPLIER[cls] ?? 1;
    return base * travellers * mul;
  }, [country, travellers, cls, regionBase, countryBase, classMul]);

  const onQuote = async () => {
    const visaLabel =
      VISA_TYPE_OPTIONS.find((o) => o.value === visaType)?.label ?? "Visa";

    // Save to inquiries (best-effort — don't block WhatsApp on failure)
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        visaType,
        source: "quick-inquiry",
        name: "Quick Inquiry (no name)",
        phone: passport ? `Passport: ${passport}` : "—",
        country: country.name,
        countrySlug: country.slug,
        passport: passport || undefined,
        travellers,
        travelClass: cls,
        estimatePrice: Math.round(estimate),
      }),
    }).catch(() => {});

    const msg = encodeURIComponent(
      `Hi SKY VISALink,\n\nI'd like a quote for the following:\n\n` +
        `Visa type: ${visaLabel}\n` +
        `Destination: ${country.flag} ${country.name}\n` +
        `Travellers: ${travellers} ${travellers === 1 ? "person" : "people"}\n` +
        `Travel class: ${cls}\n` +
        (passport ? `Passport number: ${passport}\n` : "") +
        `Approx. estimate shown: ${formatBDT(estimate)}\n\n` +
        `Please share full package details with dates, hotels and inclusions. Thanks!`,
    );
    window.open(
      `https://wa.me/${businessInfo.whatsapp}?text=${msg}`,
      "_blank",
    );
  };

  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -inset-4 rounded-[2rem] bg-gold-500/20 blur-2xl" />

      <motion.div layout className="glass relative rounded-3xl p-6 shadow-glass">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold-700">
              Quick Inquiry
            </div>
            <div className="mt-1 font-display text-xl font-bold text-navy-950">
              Plan your next trip
            </div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold">
            <Plane className="h-5 w-5" />
          </div>
        </div>

        {/* Fields */}
        <div className="mt-6 space-y-3">
          {/* Visa Type */}
          <label className="block">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-navy-500">
              <Stamp className="h-3 w-3" /> Visa Type
            </span>
            <div className="relative mt-1">
              <select
                value={visaType}
                onChange={(e) => setVisaType(e.target.value as VisaType)}
                className="w-full appearance-none rounded-xl border border-navy-100 bg-white/80 px-4 py-3 pr-9 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
              >
                {VISA_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                ▾
              </span>
            </div>
          </label>

          {/* Destination */}
          <label className="block">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-navy-500">
              <MapPin className="h-3 w-3" /> Destination
            </span>
            <div className="relative mt-1">
              <select
                value={country.slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full appearance-none rounded-xl border border-navy-100 bg-white/80 px-4 py-3 pr-9 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
              >
                {REGIONS_ORDER.map((region) => {
                  const list = availableCountries.filter(
                    (c) => c.region === region,
                  );
                  if (list.length === 0) return null;
                  return (
                    <optgroup key={region} label={region}>
                      {list.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.flag} {c.name} · {c.capital}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                ▾
              </span>
            </div>
          </label>

          {/* Travellers + Class */}
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-navy-500">
                <Users className="h-3 w-3" /> Travellers
              </span>
              <div className="relative mt-1">
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full appearance-none rounded-xl border border-navy-100 bg-white/80 px-4 py-3 pr-9 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
                >
                  {TRAVELLER_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                  ▾
                </span>
              </div>
            </label>

            <label className="block">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-navy-500">
                <Globe className="h-3 w-3" /> Class
              </span>
              <div className="relative mt-1">
                <select
                  value={cls}
                  onChange={(e) => setCls(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-navy-100 bg-white/80 px-4 py-3 pr-9 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
                >
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">
                  ▾
                </span>
              </div>
            </label>
          </div>

          {/* Passport number */}
          <label className="block">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-navy-500">
              <FileText className="h-3 w-3" /> Passport Number{" "}
              <span className="text-navy-400">(optional)</span>
            </span>
            <input
              type="text"
              value={passport}
              onChange={(e) => setPassport(e.target.value.toUpperCase())}
              placeholder="e.g. AB1234567"
              className="mt-1 w-full rounded-xl border border-navy-100 bg-white/80 px-4 py-3 text-sm font-medium tracking-wide text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
            />
          </label>
        </div>

        {/* Live estimate */}
        <motion.div
          key={`${country.slug}-${travellers}-${cls}-${visaType}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-gold-700">
                Estimated From
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-navy-950">
                {formatBDT(estimate)}
              </div>
              <div className="mt-0.5 text-[11px] text-navy-600">
                {travellers} {travellers === 1 ? "traveller" : "travellers"} ·{" "}
                {cls} class
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">{country.flag}</div>
              <div className="mt-0.5 max-w-[110px] truncate text-[11px] font-semibold text-navy-700">
                {country.name}
              </div>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-snug text-navy-500">
            Indicative starting price. Final quote depends on dates, hotel class,
            visa fees & inclusions.
          </p>
        </motion.div>

        {/* CTA */}
        <button onClick={onQuote} className="btn-primary mt-4 w-full group">
          Get Free Quote on WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* Trust */}
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-navy-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            />
          ))}
          <span className="ml-2 font-medium">Rated 4.9 by 1,200+ clients</span>
        </div>
      </motion.div>
    </div>
  );
}
