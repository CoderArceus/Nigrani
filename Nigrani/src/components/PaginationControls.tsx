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

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-8 mb-4">
      <div className="bg-white rounded-[16px] shadow-sm border border-outline-variant/30 p-2.5 flex items-center gap-2 w-fit">
        {/* Previous Button */}
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors ${
            currentPage === 1 
              ? "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed" 
              : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        
        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <div key={`ellipsis-${index}`} className="w-6 md:w-8 h-9 md:h-10 flex items-center justify-center text-[#64748B] font-medium tracking-[0.2em]">
                ...
              </div>
            );
          }
          
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => navigateToPage(page as number)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-sans text-[14px] md:text-[15px] font-semibold transition-colors ${
                isCurrent
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-white border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors ${
            currentPage === totalPages 
              ? "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed" 
              : "bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
