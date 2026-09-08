import Link from "next/link";
import { AccentRule, Card } from "@/components/ui";
import { SortControls } from "@/components/SortControls";
import { PaginationControls } from "@/components/PaginationControls";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function fetchProjects(searchParams: any, page: number, limit: number) {
  const url = new URL("http://127.0.0.1:8000/projects/search");
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

function ProjectCard({ project }: { project: any }) {
  // Map API fields to UI fields
  const id = project.work_id;
  const currentStatus = project.status;
  const name = `${project.work_category} in ${project.district}`;
  const district = project.district;
  const state = project.state;
  const cost = project.sanctioned_amount || 0;
  const mlAnomalyScore = project.ensemble_score;

  return (
    <Link href={`/project/${id}`} className="block">
      <Card className="h-full min-h-[210px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group border-outline-variant/30 p-6 bg-accent-subtle">

        {/* TOP: Pinned Metadata Row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-sans text-[12px] font-medium text-secondary">
            {id}
          </span>
          <span className="text-secondary text-[12px]">&bull;</span>
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${
              currentStatus === "Completed" ? "bg-[#188038]" : // Green
              currentStatus === "In Progress" ? "bg-[#1967d2]" : // Blue
              currentStatus === "Sanctioned" ? "bg-[#9333ea]" : // Purple
              "bg-[#f59e0b]" // Amber for Recommended
            }`} />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.05em] text-on-surface-variant">
              {currentStatus}
            </span>
          </div>
        </div>

        {/* TOP CONTENT — grows to fill available space */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="font-display text-[22px] md:text-[24px] font-bold text-on-surface leading-[1.25] mb-2 truncate group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Location */}
          <div className="font-sans text-[14px] text-secondary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#6b6b6b]">location_on</span>
            {district}, {state}
          </div>
        </div>

        {/* BOTTOM-ANCHORED CONTENT (always at bottom via mt-auto) */}
        <div className="pt-4 mt-auto">
          <div className="w-full h-[1px] bg-[rgba(30,43,250,0.15)] mb-4" />

          <div className="flex flex-row items-end justify-between">
            {/* Cost */}
            <div>
              <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                Approved Cost
              </div>
              <div className="flex items-center font-display font-bold">
                <span className="text-[26px] tracking-tight leading-none text-primary">
                  ₹ {cost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Footer: Anomaly Info */}
            {mlAnomalyScore !== undefined && mlAnomalyScore !== null && (
              <div className="font-sans text-[10px] text-outline pb-1.5 border-none outline-none ring-0 shadow-none relative after:hidden before:hidden">
                Anomaly: {mlAnomalyScore.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
