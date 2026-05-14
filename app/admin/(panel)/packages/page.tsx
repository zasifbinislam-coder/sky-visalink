"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Pencil,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Package as PackageIcon,
} from "lucide-react";

type PackageItem = {
  id: string;
  image: string;
  destination: string;
  duration: string;
  price: number;
  tag: string;
  highlights: string[];
  createdAt: string;
};

const TAGS = [
  "Bestseller",
  "Honeymoon",
  "Family Friendly",
  "Premium",
  "Cultural",
  "Luxury",
  "Adventure",
  "Featured",
];

type EditorState = {
  open: boolean;
  mode: "create" | "edit";
  pkg: PackageItem | null;
};

export default function PackagesAdminPage() {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>({
    open: false,
    mode: "create",
    pkg: null,
  });

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/packages", { cache: "no-store" });
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed");
      return;
    }
    await load();
    setSuccess("Package deleted");
    setTimeout(() => setSuccess(null), 2500);
  };

  return (
    <div>
      <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
            Tour Packages
          </h1>
          <p className="mt-1 text-sm text-navy-600">
            Add, edit and delete the tour package cards that appear on the
            homepage.
          </p>
        </div>
        <button
          onClick={() =>
            setEditor({ open: true, mode: "create", pkg: null })
          }
          className="btn-primary"
        >
          <Plus className="h-4 w-4" />
          New Package
        </button>
      </header>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
          {success}
        </div>
      )}

      {loading ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-navy-200 py-16">
          <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 py-16 text-center">
          <PackageIcon className="h-8 w-8 text-navy-300" />
          <p className="mt-3 text-sm font-semibold text-navy-700">
            No packages yet
          </p>
          <p className="mt-1 text-xs text-navy-500">
            Create your first package using the button above.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((pkg) => {
            const isLocal = pkg.image.startsWith("/");
            return (
              <article
                key={pkg.id}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-all duration-300 hover:shadow-card"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pkg.image}
                    alt={pkg.destination}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized={!isLocal}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-navy-900 backdrop-blur-md">
                    {pkg.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-display text-base font-bold text-navy-950">
                    {pkg.destination}
                  </div>
                  <div className="mt-0.5 text-xs text-navy-600">
                    {pkg.duration}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-navy-900">
                    ৳{pkg.price.toLocaleString("en-IN")}
                  </div>
                  {pkg.highlights.length > 0 && (
                    <ul className="mt-2 line-clamp-2 text-xs text-navy-600">
                      {pkg.highlights.join(" · ")}
                    </ul>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3">
                    <button
                      onClick={() =>
                        setEditor({ open: true, mode: "edit", pkg })
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(pkg.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editor.open && (
        <PackageEditor
          mode={editor.mode}
          pkg={editor.pkg}
          onClose={() => setEditor({ open: false, mode: "create", pkg: null })}
          onSaved={async () => {
            setEditor({ open: false, mode: "create", pkg: null });
            await load();
            setSuccess(
              editor.mode === "create" ? "Package created" : "Package updated",
            );
            setTimeout(() => setSuccess(null), 2500);
          }}
        />
      )}
    </div>
  );
}

function PackageEditor({
  mode,
  pkg,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  pkg: PackageItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [destination, setDestination] = useState(pkg?.destination ?? "");
  const [duration, setDuration] = useState(pkg?.duration ?? "");
  const [price, setPrice] = useState<number | string>(pkg?.price ?? "");
  const [tag, setTag] = useState(pkg?.tag ?? "Featured");
  const [highlights, setHighlights] = useState(
    (pkg?.highlights ?? []).join("\n"),
  );
  const [imageUrl, setImageUrl] = useState(
    pkg && !pkg.image.startsWith("/uploads/") ? pkg.image : "",
  );
  const [preview, setPreview] = useState<string | null>(pkg?.image ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setImageUrl("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData();
    form.append("destination", destination);
    form.append("duration", duration);
    form.append("price", String(price));
    form.append("tag", tag);
    form.append("highlights", highlights);

    const file = fileRef.current?.files?.[0];
    if (file && file.size > 0) {
      form.append("file", file);
    } else if (imageUrl) {
      form.append("image", imageUrl);
    } else if (pkg) {
      form.append("image", pkg.image);
    }

    const url =
      mode === "create"
        ? "/api/admin/packages"
        : `/api/admin/packages/${pkg!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, { method, body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        setSubmitting(false);
        return;
      }
      onSaved();
    } catch {
      setError("Network error");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 backdrop-blur-sm sm:items-center">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-navy-100 bg-white px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy-950">
            {mode === "create" ? "New Package" : "Edit Package"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-navy-500 transition-colors hover:bg-slate-100 hover:text-navy-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 p-6">
          {/* Image */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Image
            </label>
            <div className="mt-1.5 grid gap-3 sm:grid-cols-[1fr_2fr]">
              <div>
                {preview ? (
                  <div className="relative overflow-hidden rounded-xl border border-navy-100">
                    <img
                      src={preview}
                      alt="preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="grid h-40 w-full place-items-center rounded-xl border-2 border-dashed border-navy-200 bg-sky-50/30 text-xs text-navy-500">
                    No image
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-navy-200 bg-sky-50/30 px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-sky-300 hover:bg-sky-50">
                  <Upload className="h-4 w-4 text-sky-600" />
                  Upload from device
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
                <div className="text-center text-[10px] font-semibold uppercase tracking-widest text-navy-400">
                  — or paste an image URL —
                </div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreview(e.target.value || null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  placeholder="https://images.unsplash.com/…"
                  className="w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          {/* Destination + Duration */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Destination"
              value={destination}
              onChange={setDestination}
              placeholder="Dubai, UAE"
              required
            />
            <Field
              label="Duration"
              value={duration}
              onChange={setDuration}
              placeholder="4 Days / 3 Nights"
              required
            />
          </div>

          {/* Price + Tag */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
                Price (BDT)
              </label>
              <input
                type="number"
                min={1}
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                required
                className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
                Tag
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Highlights (one per line, or comma-separated)
            </label>
            <textarea
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              rows={4}
              placeholder={"Desert Safari\nBurj Khalifa\nMarina Cruise"}
              className="mt-1.5 w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-navy-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : mode === "create" ? (
                "Create Package"
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      />
    </div>
  );
}
