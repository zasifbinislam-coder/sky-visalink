"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Wallet,
  Camera,
  Plane,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Files,
  Check,
} from "lucide-react";
import type { VisaRequirement } from "@/lib/visa/types";
import { REQ_CATEGORY_META } from "@/lib/visa/data";

const iconMap = {
  document: FileText,
  financial: Wallet,
  photo: Camera,
  travel: Plane,
  medical: Stethoscope,
  academic: GraduationCap,
  business: Briefcase,
  other: Files,
} as const;

export default function VisaRequirementsList({
  requirements,
}: {
  requirements: VisaRequirement[];
}) {
  const categories = useMemo(() => {
    const set = new Set(requirements.map((r) => r.category));
    return Array.from(set);
  }, [requirements]);

  const [activeFilter, setActiveFilter] = useState<"all" | string>("all");

  const visible =
    activeFilter === "all"
      ? requirements
      : requirements.filter((r) => r.category === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
            activeFilter === "all"
              ? "bg-navy-950 text-white shadow-soft"
              : "bg-white text-navy-700 ring-1 ring-navy-100 hover:bg-gold-50 hover:text-gold-700"
          }`}
        >
          All ({requirements.length})
        </button>
        {categories.map((c) => {
          const meta = REQ_CATEGORY_META[c];
          const count = requirements.filter((r) => r.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === c
                  ? "bg-navy-950 text-white shadow-soft"
                  : `${meta.color} ring-1 hover:brightness-95`
              }`}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* List */}
      <ol className="space-y-3">
        {visible.map((req, i) => {
          const Icon = iconMap[req.category];
          const catMeta = REQ_CATEGORY_META[req.category];
          return (
            <motion.li
              key={`${req.category}-${req.title}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-gold-300 hover:shadow-soft"
            >
              {/* Number badge */}
              <div className="flex-none">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gold-50 font-display text-sm font-bold text-gold-700 ring-1 ring-gold-100 transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-navy-950 group-hover:ring-gold-300">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-navy-950">{req.title}</h4>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full ${catMeta.color} px-2 py-0.5 text-[10px] font-semibold ring-1`}
                  >
                    <Icon className="h-3 w-3" />
                    {catMeta.label}
                  </span>
                  {!req.required && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">
                      Optional
                    </span>
                  )}
                  {req.required && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <Check className="h-3 w-3" strokeWidth={3} /> Required
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80">
                  {req.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
