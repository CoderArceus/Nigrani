"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard/queue", label: "Review Queue", icon: "checklist" },
  { href: "/dashboard/projects", label: "Projects", icon: "account_tree" },
  { href: "/dashboard/map", label: "Map", icon: "map" },
  { href: "/dashboard/insights", label: "Insights", icon: "analytics" },
];

const bottomNavItems = [
  { href: "/dashboard/admin", label: "Administration", icon: "admin_panel_settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`hidden md:flex flex-col h-full border-r border-outline-variant bg-surface-container-lowest flex-shrink-0 z-40 transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      {/* Brand */}
      <div className="p-6 pb-8 border-b border-outline-variant relative flex flex-col">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute ${
            isCollapsed ? "left-1/2 -translate-x-1/2" : "right-4"
          } top-6 text-secondary hover:text-primary transition-colors`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isCollapsed ? "menu_open" : "menu_open"}
          </span>
        </button>

        {!isCollapsed && (
          <div className="mt-2">
            <div className="font-display text-[24px] font-bold text-primary mb-1 tracking-tight leading-tight">
              Nigrani
            </div>
            <div className="font-sans text-[12px] text-secondary uppercase tracking-wider font-semibold">
              Monitoring Platform
            </div>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <div className="flex-1 py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ease-in-out font-sans text-[15.2px] font-semibold ${
                active
                  ? "bg-secondary-container text-on-secondary-container border-l-4 border-primary"
                  : "text-secondary hover:bg-surface-container-low"
              } ${isCollapsed ? "justify-center border-l-0 px-0" : ""}`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                data-weight={active ? "fill" : undefined}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Bottom-pinned admin link */}
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ease-in-out font-sans text-[15.2px] font-semibold mt-auto ${
                active
                  ? "bg-secondary-container text-on-secondary-container border-l-4 border-primary"
                  : "text-secondary hover:bg-surface-container-low"
              } ${isCollapsed ? "justify-center border-l-0 px-0" : ""}`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                data-weight={active ? "fill" : undefined}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
