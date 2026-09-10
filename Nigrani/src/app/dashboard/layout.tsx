"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/AppShell";

const pageTitles: Record<string, { title: string; search?: string }> = {
  "/dashboard": { title: "Overview", search: "Search..." },
  "/dashboard/queue": { title: "Review Queue", search: "Search..." },
  "/dashboard/projects": { title: "Projects Inventory", search: "Search..." },
  "/dashboard/admin": { title: "Threshold Configuration", search: "Search..." },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Find matching title — check specific routes first, then prefix match for dynamic routes
  const config = pageTitles[pathname] ??
    (pathname.startsWith("/dashboard/project/")
      ? { title: "Project Detail", search: "Search ID..." }
      : { title: "Dashboard", search: "Search..." });

  return (
    <AppShell title={config.title}>
      {children}
    </AppShell>
  );
}
