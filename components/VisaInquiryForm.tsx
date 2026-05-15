"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Users, Calendar, Mail, Phone, User } from "lucide-react";
import { businessInfo } from "@/lib/data";
import { VISA_TYPE_META } from "@/lib/visa/types";
import type { VisaType } from "@/lib/visa/types";

type Props = {
  countryName: string;
  countryFlag: string;
  countrySlug?: string;
  visaType: VisaType;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  travelers: string;
  travelDate: string;
  purpose: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  travelers: "1",
  travelDate: "",
  purpose: "",
  message: "",
};

export default function VisaInquiryForm({
  countryName,
  countryFlag,
  countrySlug,
  visaType,
}: Props) {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const meta = VISA_TYPE_META[visaType];

  const onChange =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Save inquiry (best-effort)
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        visaType,
        source: "country-detail",
        name: form.name,
        email: form.email || undefined,
        phone: form.phone,
        country: countryName,
        countrySlug: countrySlug,
        travellers: Number(form.travelers) || undefined,
        travelDate: form.travelDate || undefined,
        purpose: form.purpose || undefined,
        message: form.message || undefined,
      }),
    }).catch(() => {});

    const text = encodeURIComponent(
      `Hi SKY VISALink,\n\nI'd like to apply for a *${meta.label}* to *${countryName}* ${countryFlag}\n\n` +
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `Travellers: ${form.travelers}\n` +
        `Preferred travel date: ${form.travelDate || "Flexible"}\n` +
        `Purpose: ${form.purpose || "N/A"}\n\n` +
        `Notes: ${form.message || "—"}`,
    );

    await new Promise((r) => setTimeout(r, 600));
    window.open(
      `https://wa.me/${businessInfo.whatsapp}?text=${text}`,
      "_blank",
    );
    setSent(true);
    setSubmitting(false);
    setForm(initial);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gold-200/40 blur-2xl" />
      <form
        onSubmit={onSubmit}
        className="glass relative rounded-3xl border border-white/60 p-6 shadow-glass sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-soft`}
          >
            <Send className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold-700">
              Apply for {meta.label}
            </div>
            <div className="font-display text-lg font-bold text-navy-950">
              {countryFlag} {countryName}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Full Name"
            icon={User}
            type="text"
            value={form.name}
            onChange={onChange("name")}
            placeholder="John Doe"
            required
          />
          <Field
            label="Email Address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Phone Number"
            icon={Phone}
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            placeholder="+880 1XXX-XXXXXX"
            required
          />
          <SelectField
            label="Number of Travellers"
            icon={Users}
            value={form.travelers}
            onChange={onChange("travelers")}
          >
            {["1", "2", "3", "4", "5", "6", "7+"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "person" : "people"}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Preferred Travel Date"
            icon={Calendar}
            type="date"
            value={form.travelDate}
            onChange={onChange("travelDate")}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Purpose of Visit
            </label>
            <input
              type="text"
              value={form.purpose}
              onChange={onChange("purpose")}
              placeholder={
                visaType === "student"
                  ? "e.g., MSc Computer Science"
                  : visaType === "business"
                    ? "e.g., Trade fair, Meeting"
                    : "e.g., Family holiday, Honeymoon"
              }
              className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white/80 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
            Additional Notes
          </label>
          <textarea
            value={form.message}
            onChange={onChange("message")}
            rows={4}
            placeholder="Anything else we should know — past visa history, special requirements, etc."
            className="mt-1.5 w-full resize-none rounded-xl border border-navy-100 bg-white/80 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-6 w-full group disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : sent ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Sent to WhatsApp
            </>
          ) : (
            <>
              Submit Inquiry
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-navy-500">
          Submits via WhatsApp with details pre-filled. A consultant will
          respond within hours.
        </p>
      </form>
    </motion.div>
  );
}

function Field({
  label,
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          {...props}
          className="w-full rounded-xl border border-navy-100 bg-white/80 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  icon: Icon,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <select
          {...props}
          className="w-full appearance-none rounded-xl border border-navy-100 bg-white/80 py-3 pl-10 pr-10 text-sm text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400">
          ▾
        </span>
      </div>
    </div>
  );
}
