import { Camera } from "lucide-react";
import GalleryMasonry from "./GalleryMasonry";
import { listGallery } from "@/lib/store";

export default async function Gallery() {
  const items = await listGallery();

  return (
    <section id="gallery" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">
            <span className="inline-flex items-center gap-1.5">
              <Camera className="h-3.5 w-3.5" /> Gallery
            </span>
          </span>
          <h2 className="section-title">
            Moments from our{" "}
            <span className="bg-gradient-to-r from-gold-600 to-navy-800 bg-clip-text text-transparent">
              happy travellers
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80">
            Visa handovers, hotel check-ins, and once-in-a-lifetime views —
            captured by clients who chose SKY VISALink.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-navy-200 bg-white/40 py-16 text-sm text-navy-500">
            No photos yet. Upload some from the admin panel.
          </div>
        ) : (
          <div className="mt-14">
            <GalleryMasonry items={items} />
          </div>
        )}
      </div>
    </section>
  );
}
