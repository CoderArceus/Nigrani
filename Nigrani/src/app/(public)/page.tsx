import Link from "next/link";
import { AccentRule, Card } from "@/components/ui";
import { SortControls } from "@/components/SortControls";
import { PaginationControls } from "@/components/PaginationControls";
import { ProjectCard } from "@/components/ProjectCard";
import { Suspense } from "react";
import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

async function fetchProjects(searchParams: any, page: number, limit: number) {
  const url = new URL(`${API_BASE_URL}/projects/search`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  
  if (searchParams.state) url.searchParams.append("state", searchParams.state);
  if (searchParams.district) url.searchParams.append("district", searchParams.district);
  if (searchParams.sector) url.searchParams.append("work_category", searchParams.sector);
  if (searchParams.status) url.searchParams.append("status", searchParams.status);
  if (searchParams.sort) url.searchParams.append("sort", searchParams.sort);
  if (searchParams.order) url.searchParams.append("order", searchParams.order);
  
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return { projects: [], count: 0, total_pages: 0 };
  return res.json();
}

async function fetchStats() {
  const res = await fetch(`${API_BASE_URL}/dashboard/overview`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function PublicTransparencyPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await props.searchParams;
  
  const page = parseInt(typeof resolvedParams.page === "string" ? resolvedParams.page : "1", 10) || 1;
  const itemsPerPage = 6;
  
  const [data, statsData] = await Promise.all([
    fetchProjects(resolvedParams, page, itemsPerPage),
    fetchStats()
  ]);
  
  const pagedProjects = data.projects || [];
  const totalPages = data.total_pages || Math.max(1, Math.ceil((data.count || 0) / itemsPerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  // Global Stats
  const totalGlobal = statsData?.total_projects || 0;
  const completed = statsData?.completed || 0;
  const inProgress = statsData?.in_progress || 0;
  const notStarted = Math.max(0, totalGlobal - completed - inProgress);

  const completedPct = totalGlobal ? Math.round((completed / totalGlobal) * 100) : 0;
  const inProgressPct = totalGlobal ? Math.round((inProgress / totalGlobal) * 100) : 0;
  const notStartedPct = totalGlobal ? Math.round((notStarted / totalGlobal) * 100) : 0;
  
  // Current Pagination State
  const startItem = data.count === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(safePage * itemsPerPage, data.count || 0);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-2">
        {/* Total Projects */}
        <div className="bg-[#F8FAFC] rounded-[16px] md:rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px]">database</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[13.5px] text-[#64748B] font-medium">Total Projects</span>
            <span className="font-display text-[26px] font-bold text-[#0F172A] leading-none mt-1">{totalGlobal.toLocaleString()}</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-[#F0FDF4] rounded-[16px] md:rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[13.5px] text-[#64748B] font-medium">Completed</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-display text-[26px] font-bold text-[#0F172A] leading-none">{completed.toLocaleString()}</span>
              <span className="font-sans text-[13px] text-[#64748B] font-medium">({completedPct}%)</span>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-[#FFFBEB] rounded-[16px] md:rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px]">schedule</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[13.5px] text-[#64748B] font-medium">In Progress</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-display text-[26px] font-bold text-[#0F172A] leading-none">{inProgress.toLocaleString()}</span>
              <span className="font-sans text-[13px] text-[#64748B] font-medium">({inProgressPct}%)</span>
            </div>
          </div>
        </div>

        {/* Not Started */}
        <div className="bg-[#FAF5FF] rounded-[16px] md:rounded-[20px] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px]">pause_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[13.5px] text-[#64748B] font-medium">Not Started</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-display text-[26px] font-bold text-[#0F172A] leading-none">{notStarted.toLocaleString()}</span>
              <span className="font-sans text-[13px] text-[#64748B] font-medium">({notStartedPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar (Sort + Pagination) */}
      <div className="bg-white rounded-[16px] shadow-sm border border-outline-variant/30 p-3 md:p-2.5 flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-2 w-full">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[14px] text-[#64748B] font-medium hidden sm:inline-block pl-2">Sort by</span>
            <SortControls />
          </div>
          
          <div className="flex bg-[#F1F5F9] rounded-[10px] p-1 border border-[#E2E8F0]">
            <button className="w-8 h-8 rounded-[8px] bg-blue-600 text-white shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button className="w-8 h-8 rounded-[8px] text-[#64748B] hover:text-[#334155] hover:bg-[#E2E8F0]/50 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto md:justify-end">
          <span className="font-sans text-[14px] text-[#64748B] font-medium md:mr-2">
            Showing {startItem}–{endItem} of {data.count.toLocaleString()} projects
          </span>
          <PaginationControls currentPage={safePage} totalPages={totalPages} />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8">
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedProjects.length > 0 ? (
            pagedProjects.map((project: any) => (
              <ProjectCard key={project.work_id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
              <h3 className="font-display text-[20px] font-bold text-on-surface">No projects found</h3>
              <p className="font-sans text-[14px] text-on-surface-variant mt-2 max-w-md">
                We couldn't find any projects matching your current filters. Try removing some filters to broaden your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
