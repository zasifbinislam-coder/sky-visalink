"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";

type Item = { id: string; src: string; alt: string };

const heights = [
  "h-72",
  "h-96",
  "h-80",
  "h-64",
  "h-96",
  "h-72",
  "h-80",
  "h-64",
];

export default function GalleryMasonry({ items }: { items: Item[] }) {
  return (
    <div className="masonry">
      {items.map((img, i) => {
        const isLocal = img.src.startsWith("/");
        return (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            className={`group relative overflow-hidden rounded-2xl shadow-card ${
              heights[i % heights.length]
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              unoptimized={!isLocal}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="flex items-center gap-2 text-white">
                <ZoomIn className="h-4 w-4" />
                <span className="text-sm font-medium">{img.alt}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
