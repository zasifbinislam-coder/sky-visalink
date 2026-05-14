"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-navy-gradient text-white">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push(from);
      router.refresh();
    } catch (err) {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-navy-gradient px-4">
      {/* Decorative dots + blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
      <div className="absolute -right-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-sky-400/50 shadow-soft"
          >
            <Image
              src="/logo.jpg"
              alt="SKY VISALink"
              fill
              sizes="64px"
              className="object-cover"
            />
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">
            SKY VISALink Admin
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Sign in to manage gallery, packages and content
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass rounded-3xl border border-white/40 p-6 shadow-glass sm:p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
                Username
              </label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-navy-100 bg-white/80 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-navy-600">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-navy-100 bg-white/80 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder:text-navy-400 outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 w-full group disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <Link
            href="/"
            className="mt-4 block text-center text-xs text-navy-500 hover:text-sky-600"
          >
            ← Back to website
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Default credentials are in <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code> — change them before going live.
        </p>
      </motion.div>
    </div>
  );
}
