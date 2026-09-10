"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getReviewQueue } from "@/lib/api";

function getWaitTime(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 14) + 1; // 1 to 14 days
}

const getCategoryIcon = (cat: string) => {
  if (cat.includes("Irrigation") || cat.includes("Water") || cat.includes("Drainage")) return "water_drop";
  if (cat.includes("Road") || cat.includes("Bridge")) return "add_road";
  if (cat.includes("Sanitation") || cat.includes("Toilet")) return "health_and_safety";
  if (cat.includes("Light")) return "lightbulb";
  if (cat.includes("Community") || cat.includes("Building") || cat.includes("Hall") || cat.includes("Center")) return "groups";
  if (cat.includes("Solar") || cat.includes("Power")) return "solar_power";
  if (cat.includes("School") || cat.includes("Education") || cat.includes("Library")) return "school";
  if (cat.includes("Health") || cat.includes("Hospital")) return "local_hospital";
  return "business_center";
};

export default function ReviewQueuePage() {
  const [activeTab, setActiveTab] = useState<"available" | "claimed">("available");
  const [globalJurisdiction, setGlobalJurisdiction] = useState<string>("All States");
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState("Priority");
  const [sectorFilter, setSectorFilter] = useState("Sector");
  const [stateFilter, setStateFilter] = useState("State");
  const [districtFilter, setDistrictFilter] = useState("District");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Wait Time (High to Low)");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getReviewQueue()
      .then((data) => {
        // Hydrate data with derived wait time and priority based on wait time
        const hydrated = (data.projects || []).map((p: any) => {
          const waitTime = getWaitTime(p.work_id);
          let derivedPriority = "Low";
          if (waitTime > 7) derivedPriority = "High";
          else if (waitTime >= 3) derivedPriority = "Medium";
          
          return {
            ...p,
            waitTime,
            derivedPriority
          };
        });
        setReviewData(hydrated);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load review queue");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const globalStates = ["All States", ...Array.from(new Set(reviewData.map((r) => r.state)))].sort();

  // Filter and Sort Logic
  const filteredData = useMemo(() => {
    let result = reviewData.filter((row) => {
      // Global Jurisdiction
      if (globalJurisdiction !== "All States" && row.state !== globalJurisdiction) return false;
      
      // Tab filter
      if (activeTab === "available" && claimedIds.has(row.work_id)) return false;
      if (activeTab === "claimed" && !claimedIds.has(row.work_id)) return false;

      // Dropdown filters
      if (priorityFilter !== "Priority" && row.derivedPriority !== priorityFilter) return false;
      if (sectorFilter !== "Sector" && row.work_category !== sectorFilter) return false;
      if (stateFilter !== "State" && row.state !== stateFilter) return false;
      if (districtFilter !== "District" && row.district !== districtFilter) return false;

      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          row.work_id.toLowerCase().includes(q) ||
          row.work_category.toLowerCase().includes(q) ||
          row.state.toLowerCase().includes(q) ||
          row.district.toLowerCase().includes(q)
        );
      }

      return true;
    });

    // Sorting
    result = result.sort((a, b) => {
      if (sortBy === "Wait Time (High to Low)") return b.waitTime - a.waitTime;
      if (sortBy === "Wait Time (Low to High)") return a.waitTime - b.waitTime;
      return 0; // fallback
    });

    return result;
  }, [reviewData, globalJurisdiction, activeTab, claimedIds, priorityFilter, sectorFilter, stateFilter, districtFilter, searchQuery, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClaim = (id: string) => {
    setClaimedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleRelease = (id: string) => {
    setClaimedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // KPI calculations
  const totalProjects = reviewData.length;
  const highPriority = reviewData.filter(r => r.derivedPriority === "High").length;
  const mediumPriority = reviewData.filter(r => r.derivedPriority === "Medium").length;
  const lowPriority = reviewData.filter(r => r.derivedPriority === "Low").length;

  // Unique options for dropdowns
  const sectors = ["Sector", ...Array.from(new Set(reviewData.map(r => r.work_category)))].sort();
  const filterStates = ["State", ...Array.from(new Set(reviewData.map(r => r.state)))].sort();
  const filterDistricts = ["District", ...Array.from(new Set(reviewData.filter(r => stateFilter === "State" || r.state === stateFilter).map(r => r.district)))].sort();

  if (loading) return <div className="p-8 text-[#1E293B]">Loading review queue...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pb-12 font-sans bg-[#F8FAFC] min-h-screen -mt-6 pt-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-[32px] font-bold text-[#0F172A] leading-tight">Review Queue</h1>
          <p className="text-[#64748B] text-[14px]">Projects that have been flagged by the system and need your attention.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#64748B]">Jurisdiction:</span>
          <div className="relative">
            <select
              value={globalJurisdiction}
              onChange={(e) => setGlobalJurisdiction(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[14px] font-medium text-[#1E293B] shadow-sm outline-none cursor-pointer"
            >
              {globalStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px] pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-[#FEF2F2] rounded-full p-2.5 flex items-center justify-center border border-[#FECACA]">
            <span className="material-symbols-outlined text-[#DC2626] text-[24px]">warning</span>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#0F172A] leading-none mb-1">{totalProjects}</div>
            <div className="text-[14px] font-medium text-[#1E293B]">Projects to Review</div>
            <div className="text-[12px] text-[#64748B]">Require your attention</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-[#FFF7ED] rounded-full p-2.5 flex items-center justify-center border border-[#FFEDD5]">
            <span className="material-symbols-outlined text-[#EA580C] text-[24px]">schedule</span>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#0F172A] leading-none mb-1">{highPriority}</div>
            <div className="text-[14px] font-medium text-[#1E293B]">High Priority</div>
            <div className="text-[12px] text-[#64748B]">Wait time &gt; 7 days</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-[#FFF7ED] rounded-full p-2.5 flex items-center justify-center border border-[#FFEDD5]">
            <span className="material-symbols-outlined text-[#EA580C] text-[24px]">schedule</span>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#0F172A] leading-none mb-1">{mediumPriority}</div>
            <div className="text-[14px] font-medium text-[#1E293B]">Medium Priority</div>
            <div className="text-[12px] text-[#64748B]">Wait time 3-7 days</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-[#EFF6FF] rounded-full p-2.5 flex items-center justify-center border border-[#DBEAFE]">
            <span className="material-symbols-outlined text-[#2563EB] text-[24px]">schedule</span>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#0F172A] leading-none mb-1">{lowPriority}</div>
            <div className="text-[14px] font-medium text-[#1E293B]">Low Priority</div>
            <div className="text-[12px] text-[#64748B]">Recently flagged</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#E2E8F0] mb-6">
        <button
          onClick={() => { setActiveTab("available"); setCurrentPage(1); }}
          className={`pb-3 text-[15px] font-semibold transition-colors border-b-[3px] ${
            activeTab === "available"
              ? "text-[#2563EB] border-[#2563EB]"
              : "text-[#64748B] border-transparent hover:text-[#1E293B]"
          }`}
        >
          Available Pool
        </button>
        <button
          onClick={() => { setActiveTab("claimed"); setCurrentPage(1); }}
          className={`pb-3 text-[15px] font-semibold transition-colors border-b-[3px] ${
            activeTab === "claimed"
              ? "text-[#2563EB] border-[#2563EB]"
              : "text-[#64748B] border-transparent hover:text-[#1E293B]"
          }`}
        >
          My Assigned Reviews
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm flex flex-col">
        
        {/* Filters Row */}
        <div className="p-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Priority */}
            <div className="relative">
              <select value={priorityFilter} onChange={(e) => {setPriorityFilter(e.target.value); setCurrentPage(1);}} className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#1E293B] outline-none cursor-pointer">
                <option value="Priority">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px] pointer-events-none">expand_more</span>
            </div>

            {/* Sector */}
            <div className="relative">
              <select value={sectorFilter} onChange={(e) => {setSectorFilter(e.target.value); setCurrentPage(1);}} className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#1E293B] outline-none cursor-pointer max-w-[150px] truncate">
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px] pointer-events-none">expand_more</span>
            </div>

            {/* State */}
            <div className="relative">
              <select value={stateFilter} onChange={(e) => {setStateFilter(e.target.value); setDistrictFilter("District"); setCurrentPage(1);}} className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#1E293B] outline-none cursor-pointer max-w-[120px] truncate">
                {filterStates.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px] pointer-events-none">expand_more</span>
            </div>

            {/* District */}
            <div className="relative">
              <select value={districtFilter} onChange={(e) => {setDistrictFilter(e.target.value); setCurrentPage(1);}} className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#1E293B] outline-none cursor-pointer max-w-[120px] truncate">
                {filterDistricts.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px] pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative max-w-[300px] w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search in review queue..."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] py-1.5 pl-9 pr-3 text-[13px] font-medium text-[#1E293B] outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[13px] text-[#64748B]">Sort by</span>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white border border-[#E2E8F0] rounded-[8px] py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#1E293B] outline-none cursor-pointer">
                  <option value="Wait Time (High to Low)">Wait Time (High to Low)</option>
                  <option value="Wait Time (Low to High)">Wait Time (Low to High)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px] pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]" />
                </th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Priority</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Project</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">ID</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">State / District</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Sector</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Wait Time</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Active Signals</th>
                <th className="py-3 px-4 text-[12px] font-semibold text-[#64748B]">Action</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-[#64748B] text-[14px]">
                    No projects found matching the current filters.
                  </td>
                </tr>
              )}
              {paginatedData.map((row) => {
                let badgeColor = "bg-[#EFF6FF] text-[#2563EB]";
                if (row.derivedPriority === "High") badgeColor = "bg-[#FEF2F2] text-[#DC2626]";
                if (row.derivedPriority === "Medium") badgeColor = "bg-[#FFF7ED] text-[#EA580C]";
                
                const isWaitLong = row.waitTime > 7;

                return (
                  <tr key={row.work_id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]" />
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${badgeColor}`}>
                        {row.derivedPriority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[14px] font-medium text-[#1E293B]">
                      {row.work_category}
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/dashboard/project/${row.work_id}`} className="text-[14px] font-semibold text-[#2563EB] hover:underline">
                        {row.work_id}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-[14px] text-[#64748B]">
                      {row.district}, {row.state}
                    </td>
                    <td className="py-4 px-4 text-[14px] text-[#64748B] flex items-center gap-2 mt-0.5">
                      <span className="material-symbols-outlined text-[18px] text-[#94A3B8]">{getCategoryIcon(row.work_category)}</span>
                      {row.work_category}
                    </td>
                    <td className="py-4 px-4 text-[14px] font-medium">
                      <span className={isWaitLong ? "text-[#DC2626]" : "text-[#2563EB]"}>{row.waitTime} {row.waitTime === 1 ? 'day' : 'days'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#0F172A]">
                        <div className="w-2 h-2 rounded-full bg-[#EA580C]"></div>
                        {row.signals?.length || 0}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {activeTab === "available" ? (
                        <button
                          onClick={() => handleClaim(row.work_id)}
                          className="px-4 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[13px] font-semibold hover:bg-[#DBEAFE] transition-colors"
                        >
                          Claim Project
                        </button>
                      ) : (
                        <Link
                          href={`/dashboard/project/${row.work_id}`}
                          className="px-4 py-1.5 rounded-full bg-[#2563EB] text-white text-[13px] font-semibold hover:bg-[#1D4ED8] transition-colors inline-block"
                        >
                          Start Review
                        </Link>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="text-[#94A3B8] hover:text-[#1E293B] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="text-[13px] text-[#64748B]">
            Showing {(currentPage - 1) * itemsPerPage + (paginatedData.length > 0 ? 1 : 0)}–{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} projects
          </div>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1; // Simplistic pagination, typically you want smart ellipsis here
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] font-medium transition-colors ${
                    currentPage === pageNum
                      ? "bg-[#2563EB] text-white"
                      : "text-[#64748B] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && <span className="px-1 text-[#64748B]">...</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-8 flex items-center justify-center rounded-[6px] text-[13px] font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-[#2563EB] text-white"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                {totalPages}
              </button>
            )}
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
