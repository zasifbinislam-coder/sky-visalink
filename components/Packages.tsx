import { ArrowRight } from "lucide-react";
import PackageCard from "./PackageCard";
import { listPackages } from "@/lib/store";

export default async function Packages() {
  const packages = await listPackages();

  return (
    <section
      id="packages"
      className="relative bg-gradient-to-b from-white via-gold-50/40 to-white py-24 sm:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Featured Packages</span>
            <h2 className="section-title">
              Hand-picked escapes for{" "}
              <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
                every traveller
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-700/80">
              From sun-soaked islands to cosmopolitan capitals — explore our
              most-loved itineraries, fully customisable to your dates and
              budget.
            </p>
          </div>

          <a href="#contact" className="btn-ghost group">
            View All Packages
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {packages.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-navy-200 bg-white/40 py-16 text-sm text-navy-500">
            No tour packages yet. Add some from the admin panel.
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <PackageCard key={p.id} {...p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
