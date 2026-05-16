"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  FileCheck,
  Plane,
  ShieldCheck,
  Clock,
  Headphones,
  Sparkles,
} from "lucide-react";
import { businessInfo } from "@/lib/data";

const steps = [
  {
    icon: Phone,
    title: "Free Consultation",
    description:
      "Tell us your destination & dates — we map out documents and timeline.",
  },
  {
    icon: FileCheck,
    title: "Document Preparation",
    description:
      "We draft your application, gather paperwork, and submit to the embassy.",
  },
  {
    icon: Plane,
    title: "Visa Approved · Fly",
    description:
      "Track approval, collect passport, and board your flight worry-free.",
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "98% Approval Rate" },
  { icon: Clock, label: "2–4 Week Turnaround" },
  { icon: Headphones, label: "24/7 Consultant Access" },
];

export default function HeroProcessCard() {
  const text = encodeURIComponent(
    "Hello SKY VISALink, I'd like to book a free consultation to discuss my visa options.",
  );
  const waHref = `https://wa.me/${businessInfo.whatsapp}?text=${text}`;

  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -inset-4 rounded-[2rem] bg-gold-500/20 blur-2xl" />

      <motion.div
        layout
        className="glass relative rounded-3xl p-6 shadow-glass"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700">
              <Sparkles className="h-3.5 w-3.5" />
              Your Visa Journey
            </div>
            <div className="mt-1 font-display text-xl font-bold leading-tight text-navy-950">
              Get your visa in{" "}
              <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
                3 simple steps
              </span>
            </div>
          </div>
          <div className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold">
            <Plane className="h-5 w-5" />
          </div>
        </div>

        {/* Steps */}
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
              className="relative flex items-start gap-3 rounded-2xl border border-navy-100/80 bg-white/60 p-3.5 transition-colors hover:border-gold-200"
            >
              {/* Step number */}
              <div className="relative flex-none">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient font-display text-sm font-bold text-navy-950 shadow-gold">
                  {i + 1}
                </div>
                {/* Connecting line to next step */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-full h-3 w-px -translate-x-1/2 bg-gold-300/60"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <s.icon className="h-3.5 w-3.5 text-gold-700" />
                  <div className="text-sm font-bold text-navy-950">
                    {s.title}
                  </div>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-700/80">
                  {s.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Trust strip */}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-gold-200/70 bg-gradient-to-br from-gold-50 to-white p-2.5">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <b.icon className="h-3.5 w-3.5 text-gold-700" />
              <span className="text-[9px] font-semibold leading-tight text-navy-800">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4 w-full group"
        >
          Book Free Consultation
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <p className="mt-3 text-center text-[10px] text-navy-500">
          No fee for first consultation · Reply within hours via WhatsApp
        </p>
      </motion.div>
    </div>
  );
}
