"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whyChooseUs } from "@/lib/data";
import { ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-navy-gradient py-24 text-white sm:py-32"
    >
      {/* Decorative dots */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[2rem] bg-gold-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glass">
                <Image
                  src="/photos/photo-2.jpg"
                  alt="Happy travellers with SKY VISALink"
                  width={600}
                  height={700}
                  className="h-[460px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass absolute -bottom-6 -right-4 rounded-2xl p-4 shadow-glass sm:-right-8"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-navy-950">
                      98%
                    </div>
                    <div className="text-xs font-medium text-navy-700">
                      Visa Success Rate
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: content */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-200 backdrop-blur-md"
            >
              Why Choose SKY VISALink
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Travel with a team you can{" "}
              <span className="bg-gradient-to-r from-gold-300 to-white bg-clip-text text-transparent">
                actually trust
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/75"
            >
              We're not just booking trips — we're protecting your time, money,
              and plans at every step.
            </motion.p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold-300/40 hover:bg-white/10"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-gold-300 transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-navy-950">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
