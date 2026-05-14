import Link from "next/link";
import {
  Image as ImageIcon,
  Package,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { listGallery, listPackages } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [gallery, packages] = await Promise.all([
    listGallery(),
    listPackages(),
  ]);

  const stats = [
    {
      label: "Gallery photos",
      value: gallery.length,
      href: "/admin/gallery",
      icon: ImageIcon,
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "Tour packages",
      value: packages.length,
      href: "/admin/packages",
      icon: Package,
      color: "from-indigo-500 to-sky-500",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
            Welcome back 👋
          </h1>
          <p className="mt-1 text-sm text-navy-600">
            Manage your gallery, tour packages and website content from here.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost group"
        >
          <ExternalLink className="h-4 w-4" />
          View live site
        </a>
      </div>

      {/* Stat grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-card"
          >
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl font-bold text-navy-950">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
                  {s.label}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-600" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-950">
          <Sparkles className="h-4 w-4 text-sky-600" />
          Quick actions
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/gallery"
            className="rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-sky-200 hover:shadow-soft"
          >
            <div className="font-semibold text-navy-950">Upload a new photo</div>
            <div className="mt-1 text-xs text-navy-600">
              Add a happy-traveller or visa-handover photo to the homepage gallery.
            </div>
          </Link>
          <Link
            href="/admin/packages"
            className="rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-sky-200 hover:shadow-soft"
          >
            <div className="font-semibold text-navy-950">Create a tour package</div>
            <div className="mt-1 text-xs text-navy-600">
              Add a new destination card with image, price, and highlights.
            </div>
          </Link>
          <Link
            href="/admin/packages"
            className="rounded-2xl border border-navy-100 bg-white p-4 transition-all duration-300 hover:border-sky-200 hover:shadow-soft"
          >
            <div className="font-semibold text-navy-950">Edit existing packages</div>
            <div className="mt-1 text-xs text-navy-600">
              Update prices, swap images, or remove old packages.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
