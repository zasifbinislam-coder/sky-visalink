"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Wallet } from "lucide-react";
import type { Country, VisaType } from "@/lib/visa/types";

type Props = {
  country: Country;
  visaType: VisaType;
  index: number;
};

export default function CountryCard({ country, visaType, index }: Props) {
  const info = country.visas[visaType];
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <Link
        href={`/visa/${visaType}/${country.slug}`}
        className="group relative block overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      >
        {/* Image */}
        <div className="relative aspect-[5/3] overflow-hidden">
          <Image
            src={country.image}
            alt={country.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

          {/* Flag + Region */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900 backdrop-blur-md">
            <span className="text-base leading-none">{country.flag}</span>
            {country.region}
          </div>

          {/* Country name overlay */}
          <div className="absolute inset-x-4 bottom-4 text-white">
            <h3 className="font-display text-xl font-bold drop-shadow-md">
              {country.name}
            </h3>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" />
              {country.capital} · {country.currency}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="line-clamp-2 text-sm text-navy-700/80">
            {country.shortDescription}
          </p>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-gold-50/70 px-3 py-2.5">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gold-700">
                <Clock className="h-3 w-3" />
                Processing
              </div>
              <div className="mt-0.5 line-clamp-1 text-xs font-semibold text-navy-900">
                {info.processingTime}
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50/60 px-3 py-2.5">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                <Wallet className="h-3 w-3" />
                Fee
              </div>
              <div className="mt-0.5 line-clamp-1 text-xs font-semibold text-navy-900">
                {info.feeRange}
              </div>
            </div>
          </div>

          {/* Popular for tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {country.popularFor.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-semibold text-navy-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
            <div className="text-xs font-medium text-navy-500">
              {info.requirements.length} requirements listed
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 transition-all duration-300 group-hover:gap-2">
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
