"use client";

import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import CountryCard from "./CountryCard";
import type { Country, Region, VisaType } from "@/lib/visa/types";

type Props = {
  countries: Country[];
  visaType: VisaType;
};

const REGIONS: ("All" | Region)[] = [
  "All",
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "East Asia",
  "Europe",
  "North America",
  "Oceania",
];

export default function CountryGrid({ countries, visaType }: Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<"All" | Region>("All");

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const matchesRegion = region === "All" || c.region === region;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.popularFor.some((p) => p.toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
  }, [countries, region, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="glass sticky top-20 z-30 -mx-4 mb-10 rounded-2xl border border-white/60 px-4 py-3 shadow-soft sm:mx-0 sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country, city, or interest…"
              className="w-full rounded-full border border-navy-100 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
            />
          </div>

          {/* Region tabs */}
          <div className="flex flex-wrap gap-1.5">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  region === r
                    ? "bg-navy-950 text-white shadow-soft"
                    : "bg-white/70 text-navy-700 hover:bg-gold-50 hover:text-gold-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy-200 bg-white/50 py-20 text-center">
          <MapPin className="h-10 w-10 text-navy-300" />
          <p className="mt-4 text-base font-semibold text-navy-700">
            No destinations match your search
          </p>
          <p className="mt-1 text-sm text-navy-500">
            Try a different country or region.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-navy-600">
            Showing <span className="font-bold text-navy-950">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "destination" : "destinations"}
            {region !== "All" && (
              <>
                {" "}in <span className="font-bold text-navy-950">{region}</span>
              </>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <CountryCard
                key={c.slug}
                country={c}
                visaType={visaType}
                index={i}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
