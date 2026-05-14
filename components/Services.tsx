"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Background accents */}
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="absolute -left-32 top-40 -z-10 h-64 w-64 rounded-full bg-gold-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-20 -z-10 h-64 w-64 rounded-full bg-navy-100/60 blur-3xl" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-eyebrow"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title"
          >
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
              seamless journey
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base leading-relaxed text-navy-700/80"
          >
            One trusted partner for visas, flights, stays, and curated
            itineraries — so you can focus on the journey, not the paperwork.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
