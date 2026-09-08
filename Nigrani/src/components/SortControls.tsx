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
    <div className="flex items-center gap-2">
      <div className="relative group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          title="Sort By"
        >
          <option value="date">Date Added</option>
          <option value="cost">Estimated Cost</option>
          <option value="anomaly">Anomaly Score</option>
          <option value="delay">Delay Signals</option>
        </select>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full text-[13.6px] font-sans font-medium text-on-surface hover:bg-primary/5 hover:border-primary/30 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-primary">sort</span>
          Sort by: {currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </div>
      </div>

      <button
        onClick={toggleOrder}
        className="w-9 h-9 flex items-center justify-center bg-surface-container-lowest border border-outline-variant/30 rounded-full hover:bg-primary/5 hover:border-primary/30 transition-all shadow-sm"
        title={currentOrder === "asc" ? "Ascending" : "Descending"}
      >
        <span className="material-symbols-outlined text-[18px] text-primary">
          {currentOrder === "asc" ? "arrow_upward" : "arrow_downward"}
        </span>
      </button>
    </div>
  );
}
