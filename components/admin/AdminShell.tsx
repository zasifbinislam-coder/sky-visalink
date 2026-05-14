"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Package,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/packages", label: "Tour Packages", icon: Package },
];

export default function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const SidebarContent = (
    <>
      {/* Brand */}
      <Link
        href="/admin"
        className="flex items-center gap-3 px-2 pb-6"
        onClick={() => setOpen(false)}
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-sky-400/40">
          <Image
            src="/logo.jpg"
            alt="SKY VISALink"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="leading-tight">
          <div className="font-display text-sm font-bold text-white">
            SKY VISALink
          </div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-sky-300">
            Admin Panel
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sky-500/15 text-white ring-1 ring-sky-400/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                className={`h-4 w-4 ${active ? "text-sky-300" : "text-white/60"}`}
              />
              {item.label}
            </Link>
          );
        })}

        <div className="my-3 h-px bg-white/10" />

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 text-white/60" />
          View Website
        </a>
      </nav>

      {/* User + logout */}
      <div className="border-t border-white/10 pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-sky-gradient text-sm font-bold text-white">
            {username.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">
              {username}
            </div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-sky-300">
              Administrator
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-rose-500/15 hover:text-rose-200"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile topbar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-navy-100 bg-white px-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src="/logo.jpg"
              alt="SKY VISALink"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="font-display text-sm font-bold text-navy-950">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-navy-100 bg-white text-navy-900"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-navy-gradient p-5 lg:flex">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 left-0 flex w-72 flex-col bg-navy-gradient p-5"
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
