"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Check } from "lucide-react";

type Props = {
  image: string;
  destination: string;
  duration: string;
  price: number;
  tag: string;
  highlights: string[];
  index: number;
};

const tagColor: Record<string, string> = {
  Bestseller: "bg-amber-100 text-amber-700 ring-amber-200",
  Honeymoon: "bg-rose-100 text-rose-700 ring-rose-200",
  "Family Friendly": "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Premium: "bg-violet-100 text-violet-700 ring-violet-200",
  Cultural: "bg-sky-100 text-sky-700 ring-sky-200",
  Luxury: "bg-navy-100 text-navy-800 ring-navy-200",
};

export default function PackageCard({
  image,
  destination,
  duration,
  price,
  tag,
  highlights,
  index,
}: Props) {
  const isLocal = image.startsWith("/");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-glow group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={destination}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          unoptimized={!isLocal}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />

        {/* Tag */}
        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${
            tagColor[tag] ?? "bg-white text-navy-800 ring-navy-100"
          }`}
        >
          {tag}
        </div>

        {/* Duration pill */}
        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900 backdrop-blur-md">
          <Clock className="h-3 w-3 text-gold-700" />
          {duration}
        </div>

        {/* Destination overlay */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gold-300" />
            <span className="font-display text-lg font-semibold drop-shadow-md">
              {destination}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <ul className="space-y-1.5">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 text-sm text-navy-700"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-gold-100 text-gold-700">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-navy-100 pt-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-navy-500">
              Starting from
            </div>
            <div className="font-display text-2xl font-bold text-navy-950">
              ৳{price.toLocaleString("en-IN")}
              <span className="ml-1 text-xs font-medium text-navy-500">
                / person
              </span>
            </div>
          </div>
          <a
            href="#contact"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-gold-gradient hover:text-navy-950 hover:shadow-gold"
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
