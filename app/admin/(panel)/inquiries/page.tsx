"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Inbox,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Stamp,
  MessageCircle,
  CheckCircle2,
  Clock,
  Filter,
  AlertCircle,
} from "lucide-react";
import { businessInfo } from "@/lib/data";

type Inquiry = {
  id: string;
  visaType: "tourist" | "student" | "business" | "work" | "general";
  source: string;
  status: "new" | "in-progress" | "closed";
  name: string;
  email?: string;
  phone: string;
  country?: string;
  countrySlug?: string;
  passport?: string;
  travellers?: number;
  travelDate?: string;
  travelClass?: string;
  estimatePrice?: number;
  purpose?: string;
  message?: string;
  createdAt: string;
};

const VISA_FILTERS: { value: "all" | Inquiry["visaType"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tourist", label: "Tourist" },
  { value: "student", label: "Student" },
  { value: "business", label: "Business" },
  { value: "work", label: "Work Permit" },
  { value: "general", label: "General" },
];

const VISA_BADGE: Record<string, string> = {
  tourist: "bg-sky-100 text-sky-700 ring-sky-200",
  student: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  business: "bg-navy-100 text-navy-800 ring-navy-200",
  work: "bg-gold-100 text-gold-800 ring-gold-200",
  general: "bg-slate-100 text-slate-700 ring-slate-200",
};

const STATUS_BADGE: Record<string, string> = {
  new: "bg-rose-100 text-rose-700 ring-rose-200",
  "in-progress": "bg-amber-100 text-amber-800 ring-amber-200",
  closed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

export default function InquiriesAdminPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Inquiry["visaType"]>("all");
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries", { cache: "no-store" });
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.visaType === filter)),
    [items, filter],
  );

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: items.length };
    for (const t of ["tourist", "student", "business", "work", "general"]) {
      out[t] = items.filter((i) => i.visaType === t).length;
    }
    return out;
  }, [items]);

  const onStatusChange = async (id: string, status: Inquiry["status"]) => {
    setError(null);
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setError("Failed to update status");
      return;
    }
    await load();
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete");
      return;
    }
    await load();
  };

  return (
    <div>
      <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
            Inquiries
          </h1>
          <p className="mt-1 text-sm text-navy-600">
            All customer inquiries from contact form, hero card, and country
            pages. Filter by visa type and update status as you process them.
          </p>
        </div>
        <button
          onClick={load}
          className="btn-ghost group inline-flex"
          aria-label="Refresh"
        >
          <Loader2 className="h-4 w-4" />
          Refresh
        </button>
      </header>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-navy-500" />
        {VISA_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filter === f.value
                ? "bg-navy-950 text-white shadow-soft"
                : "bg-white text-navy-700 ring-1 ring-navy-100 hover:bg-gold-50 hover:text-gold-700"
            }`}
          >
            {f.label}{" "}
            <span className="ml-1 opacity-70">({counts[f.value] ?? 0})</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-navy-200 py-16">
          <Loader2 className="h-6 w-6 animate-spin text-gold-600" />
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 py-16 text-center">
          <Inbox className="h-8 w-8 text-navy-300" />
          <p className="mt-3 text-sm font-semibold text-navy-700">
            No inquiries{filter !== "all" ? ` in this category` : ` yet`}
          </p>
          <p className="mt-1 text-xs text-navy-500">
            New inquiries from the website appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((inq) => {
            const date = new Date(inq.createdAt);
            return (
              <article
                key={inq.id}
                className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-card"
              >
                {/* Top row: badges + status select */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ring-1 ${VISA_BADGE[inq.visaType] ?? VISA_BADGE.general}`}
                    >
                      <Stamp className="h-3 w-3" />
                      {inq.visaType}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ring-1 ${STATUS_BADGE[inq.status] ?? STATUS_BADGE.new}`}
                    >
                      {inq.status === "new" && <Clock className="h-3 w-3" />}
                      {inq.status === "in-progress" && (
                        <Loader2 className="h-3 w-3" />
                      )}
                      {inq.status === "closed" && (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                      {inq.status}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-navy-400">
                      via {inq.source.replace(/-/g, " ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        onStatusChange(
                          inq.id,
                          e.target.value as Inquiry["status"],
                        )
                      }
                      className="rounded-lg border border-navy-100 bg-white px-2 py-1 text-xs font-semibold text-navy-800 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={() => onDelete(inq.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-rose-50 text-rose-700 transition-colors hover:bg-rose-100"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <div className="font-display text-lg font-bold text-navy-950">
                      {inq.name}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-navy-700">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-gold-700"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                        {inq.phone}
                      </a>
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="inline-flex items-center gap-1 hover:text-gold-700"
                        >
                          <Mail className="h-3.5 w-3.5 text-gold-600" />
                          {inq.email}
                        </a>
                      )}
                      {inq.country && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gold-600" />
                          {inq.country}
                        </span>
                      )}
                    </div>

                    {inq.message && (
                      <p className="mt-3 rounded-xl bg-navy-50/40 px-3 py-2 text-sm leading-relaxed text-navy-700">
                        {inq.message}
                      </p>
                    )}
                  </div>

                  {/* Side meta */}
                  <div className="space-y-1.5 text-xs text-navy-600 lg:border-l lg:border-navy-100 lg:pl-4">
                    {inq.travellers && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-navy-400" />
                        <span className="font-semibold">
                          {inq.travellers}
                        </span>{" "}
                        traveller{inq.travellers > 1 ? "s" : ""}
                      </div>
                    )}
                    {inq.travelDate && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-navy-400" />
                        {inq.travelDate}
                      </div>
                    )}
                    {inq.travelClass && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-navy-400">Class:</span>{" "}
                        <span className="font-semibold">{inq.travelClass}</span>
                      </div>
                    )}
                    {inq.passport && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-navy-400">Passport:</span>{" "}
                        <span className="font-mono font-semibold uppercase">
                          {inq.passport}
                        </span>
                      </div>
                    )}
                    {inq.purpose && (
                      <div className="flex items-start gap-1.5">
                        <span className="text-navy-400">Purpose:</span>{" "}
                        <span>{inq.purpose}</span>
                      </div>
                    )}
                    {typeof inq.estimatePrice === "number" && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-navy-400">Estimate:</span>{" "}
                        <span className="font-semibold text-gold-700">
                          ৳ {inq.estimatePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-1.5 text-navy-400">
                      <Clock className="h-3 w-3" />
                      {date.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-navy-100 pt-3">
                  <a
                    href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1ebe5a]"
                  >
                    <MessageCircle className="h-3 w-3" fill="currentColor" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${inq.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-semibold text-gold-800 transition-colors hover:bg-gold-100"
                  >
                    <Phone className="h-3 w-3" />
                    Call
                  </a>
                  {inq.email && (
                    <a
                      href={`mailto:${inq.email}`}
                      className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-800 transition-colors hover:bg-navy-100"
                    >
                      <Mail className="h-3 w-3" />
                      Email
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
