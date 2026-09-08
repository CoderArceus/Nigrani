"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Explore Projects", icon: "travel_explore" },
  { href: "/map", label: "Map", icon: "map" },
  { href: "/insights", label: "Insights", icon: "analytics" },
  { href: "#", label: "About Nigrani", icon: "info" },
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
      className={`bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      <div className="px-6 py-6 border-b border-outline-variant/30 flex flex-col gap-1 items-center md:items-start relative">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute ${
            isCollapsed ? "left-1/2 -translate-x-1/2" : "right-4"
          } top-6 text-on-surface-variant hover:text-primary transition-colors`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isCollapsed ? "menu_open" : "menu_open"}
          </span>
        </button>

        {!isCollapsed && (
          <div className="mt-2">
            <span className="font-display text-[20px] font-bold text-primary tracking-tight block">
              Nigrani
            </span>
            <span className="font-sans text-[12px] font-semibold tracking-[0.05em] text-outline uppercase block mt-1">
              Public Portal
            </span>
          </div>
        )}
      </div>

      <nav className="flex-grow py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ease-in-out font-sans text-[15.2px] font-semibold ${
                active
                  ? "bg-accent-subtle text-primary border-l-4 border-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
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
      </nav>
    </aside>
  );
}
