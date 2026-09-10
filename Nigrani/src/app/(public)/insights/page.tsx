import { InsightsPageClient } from "@/components/InsightsPageClient";
import { ClientFilterBar } from "@/components/ClientFilterBar";
import { API_BASE_URL } from "@/lib/api";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function fetchData(endpoint: string, searchParams: any) {
  try {
    const url = new URL(`${API_BASE_URL}/dashboard/insights/${endpoint}`);
    if (searchParams.year) url.searchParams.append("year", searchParams.year);
    if (searchParams.state) url.searchParams.append("state", searchParams.state);
    if (searchParams.mp_name) url.searchParams.append("mp_name", searchParams.mp_name);
    if (searchParams.work_category) url.searchParams.append("work_category", searchParams.work_category);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return endpoint.includes("cross-tab") ? { by_category: [], by_state: [] } : [];
    return res.json();
  } catch {
    return endpoint.includes("cross-tab") ? { by_category: [], by_state: [] } : [];
  }
}

export default async function InsightsPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const [
    utilizationByMp,
    timeToRelease,
    bubbleData,
    sanctionedByState,
    scstComparison,
    categoryMix,
    mpLeaderboard,
    houseComparison,
    amountVsPhotos,
    repeatedDescriptions,
    projectPipeline,
    stalledProjects,
    flagReasons,
    flagRateCrossTab,
  ] = await Promise.all([
    fetchData("utilization-by-mp", params),
    fetchData("time-to-release", params),
    fetchData("sanction-completion-bubble", params),
    fetchData("sanctioned-by-state", params),
    fetchData("sc-st-comparison", params),
    fetchData("category-mix-by-state", params),
    fetchData("mp-leaderboard", params),
    fetchData("house-comparison", params),
    fetchData("amount-vs-photos", params),
    fetchData("repeated-descriptions", params),
    fetchData("project-pipeline", params),
    fetchData("stalled-projects", params),
    fetchData("flag-reasons", params),
    fetchData("flag-rate-cross-tab", params),
  ]);

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="w-fit">
          <h1 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em]">
            Nigrani
          </h1>
          <p className="font-sans text-[13px] text-on-surface-variant mt-1">
            MPLADS Project Insights
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3">
          <Suspense fallback={<div className="h-12 w-64 animate-pulse bg-gray-200 rounded-lg"></div>}>
            <ClientFilterBar />
          </Suspense>
        </div>
      </div>

      {/* All 6 Sections */}
      <InsightsPageClient
        utilizationByMp={utilizationByMp}
        timeToRelease={timeToRelease}
        bubbleData={bubbleData}
        sanctionedByState={sanctionedByState}
        scstComparison={scstComparison}
        categoryMix={categoryMix}
        mpLeaderboard={mpLeaderboard}
        houseComparison={houseComparison}
        amountVsPhotos={amountVsPhotos}
        repeatedDescriptions={repeatedDescriptions}
        projectPipeline={projectPipeline}
        stalledProjects={stalledProjects}
        flagReasons={flagReasons}
        flagRateCrossTab={flagRateCrossTab}
      />
    </div>
  );
}
