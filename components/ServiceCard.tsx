"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold-200 hover:shadow-2xl"
    >
      {/* Decorative gradient */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-100/70 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-700/80">
          {description}
        </p>

        <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-700 opacity-0 transition-all duration-500 group-hover:opacity-100">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
