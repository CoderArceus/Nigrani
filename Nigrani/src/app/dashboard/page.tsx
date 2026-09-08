"use client";

import { useEffect, useState } from "react";

import {
  KPITile,
  StatCard,
  MetricChange,
  ProgressBar,
  LargePageHeader,
} from "@/components/ui";

import { getDashboardOverview } from "@/lib/api";

export default function OverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardOverview()
      .then((result) => {
        setData(result);
    })
    .catch((err) => {
      console.error(err);
      setError("Unable to load dashboard data");
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  const totalProjects = data.total_projects;
  const requiringReview = data.flagged_projects;

  const mlAnomalies =
    data.risk_distribution.critical +
    data.risk_distribution.high_risk +
    data.risk_distribution.medium_risk;

  const highPriority =
    data.risk_distribution.critical +
    data.risk_distribution.high_risk;
  const inProgress = data.in_progress;
  const completed = data.completed;
  const sanctionDelays = data.sanction_delays;

  const totalCostLakhs =
    data.total_sanctioned_amount / 100000;

  const totalReleasedLakhs =
    data.total_released_amount / 100000;
  
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
      {/* Section Header */}
      <LargePageHeader
        title="Overview"
        description="A high-level look at your active MPLADS projects and their current health."
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2rem]">
        <KPITile
          value={totalProjects}
          label="Projects Analyzed"
          description="Total active projects currently monitored by the Nigrani intelligence layer."
        />
        <KPITile
          value={requiringReview}
          label="Require Attention"
          description="Projects flagged for administrative review due to execution stalls, delays, or cost anomalies."
        >
          <MetricChange
            value={`${highPriority} High Priority`}
            type="negative"
          />
        </KPITile>
        <KPITile
          value={mlAnomalies}
          label="ML Anomalies Detected"
          description="Multi-feature unusual patterns identified by Isolation Forest unsupervised learning."
        />
      </div>

      {/* Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2rem]">
        <StatCard>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-[clamp(25.6px,2.4vw,33.6px)] text-primary leading-none">
              {inProgress}
            </span>
            <span className="text-[12.8px] text-text-light font-medium font-sans">
              projects
            </span>
          </div>
          <div className="text-[clamp(13.6px,1vw,15.2px)] font-medium text-on-surface mt-2 font-sans">
            Currently In Progress
          </div>
          <div className="text-[12px] text-text-light mt-2 pt-2 border-t border-border-translucent font-sans">
            Across all sectors and states.
          </div>
        </StatCard>

        <StatCard>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-[clamp(25.6px,2.4vw,33.6px)] text-primary leading-none">
              {sanctionDelays}
            </span>
            <span className="text-[12.8px] text-text-light font-medium font-sans">
              projects
            </span>
          </div>
          <div className="text-[clamp(13.6px,1vw,15.2px)] font-medium text-on-surface mt-2 font-sans">
            Active Sanction Delays
          </div>
          <div className="text-[12px] text-text-light mt-2 pt-2 border-t border-border-translucent font-sans">
            Recommendation age {"> "}75 days.
          </div>
        </StatCard>

        <StatCard>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-[clamp(25.6px,2.4vw,33.6px)] text-primary leading-none">
              ₹{totalCostLakhs.toFixed(1)}L
            </span>
            <span className="text-[12.8px] text-text-light font-medium font-sans">
              total
            </span>
          </div>
          <div className="text-[clamp(13.6px,1vw,15.2px)] font-medium text-on-surface mt-2 font-sans">
            Portfolio Value
          </div>
          <div className="text-[12px] text-text-light mt-2 pt-2 border-t border-border-translucent font-sans">
            Cumulative estimated cost across all projects.
          </div>
        </StatCard>
      </div>

      {/* Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <StatCard>
          <div className="flex justify-between items-end mb-2">
            <span className="font-sans text-[clamp(13.6px,1vw,15.2px)] font-semibold text-on-surface">
              Completion Rate
            </span>
            <span className="font-display text-[24px] text-primary font-bold">
              {totalProjects > 0
                ? Math.round((completed / totalProjects) * 100)
                : 0}
              %
            </span>
          </div>
          <ProgressBar
            value={
              totalProjects > 0 ? (completed / totalProjects) * 100 : 0
            }
          />
          <div className="text-[12px] text-text-light mt-3 font-sans">
            {completed} of {totalProjects} projects completed.
          </div>
        </StatCard>

        <StatCard>
          <div className="flex justify-between items-end mb-2">
            <span className="font-sans text-[clamp(13.6px,1vw,15.2px)] font-semibold text-on-surface">
              Expenditure Utilization
            </span>

            <span className="font-display text-[24px] text-primary font-bold">
              {totalCostLakhs > 0
                ? Math.round((totalReleasedLakhs / totalCostLakhs) * 100)
                : 0}
              %
            </span>
          </div>

          <ProgressBar
            value={
              totalCostLakhs > 0
              ? (totalReleasedLakhs / totalCostLakhs) * 100
              : 0
           }
          />

          <div className="text-[12px] text-text-light mt-3 font-sans">
            ₹{totalReleasedLakhs.toFixed(1)}L spent of ₹
            {totalCostLakhs.toFixed(1)}L allocated.
          </div>
        </StatCard>
      </div>
    </div>
  );
}
