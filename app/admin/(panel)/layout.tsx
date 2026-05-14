import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell username={admin.username}>{children}</AdminShell>;
}
