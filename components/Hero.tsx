"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck, Plane, Star, Users, Globe } from "lucide-react";
import QuickInquiry from "./QuickInquiry";

const stats = [
  { value: "5K+", label: "Happy Travellers", icon: Users },
  { value: "98%", label: "Visa Success", icon: Star },
  { value: "50+", label: "Destinations", icon: Globe },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* ── Background banner image ────────────────────────────────────
          object-position pushes the image left so the bottom-right sparkle
          icon is cropped off-screen, while the SKY VISALINK logo (left side
          of the banner) remains in the frame.                          */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/banner.jpg"
          alt="SKY VISALink — your gateway to the world"
          fill
          sizes="100vw"
          priority
          className="object-cover scale-105 object-[20%_center] sm:object-[25%_center] lg:object-[30%_center]"
        />
      </div>

      {/* Base dim — uniformly darken the whole banner so foreground text reads cleanly */}
      <div className="absolute inset-0 -z-10 bg-navy-950/55" />
      {/* Slight left-to-right gradient so the right side (card area) is darkest */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/15 via-navy-950/25 to-navy-950/55" />
      {/* Top vignette for navbar contrast */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-950/60 to-transparent" />
      {/* Bottom vignette — strong, anchors foreground text and CTAs */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-transparent" />
      {/* Soft radial dim centered on the left text column for extra legibility */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 60% at 30% 55%, rgba(10,26,63,0.55), transparent 70%)",
        }}
      />

      {/* Bottom-right color mask — hides any residual sparkle that
          slips past the crop on ultrawide viewports. Matches the navy
          tone so it disappears into the overlay.                        */}
      <div className="absolute bottom-0 right-0 -z-10 h-40 w-48 bg-gradient-to-tl from-navy-950 via-navy-950/80 to-transparent" />

      {/* Animated glow blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-gold-500/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute -left-20 bottom-10 -z-10 h-80 w-80 rounded-full bg-navy-700/40 blur-3xl"
      />

      <div className="container-x relative w-full pt-32 pb-20 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              Trusted Travel & Visa Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-gold-300 via-gold-400 to-white bg-clip-text text-transparent">
                  Gateway
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 -skew-x-6 rounded-md bg-gold-500/30 blur-sm" />
              </span>{" "}
              to the World with{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">SKY VISALink</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow sm:text-lg"
            >
              Seamless visa processing, flight ticketing & unforgettable tour
              packages — handled by experts who treat every journey like their
              own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#packages" className="btn-primary group">
                <Plane className="h-4 w-4" />
                Explore Packages
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#visa-services" className="btn-secondary group">
                <FileCheck className="h-4 w-4" />
                Consult for Visa
              </a>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-6"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-dark rounded-2xl px-3 py-4 text-center sm:px-4"
                >
                  <s.icon className="mx-auto h-5 w-5 text-gold-300" />
                  <div className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Quick Inquiry — interactive, shown on all screens (stacks below text on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <QuickInquiry />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="relative h-9 w-5 rounded-full border border-white/40">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
