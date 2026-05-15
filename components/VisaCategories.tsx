"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Palmtree,
  Briefcase,
  Stamp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { VISA_TYPE_META } from "@/lib/visa/types";
import { getCountriesForVisaType } from "@/lib/visa/data";

const iconMap = {
  graduation: GraduationCap,
  palm: Palmtree,
  briefcase: Briefcase,
  stamp: Stamp,
} as const;

const cardCopy: Record<
  "student" | "tourist" | "business" | "work",
  { points: string[]; cta: string }
> = {
  student: {
    points: [
      "University shortlisting & SOP review",
      "Financial profile & sponsor docs",
      "Embassy interview preparation",
    ],
    cta: "Explore Study Destinations",
  },
  tourist: {
    points: [
      "Visa documentation & appointments",
      "Itinerary & hotel reservations",
      "Travel insurance assistance",
    ],
    cta: "Browse Tourist Destinations",
  },
  business: {
    points: [
      "Invitation & cover letter drafting",
      "Trade license & financial proof",
      "Express embassy liaison",
    ],
    cta: "View Business Destinations",
  },
  work: {
    points: [
      "Job offer & employer verification",
      "Document attestation & translation",
      "End-to-end embassy submission",
    ],
    cta: "View Work Permit Destinations",
  },
};

export default function VisaCategories() {
  const types = ["student", "tourist", "business", "work"] as const;

  return (
    <section
      id="visa-services"
      className="relative bg-gradient-to-b from-white via-gold-50/30 to-white py-24 sm:py-32"
    >
      <div className="absolute -left-32 top-40 -z-10 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-eyebrow"
          >
            Visa Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title"
          >
            Pick your visa.{" "}
            <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
              Explore 22+ destinations.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-navy-700/80"
          >
            Choose a visa category to see country-wise requirements, processing
            time, fees, and a step-by-step checklist — all in one place.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((type, i) => {
            const meta = VISA_TYPE_META[type];
            const Icon = iconMap[meta.icon];
            const copy = cardCopy[type];
            const count = getCountriesForVisaType(type).length;

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/visa/${type}`}
                  className="group relative block overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 hover:shadow-2xl"
                >
                  {/* Accent ribbon */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.accent}`}
                  />

                  {/* Decorative blur */}
                  <div
                    className={`absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${meta.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <span
                        className={`rounded-full ${meta.accentSoft} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}
                      >
                        {count} Countries
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
                      {meta.label}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold-700">
                      {meta.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-700/80">
                      {meta.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {copy.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-sm text-navy-700"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-all duration-300 group-hover:gap-3">
                      {copy.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
