"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Plane,
  ChevronDown,
  GraduationCap,
  Palmtree,
  Briefcase,
} from "lucide-react";
import { navLinks } from "@/lib/data";
import { VISA_TYPE_META } from "@/lib/visa/types";

const visaItems = [
  { type: "student" as const, icon: GraduationCap },
  { type: "tourist" as const, icon: Palmtree },
  { type: "business" as const, icon: Briefcase },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/40 bg-white/85 shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-gold-400/70 shadow-gold transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="SKY VISALink"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div
              className={`font-display text-lg font-bold tracking-tight transition-colors ${
                scrolled ? "text-navy-950" : "text-white"
              }`}
            >
              SKY VISALink
            </div>
            <div
              className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-colors ${
                scrolled ? "text-gold-600" : "text-gold-300"
              }`}
            >
              Travel · Visa · Tours
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <NavItem key={link.href} href={link.href} scrolled={scrolled}>
              {link.label}
            </NavItem>
          ))}

          {/* Visa Services Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setVisaOpen(true)}
            onMouseLeave={() => setVisaOpen(false)}
          >
            <button
              onClick={() => setVisaOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-navy-900 hover:text-gold-700"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Visa Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  visaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {visaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full mt-1 w-72 -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-2 shadow-2xl"
                >
                  {visaItems.map(({ type, icon: Icon }) => {
                    const m = VISA_TYPE_META[type];
                    return (
                      <Link
                        key={type}
                        href={`/visa/${type}`}
                        onClick={() => setVisaOpen(false)}
                        className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-sky-50"
                      >
                        <div
                          className={`grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br ${m.accent} text-white shadow-soft transition-transform duration-300 group-hover/item:scale-110`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-navy-950">
                            {m.label}
                          </div>
                          <div className="mt-0.5 text-xs text-navy-600">
                            {m.tagline}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {navLinks.slice(2).map((link) => (
            <NavItem key={link.href} href={link.href} scrolled={scrolled}>
              {link.label}
            </NavItem>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link href="/#contact" className="btn-primary group">
            <Plane className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Book a Trip
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
            scrolled
              ? "border-navy-200 bg-white text-navy-900"
              : "border-white/30 bg-white/10 text-white backdrop-blur-md"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <div className="container-x pb-4">
              <div className="glass rounded-2xl p-3 shadow-soft">
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-gold-50 hover:text-gold-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                  {/* Visa items inline on mobile */}
                  <li className="mt-2 px-2 text-[10px] font-bold uppercase tracking-widest text-navy-500">
                    Visa Services
                  </li>
                  {visaItems.map(({ type, icon: Icon }) => {
                    const m = VISA_TYPE_META[type];
                    return (
                      <li key={type}>
                        <Link
                          href={`/visa/${type}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-gold-50 hover:text-gold-700"
                        >
                          <div
                            className={`grid h-8 w-8 flex-none place-items-center rounded-lg bg-gradient-to-br ${m.accent} text-white`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {m.label}
                        </Link>
                      </li>
                    );
                  })}

                  <li className="mt-3">
                    <Link
                      href="/#contact"
                      onClick={() => setOpen(false)}
                      className="btn-primary w-full"
                    >
                      <Plane className="h-4 w-4" /> Book a Trip
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavItem({
  href,
  children,
  scrolled,
}: {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          scrolled
            ? "text-navy-900 hover:text-gold-700"
            : "text-white/90 hover:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
