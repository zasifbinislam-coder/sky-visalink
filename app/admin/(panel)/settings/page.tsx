"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Save,
  Lock,
  Banknote,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

type Settings = {
  pricing: {
    regionFallback: Record<string, number>;
    countryBase: Record<string, number>;
    classMultiplier: Record<string, number>;
  };
};

type Country = {
  slug: string;
  name: string;
  flag: string;
  region: string;
};

type Tab = "pricing" | "password";

export default function SettingsAdminPage() {
  const [tab, setTab] = useState<Tab>("pricing");

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-navy-600">
          Manage per-country pricing for the Quick Inquiry estimator, and update
          your admin password.
        </p>
      </header>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-navy-100">
        <TabButton active={tab === "pricing"} onClick={() => setTab("pricing")}>
          <Banknote className="h-4 w-4" /> Pricing
        </TabButton>
        <TabButton active={tab === "password"} onClick={() => setTab("password")}>
          <Lock className="h-4 w-4" /> Password
        </TabButton>
      </div>

      {tab === "pricing" ? <PricingTab /> : <PasswordTab />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-all ${
        active
          ? "border-gold-500 text-navy-950"
          : "border-transparent text-navy-500 hover:text-navy-800"
      }`}
    >
      {children}
    </button>
  );
}

// ── Pricing tab ─────────────────────────────────────────────────────────

function PricingTab() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load both settings and countries metadata in parallel
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [sRes, cRes] = await Promise.all([
          fetch("/api/admin/settings", { cache: "no-store" }),
          fetch("/api/admin/countries", { cache: "no-store" }),
        ]);
        const s = await sRes.json();
        const c = await cRes.json();
        if (cancelled) return;
        setSettings(s.settings);
        setCountries(c.items || []);
      } catch {
        if (!cancelled) setError("Failed to load settings");
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const out: Record<string, Country[]> = {};
    for (const c of countries) {
      (out[c.region] ??= []).push(c);
    }
    return out;
  }, [countries]);

  if (loading || !settings) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-navy-200 py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gold-600" />
      </div>
    );
  }

  const onSave = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
      } else {
        setSettings(data.settings);
        setSuccess("Pricing saved ✓");
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch {
      setError("Network error");
    }
    setSaving(false);
  };

  const updateRegion = (region: string, value: number) => {
    setSettings((s) =>
      s
        ? {
            ...s,
            pricing: {
              ...s.pricing,
              regionFallback: { ...s.pricing.regionFallback, [region]: value },
            },
          }
        : s,
    );
  };

  const updateCountry = (slug: string, value: number | null) => {
    setSettings((s) => {
      if (!s) return s;
      const next = { ...s.pricing.countryBase };
      if (value === null || value <= 0) delete next[slug];
      else next[slug] = value;
      return { ...s, pricing: { ...s.pricing, countryBase: next } };
    });
  };

  const updateClass = (key: string, value: number) => {
    setSettings((s) =>
      s
        ? {
            ...s,
            pricing: {
              ...s.pricing,
              classMultiplier: { ...s.pricing.classMultiplier, [key]: value },
            },
          }
        : s,
    );
  };

  return (
    <div className="space-y-8">
      {/* Class multipliers */}
      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-base font-bold text-navy-950">
          Travel class multipliers
        </h2>
        <p className="mt-1 text-sm text-navy-600">
          Each estimate = country base price × travellers × class multiplier.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(settings.pricing.classMultiplier).map(([k, v]) => (
            <label key={k} className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                {k}
              </span>
              <input
                type="number"
                step="0.05"
                min="0.1"
                value={v}
                onChange={(e) => updateClass(k, Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Region fallback prices */}
      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-base font-bold text-navy-950">
          Region fallback prices (per person, BDT)
        </h2>
        <p className="mt-1 text-sm text-navy-600">
          Used when a country does not have a custom price set below.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(settings.pricing.regionFallback).map(([region, v]) => (
            <label key={region} className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                {region}
              </span>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-navy-500">
                  ৳
                </span>
                <input
                  type="number"
                  step="500"
                  min="0"
                  value={v}
                  onChange={(e) =>
                    updateRegion(region, Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-navy-100 bg-white px-4 py-2.5 pl-7 text-sm font-semibold text-navy-900 outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
                />
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Per-country pricing */}
      <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft sm:p-6">
        <h2 className="font-display text-base font-bold text-navy-950">
          Per-country prices (per person, BDT)
        </h2>
        <p className="mt-1 text-sm text-navy-600">
          Leave blank to use the region fallback. Numbers override the region.
        </p>

        <div className="mt-6 space-y-6">
          {Object.entries(grouped).map(([region, list]) => (
            <div key={region}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-navy-700">
                  {region}
                </h3>
                <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold text-gold-800">
                  fallback ৳{" "}
                  {(
                    settings.pricing.regionFallback[region] ?? 0
                  ).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => {
                  const current = settings.pricing.countryBase[c.slug];
                  return (
                    <label
                      key={c.slug}
                      className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white px-3 py-2 transition-colors hover:border-gold-200"
                    >
                      <span className="text-xl leading-none">{c.flag}</span>
                      <div className="flex-1 truncate text-sm font-medium text-navy-800">
                        {c.name}
                      </div>
                      <div className="relative w-32">
                        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-navy-500">
                          ৳
                        </span>
                        <input
                          type="number"
                          step="500"
                          min="0"
                          placeholder="default"
                          value={current ?? ""}
                          onChange={(e) =>
                            updateCountry(
                              c.slug,
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                            )
                          }
                          className="w-full rounded-lg border border-navy-100 bg-white py-1.5 pl-6 pr-2 text-right text-xs font-semibold text-navy-900 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save bar */}
      <div className="sticky bottom-4 z-10">
        <div className="flex items-center justify-between rounded-2xl border border-navy-100 bg-white p-3 shadow-card sm:p-4">
          <div className="text-xs text-navy-500">
            {success ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> {success}
              </span>
            ) : error ? (
              <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                <AlertCircle className="h-4 w-4" /> {error}
              </span>
            ) : (
              "Changes update the Hero's Quick Inquiry estimator immediately."
            )}
          </div>
          <button
            onClick={onSave}
            disabled={saving}
            className="btn-primary disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Pricing
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Password tab ────────────────────────────────────────────────────────

function PasswordTab() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          currentPassword: current,
          newPassword: next,
          confirmPassword: confirm,
          securityCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
      } else {
        setSuccess("Password updated ✓ Next login will use the new password.");
        setCurrent("");
        setNext("");
        setConfirm("");
        setSecurityCode("");
      }
    } catch {
      setError("Network error");
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-navy-950">
              Change admin password
            </h2>
            <p className="text-xs text-navy-600">
              Requires the security code set by the owner.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <PasswordField
            label="Current password"
            value={current}
            onChange={setCurrent}
            show={showPw}
            onToggleShow={() => setShowPw((v) => !v)}
            autoComplete="current-password"
          />
          <PasswordField
            label="New password"
            value={next}
            onChange={setNext}
            show={showPw}
            onToggleShow={() => setShowPw((v) => !v)}
            autoComplete="new-password"
            placeholder="At least 6 characters"
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            show={showPw}
            onToggleShow={() => setShowPw((v) => !v)}
            autoComplete="new-password"
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
              Security code
            </label>
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              placeholder="Set by the site owner"
              className="mt-1.5 w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
            />
            <p className="mt-1 text-[11px] text-navy-500">
              This code is required for every password change and never appears
              in error messages.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-6 w-full disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Update Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggleShow,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggleShow: () => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 pr-10 text-sm font-medium text-navy-900 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? "Hide passwords" : "Show passwords"}
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-navy-500 hover:bg-slate-100 hover:text-navy-800"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
