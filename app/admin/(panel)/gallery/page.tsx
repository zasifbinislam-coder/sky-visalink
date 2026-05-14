"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  createdAt: string;
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery", { cache: "no-store" });
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(f));
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose an image first");
      return;
    }
    setError(null);
    setSuccess(null);
    setUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("alt", alt || file.name);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        setUploading(false);
        return;
      }
      setSuccess("Photo uploaded ✓");
      setAlt("");
      clearPreview();
      await load();
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError("Network error. Try again.");
    }
    setUploading(false);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed");
      return;
    }
    await load();
    setSuccess("Photo deleted");
    setTimeout(() => setSuccess(null), 2500);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
          Gallery
        </h1>
        <p className="mt-1 text-sm text-navy-600">
          Upload travel photos that appear on the homepage gallery. PNG, JPG,
          WebP. Max 8 MB each.
        </p>
      </header>

      {/* Upload form */}
      <form
        onSubmit={onUpload}
        className="mb-8 rounded-2xl border border-navy-100 bg-white p-5 shadow-soft sm:p-6"
      >
        <h2 className="font-display text-base font-bold text-navy-950">
          Add a new photo
        </h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_2fr]">
          {/* File picker / preview */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Image File
            </label>
            <div className="mt-1.5">
              {preview ? (
                <div className="relative overflow-hidden rounded-xl border border-navy-100">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-48 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearPreview}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-white"
                    aria-label="Remove preview"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy-200 bg-sky-50/30 text-center transition-colors hover:border-sky-300 hover:bg-sky-50">
                  <Upload className="h-6 w-6 text-sky-600" />
                  <span className="mt-2 text-sm font-semibold text-navy-900">
                    Click to choose an image
                  </span>
                  <span className="mt-0.5 text-xs text-navy-500">
                    PNG · JPG · WebP — up to 8 MB
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Alt text + submit */}
          <div className="flex flex-col">
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Description (alt text)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Visa handover with happy clients"
              className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
            <p className="mt-1.5 text-xs text-navy-500">
              Shown on hover and used by screen readers / SEO.
            </p>

            <div className="mt-auto pt-4">
              {error && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={uploading}
                className="btn-primary w-full disabled:opacity-70 sm:w-auto"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* List */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-base font-bold text-navy-950">
            Current photos
          </h2>
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">
            {items.length} total
          </span>
        </div>

        {loading ? (
          <div className="grid place-items-center rounded-2xl border border-dashed border-navy-200 py-16">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 py-16 text-center">
            <ImageIcon className="h-8 w-8 text-navy-300" />
            <p className="mt-3 text-sm font-semibold text-navy-700">
              No photos yet
            </p>
            <p className="mt-1 text-xs text-navy-500">
              Upload your first photo using the form above.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const isLocal = item.src.startsWith("/");
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized={!isLocal}
                    />
                  </div>
                  <div className="p-3">
                    <div className="line-clamp-2 text-xs font-medium text-navy-800">
                      {item.alt}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-navy-500">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
