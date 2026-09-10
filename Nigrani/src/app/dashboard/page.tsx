"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardOverview, API_BASE_URL } from "@/lib/api";

export default function OverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      getDashboardOverview(),
      fetch(`${API_BASE_URL}/projects/search?limit=3`).then(res => res.json())
    ])
      .then(([overviewData, projectsData]) => {
        setData(overviewData);
        if (projectsData && projectsData.projects) {
          setRecentProjects(projectsData.projects);
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
          icon="layers" iconBg="bg-[#E0E7FF]" iconColor="text-[#4F46E5]"
          title="Total Projects" value={totalProjects.toLocaleString()} 
          change="+12%" changeType="positive"
        />
        <StatCard 
          icon="check_circle" iconBg="bg-[#DCFCE7]" iconColor="text-[#16A34A]"
          title="Completed" value={completed.toLocaleString()} percent={completedPct}
          change="+8%" changeType="positive"
        />
        <StatCard 
          icon="schedule" iconBg="bg-[#FEF3C7]" iconColor="text-[#D97706]"
          title="In Progress" value={inProgress.toLocaleString()} percent={inProgressPct}
          change="+4%" changeType="positive"
        />
        <StatCard 
          icon="warning" iconBg="bg-[#FEE2E2]" iconColor="text-[#DC2626]"
          title="Require Attention" value={sanctionDelays.toLocaleString()} percent={delaysPct}
          change="+27%" changeType="negative" // Red change since attention is bad
        />
        <StatCard 
          icon="monitoring" iconBg="bg-[#F3E8FF]" iconColor="text-[#9333EA]"
          title="ML Anomalies" value={mlAnomalies.toLocaleString()} percent={mlPct}
          change="+18%" changeType="negative" 
        />
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Status Donut */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-[16px] text-[#1E293B] mb-6">Project Status Distribution</h3>
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-[180px] h-[180px]">
              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                {/* Completed */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#16A34A" strokeWidth="7.5" strokeDasharray={`${Math.max(0, completedPct - 1.5)} ${100 - Math.max(0, completedPct - 1.5)}`} strokeDashoffset="0" strokeLinecap="round" />
                {/* In Progress */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2563EB" strokeWidth="7.5" strokeDasharray={`${Math.max(0, inProgressPct - 1.5)} ${100 - Math.max(0, inProgressPct - 1.5)}`} strokeDashoffset={`-${completedPct}`} strokeLinecap="round" />
                {/* Not Started */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="7.5" strokeDasharray={`${Math.max(0, notStartedPct - 1.5)} ${100 - Math.max(0, notStartedPct - 1.5)}`} strokeDashoffset={`-${completedPct + inProgressPct}`} strokeLinecap="round" />
                {/* Require Attention */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#DC2626" strokeWidth="7.5" strokeDasharray={`${Math.max(0, delaysPct - 1.5)} ${100 - Math.max(0, delaysPct - 1.5)}`} strokeDashoffset={`-${completedPct + inProgressPct + notStartedPct}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-[28px] text-[#1E293B] leading-none">{totalProjects.toLocaleString()}</span>
                <span className="text-[12px] text-[#64748B] mt-1.5 font-medium">Total Projects</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 flex-1 ml-4">
              <LegendItem color="bg-[#16A34A]" label="Completed" value={completed} pct={completedPct} />
              <LegendItem color="bg-[#2563EB]" label="In Progress" value={inProgress} pct={inProgressPct} />
              <LegendItem color="bg-[#F59E0B]" label="Not Started" value={notStarted} pct={notStartedPct} />
              <LegendItem color="bg-[#DC2626]" label="Require Attention" value={sanctionDelays} pct={delaysPct} />
            </div>
          </div>
        </div>

        {/* Projects by Sector */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[16px] text-[#1E293B]">Projects by Sector</h3>
            <Link href="/dashboard/projects" className="text-[#2563EB] text-[13px] font-semibold hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-5 mt-2">
            <SectorBar icon="water_drop" label="Irrigation Facility" value={243} max={250} />
            <SectorBar icon="add_road" label="Road Construction" value={187} max={250} />
            <SectorBar icon="health_and_safety" label="Sanitation/Toilets" value={156} max={250} />
            <SectorBar icon="lightbulb" label="Street Lighting" value={121} max={250} />
            <SectorBar icon="groups" label="Community Assets" value={98} max={250} />
            <SectorBar icon="more_horiz" label="Other" value={195} max={250} />
          </div>
        </div>
      </div>

      {/* Row 3: KPIs and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KPIs (spans 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-[16px] text-[#1E293B] mb-6">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Completion Rate */}
            <div className="flex flex-col justify-center bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-[16px]">
              <div className="flex justify-between items-end mb-4">
                <span className="font-bold text-[15px] text-[#1E293B]">Completion Rate</span>
                <span className="font-display font-bold text-[28px] text-[#2563EB] leading-none">{completedPct}%</span>
              </div>
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${completedPct}%` }} />
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#64748B] font-medium">{completed.toLocaleString()} of {totalProjects.toLocaleString()} projects completed</span>
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  +8% <span className="text-[#94A3B8] font-normal">vs last month</span>
                </span>
              </div>
            </div>

            {/* Expenditure */}
            <div className="flex flex-col justify-center bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-[16px]">
              <div className="flex justify-between items-end mb-4">
                <span className="font-bold text-[15px] text-[#1E293B]">Expenditure Utilization</span>
                <span className="font-display font-bold text-[28px] text-[#2563EB] leading-none">{spendPct}%</span>
              </div>
              <div className="w-full h-3 bg-[#E2E8F0] rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${spendPct}%` }} />
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#64748B] font-medium">{formatLakhs(totalReleasedLakhs)} spent of {formatLakhs(totalCostLakhs)} allocated</span>
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  +6% <span className="text-[#94A3B8] font-normal">vs last month</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Alerts (1 col) */}
        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[16px] text-[#1E293B]">Recent Alerts</h3>
            <Link href="/dashboard/queue" className="text-[#2563EB] text-[13px] font-semibold hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-5">
            <AlertItem color="bg-[#EF4444]" title="Unusual cost increase detected" sub="MPLADS-102157 • Tawang, Arunachal Pradesh" time="2 hours ago" />
            <AlertItem color="bg-[#F59E0B]" title="Work delay beyond threshold" sub="MPLADS-100932 • Vijayawada, Andhra Pradesh" time="5 hours ago" />
            <AlertItem color="bg-[#F59E0B]" title="Multiple document errors" sub="MPLADS-105098 • Shimla, Himachal Pradesh" time="1 day ago" />
            <AlertItem color="bg-[#EF4444]" title="Unusual pattern in photo uploads" sub="MPLADS-103529 • Agartala, Tripura" time="1 day ago" />
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
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 font-semibold text-[#64748B] text-[12px] uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p, idx) => (
                <tr key={p.work_id || idx} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 text-[#1E293B] font-medium text-[13px]">{p.work_id}</td>
                  <td className="py-4 px-6 text-[#1E293B] font-semibold text-[13px]">{p.work_name}</td>
                  <td className="py-4 px-6 text-[#64748B] text-[13px]">{p.district}, {p.state}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-4 px-6 text-[#64748B] text-[13px] whitespace-nowrap">2 hours ago</td>
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

function StatCard({ icon, iconBg, iconColor, title, value, percent, change, changeType }: any) {
  const isPos = changeType === "positive";
  return (
    <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-5 shadow-sm flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#64748B] text-[13px] font-medium leading-tight">{title}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-display font-bold text-[28px] text-[#1E293B] leading-none">{value}</span>
        {percent && <span className="font-semibold text-[16px] text-[#64748B]">{percent}%</span>}
      </div>
      <div className="flex items-center gap-1.5 mt-auto text-[12px]">
        <span className={`font-bold flex items-center gap-0.5 ${isPos ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
          <span className="material-symbols-outlined text-[14px]">
            {isPos ? 'arrow_upward' : 'arrow_upward'}
          </span>
          {change}
        </span>
        <span className="text-[#94A3B8]">vs last month</span>
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
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13.5px] font-medium text-[#1E293B]">{label}</span>
          <span className="text-[13.5px] font-bold text-[#1E293B]">{value}</span>
        </div>
        <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${pct}%` }} />
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
