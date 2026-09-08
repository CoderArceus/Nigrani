"use client";

import { useEffect, useState } from "react";

import { LargePageHeader, Badge } from "@/components/ui";

import { getProjects } from "@/lib/api";

export default function ProjectsDirectoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<any[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);

    getProjects(currentPage, itemsPerPage)
      .then((data) => {
        setProjects(data.projects);
        setTotalProjects(data.count);
        setTotalPages(data.total_pages);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load projects");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const getStatusVariant = (status: string) => {
    if (status === "Completed") return "positive";
    if (status === "In Progress") return "primary";
    if (status === "Sanctioned") return "accent";
    if (status === "Recommended") return "warning";
    return "default";
  };

  const formatCost = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <LargePageHeader
          title="Project Database"
          description="The complete catalog of all projects, filterable by district, sector, and status."
        />

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {["All Districts", "All Sectors", "All Stages"].map((label) => (
            <select
              key={label}
              className="bg-surface-container-low border-none rounded-full py-2 pl-4 pr-10 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary cursor-pointer appearance-none outline-none font-sans"
            >
              <option>{label}</option>
            </select>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading && (
        <div className="p-6 text-center text-on-surface-variant">
          Loading projects...
        </div>
      )}

      {error && (
        <div className="p-6 text-center text-red-600">
          {error}
        </div>
      )}
      <div className="bg-accent-subtle rounded-[14px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-translucent">
                {[
                  { label: "Project ID", align: "" },
                  { label: "Project Name", align: "" },
                  { label: "District", align: "" },
                  { label: "Sector", align: "" },
                  { label: "Approved Cost", align: "text-right" },
                  { label: "Stage", align: "text-center" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className={`py-4 px-6 font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-on-surface-variant whitespace-nowrap ${col.align}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-on-background divide-y divide-border-translucent/50">
              {projects.map((p) => (
                <tr
                  key={p.work_id}
                  className="hover:bg-surface-container-low/30 transition-colors"
                >
                  <td className="py-4 px-6 font-display text-[14px] font-bold text-primary">
                    {p.work_id}
                  </td>
                  <td className="py-4 px-6 font-medium">{p.work_category}</td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    {p.district}
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    {p.work_category}
                  </td>
                  <td className="py-4 px-6 text-right font-display text-[15px] font-bold text-primary">
                    {formatCost(p.sanctioned_amount)}
                  </td>
                  <td className="py-4 px-6 flex justify-center">
                    <Badge variant={getStatusVariant(p.status)} dot={true}>
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border-translucent flex items-center justify-between">
          <span className="font-sans text-sm text-on-surface-variant">
            Showing{" "}
            {totalProjects === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}{" "}
            to {Math.min(currentPage * itemsPerPage, totalProjects)} of{" "}
            {totalProjects} projects
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50 font-sans cursor-pointer"
            >
              Previous
            </button>
            <button className="w-8 h-8 rounded-full bg-accent-low text-primary font-medium flex items-center justify-center font-sans">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors font-sans cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
