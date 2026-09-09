"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  LabelList,
} from "recharts";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

interface UtilizationMP {
  mp_name: string;
  constituency: string;
  utilization_pct: number;
}

interface TimeToRelease {
  state: string;
  median_days: number;
}

interface BubblePoint {
  days_lag: number;
  sanctioned_amount: number;
  work_category?: string;
}

interface SanctionedByState {
  state: string;
  total_sanctioned: number;
}

interface SCSTComparison {
  label: string;
  project_count: number;
  avg_sanctioned_lakh: number;
  completion_rate: number;
}

interface CategoryMixData {
  categories: string[];
  data: Record<string, string | number>[];
}

interface MPLeaderboard {
  mp_name: string;
  constituency: string;
  house: string;
  utilization_pct: number;
  completion_rate: number;
  high_score_projects: number;
}

interface HouseComparison {
  house: string;
  avg_utilization: number;
  completion_rate: number;
  avg_project_count: number;
}

interface AmountPhoto {
  sanctioned_amount: number;
  photo_count: number;
  status: string;
}

interface RepeatedDescription {
  description: string;
  count: number;
}

interface PipelineStage {
  stage: string;
  count: number;
}

interface StalledProject {
  work_id: string;
  state: string;
  days_since_sanction: number;
  sanctioned_amount: number;
  sanctioned_display: string;
}

interface FlagReason {
  reason: string;
  count: number;
}

interface FlagRateCrossTab {
  by_category: { work_category: string; flag_rate: number }[];
  by_state: { state: string; flag_rate: number }[];
}

interface InsightsPageClientProps {
  utilizationByMp: UtilizationMP[];
  timeToRelease: TimeToRelease[];
  bubbleData: BubblePoint[];
  sanctionedByState: SanctionedByState[];
  scstComparison: SCSTComparison[];
  categoryMix: CategoryMixData;
  mpLeaderboard: MPLeaderboard[];
  houseComparison: HouseComparison[];
  amountVsPhotos: AmountPhoto[];
  repeatedDescriptions: RepeatedDescription[];
  projectPipeline: PipelineStage[];
  stalledProjects: StalledProject[];
  flagReasons: FlagReason[];
  flagRateCrossTab: FlagRateCrossTab;
}

/* ═══════════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════════ */

const PRIMARY = "#4f46e5";
const PRIMARY_LIGHT = "#818cf8";
const GREEN = "#10b981";
const GREEN_LIGHT = "#34d399";
const AMBER = "#f59e0b";
const RED = "#ef4444";
const PURPLE = "#8b5cf6";
const BLUE = "#3b82f6";
const PINK = "#ec4899";
const CYAN = "#06b6d4";

const STATUS_COLORS: Record<string, string> = {
  Completed: GREEN,
  "In Progress": AMBER,
  Sanctioned: PRIMARY_LIGHT,
  Recommended: "#94a3b8",
  Delayed: RED,
};

const STATE_COLORS = [PRIMARY, GREEN, RED, AMBER, "#94a3b8"];

const CATEGORY_COLORS = [PRIMARY, GREEN, AMBER, RED, PURPLE, BLUE, PINK, CYAN];

/* ═══════════════════════════════════════════════════════════════════
   Shared Sub-Components
   ═══════════════════════════════════════════════════════════════════ */

