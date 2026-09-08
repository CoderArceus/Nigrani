import { KPITile, Card } from "@/components/ui";
import { InsightsCharts } from "@/components/InsightsCharts";
import { ProjectsAttention } from "@/components/ProjectsAttention";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function fetchData(endpoint: string) {
  const res = await fetch(`http://127.0.0.1:8000/dashboard/insights/${endpoint}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function InsightsPage() {
  const [
    nationalTrend, 
    projectsAttention, 
    workCategories, 
    demographics,
    mpPortfolios
  ] = await Promise.all([
    fetchData("national-trend"),
    fetchData("projects-requiring-attention"),
    fetchData("work-categories"),
    fetchData("demographics"),
    fetchData("mp-portfolios")
  ]);

  if (!nationalTrend || !workCategories) {
    return <div className="p-10 text-error">Failed to load descriptive statistics from the server.</div>;
  }

  // Calculate National KPIs
  const totalProjects = workCategories.reduce((sum: number, c: any) => sum + c.count, 0);
  const totalSanctioned = nationalTrend.reduce((sum: number, t: any) => sum + t.total_sanctioned, 0);
  const totalReleased = nationalTrend.reduce((sum: number, t: any) => sum + t.total_released, 0);
  const avgUtilization = totalSanctioned > 0 ? ((totalReleased / totalSanctioned) * 100).toFixed(1) : "0.0";
  const criticalCount = projectsAttention.filter((p: any) => p.health_score === "Critical Review").length;

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto">
      
      {/* 1. National Snapshot */}
      <div className="w-fit">
        <h1 className="font-display text-[clamp(36px,4vw,56px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em]">
          Insights & Analytics
        </h1>
        <div className="h-[4px] bg-primary rounded-full w-[80%] mt-3 mb-2" />
        <p className="font-sans text-[15.2px] text-on-surface-variant max-w-3xl leading-relaxed mt-2">
          Peer-adjusted descriptive statistics, fund utilization trends, and project monitoring intelligence.
        </p>
      </div>
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPITile
          label="Total Projects"
          value={totalProjects}
          description="Actively monitored across all districts"
          className="border-outline-variant/30 shadow-sm"
        />
        <KPITile
          label="Total Sanctioned"
          value={`₹ ${(totalSanctioned / 10000000).toFixed(2)} Cr`}
          description="Estimated cost of monitored portfolio"
          className="border-outline-variant/30 shadow-sm"
        />
        <KPITile
          label="National Utilization"
          value={`${avgUtilization}%`}
          description="Average fund release percentage"
          className="border-outline-variant/30 shadow-sm"
        />
        <KPITile
          label="Critical Reviews"
          value={criticalCount}
          description="Projects requiring immediate intervention"
          className="border-outline-variant/30 shadow-sm"
        />
      </div>

      {/* 1b. National Trend View & Charts */}
      <InsightsCharts 
        nationalTrend={nationalTrend} 
        categories={workCategories} 
        demographics={demographics} 
      />

      {/* 2. Projects Requiring Attention */}
      <div className="flex w-full mt-4">
        <ProjectsAttention projects={projectsAttention} />
      </div>

      {/* 3. MP Portfolios Snapshot (Neutral Stats) */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="flex-1 border-outline-variant/30 shadow-sm p-8 bg-surface-container-lowest">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-[20px] font-bold text-on-surface leading-tight">
                MP Portfolio Statistics
              </h3>
              <p className="font-sans text-[13px] text-on-surface-variant mt-1">
                Neutral, descriptive execution metrics for the top 10 most active MPs. 
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant">
              <thead className="text-xs text-on-surface uppercase bg-surface-container-low border-b border-outline-variant/30">
                <tr>
                  <th className="px-4 py-3">MP Name</th>
                  <th className="px-4 py-3 text-right">Projects</th>
                  <th className="px-4 py-3 text-right">Completion Rate</th>
                  <th className="px-4 py-3 text-right">Median Approval Delay</th>
                  <th className="px-4 py-3 text-right">Median Execution Duration</th>
                  <th className="px-4 py-3 text-right">Zero-Photo %</th>
                </tr>
              </thead>
              <tbody>
                {mpPortfolios.slice(0, 10).map((mp: any) => (
                  <tr key={mp.mp_name} className="border-b border-outline-variant/10 hover:bg-surface-container/50">
                    <td className="px-4 py-3 font-medium text-on-surface">{mp.mp_name}</td>
                    <td className="px-4 py-3 text-right">{mp.project_count}</td>
                    <td className="px-4 py-3 text-right">{mp.completion_rate.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right">{mp.median_approval_delay} days</td>
                    <td className="px-4 py-3 text-right">{mp.median_duration} days</td>
                    <td className="px-4 py-3 text-right">{mp.zero_photo_pct.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
