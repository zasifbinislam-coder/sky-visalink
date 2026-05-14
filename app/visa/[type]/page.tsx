import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, GraduationCap, Palmtree, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CountryGrid from "@/components/CountryGrid";
import {
  getCountriesForVisaType,
  isValidVisaType,
  VISA_TYPES,
} from "@/lib/visa/data";
import { VISA_TYPE_META } from "@/lib/visa/types";

export function generateStaticParams() {
  return VISA_TYPES.map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: { type: string };
}): Promise<Metadata> {
  if (!isValidVisaType(params.type)) return { title: "Visa Services" };
  const meta = VISA_TYPE_META[params.type];
  return {
    title: `${meta.title} | SKY VISALink`,
    description: meta.description,
  };
}

const iconMap = {
  graduation: GraduationCap,
  palm: Palmtree,
  briefcase: Briefcase,
} as const;

export default function VisaTypePage({
  params,
}: {
  params: { type: string };
}) {
  if (!isValidVisaType(params.type)) notFound();
  const meta = VISA_TYPE_META[params.type];
  const Icon = iconMap[meta.icon];
  const countries = getCountriesForVisaType(params.type);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <Navbar />

      {/* Hero header */}
      <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="absolute inset-0 -z-10 bg-navy-gradient" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

        <div className="container-x relative">
          <Link
            href="/#visa-services"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all visa categories
          </Link>

          <div className="mt-6 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`grid h-16 w-16 flex-none place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-soft`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-200 backdrop-blur-md">
                  {meta.tagline}
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {meta.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {meta.description}
                </p>
              </div>
            </div>

            <div className="glass-dark rounded-2xl px-5 py-4 text-center">
              <div className="font-display text-3xl font-bold text-white">
                {countries.length}
              </div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-200">
                Destinations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country grid */}
      <section className="bg-gradient-to-b from-gold-50/30 via-white to-white py-12 sm:py-20">
        <div className="container-x">
          <CountryGrid countries={countries} visaType={params.type} />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white pb-16">
        <div className="container-x">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-900">
            <strong>Important:</strong> Visa rules, fees, and processing times
            change frequently and may vary by individual profile. The
            information shown is a general guide based on commonly published
            requirements — always confirm the latest rules with the respective
            embassy or visa centre, or speak to a SKY VISALink consultant for
            personalised advice.
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