function SectionCard({
  number,
  title,
  icon,
  children,
  className = "",
}: {
  number: number;
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant/30 rounded-[16px] p-6 shadow-sm flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-primary">
              {icon}
            </span>
          </div>
          <h2 className="font-display text-[17px] font-bold text-on-surface tracking-tight">
            {number}. {title}
          </h2>
        </div>
        <span className="text-[12px] font-medium text-primary cursor-pointer hover:underline flex items-center gap-1">
          View More
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

function ChartTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-3">
      <h3 className="font-display text-[13px] font-bold text-on-surface tracking-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="font-sans text-[11px] text-on-surface-variant mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function KeyFinding({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6 flex items-start gap-3">
      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
        lightbulb
      </span>
      <p className="font-sans text-[13px] text-on-surface font-medium leading-relaxed">
        {children}
      </p>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-outline-variant/30 shadow-lg px-3 py-2 text-xs z-50 relative">
      {label && (
        <div className="font-semibold text-on-surface mb-1">{label}</div>
      )}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color || p.fill }}
          />
          <span className="text-on-surface-variant">
            {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ═══════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════ */

export function InsightsPageClient({
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
}: InsightsPageClientProps) {
  /* ── Section 1 Data Transforms ── */


  // Transform bubble data with log scale and group by category
  const bubbleByCategory: Record<string, BubblePoint[]> = {};
  bubbleData.forEach((d) => {
    const key = d.work_category || "Unknown";
    if (!bubbleByCategory[key]) bubbleByCategory[key] = [];
    bubbleByCategory[key].push(d);
  });

  /* ── Section 2 Data Transforms ── */

  // Sort sanctioned by state for choropleth-like display
  const sortedStates = [...sanctionedByState].sort(
    (a, b) => b.total_sanctioned - a.total_sanctioned
  );
  const maxSanctioned = sortedStates[0]?.total_sanctioned || 1;

  // Abbreviate state names for the category mix heatmap
  const categoryMixCategories = categoryMix?.categories || [];
  const categoryMixData = categoryMix?.data || [];

  /* ── Section 3 Data Transforms ── */

  // Prepare house comparison as grouped metrics
  const houseMetrics = [
    {
      metric: "Avg. Utilization",
      ...Object.fromEntries(
        houseComparison.map((h) => [h.house, h.avg_utilization])
      ),
    },
    {
      metric: "Completion Rate",
      ...Object.fromEntries(
        houseComparison.map((h) => [h.house, h.completion_rate])
      ),
    },
    {
      metric: "Avg. Project Count\n(per MP)",
      ...Object.fromEntries(
        houseComparison.map((h) => [h.house, h.avg_project_count])
      ),
    },
  ];

  /* ── Section 4 Data Transforms ── */

  const scatterByStatus: Record<string, AmountPhoto[]> = {};
  amountVsPhotos.forEach((d) => {
    if (d.sanctioned_amount <= 0) return; // Fix Log(0) scale bug
    const key = d.status || "Unknown";
    if (!scatterByStatus[key]) scatterByStatus[key] = [];
    scatterByStatus[key].push(d);
  });

  /* ── Section 5 Data Transforms ── */

  const pipelineColors = [PRIMARY_LIGHT, PRIMARY, BLUE, AMBER, GREEN];

  return (
    <div className="flex flex-col gap-6">
      {/* ═══════════════════════════════════════════════════════════════
         SECTION 1: Fund Utilization & Pace
         ═══════════════════════════════════════════════════════════════ */}
      <SectionCard number={1} title="Fund Utilization & Pace" icon="speed">
        <KeyFinding>
          The nine lowest-utilization portfolios fall within a narrow 48–52% range, suggesting systemic rather than isolated variation.
        </KeyFinding>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1a: Utilization Rate by MP */}
          <div className="flex flex-col">
            <ChartTitle
              title="Utilization Rate by MP (Lowest First)"
            />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={utilizationByMp}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e2e8f0"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="mp_name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#475569", fontSize: 10, fontWeight: 500 }}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="utilization_pct"
                    name="Utilization %"
                    fill={PRIMARY}
                    radius={[0, 4, 4, 0]}
                    maxBarSize={18}
                  >
                    <LabelList 
                      dataKey="utilization_pct" 
                      position="right" 
                      formatter={(v: any) => `${Number(v).toFixed(1)}%`}
                      style={{ fontSize: '10px', fill: '#475569', fontWeight: 500 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 1b: Time to Release (Median by State) */}
          <div className="flex flex-col">
            <ChartTitle
              title="Release Bottlenecks (by State)"
              subtitle="Median days from Recommendation to Release"
            />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timeToRelease}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e2e8f0"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="state"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#475569", fontSize: 10, fontWeight: 500 }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="median_days"
                    name="Median Days"
                    fill={RED}
                    fillOpacity={0.8}
                    radius={[0, 4, 4, 0]}
                    maxBarSize={18}
                  >
                     <LabelList 
                      dataKey="median_days" 
                      position="right" 
                      style={{ fontSize: '10px', fill: '#475569', fontWeight: 500 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 1c: Sanction-to-Completion Lag vs Amount */}
          <div className="flex flex-col">
            <ChartTitle
              title="Sanction-to-Completion Lag vs. Sanctioned Amount"
            />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    dataKey="sanctioned_log"
                    name="Amount (₹)"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    domain={[0, 'dataMax']}
                    tickFormatter={(v) =>
                      v >= 10000000
                        ? `${(v / 10000000).toFixed(0)}Cr`
                        : v >= 100000
                        ? `${(v / 100000).toFixed(0)}L`
                        : `${v}`
                    }
                    label={{
                      value: "Sanctioned Amount (₹)",
                      position: "bottom",
                      fontSize: 10,
                      fill: "#94a3b8",
                      offset: 5,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="days_lag"
                    name="Days"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    label={{
                      value: "Days to Complete",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 9,
                      fill: "#94a3b8",
                      offset: -5,
                    }}
                  />
                  <ZAxis range={[30, 150]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0]?.payload;
                      return (
                        <div className="bg-white rounded-xl border border-outline-variant/30 shadow-lg px-3 py-2 text-xs z-50 relative">
                          <div className="font-semibold text-on-surface">
                            {d.work_category}
                          </div>
                          <div className="text-on-surface-variant">
                            Amount: ₹
                            {(d.sanctioned_amount / 100000).toFixed(1)}L
                          </div>
                          <div className="text-on-surface-variant">
                            Days: {d.days_lag}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter
                    name="Projects"
                    data={bubbleData.map((d) => ({
                      ...d,
                      sanctioned_log:
                        d.sanctioned_amount > 0 ? d.sanctioned_amount : 1,
                    }))}
                    fill="#3b82f6"
                    fillOpacity={0.7}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 2: Geographic Equity
         ═══════════════════════════════════════════════════════════════ */}
      <SectionCard number={2} title="Geographic Distribution & Equity" icon="public">
        <KeyFinding>
          No substantial disparity is visible in average project funding or completion rates between SC/ST and non-SC/ST areas in this dataset.
        </KeyFinding>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2a: Total Sanctioned by State */}
          <div className="flex flex-col">
            <ChartTitle title="Total Sanctioned Amount by State (Top 8)" />
            <div className="flex flex-col gap-3 mt-2 pr-2">
              {sortedStates.slice(0, 8).map((s, i) => {
                const pct = (s.total_sanctioned / maxSanctioned) * 100;
                const crores = s.total_sanctioned / 10000000;
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1 group"
                  >
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] text-on-surface font-medium truncate">
                        {s.state}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-semibold">
                        ₹{crores.toFixed(0)}Cr
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2b: SC/ST vs Non-SC/ST (Separate Metrics) */}
          <div className="flex flex-col">
            <ChartTitle title="SC/ST vs Non-SC/ST Project Comparison" />
            <div className="flex flex-col gap-4 mt-2">
              {[
                { 
                  title: "Project Count", 
                  scst: scstComparison.find(c => c.label === "SC/ST")?.project_count || 0,
                  nonScst: scstComparison.find(c => c.label === "Non-SC/ST")?.project_count || 0,
                  format: (v: number) => v.toLocaleString()
                },
                { 
                  title: "Avg. Funding per Project", 
                  scst: scstComparison.find(c => c.label === "SC/ST")?.avg_sanctioned_lakh || 0,
                  nonScst: scstComparison.find(c => c.label === "Non-SC/ST")?.avg_sanctioned_lakh || 0,
                  format: (v: number) => `₹${v.toFixed(1)}L`
                },
                { 
                  title: "Completion Rate", 
                  scst: scstComparison.find(c => c.label === "SC/ST")?.completion_rate || 0,
                  nonScst: scstComparison.find(c => c.label === "Non-SC/ST")?.completion_rate || 0,
                  format: (v: number) => `${v.toFixed(1)}%`
                }
              ].map((metric, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 bg-surface-container-low/50 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    {metric.title}
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant mb-0.5">Non-SC/ST</span>
                      <div className="flex items-end gap-2">
                        <span className="text-[15px] font-bold text-on-surface">{metric.format(metric.nonScst)}</span>
                        <div className="w-1.5 h-3 bg-primary-light rounded-sm mb-1"></div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant mb-0.5">SC/ST Area</span>
                      <div className="flex items-end gap-2">
                        <span className="text-[15px] font-bold text-on-surface">{metric.format(metric.scst)}</span>
                        <div className="w-1.5 h-3 bg-green-500 rounded-sm mb-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2c: Work Category Mix by State */}
          <div className="flex flex-col">
            <ChartTitle title="Work Category Mix by State" />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryMixData}
                  layout="vertical"
                  stackOffset="expand"
                  margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e2e8f0"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    hide
                  />
                  <YAxis
                    type="category"
                    dataKey="state"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#475569", fontSize: 9, fontWeight: 500 }}
                    width={90}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 9, paddingTop: 4 }}
                    iconType="circle"
                    iconSize={5}
                  />
                  {categoryMixCategories.map((cat, i) => (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cat.length > 12 ? cat.slice(0, 12) + "…" : cat}
                      stackId="a"
                      fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 3: MP-Level Accountability + SECTION 4: Amount vs Documentation
         ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Section 3 */}
        <SectionCard
          number={3}
          title="MP Portfolio Performance"
          icon="person_search"
        >
          <KeyFinding>
            Fund utilization and average project counts are broadly comparable between Lok Sabha and Rajya Sabha portfolios in the current dataset.
          </KeyFinding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3a: Leaderboard Table */}
            <div className="flex flex-col">
              <ChartTitle title="Top 5 Project Portfolios" />
              <div className="w-full">
                <table className="w-full text-left text-[11px] table-fixed">
                  <thead className="text-[10px] text-on-surface-variant uppercase bg-surface-container-low border-b border-outline-variant/30">
                    <tr>
                      <th className="px-2 py-2 w-8 text-center">#</th>
                      <th className="px-2 py-2">MP Portfolio</th>
                      <th className="px-2 py-2 text-right">Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mpLeaderboard.slice(0, 5).map((mp, i) => (
                      <tr
                        key={mp.mp_name}
                        className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                      >
                        <td className="px-2 py-2 text-on-surface-variant text-center font-medium">
                          0{i + 1}
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface truncate">{mp.mp_name}</span>
                            <span className="text-[9px] text-on-surface-variant truncate">{mp.constituency}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-right">
                          <span className="font-semibold text-primary">
                            {mp.utilization_pct.toFixed(0)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3b: House Comparison */}
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-2">
                <ChartTitle title="House Comparison" />
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded font-semibold mb-2">Utilization gap: 1%</span>
              </div>
              <div className="flex flex-col gap-6 mt-2">
                {/* Metric 1: Utilization */}
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-2">
                    Utilization
                  </span>
                  <div className="flex flex-col gap-3">
                    {houseComparison.map(h => (
                      <div key={h.house} className="flex flex-col gap-1">
                        <div className="flex justify-between items-end">
                          <span className="text-[11px] text-on-surface font-medium">{h.house}</span>
                          <span className="text-[11px] text-on-surface-variant font-semibold">{h.avg_utilization.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${h.avg_utilization}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Metric 2: Projects per MP */}
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-2">
                    Projects / MP
                  </span>
                  <div className="flex flex-col gap-3">
                    {houseComparison.map(h => (
                      <div key={h.house} className="flex flex-col gap-1">
                        <div className="flex justify-between items-end">
                          <span className="text-[11px] text-on-surface font-medium">{h.house}</span>
                          <span className="text-[11px] text-on-surface-variant font-semibold">{h.avg_project_count.toFixed(0)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(h.avg_project_count / 100) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 4 */}
        <SectionCard
          number={4}
          title="Documentation & Data Quality"
          icon="photo_library"
        >
          <KeyFinding>
            Repeated project descriptions may reflect standardized templates or reused proposal text. Projects with unusually concentrated repetition patterns or limited photographic documentation may warrant closer review.
          </KeyFinding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4a: Scatter */}
            <div className="flex flex-col">
              <ChartTitle
                title="High-Value Projects with Limited Photo Documentation"
              />
              <div className="flex flex-col justify-center h-[260px]">
                <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/30 flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                    <span className="text-[13px] font-semibold text-on-surface">Category</span>
                    <span className="text-[13px] font-semibold text-on-surface">Project Count</span>
                  </div>
                  
                  <div className="flex flex-col gap-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🔴</span>
                      <span className="text-[13px] font-bold text-error">
                        {amountVsPhotos.filter(d => d.sanctioned_amount >= 5000000 && d.photo_count === 0).length}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">
                        — ₹50L+ projects with no photos
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">🟠</span>
                      <span className="text-[13px] font-bold text-amber-600">
                        {amountVsPhotos.filter(d => d.sanctioned_amount >= 5000000 && d.photo_count >= 1 && d.photo_count <= 2).length}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">
                        — ₹50L+ projects with only 1–2 photos
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">🔴</span>
                      <span className="text-[13px] font-bold text-error/80">
                        {amountVsPhotos.filter(d => d.sanctioned_amount >= 2500000 && d.sanctioned_amount < 5000000 && d.photo_count === 0).length}
                      </span>
                      <span className="text-[12px] text-on-surface-variant">
                        — ₹25L–₹50L projects with no photos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4b: Repeated Descriptions */}
            <div className="flex flex-col">
              <ChartTitle title="Top Repeated Project Descriptions" subtitle="Projects using exact or highly similar phrasing" />
              <div className="flex flex-col gap-4 mt-2 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                {repeatedDescriptions.slice(0, 10).map((desc, i) => {
                  const maxCount = repeatedDescriptions[0]?.count || 1;
                  const pct = (desc.count / maxCount) * 100;
                  return (
                    <div key={i} className="flex flex-col gap-1.5 group">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-2 items-start">
                          <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                            {(i + 1).toString().padStart(2, '0')}
                          </span>
                          <span className="text-[11px] text-on-surface font-medium leading-tight">
                            {desc.description}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-primary whitespace-nowrap bg-primary/10 px-1.5 py-0.5 rounded-sm">
                          {desc.count} 
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden ml-6" style={{ width: 'calc(100% - 24px)' }}>
                        <div
                          className="h-full rounded-full bg-primary/60 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
         SECTION 5: Status Pipeline + SECTION 6: Understanding Ensemble Score
         ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Section 5 */}
        <SectionCard number={5} title="Project Lifecycle" icon="timeline">
          <KeyFinding>
            This lifecycle snapshot illustrates the distribution of projects across recorded administrative stages.
          </KeyFinding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 5a: Project Flow Funnel */}
            <div className="flex flex-col">
              <ChartTitle title="Projects Recorded by Current Status" subtitle="Distribution of projects across the implementation lifecycle" />
              <div className="flex flex-col gap-3 mt-4 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                {projectPipeline.map((p, i) => {
                  const maxCount = projectPipeline[0]?.count || 1;
                  const pct = (p.count / maxCount) * 100;
                  return (
                    <div key={p.stage} className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] text-on-surface font-medium">{p.stage}</span>
                        <span className="text-[11px] text-on-surface-variant font-bold">{p.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-4 bg-surface-container-low rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm bg-primary/80 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5b: Stalled Projects Table */}
            <div className="flex flex-col">
              <ChartTitle title="Projects In Progress the Longest" subtitle="Top delayed projects" />
              <div className="w-full mt-2">
                <table className="w-full text-left text-[11px] table-fixed">
                  <thead className="text-[9px] text-on-surface-variant uppercase bg-surface-container-low border-b border-outline-variant/30">
                    <tr>
                      <th className="px-2 py-1.5 w-[30%]">Project</th>
                      <th className="px-2 py-1.5 w-[40%]">State</th>
                      <th className="px-2 py-1.5 w-[30%] text-right">Days in current lifecycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stalledProjects.slice(0, 3).map((p) => (
                      <tr
                        key={p.work_id}
                        className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors"
                      >
                        <td className="px-2 py-2 font-medium text-primary text-[10px] truncate">
                          {p.work_id}
                        </td>
                        <td className="px-2 py-2 text-on-surface-variant truncate">
                          {p.state}
                        </td>
                        <td className="px-2 py-2 text-right font-semibold text-on-surface">
                          {p.days_since_sanction.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 6 */}
        <SectionCard
          number={6}
          title="Project Review Signals"
          icon="psychology"
        >
          <KeyFinding>
            The ensemble machine learning model highlights projects based on unusually high costs, delayed approvals, or irregular documentation patterns relative to category norms.
          </KeyFinding>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 6a: Top Flag Reasons */}
            <div className="flex flex-col">
              <ChartTitle title="Projects Flagged by Review Reason" />
              <div className="h-[260px]">
                {flagReasons.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={flagReasons.map(f => {
                        const FLAG_MAP: Record<string, string> = {
                          "amount_zscore_in_category": "Unusually High Project Cost",
                          "release_ratio": "Unusual Fund Release Pattern",
                          "days_sanction_to_completion": "Unusually Long Completion Time",
                          "days_rec_to_sanction": "Delayed Project Approval",
                          "no_photo_flag": "Missing Documentation",
                          "desc_generic_flag": "Templated/Generic Description"
                        };
                        return { ...f, reason_display: FLAG_MAP[f.reason] || f.reason };
                      })}
                      layout="vertical"
                      margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#e2e8f0"
                        opacity={0.5}
                      />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="reason_display"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 8.5 }}
                        width={170}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        name="Project Count"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={16}
                      >
                        {flagReasons.map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-on-surface-variant text-sm">
                    No flag reason data available.
                  </div>
                )}
              </div>
            </div>

            {/* 6b: Flag Rate Cross-Tab */}
            <div className="flex flex-col">
              <ChartTitle title="Review Flag Rate by Work Category" />
              <div className="h-[260px]">
                {flagRateCrossTab.by_category.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={flagRateCrossTab.by_category.map((d) => ({
                        name: d.work_category,
                        flag_rate: d.flag_rate,
                        type: "Category",
                      }))}
                      layout="vertical"
                      margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#e2e8f0"
                        opacity={0.5}
                      />
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 8.5 }}
                        width={160}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="flag_rate"
                        name="Flag Rate (%)"
                        radius={[0, 4, 4, 0]}
                        maxBarSize={16}
                      >
                        {flagRateCrossTab.by_category.map((_, i) => (
                          <Cell
                            key={i}
                            fill={
                              CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-on-surface-variant text-sm">
                    No cross-tab data available.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-outline-variant/30 text-[10.5px] text-on-surface-variant flex gap-2 items-start">
            <span className="material-symbols-outlined text-[14px] mt-0.5">info</span>
            <p>Projects are flagged based on combinations of unusual cost, timing, documentation, and other detected patterns. A review signal indicates a need for further examination, not evidence of wrongdoing.</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
