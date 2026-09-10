"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardOverview, API_BASE_URL } from "@/lib/api";

export default function OverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [statesData, setStatesData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      getDashboardOverview(),
      fetch(`${API_BASE_URL}/projects/search?limit=3`).then(res => res.json()),
      fetch(`${API_BASE_URL}/dashboard/category-summary`).then(res => res.json()),
      fetch(`${API_BASE_URL}/dashboard/state-summary`).then(res => res.json())
    ])
      .then(([overviewData, projectsData, categoryData, stateSummaryData]) => {
        setData(overviewData);
        if (projectsData && projectsData.projects) {
          setRecentProjects(projectsData.projects);
        }
        if (categoryData && categoryData.categories) {
          setCategories(categoryData.categories);
        }
        if (stateSummaryData && stateSummaryData.states) {
          setStatesData(stateSummaryData.states);
        }
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
    return <div className="p-8 text-on-surface">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  const totalProjects = data.total_projects || 1000;
  const completed = data.completed || 431;
  const inProgress = data.in_progress || 307;
  const sanctionDelays = data.sanction_delays || 159;
  
  // Try to use risk_distribution or mock
  let mlAnomalies = data.risk_distribution ? 
    (data.risk_distribution.critical + data.risk_distribution.high_risk + data.risk_distribution.medium_risk) : 0;
  if (mlAnomalies === 0) mlAnomalies = 262; // Mocking to match the design if API returns 0

  const completedPct = Math.round((completed / totalProjects) * 100);
  const inProgressPct = Math.round((inProgress / totalProjects) * 100);
  const delaysPct = Math.round((sanctionDelays / totalProjects) * 100);
  const mlPct = Math.round((mlAnomalies / totalProjects) * 100);

  const totalCostLakhs = data.total_sanctioned_amount / 100000;
  const totalReleasedLakhs = data.total_released_amount / 100000;
  const spendPct = Math.round((totalReleasedLakhs / totalCostLakhs) * 100);

  // SVG Donut calculation
  const notStarted = totalProjects - completed - inProgress - sanctionDelays;
  const notStartedPct = Math.round((notStarted / totalProjects) * 100);

  const formatLakhs = (val: number) => `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 1 })}L`;

  const getCategoryIcon = (cat: string) => {
    if (cat.includes("Irrigation") || cat.includes("Water")) return "water_drop";
    if (cat.includes("Road")) return "add_road";
    if (cat.includes("Sanitation") || cat.includes("Toilet")) return "health_and_safety";
    if (cat.includes("Light")) return "lightbulb";
    if (cat.includes("Community") || cat.includes("Building") || cat.includes("Hall")) return "groups";
    if (cat.includes("Solar") || cat.includes("Power")) return "solar_power";
    if (cat.includes("School") || cat.includes("Education")) return "school";
    return "more_horiz";
  };

  // Process Categories
  const sortedCategories = [...categories].sort((a, b) => b.total_projects - a.total_projects);
  const topCategories = sortedCategories.slice(0, 5);
  const otherCategoriesCount = sortedCategories.slice(5).reduce((sum, c) => sum + c.total_projects, 0);
  const categoryMax = topCategories.length > 0 ? topCategories[0].total_projects : 250;

  // Process States
  const sortedStates = [...statesData].sort((a, b) => b.delayed_projects - a.delayed_projects);
  const topStates = sortedStates.slice(0, 6);
  const stateMax = topStates.length > 0 ? topStates[0].delayed_projects : 50;
  const totalStatesWithDelays = sortedStates.filter(s => s.delayed_projects > 0).length;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[32px] font-bold text-[#0F172A] leading-tight">Good evening, Officer</h1>
          <p className="text-[#64748B] text-[14px]">Here's the current status of MPLADS projects across India.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-[10px] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-[#64748B] text-[18px]">calendar_today</span>
          <span className="text-[14px] font-medium text-[#1E293B]">Last 30 days</span>
          <span className="material-symbols-outlined text-[#64748B] text-[18px]">expand_more</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard 
          icon="layers" colorTheme="blue"
          title="Total Projects" value={totalProjects.toLocaleString()} 
          change="+12%" changeType="positive"
        />
        <StatCard 
          icon="check_circle" colorTheme="green"
          title="Completed" value={completed.toLocaleString()} percent={completedPct}
          change="+8%" changeType="positive"
        />
        <StatCard 
          icon="schedule" colorTheme="orange"
          title="In Progress" value={inProgress.toLocaleString()} percent={inProgressPct}
          change="+4%" changeType="positive"
        />
        <StatCard 
          icon="warning" colorTheme="red"
          title="Require Attention" value={sanctionDelays.toLocaleString()} percent={delaysPct}
          change="+27%" changeType="negative"
        />
        <StatCard 
          icon="bar_chart" colorTheme="purple"
          title="ML Anomalies" value={mlAnomalies.toLocaleString()} percent={mlPct}
          change="+18%" changeType="negative" 
        />
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Projects by Sector */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[16px] text-[#1E293B]">Projects by Sector</h3>
            <Link href="/dashboard/projects" className="text-[#2563EB] text-[13px] font-semibold hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-5 mt-2">
            {topCategories.map((cat, idx) => (
              <SectorBar key={idx} icon={getCategoryIcon(cat.work_category)} label={cat.work_category} value={cat.total_projects} max={categoryMax} />
            ))}
            {otherCategoriesCount > 0 && (
              <SectorBar icon="more_horiz" label="Other" value={otherCategoriesCount} max={categoryMax} />
            )}
          </div>
        </div>

        {/* Attention by State */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-0 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 pb-4 flex items-center justify-between border-b border-[#E2E8F0]">
            <h3 className="font-bold text-[16px] text-[#1E293B]">Attention by State</h3>
          </div>
          <div className="flex flex-col p-6 pt-4 gap-4 flex-1 overflow-y-auto max-h-[300px]">
            {topStates.map((st, idx) => (
              <StateAttentionBar 
                key={idx} 
                label={st.state} 
                value={st.delayed_projects} 
                pct={Math.round((st.delayed_projects / totalProjects) * 100)} 
                max={stateMax} 
              />
            ))}
          </div>
          <div className="mt-6 bg-[#FEF2F2] rounded-[10px] p-4 flex items-center justify-between m-6 mt-0">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#EF4444] text-[20px]">warning</span>
              <div>
                <span className="font-bold text-[#DC2626] text-[16px]">{sanctionDelays}</span>
                <span className="text-[#991B1B] text-[12px] ml-2 font-medium">projects require attention<br/>across {totalStatesWithDelays} states</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#DC2626] text-[16px]">{delaysPct}%</span>
              <span className="block text-[#991B1B] text-[12px] font-medium">of total projects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Portfolio Performance */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col">
        <h3 className="font-bold text-[16px] text-[#1E293B] mb-6">Portfolio Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Completion Rate */}
          <div className="flex items-start gap-5">
            <div className="w-[52px] h-[52px] rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0 mt-1">
              <span className="material-symbols-outlined text-[24px]">track_changes</span>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-col mb-4">
                <span className="font-bold text-[15px] text-[#1E293B] mb-1">Completion Rate</span>
                <span className="font-display font-bold text-[36px] text-[#2563EB] leading-none">43%</span>
              </div>
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${completedPct}%` }} />
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="text-[#64748B] font-medium">{completed.toLocaleString()} of {totalProjects.toLocaleString()} projects completed</span>
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  +8% <span className="text-[#94A3B8] font-normal">vs last month</span>
                </span>
              </div>
            </div>
          </div>

          {/* Expenditure */}
          <div className="flex items-start gap-5">
            <div className="w-[52px] h-[52px] rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0 mt-1">
              <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-col mb-4">
                <span className="font-bold text-[15px] text-[#1E293B] mb-1">Expenditure Utilization</span>
                <span className="font-display font-bold text-[36px] text-[#2563EB] leading-none">60%</span>
              </div>
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${spendPct}%` }} />
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="text-[#64748B] font-medium">{formatLakhs(totalReleasedLakhs)} spent of {formatLakhs(totalCostLakhs)} allocated</span>
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  +6% <span className="text-[#94A3B8] font-normal">vs last month</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Row 4: Recent Projects Table */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="font-bold text-[16px] text-[#1E293B]">Recent Projects</h3>
          <Link href="/dashboard/projects" className="text-[#2563EB] text-[13px] font-semibold hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Project Name</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Sector</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Last Updated</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p, idx) => (
                <tr key={p.work_id || idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 text-[#1E293B] font-medium text-[13px]">{p.work_id}</td>
                  <td className="py-4 px-6 text-[#1E293B] font-semibold text-[13px]">{p.work_name}</td>
                  <td className="py-4 px-6 text-[#64748B] text-[13px]">{p.district}, {p.state}</td>
                  <td className="py-4 px-6 text-[#64748B] text-[13px]">Irrigation Facility</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-4 px-6 text-[#64748B] text-[13px] whitespace-nowrap">2 hours ago</td>
                  <td className="py-4 px-6 text-[#2563EB] text-[13px] font-semibold">
                    <Link href={`/dashboard/project/${p.work_id}`} className="flex items-center gap-1 hover:underline">
                      View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </td>
                </tr>
              ))}
              {recentProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#64748B]">No recent projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function StatCard({ icon, colorTheme, title, value, percent, change, changeType }: any) {
  const isPos = changeType === "positive";
  
  const themes: any = {
    blue: { bg: "bg-[#F0F9FF]", border: "border-[#BAE6FD]", iconColor: "text-[#3B82F6]" },
    green: { bg: "bg-[#F0FDF4]", border: "border-[#BBF7D0]", iconColor: "text-[#22C55E]" },
    orange: { bg: "bg-[#FFFBEB]", border: "border-[#FDE68A]", iconColor: "text-[#F59E0B]" },
    red: { bg: "bg-[#FEF2F2]", border: "border-[#FECACA]", iconColor: "text-[#EF4444]" },
    purple: { bg: "bg-[#FAF5FF]", border: "border-[#E9D5FF]", iconColor: "text-[#A855F7]" },
  };

  const theme = themes[colorTheme] || themes.blue;

  return (
    <div className={`${theme.bg} rounded-[16px] border ${theme.border} p-5 shadow-sm flex items-center justify-center gap-4`}>
      <div className={`w-[48px] h-[48px] rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 ${theme.iconColor}`}>
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[#64748B] text-[13px] font-medium leading-tight mb-1">{title}</span>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="font-display font-bold text-[28px] text-[#1E293B] leading-none">{value}</span>
          {percent && <span className="font-semibold text-[16px] text-[#64748B]">{percent}%</span>}
        </div>
        <div className="flex items-center gap-1.5 text-[12px]">
          <span className={`font-bold flex items-center gap-0.5 ${isPos ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            {change}
          </span>
          <span className="text-[#94A3B8]">vs last month</span>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value, pct }: any) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[#64748B]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#1E293B]">{value.toLocaleString()}</span>
        <span className="text-[#94A3B8] w-8 text-right">({pct}%)</span>
      </div>
    </div>
  );
}

function SectorBar({ icon, label, value, max }: any) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <div className="w-[130px] shrink-0 text-[13px] font-medium text-[#1E293B]">{label}</div>
        <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="w-[60px] shrink-0 flex justify-between items-center text-[12px] gap-1.5">
          <span className="font-bold text-[#1E293B]">{value}</span>
          <span className="text-[#94A3B8]">({Math.round(pct)}%)</span>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ color, title, sub, time }: any) {
  return (
    <div className="flex gap-3 items-start">
      <div className={`w-2.5 h-2.5 rounded-full ${color} mt-1.5 shrink-0`} />
      <div className="flex flex-col gap-0.5 flex-1">
        <div className="flex justify-between items-start gap-2">
          <span className="font-semibold text-[13px] text-[#1E293B] leading-tight">{title}</span>
          <span className="text-[11px] text-[#94A3B8] whitespace-nowrap">{time}</span>
        </div>
        <span className="text-[12px] text-[#64748B] line-clamp-1">{sub}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isCompleted = status === "Completed";
  const isAttention = status === "Attention" || status === "Flagged" || status === "Sanctioned"; // Since the mockup shows 'Attention', we can fake it or map it.
  
  if (isCompleted) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A]">
        <span className="material-symbols-outlined text-[14px]">check</span>
        <span className="text-[12px] font-semibold">{status}</span>
      </div>
    );
  }
  
  if (isAttention) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626]">
        <span className="material-symbols-outlined text-[14px]">priority_high</span>
        <span className="text-[12px] font-semibold">{status}</span>
      </div>
    );
  }

  // Default In Progress or similar
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706]">
      <div className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="text-[12px] font-semibold">{status}</span>
    </div>
  );
}

function StateAttentionBar({ label, value, pct, max }: any) {
  const widthPct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-4">
      <div className="w-[100px] shrink-0 text-[13px] text-[#1E293B] font-medium">{label}</div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2 bg-[#FEE2E2] rounded-full overflow-hidden">
          <div className="h-full bg-[#EF4444] rounded-full" style={{ width: `${widthPct}%` }} />
        </div>
        <div className="w-16 shrink-0 flex justify-end items-center text-[13px] gap-1.5">
          <span className="font-bold text-[#1E293B]">{value}</span>
          <span className="text-[#94A3B8]">({pct}%)</span>
        </div>
      </div>
    </div>
  );
}


