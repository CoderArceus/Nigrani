"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/state-summary")
      .then(res => res.json())
      .then(data => setStatesList(data.states.map((s: any) => s.state).sort()))
      .catch(console.error);
      
    fetch("http://127.0.0.1:8000/dashboard/category-summary")
      .then(res => res.json())
      .then(data => setSectorsList(data.categories.map((c: any) => c.work_category).sort()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (activeState) {
      fetch(`http://127.0.0.1:8000/dashboard/district-summary?state=${encodeURIComponent(activeState)}`)
        .then(res => res.json())
        .then(data => setDistrictsList(data.districts.map((d: any) => d.district).sort()))
        .catch(console.error);
    } else {
      setDistrictsList([]);
    }
  }, [activeState]);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[800px]">
      {/* Unified Search & Filter Bar */}
      <div className="flex items-center w-full bg-primary/5 border border-primary/20 rounded-full h-12 transition-all focus-within:bg-surface-container-lowest focus-within:shadow-sm focus-within:border-primary/40 relative">
        
        {/* State Dropdown Segment */}
        <div className="relative h-full hidden sm:flex items-center justify-center px-4 border-r border-primary/20 shrink-0 hover:bg-primary/10 transition-colors rounded-l-full group">
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={activeState || ""}
            onChange={(e) => handleFilterChange("state", e.target.value)}
            title="Filter by State"
          >
            <option value="">All States</option>
            {statesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            className={`text-[13px] font-sans flex items-center gap-1 transition-colors ${
              activeState ? "text-primary font-medium" : "text-on-surface-variant group-hover:text-primary"
            }`}
          >
            <span className="max-w-[80px] truncate">{activeState || "State"}</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </span>
        </div>

        {/* District Dropdown Segment */}
        <div className="relative h-full hidden md:flex items-center justify-center px-4 border-r border-primary/20 shrink-0 hover:bg-primary/10 transition-colors group">
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={activeDistrict || ""}
            onChange={(e) => handleFilterChange("district", e.target.value)}
            title="Filter by District"
          >
            <option value="">All Districts</option>
            {districtsList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <span
            className={`text-[13px] font-sans flex items-center gap-1 transition-colors ${
              activeDistrict ? "text-primary font-medium" : "text-on-surface-variant group-hover:text-primary"
            }`}
          >
            <span className="max-w-[80px] truncate">{activeDistrict || "District"}</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </span>
        </div>

        {/* Sector Dropdown Segment */}
        <div className="relative h-full hidden lg:flex items-center justify-center px-4 border-r border-primary/20 shrink-0 hover:bg-primary/10 transition-colors group">
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={activeSector || ""}
            onChange={(e) => handleFilterChange("sector", e.target.value)}
            title="Filter by Sector"
          >
            <option value="">All Sectors</option>
            {sectorsList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            className={`text-[13px] font-sans flex items-center gap-1 transition-colors ${
              activeSector ? "text-primary font-medium" : "text-on-surface-variant group-hover:text-primary"
            }`}
          >
            <span className="max-w-[80px] truncate">{activeSector || "Sector"}</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </span>
        </div>

        {/* Status Dropdown Segment */}
        <div className="relative h-full hidden xl:flex items-center justify-center px-4 border-r border-primary/20 shrink-0 hover:bg-primary/10 transition-colors group">
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={activeStatus || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            title="Filter by Status"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            className={`text-[13px] font-sans flex items-center gap-1 transition-colors ${
              activeStatus ? "text-primary font-medium" : "text-on-surface-variant group-hover:text-primary"
            }`}
          >
            <span className="max-w-[70px] truncate">{activeStatus || "Status"}</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </span>
        </div>

        {/* Free-text Search Segment */}
        <div className="relative flex-1 h-full flex items-center min-w-[120px]">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-full bg-transparent border-none outline-none font-sans text-[13.6px] text-on-surface placeholder:text-outline/70 px-4"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Search Icon */}
        <div className="h-full flex items-center pr-5 pl-2 shrink-0 text-primary">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 px-2 mt-1">
          {activeState && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-primary text-on-primary rounded-full font-sans text-[11px] shadow-sm">
              <span>State: {activeState}</span>
              <button
                onClick={() => handleFilterChange("state", "")}
                className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                title="Remove Filter"
              >
                <span className="material-symbols-outlined text-[12px] leading-none block">close</span>
              </button>
            </div>
          )}
          {activeDistrict && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-primary text-on-primary rounded-full font-sans text-[11px] shadow-sm">
              <span>District: {activeDistrict}</span>
              <button
                onClick={() => handleFilterChange("district", "")}
                className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                title="Remove Filter"
              >
                <span className="material-symbols-outlined text-[12px] leading-none block">close</span>
              </button>
            </div>
          )}
          {activeSector && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-primary text-on-primary rounded-full font-sans text-[11px] shadow-sm">
              <span>Sector: {activeSector}</span>
              <button
                onClick={() => handleFilterChange("sector", "")}
                className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                title="Remove Filter"
              >
                <span className="material-symbols-outlined text-[12px] leading-none block">close</span>
              </button>
            </div>
          )}
          {activeStatus && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-primary text-on-primary rounded-full font-sans text-[11px] shadow-sm">
              <span>Status: {activeStatus}</span>
              <button
                onClick={() => handleFilterChange("status", "")}
                className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                title="Remove Filter"
              >
                <span className="material-symbols-outlined text-[12px] leading-none block">close</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
