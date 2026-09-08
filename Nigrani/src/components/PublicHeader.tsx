"use client";

import { Suspense } from "react";
import Link from "next/link";
import { UnifiedSearchBar } from "@/components/UnifiedSearchBar";

export function PublicHeader() {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant/30 py-4 min-h-[72px] flex flex-col md:flex-row items-start md:items-center justify-between px-8 shrink-0 sticky top-0 z-40 gap-4">
      <Suspense fallback={<div className="h-10 w-full md:w-96" />}>
        <UnifiedSearchBar />
      </Suspense>
      
      {/* Officer Login Entry Point */}
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary transition-colors font-sans text-[13.6px] font-semibold shrink-0"
      >
        <span className="material-symbols-outlined text-[18px]">lock</span>
        Officer Login
      </Link>
    </header>
  );
}
