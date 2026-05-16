"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Globe2,
  Award,
  ArrowRight,
} from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "Trusted & Verified",
    description:
      "Years of embassy relationships and a track record of approved visas across continents.",
  },
  {
    icon: Globe2,
    title: "30+ Destinations",
    description:
      "From South Asia and Southeast Asia to Europe, the Middle East and North America.",
  },
  {
    icon: Users,
    title: "5,000+ Happy Clients",
    description:
      "Families, students, professionals and entrepreneurs — we've helped them all cross borders.",
  },
  {
    icon: Award,
    title: "Expert Consultants",
    description:
      "A team that lives and breathes immigration paperwork so you don't have to.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-white py-24 sm:py-32">
      <div className="absolute -left-32 top-40 -z-10 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-navy-100/60 blur-3xl" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left: image / logo block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[2rem] bg-gold-200/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-navy-100 shadow-card">
                <Image
                  src="/banner.jpg"
                  alt="SKY VISALink — your gateway to the world"
                  width={800}
                  height={500}
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-card sm:-right-8"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-navy-950">
                      Trusted
                    </div>
                    <div className="text-xs font-medium text-navy-700">
                      Travel & Visa Partner
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="section-eyebrow"
            >
              About SKY VISALink
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-title"
            >
              Your trusted partner in{" "}
              <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
                global mobility
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base leading-relaxed text-navy-700/85"
            >
              SKY VISALink is a premium travel and visa consultancy helping
              individuals, families and businesses cross borders with
              confidence. From the first consultation to the moment you board
              your flight, we handle every detail — visas, tickets, hotels and
              itineraries — under one roof.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-base leading-relaxed text-navy-700/85"
            >
              We specialise in tourist visas, student admissions, business
              travel and European work permits — combining local expertise with
              a global reach to make every journey smooth, transparent and
              successful.
            </motion.p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {credentials.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="btn-primary mt-10 group inline-flex"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
