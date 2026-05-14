"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import { businessInfo } from "@/lib/data";

type FormState = {
  name: string;
  phone: string;
  destination: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  destination: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Compose a WhatsApp message as a graceful fallback
    const text = encodeURIComponent(
      `Hi SKY VISALink,\n\nName: ${form.name}\nPhone: ${form.phone}\nDestination: ${form.destination}\n\n${form.message}`,
    );
    // Slight UX delay
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
    <section
      id="contact"
      className="relative bg-gradient-to-b from-white via-gold-50/40 to-white py-24 sm:py-32"
    >
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left: copy + info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <span className="section-eyebrow">Contact</span>
            <h2 className="section-title">
              Let's plan your{" "}
              <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
                next adventure
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-700/80">
              Tell us where you'd like to go. Our consultants will get back to
              you within hours with options tailored to your dates, budget, and
              visa needs.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-[#25D366]/60 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366] text-white shadow-lg shadow-emerald-500/30">
                  <MessageCircle className="h-5 w-5" fill="currentColor" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                      WhatsApp us
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Online
                    </span>
                  </div>
                  <div className="font-semibold text-navy-900">
                    {businessInfo.phone}
                  </div>
                </div>
              </a>
              <a
                href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-gold-300 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                    Call us
                  </div>
                  <div className="font-semibold text-navy-900">
                    {businessInfo.phone}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-gold-300 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                    Email
                  </div>
                  <div className="font-semibold text-navy-900">
                    {businessInfo.email}
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                    Office
                  </div>
                  <div className="font-semibold text-navy-900">
                    {businessInfo.address}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gold-200/40 blur-2xl" />
              <form
                onSubmit={onSubmit}
                className="glass relative rounded-3xl border border-white/60 p-6 shadow-glass sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    type="text"
                    value={form.name}
                    onChange={onChange("name")}
                    placeholder="John Doe"
                    required
                  />
                  <Field
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    placeholder="+880 1XXX-XXXXXX"
                    required
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label="Destination"
                    type="text"
                    value={form.destination}
                    onChange={onChange("destination")}
                    placeholder="e.g., Dubai, Bali, Schengen"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    rows={4}
                    placeholder="Tell us about your travel dates, group size, and any preferences…"
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
                      <CheckCircle2 className="h-4 w-4" /> Message Sent
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-navy-500">
                  Your inquiry will open WhatsApp with your details pre-filled —
                  fastest way to reach us.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
        {label}
      </label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white/80 px-4 py-3 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
      />
    </div>
  );
}
