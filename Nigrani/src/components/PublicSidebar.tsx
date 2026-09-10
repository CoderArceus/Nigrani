"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Explore Projects", icon: "search" },
  { href: "/map", label: "Map", icon: "map" },
  { href: "/insights", label: "Insights", icon: "bar_chart" },
  { href: "/about", label: "About Nigrani", icon: "info" },
];

export function PublicSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/project/");
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 border-r border-outline-variant/20 overflow-hidden ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      {/* Sidebar's own background illustration */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/sidebar-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.7,
        }}
      />
      {/* Subtle white overlay so content stays readable */}
      <div className="absolute inset-0 z-0 bg-white/40 pointer-events-none" />

      {/* Header / Branding */}
      <div className="px-6 pt-7 pb-5 flex flex-col gap-0.5 relative z-10">
        <div className="flex items-start justify-between">
          {!isCollapsed && (
            <div>
              <span className="font-display text-[22px] font-bold text-primary tracking-tight block">
                Nigrani
              </span>
              <span className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#94A3B8] uppercase block">
                Public Portal
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-[#64748B] hover:text-primary transition-colors ${
              isCollapsed ? "mx-auto mt-1" : ""
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow py-3 flex flex-col gap-1.5 px-3 relative z-10">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 ease-in-out font-sans text-[15px] font-semibold relative ${
                active
                  ? "bg-[#EFF6FF]/80 text-[#2563EB]"
                  : "text-[#475569] hover:text-[#2563EB] hover:bg-white/50"
              } ${isCollapsed ? "justify-center px-0" : ""}`}
            >
              {/* Active indicator bar */}
              {active && !isCollapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#2563EB] rounded-r-full" />
              )}
              <span
                className={`material-symbols-outlined text-[22px] ${active ? "text-[#2563EB]" : "text-[#64748B]"}`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Officer Login Button */}
      <div className="mt-auto p-4 relative z-10">
        <Link
          href="/login"
          title={isCollapsed ? "Officer Login" : undefined}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-[#E2E8F0] text-[#1E293B] hover:bg-white hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150 ease-in-out font-sans text-[15px] font-semibold ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <span className="material-symbols-outlined text-[22px] text-[#2563EB]">verified_user</span>
          {!isCollapsed && (
            <>
              <span className="flex-1">Officer Login</span>
              <span className="material-symbols-outlined text-[18px] text-[#94A3B8]">chevron_right</span>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
