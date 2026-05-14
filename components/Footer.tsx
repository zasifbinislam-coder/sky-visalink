"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Plane } from "lucide-react";
import { navLinks, businessInfo, services } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-gradient text-white">
      {/* Top wave / accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-navy-700/40 blur-3xl" />

      <div className="container-x relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold-400/70">
              <Image
                src="/logo.jpg"
                alt="SKY VISALink"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight">
                SKY VISALink
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-300">
                {businessInfo.tagline}
              </div>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            A premium travel & visa partner helping you cross borders with
            confidence. From paperwork to take-off — we handle it all.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={businessInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-gradient hover:text-navy-950"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${businessInfo.email}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-gradient hover:text-navy-950"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${businessInfo.phone}`}
              title={`WhatsApp: ${businessInfo.phone}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-gradient hover:text-navy-950"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="h-px w-3 bg-gold-400 transition-all duration-300 group-hover:w-5" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li
                key={s.title}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">
            Reach Us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
              <span>{businessInfo.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
                title="Chat on WhatsApp"
              >
                {businessInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
              <a
                href={`mailto:${businessInfo.email}`}
                className="hover:text-white"
              >
                {businessInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {year} SKY VISALink. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with <Plane className="h-3.5 w-3.5 text-gold-400" /> for
            global travellers
          </p>
        </div>
      </div>
    </footer>
  );
}
