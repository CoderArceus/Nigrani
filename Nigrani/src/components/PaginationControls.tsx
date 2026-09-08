"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const navigateToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = [];
  // simple logic to show up to 5 pages
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);
  
  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-full flex items-center justify-center text-outline bg-surface-container-lowest border border-outline-variant/50 shadow-sm hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => navigateToPage(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-[clamp(13.6px,1.1vw,16.8px)] font-medium shadow-sm transition-colors border ${
              page === currentPage
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest text-on-surface border-outline-variant/50 hover:bg-surface-container"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-full flex items-center justify-center text-outline bg-surface-container-lowest border border-outline-variant/50 shadow-sm hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
