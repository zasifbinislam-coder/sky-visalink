"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { businessInfo } from "@/lib/data";

export default function WhatsAppButton() {
  const text = encodeURIComponent(
    "Hello SKY VISALink! I'd like to know more about your travel & visa services.",
  );
  const href = `https://wa.me/${businessInfo.whatsapp}?text=${text}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with SKY VISALink on WhatsApp at ${businessInfo.phone}`}
      title={`WhatsApp: ${businessInfo.phone}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 ring-2 ring-white/40 transition-all duration-300 hover:bg-[#1ebe5a] hover:shadow-emerald-500/60 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      {/* Pulse ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]"
      />

      {/* Online dot */}
      <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-emerald-300 ring-2 ring-[#25D366]" />

      <MessageCircle className="relative h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
    </motion.a>
  );
}
