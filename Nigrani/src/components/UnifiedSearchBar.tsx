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
  const [statesList, setStatesList] = useState<string[]>([]);
  const [sectorsList, setSectorsList] = useState<string[]>([]);
  const [districtsList, setDistrictsList] = useState<string[]>([]);

  // Update URL on search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Helper to handle chip selection
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // If state changes, clear district since it might not apply
    if (key === "state") {
      params.delete("district");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // Active filters
  const activeState = searchParams.get("state");
  const activeDistrict = searchParams.get("district");
  const activeSector = searchParams.get("sector");
  const activeStatus = searchParams.get("status");

  const hasActiveFilters = activeState || activeDistrict || activeSector || activeStatus;

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
  }, []);

  useEffect(() => {
    if (activeState) {
      fetchWithRetry(`${API_BASE_URL}/dashboard/district-summary?state=${encodeURIComponent(activeState)}`)
        .then(data => setDistrictsList(data.districts.map((d: any) => d.district).sort()))
        .catch(console.error);
    } else {
      setDistrictsList([]);
    }
  }, [activeState]);

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto scrollbar-hide pb-2 md:pb-0">
      {/* Search Bar Pill */}
      <div className="flex-1 min-w-[280px] flex items-center bg-white border border-[#E2E8F0] rounded-[12px] h-10 px-3 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shrink-0">
        <span className="material-symbols-outlined text-[18px] text-blue-600 mr-2 font-bold">search</span>
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none font-sans text-[13px] text-[#334155] placeholder:text-[#94A3B8] w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* State Pill */}
      <div className="relative h-10 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:bg-black/5 transition-colors shrink-0 group">
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
        <span className="text-[13px] font-sans flex items-center gap-1.5 text-[#475569] font-medium transition-colors">
          <span className="max-w-[80px] truncate">{activeState || "State"}</span>
          <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">expand_more</span>
        </span>
      </div>

      {/* District Pill */}
      <div className="relative h-10 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:bg-black/5 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeDistrict || ""}
          onChange={(e) => handleFilterChange("district", e.target.value)}
          title="Filter by District"
        >
          <option value="">All Districts</option>
          {districtsList.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <span className="text-[13px] font-sans flex items-center gap-1.5 text-[#475569] font-medium transition-colors">
          <span className="max-w-[80px] truncate">{activeDistrict || "District"}</span>
          <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">expand_more</span>
        </span>
      </div>

      {/* Sector Pill */}
      <div className="relative h-10 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:bg-black/5 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeSector || ""}
          onChange={(e) => handleFilterChange("sector", e.target.value)}
          title="Filter by Sector"
        >
          <option value="">All Sectors</option>
          {sectorsList.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="text-[13px] font-sans flex items-center gap-1.5 text-[#475569] font-medium transition-colors">
          <span className="max-w-[80px] truncate">{activeSector || "Sector"}</span>
          <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">expand_more</span>
        </span>
      </div>

      {/* Status Pill */}
      <div className="relative h-10 flex items-center px-4 bg-white border border-[#E2E8F0] rounded-[12px] shadow-sm hover:bg-black/5 transition-colors shrink-0 group">
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          value={activeStatus || ""}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          title="Filter by Status"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="text-[13px] font-sans flex items-center gap-1.5 text-[#475569] font-medium transition-colors">
          <span className="max-w-[80px] truncate">{activeStatus || "Status"}</span>
          <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">expand_more</span>
        </span>
      </div>
    </div>
  );
}
