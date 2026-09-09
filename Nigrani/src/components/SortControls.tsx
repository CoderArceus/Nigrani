"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SortControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "date";
  const currentOrder = searchParams.get("order") || "desc";

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleOrder = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", currentOrder === "asc" ? "desc" : "asc");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative h-10 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:bg-black/5 transition-colors shrink-0 group">
      <select
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        value={`${currentSort}-${currentOrder}`}
        onChange={(e) => {
          const [sort, order] = e.target.value.split("-");
          const params = new URLSearchParams(searchParams.toString());
          params.set("sort", sort);
          params.set("order", order);
          params.set("page", "1");
          router.push(`${pathname}?${params.toString()}`);
        }}
        title="Sort By"
      >
        <option value="date-desc">Date (Latest)</option>
        <option value="date-asc">Date (Oldest)</option>
        <option value="cost-desc">Cost (Highest)</option>
        <option value="cost-asc">Cost (Lowest)</option>
        <option value="anomaly-desc">Anomaly (Highest)</option>
      </select>
      <span className="text-[13px] font-sans flex items-center gap-1.5 text-[#475569] font-medium transition-colors">
        <span className="material-symbols-outlined text-[16px] text-blue-600">sort</span>
        <span className="max-w-[100px] truncate">
          {currentSort === 'date' && currentOrder === 'desc' ? 'Date (Latest)' :
           currentSort === 'date' && currentOrder === 'asc' ? 'Date (Oldest)' :
           currentSort === 'cost' && currentOrder === 'desc' ? 'Cost (Highest)' :
           currentSort === 'cost' && currentOrder === 'asc' ? 'Cost (Lowest)' :
           currentSort === 'anomaly' ? 'Anomaly (Highest)' : 'Sort'}
        </span>
        <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">expand_more</span>
      </span>
    </div>
  );
}
