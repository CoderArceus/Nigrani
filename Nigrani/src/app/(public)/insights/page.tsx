import { InsightsPageClient } from "@/components/InsightsPageClient";
import { API_BASE_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/insights/${endpoint}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return endpoint.includes("cross-tab") ? { by_category: [], by_state: [] } : [];
    return res.json();
  } catch {
    return endpoint.includes("cross-tab") ? { by_category: [], by_state: [] } : [];
  }
}

export default async function InsightsPage() {
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
    fetchData("utilization-by-mp"),
    fetchData("time-to-release"),
    fetchData("sanction-completion-bubble"),
    fetchData("sanctioned-by-state"),
    fetchData("sc-st-comparison"),
    fetchData("category-mix-by-state"),
    fetchData("mp-leaderboard"),
    fetchData("house-comparison"),
    fetchData("amount-vs-photos"),
    fetchData("repeated-descriptions"),
    fetchData("project-pipeline"),
    fetchData("stalled-projects"),
    fetchData("flag-reasons"),
    fetchData("flag-rate-cross-tab"),
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
          <FilterPill icon="calendar_month" label="Time Period" value="All Years" />
          <FilterPill icon="location_on" label="State" value="All States" />
          <FilterPill icon="person" label="MP" value="All MPs" />
          <FilterPill icon="category" label="Work Category" value="All Categories" />
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

/* ═══════════════════════════════════════════════════════════════════
   Filter Pill — Compact filter chip for the top bar
   ═══════════════════════════════════════════════════════════════════ */
function FilterPill({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low cursor-pointer transition-colors">
      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-medium leading-none">
          {label}
        </span>
        <span className="text-[12px] font-semibold text-on-surface leading-tight">
          {value}
        </span>
      </div>
      <span className="material-symbols-outlined text-[14px] text-on-surface-variant ml-1">
        expand_more
      </span>
    </div>
  );
}
