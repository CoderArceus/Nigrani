"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LargePageHeader } from "@/components/ui";
import { getReviewQueue } from "@/lib/api";

export default function ReviewQueuePage() {
  const [activeTab, setActiveTab] =
    useState<"available" | "claimed">("available");

  const [jurisdiction, setJurisdiction] =
   useState<string>("All States");

  const [claimedIds, setClaimedIds] =
    useState<Set<string>>(new Set());

  const [reviewData, setReviewData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    getReviewQueue()
      .then((data) => {
        setReviewData(data.projects);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load review queue");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const states = [
    "All States",
    ...Array.from(
      new Set(reviewData.map((r) => r.state))
    ),
  ];

  const displayData = reviewData.filter((row) => {

    if (
      jurisdiction !== "All States" &&
      row.state !== jurisdiction
    ) {
      return false;
    }

    if (activeTab === "available") {
      return !claimedIds.has(row.work_id);
    }

    return claimedIds.has(row.work_id);
  });

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

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-80px)]">
      {/* Header Row */}
      <div className="mb-6 flex justify-between items-end pb-2">
        <LargePageHeader
          title="Review Queue"
          description="Projects that have been flagged by the system and need your attention."
        />
        <div className="flex space-x-3 flex-shrink-0 items-center">
          <span className="font-sans text-sm text-on-surface-variant font-medium">
            Jurisdiction:
          </span>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-full py-2 pl-4 pr-10 text-sm font-medium text-on-surface focus:ring-1 focus:ring-primary cursor-pointer appearance-none outline-none font-sans shadow-sm"
          >
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border-translucent mb-6 px-4">
        <button
          onClick={() => setActiveTab("available")}
          className={`pb-3 font-sans text-[15px] font-medium transition-colors border-b-2 ${
            activeTab === "available"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-on-surface"
          }`}
        >
          Available Pool
        </button>
        <button
          onClick={() => setActiveTab("claimed")}
          className={`pb-3 font-sans text-[15px] font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "claimed"
              ? "text-primary border-primary"
              : "text-on-surface-variant border-transparent hover:text-on-surface"
          }`}
        >
          My Assigned Reviews
          {claimedIds.size > 0 && (
            <span className="bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none flex items-center justify-center">
              {claimedIds.size}
            </span>
          )}
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-accent-subtle rounded-[14px] flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 p-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-transparent sticky top-0 z-10 border-b border-border-translucent">
              <tr>
                {[
                  "Priority",
                  "Project",
                  "ID",
                  "District/Sector",
                  "Wait Time",
                  "Active Signals",
                ].map((header) => (
                  <th
                    key={header}
                    className={`py-4 px-4 font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-text-muted ${
                      header === "Active Signals" ? "w-64" : ""
                    }`}
                  >
                    {header}
                  </th>
                ))}
                <th className="py-4 px-4 font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-text-muted text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-translucent">
              {displayData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 font-sans text-on-surface-variant">
                    {activeTab === "available" 
                      ? `No unassigned projects flagged in ${jurisdiction}.`
                      : "You have not claimed any projects yet."}
                  </td>
                </tr>
              )}
              {displayData.map((row) => (
                <tr
                  key={row.work_id}
                  className="relative hover:bg-surface-container-low transition-colors group"
                >
                  {/* Priority */}
                  <td className="py-4 px-4 relative">
                    {row.priority === "High" && (
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded-r" />
                    )}
                    <span className="font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-text-muted">
                      {row.priority}
                    </span>
                  </td>

                  {/* Project Name */}
                  <td className="py-4 px-4 font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-on-surface">
                    {row.work_category}
                  </td>

                  {/* ID */}
                  <td className="py-4 px-4 font-display text-primary font-semibold">
                    {row.work_id}
                  </td>

                  {/* District/Sector */}
                  <td className="py-4 px-4 font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-text-muted">
                    {row.district}, {row.work_category}
                  </td>

                  {/* Risk Score */}
                  <td className="py-4 px-4 font-display text-primary font-semibold">
                    {(row.ensemble_score * 100).toFixed(1)}%
                  </td>

                  {/* Signals */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col space-y-1">
                      {row.signals.map((signal: { text: string; critical: boolean }, i: number) => (
                        <span
                          key={i}
                          className={`font-sans text-[clamp(13.6px,1.1vw,16.8px)] flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:mr-2 ${
                            signal.critical
                              ? "text-negative before:bg-negative"
                              : "text-text-muted before:bg-text-light"
                          }`}
                        >
                          {signal.text}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {activeTab === "available" ? (
                        <button
                          onClick={() => handleClaim(row.work_id)}
                          className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-sans text-[13px] font-medium hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                        >
                          Claim Project
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleRelease(row.work_id)}
                            className="px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant font-sans text-[12px] font-medium hover:bg-surface-container-high transition-colors cursor-pointer"
                          >
                            Release
                          </button>
                          <Link
                            href={`/dashboard/project/${row.work_id}`}
                            className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-sans text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Start Review
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
