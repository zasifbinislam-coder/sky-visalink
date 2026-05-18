import type { MetadataRoute } from "next";
import { countries, VISA_TYPES } from "@/lib/visa/data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sky-visalink.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "/",        priority: 1.0, freq: "weekly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
  ];

  // /visa/<type> for each type
  const typePaths = VISA_TYPES.map((t) => ({
    path: `/visa/${t}`,
    priority: 0.9,
    freq: "monthly" as const,
  }));

  // /visa/<type>/<country> for every available combination
  const countryPaths = VISA_TYPES.flatMap((t) =>
    countries
      .filter((c) => c.visas[t])
      .map((c) => ({
        path: `/visa/${t}/${c.slug}`,
        priority: 0.8,
        freq: "monthly" as const,
      }))
  );

  return [...staticPaths, ...typePaths, ...countryPaths].map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
