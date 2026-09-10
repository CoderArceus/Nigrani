"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

const STATUSES = ["In Progress", "Completed", "Sanctioned"];

export function UnifiedSearchBar({ placeholder = "Search by ID, name, or location..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for search to avoid lag while typing
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // API driven lists
  // API driven lists
  const [statesList, setStatesList] = useState<string[]>([]);
  const [sectorsList, setSectorsList] = useState<string[]>([]);
  const [mpsList, setMpsList] = useState<string[]>([]);
  const [yearsList, setYearsList] = useState<string[]>([]);

  // Helper to handle chip selection
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Active filters
  const activeYear = searchParams.get("year");
  const activeState = searchParams.get("state");
  const activeMp = searchParams.get("mp");
  const activeSector = searchParams.get("sector");

  const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn(`Attempt ${i + 1} failed for ${url}`);
      }
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
  };

  useEffect(() => {
    fetchWithRetry(`${API_BASE_URL}/dashboard/state-summary`)
      .then(data => setStatesList(data.states.map((s: any) => s.state).sort()))
      .catch(console.error);
      
    fetchWithRetry(`${API_BASE_URL}/dashboard/category-summary`)
      .then(data => setSectorsList(data.categories.map((c: any) => c.work_category).sort()))
      .catch(console.error);

    fetchWithRetry(`${API_BASE_URL}/dashboard/mp-summary`)
      .then(data => setMpsList(data.mps))
      .catch(console.error);

    fetchWithRetry(`${API_BASE_URL}/dashboard/year-summary`)
      .then(data => setYearsList(data.years.map(String)))
      .catch(console.error);
  }, []);

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide pb-2 md:pb-0">
      
      {/* Time Period Pill */}
      <div className="relative h-12 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm hover:bg-gray-50 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeYear || ""}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          title="Filter by Year"
        >
          <option value="">All Years</option>
          {yearsList.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#475569]">calendar_today</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase leading-none mb-1">Time Period</span>
            <span className="text-[14px] font-bold text-[#1E293B] leading-none truncate max-w-[120px]">{activeYear || "All Years"}</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#64748B] ml-2">expand_more</span>
        </div>
      </div>

      {/* State Pill */}
      <div className="relative h-12 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm hover:bg-gray-50 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeState || ""}
          onChange={(e) => handleFilterChange("state", e.target.value)}
          title="Filter by State"
        >
          <option value="">All States</option>
          {statesList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#475569]">location_on</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase leading-none mb-1">State</span>
            <span className="text-[14px] font-bold text-[#1E293B] leading-none truncate max-w-[120px]">{activeState || "All States"}</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#64748B] ml-2">expand_more</span>
        </div>
      </div>

      {/* MP Pill */}
      <div className="relative h-12 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm hover:bg-gray-50 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeMp || ""}
          onChange={(e) => handleFilterChange("mp", e.target.value)}
          title="Filter by MP"
        >
          <option value="">All MPs</option>
          {mpsList.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#475569]">person</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase leading-none mb-1">MP</span>
            <span className="text-[14px] font-bold text-[#1E293B] leading-none truncate max-w-[120px]">{activeMp || "All MPs"}</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#64748B] ml-2">expand_more</span>
        </div>
      </div>

      {/* Work Category Pill */}
      <div className="relative h-12 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[8px] shadow-sm hover:bg-gray-50 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeSector || ""}
          onChange={(e) => handleFilterChange("sector", e.target.value)}
          title="Filter by Work Category"
        >
          <option value="">All Categories</option>
          {sectorsList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-[#475569]">category</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase leading-none mb-1">Work Category</span>
            <span className="text-[14px] font-bold text-[#1E293B] leading-none truncate max-w-[120px]">{activeSector || "All Categories"}</span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#64748B] ml-2">expand_more</span>
        </div>
      </div>

    </div>
  );
}
