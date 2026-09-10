import Link from "next/link";
import { AccentRule, Card, LargePageHeader } from "@/components/ui";
import { SortControls } from "@/components/SortControls";
import { PaginationControls, GoToPage } from "@/components/PaginationControls";
import { UnifiedSearchBar } from "@/components/UnifiedSearchBar";
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
  if (searchParams.q) url.searchParams.append("q", searchParams.q);
  
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(url.toString(), { next: { revalidate: 300 } });
      if (res.ok) {
        return await res.json();
      }
      console.error(`API Error in fetchProjects: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`Fetch exception in fetchProjects:`, err);
    }
    retries--;
    if (retries > 0) {
      // wait 500ms before retrying
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  
  return { projects: [], count: 0, total_pages: 0, error: true };
}

async function fetchStats() {
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/overview`, { next: { revalidate: 300 } });
      if (res.ok) {
        return await res.json();
      }
      console.error(`API Error in fetchStats: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`Fetch exception in fetchStats:`, err);
    }
    retries--;
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  return null;
}

export default async function ProjectsDirectoryPage(props: {
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

  // Check if any filter is active
  const hasActiveFilters = 
    resolvedParams.state || 
    resolvedParams.district || 
    resolvedParams.sector || 
    resolvedParams.status || 
    resolvedParams.q;

  return (
    <div className="flex flex-col gap-4 w-full pb-6 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <LargePageHeader
        title="Project Database"
        description="The complete catalog of all projects, filterable by district, sector, and status."
      />

      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <Suspense fallback={<div className="w-[300px] h-10 bg-gray-100 rounded-[12px] animate-pulse" />}>
            <UnifiedSearchBar />
          </Suspense>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <SortControls />
        </div>
      </div>

      {/* Subheader: Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-end">
          <Link 
            href="/dashboard/projects"
            className="text-[14px] font-sans font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear filters
          </Link>
        </div>
      )}

      {/* Project Grid */}
      <div className="flex flex-col justify-start mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.error ? (
            <div className="col-span-full py-12 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-red-500 mb-4">error</span>
              <h3 className="font-display text-[20px] font-bold text-on-surface">API Connection Error</h3>
              <p className="font-sans text-[14px] text-on-surface-variant mt-2 max-w-md">
                The backend service is currently waking up or experiencing issues. Please wait a few seconds and try refreshing the page.
              </p>
            </div>
          ) : pagedProjects.length > 0 ? (
            pagedProjects.map((project: any) => (
              <ProjectCard key={project.work_id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
              <h3 className="font-display text-[20px] font-bold text-on-surface">No projects found</h3>
              <p className="font-sans text-[14px] text-on-surface-variant mt-2 max-w-md">
                We couldn't find any projects matching your current filters. Try removing some filters to broaden your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pagination Bar */}
      {data.count > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-4 pt-4 border-t border-[#E2E8F0]/50">
          <div className="w-full md:w-1/3 flex justify-start mb-4 md:mb-0">
            <span className="font-sans text-[14px] text-[#64748B] font-medium">
              Showing {startItem}–{endItem} of {data.count.toLocaleString()} projects
            </span>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center">
            <PaginationControls currentPage={safePage} totalPages={totalPages} />
          </div>
          
          <div className="w-full md:w-1/3 flex justify-end mt-4 md:mt-0">
            <div className="flex items-center gap-2 font-sans text-[14px] text-[#64748B] font-medium">
              Go to page
              <GoToPage totalPages={totalPages} currentPage={safePage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
