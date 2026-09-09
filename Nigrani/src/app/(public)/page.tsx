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

export default async function PublicTransparencyPage(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await props.searchParams;
  
  // Note: Local sort is disabled since backend handles pagination and we don't have sort API endpoints yet.
  const page = parseInt(typeof resolvedParams.page === "string" ? resolvedParams.page : "1", 10) || 1;
  const itemsPerPage = 6;
  
  const data = await fetchProjects(resolvedParams, page, itemsPerPage);
  const pagedProjects = data.projects || [];
  const totalPages = data.total_pages || Math.max(1, Math.ceil((data.count || 0) / itemsPerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  return (
    <>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full">
        <div className="w-fit">
          <h1 className="font-display text-[clamp(36px,4vw,56px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em]">
            Explore Projects
          </h1>
          <div className="h-[4px] bg-primary rounded-full w-[80%] mt-3 mb-2" />
        </div>
        
        {/* Sort Controls (Right side of title) */}
        <div className="mb-2">
          <SortControls />
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center pb-8 gap-8">
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Pagination */}
        <PaginationControls currentPage={safePage} totalPages={totalPages} />
      </div>
    </>
  );
}
