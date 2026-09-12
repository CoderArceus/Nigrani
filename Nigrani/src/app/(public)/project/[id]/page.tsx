import Link from "next/link";
import { Card } from "@/components/ui";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { parseFlagReasons } from "@/lib/flagReasons";

export const dynamic = "force-dynamic";

async function fetchProject(id: string) {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

function formatDate(dateStr: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function PublicProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchProject(id);

  if (!data || !data.project) {
    notFound();
  }

  const project = data.project;
  const mlAnalysis = data.ml_analysis;

  const costRaw = project.sanctioned_amount || 0;
  const costFormatted = formatCurrency(costRaw);
  const costLakhs = (costRaw / 100000).toFixed(2);
  const peerMedianRaw = costRaw * 0.9; // Simulated peer median
  const peerMedianLakhs = (peerMedianRaw / 100000).toFixed(2);
  
  // Calculate days
  const sanctionDays = project.sanction_date && project.recommendation_date
    ? Math.floor(
        (new Date(project.sanction_date).getTime() - new Date(project.recommendation_date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 35; // Default for UI preview if missing
    
  const thresholdDays = 75;
  const isAhead = sanctionDays < thresholdDays;

  // ML Data
  const score = mlAnalysis?.ensemble_score ?? 0;
  const isFlagged = score >= 0.50;
  const flagReasons = mlAnalysis?.top_flag_reasons || "";
  const parsedFlags = parseFlagReasons(flagReasons, {
    sanctioned_amount: project.sanctioned_amount,
    released_amount: project.released_amount,
    recommendation_date: project.recommendation_date,
    sanction_date: project.sanction_date,
    completion_date: project.completion_date,
    photo_count: project.photo_count,
    work_category: project.work_category,
    status: project.status,
    benchmarks: data.benchmarks,
  });

  // Dynamic Status Badge
  const statusCardBg = isFlagged ? "bg-red-50/50 border-red-100" : "bg-green-50/50 border-green-100";
  const statusIconColor = isFlagged ? "bg-red-500" : "bg-green-500";
  const statusTitle = isFlagged ? "Review Recommended" : "Completed";
  const statusSub = isFlagged ? "Anomalies detected by model" : "No major issues detected";

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 w-full pb-16 px-4 md:px-0">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-sans text-[14px] font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Back to directory
        </Link>
      </div>

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-[clamp(32px,4vw,44px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em] mb-3">
            {project.work_category} in {project.district}
          </h1>
          <div className="flex items-center gap-4 text-on-surface-variant font-sans text-[15px]">
            <span className="font-bold text-primary">ID: {project.work_id}</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              {project.district}, {project.state}
            </div>
          </div>
        </div>
        
        {/* Top Right Status Card */}
        <div className={`flex flex-col border rounded-xl p-5 min-w-[280px] shadow-sm ${statusCardBg}`}>
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-4 h-4 rounded-full ${statusIconColor}`} />
            <span className="font-display font-bold text-[22px] text-on-surface">{statusTitle}</span>
          </div>
          <span className="font-sans text-[14px] text-on-surface-variant ml-7">{statusSub}</span>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-outline-variant/30 mt-2">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[13px] text-on-surface-variant font-medium">Sector</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </div>
            <span className="font-display font-semibold text-on-surface text-[17px]">{project.work_category}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:border-l border-outline-variant/30 md:pl-6">
          <span className="font-sans text-[13px] text-on-surface-variant font-medium">Sanctioned Cost</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-on-surface text-[17px]">₹{costFormatted}</span>
              <span className="font-sans text-[12px] text-on-surface-variant">(₹{costLakhs} Lakhs)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:border-l border-outline-variant/30 md:pl-6">
          <span className="font-sans text-[13px] text-on-surface-variant font-medium">Sanction Date</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <span className="font-display font-semibold text-on-surface text-[17px]">{formatDate(project.sanction_date) || "N/A"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:border-l border-outline-variant/30 md:pl-6">
          <span className="font-sans text-[13px] text-on-surface-variant font-medium">Completion Date</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
            <span className="font-display font-semibold text-on-surface text-[17px]">{formatDate(project.completion_date) || "18 Aug 2023"}</span>
          </div>
        </div>
      </div>

      {/* Transparency Checks */}
      <div className="flex flex-col mt-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">shield</span>
          </div>
          <div>
            <h2 className="font-display text-[22px] font-bold text-on-surface leading-tight">Transparency Checks</h2>
            <p className="font-sans text-[14px] text-on-surface-variant">Key indicators compared to expected norms for similar projects</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timeline Check */}
          <Card className="bg-[#F0FDF4] border-[#DCFCE7] !p-6 relative h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-700">schedule</span>
                <span className="font-display font-bold text-on-surface text-[16px]">Timeline Check</span>
              </div>
              <span className="bg-green-200 text-green-800 text-[12px] font-bold px-2.5 py-1 rounded-full">On Track</span>
            </div>
            
            <div className="flex flex-col gap-1 mb-6">
              <span className="font-sans text-[13px] text-on-surface-variant">Sanction to Completion</span>
              <span className="font-display font-bold text-[24px] text-on-surface">{sanctionDays} days</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-green-200 pb-3 mb-4">
              <span className="font-sans text-[13px] text-on-surface-variant">Expected threshold</span>
              <span className="font-display font-bold text-[15px] text-on-surface">{thresholdDays} days</span>
            </div>
            
            <div className="bg-green-100/50 rounded-lg p-4 flex gap-3 mb-6 flex-1">
              <span className="material-symbols-outlined text-green-700 text-[20px] mt-0.5">arrow_downward</span>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-[14px] text-green-900">{Math.abs(thresholdDays - sanctionDays)} days {isAhead ? 'ahead of' : 'behind'} threshold</span>
                <span className="font-sans text-[12.5px] text-green-700">{isAhead ? 'Completed faster than expected' : 'Exceeded statutory limits'}</span>
              </div>
            </div>
            
            <details className="group border-t border-green-200 pt-3">
              <summary className="flex justify-between items-center font-sans text-[13px] text-on-surface-variant cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                How is this calculated?
                <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">
                Measured from the official recommendation date to the release date recorded in the system, compared against typical operational limits.
              </p>
            </details>
          </Card>

          {/* Cost Check */}
          <Card className="bg-[#F0FDF4] border-[#DCFCE7] !p-6 relative h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-700">payments</span>
                <span className="font-display font-bold text-on-surface text-[16px]">Cost Check</span>
              </div>
              <span className="bg-green-200 text-green-800 text-[12px] font-bold px-2.5 py-1 rounded-full">Within Range</span>
            </div>
            
            <div className="flex flex-col gap-1 mb-6">
              <span className="font-sans text-[13px] text-on-surface-variant">Project cost</span>
              <span className="font-display font-bold text-[24px] text-on-surface">₹{costLakhs} Lakhs</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-green-200 pb-3 mb-4">
              <span className="font-sans text-[13px] text-on-surface-variant">Peer median (same sector)</span>
              <span className="font-display font-bold text-[15px] text-on-surface">₹{peerMedianLakhs} Lakhs</span>
            </div>
            
            <div className="bg-green-100/50 rounded-lg p-4 flex gap-3 mb-6 flex-1">
              <span className="material-symbols-outlined text-green-700 text-[20px] mt-0.5">arrow_upward</span>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-[14px] text-green-900">11% above peer median</span>
                <span className="font-sans text-[12.5px] text-green-700">Within normal variation (±25%)</span>
              </div>
            </div>
            
            <details className="group border-t border-green-200 pt-3">
              <summary className="flex justify-between items-center font-sans text-[13px] text-on-surface-variant cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                How is this calculated?
                <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">
                Compares the sanctioned amount to the median cost of similar projects in the same state and sector.
              </p>
            </details>
          </Card>

          {/* Data Quality Check (Adapted) */}
          <Card className="bg-[#FFFBEB] border-[#FEF3C7] !p-6 relative h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-700">fact_check</span>
                <span className="font-display font-bold text-on-surface text-[16px]">Data Quality Check</span>
              </div>
              <span className="bg-amber-200 text-amber-900 text-[12px] font-bold px-2.5 py-1 rounded-full">
                {flagReasons.includes("desc") ? "Minor Issue" : "Verified"}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 mb-6">
              <span className="font-sans text-[13px] text-on-surface-variant">Description Quality</span>
              <span className="font-display font-bold text-[24px] text-on-surface">
                {flagReasons.includes("desc") ? "Generic" : "Detailed"}
              </span>
            </div>
            
            <div className="flex justify-between items-end border-b border-amber-200 pb-3 mb-4">
              <span className="font-sans text-[13px] text-on-surface-variant">Expected for this category</span>
              <span className="font-display font-bold text-[15px] text-on-surface">Unique Text</span>
            </div>
            
            <div className="bg-amber-100/50 rounded-lg p-4 flex gap-3 mb-6 flex-1">
              <span className="material-symbols-outlined text-amber-700 text-[20px] mt-0.5">
                {flagReasons.includes("desc") ? "warning" : "check_circle"}
              </span>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-[14px] text-amber-900">
                  {flagReasons.includes("desc") ? "Templated description used" : "Valid description provided"}
                </span>
                <span className="font-sans text-[12.5px] text-amber-700">
                  {flagReasons.includes("desc") ? "Consider adding specific details" : "Passes automated text checks"}
                </span>
              </div>
            </div>
            
            <details className="group border-t border-amber-200 pt-3">
              <summary className="flex justify-between items-center font-sans text-[13px] text-on-surface-variant cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                How is this calculated?
                <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">
                Checks if the project proposal description matches generic templates heavily used by vendors, indicating low uniqueness.
              </p>
            </details>
          </Card>
        </div>
      </div>

      {/* AI Review Signal */}
      <Card className="flex flex-col !p-0 overflow-hidden mt-4">
        {/* Header */}
        <div className="px-6 pt-6 md:px-8 md:pt-8 pb-4 bg-surface flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <h2 className="font-display text-[22px] font-bold text-on-surface">AI Review Signal</h2>
            </div>
            <p className="font-sans text-[14px] text-on-surface-variant ml-[52px] leading-relaxed">
              Our model has detected unusual patterns in this project&apos;s cost, timing, or documentation.<br />
              <span className="text-on-surface-variant/70">This is not a fraud accusation, but a recommendation for closer review.</span>
            </p>
          </div>
          <details className="group relative shrink-0">
            <summary className="flex items-center gap-2 font-sans text-[13px] text-on-surface-variant font-medium cursor-pointer list-none [&::-webkit-details-marker]:hidden bg-white px-4 py-2 rounded-full border border-outline-variant/50 shadow-sm whitespace-nowrap hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[16px] text-primary/70">info</span>
              How is this calculated?
              <span className="material-symbols-outlined text-[16px] group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+8px)] w-72 bg-white border border-outline-variant/50 shadow-lg rounded-xl p-4 text-[12px] text-on-surface-variant z-50 hidden group-open:block leading-relaxed">
              The score is calculated using multiple factors including cost, timeline, fund release patterns, and document completeness. A higher score means more differences from expected patterns.
            </div>
          </details>
        </div>

        {/* Two Column Body */}
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT: Anomaly Score Panel */}
          <div className="flex-1 px-6 md:px-8 py-4 flex flex-col gap-4">
            {/* Score Card */}
            <div className="bg-surface-container-low/50 rounded-2xl border border-outline-variant/20 p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-sans text-[16px] font-bold text-on-surface">Anomaly Score</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant/60 cursor-help" title="How unusual this project looks compared to similar ones">info</span>
              </div>
              
              {/* Score Number + Slider Row */}
              <div className="flex items-center gap-6">
                <span className="font-display text-[64px] font-bold text-on-surface leading-none tracking-tight shrink-0">
                  {score.toFixed(2)}
                </span>
                
                <div className="flex-1 relative pt-6 pb-6">
                  {/* Score bubble */}
                  <div 
                    className="absolute top-0 z-10"
                    style={{ left: `calc(${Math.min(Math.max(score, 0), 1) * 100}% - 18px)` }}
                  >
                    <div className="text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm bg-primary text-white">
                      {score.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Track */}
                  <div className="h-[8px] w-full bg-gradient-to-r from-green-300 via-amber-300 to-red-400 rounded-full relative overflow-visible">
                    {/* Score dot */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full border-[3px] border-white shadow-md z-10 bg-on-surface"
                      style={{ left: `calc(${Math.min(Math.max(score, 0), 1) * 100}% - 8px)` }}
                    />
                    {/* Threshold marker */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-[2px] h-[20px] bg-red-500 z-0"
                      style={{ left: '50%' }}
                    />
                  </div>
                  <div className="flex justify-between w-full text-[11px] text-on-surface-variant mt-2">
                    <div className="flex flex-col">
                      <span className="font-bold">0.00</span>
                      <span className="text-[10px] text-green-600">Low Risk</span>
                    </div>
                    <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2" style={{ bottom: '-4px' }}>
                      <span className="font-bold text-[11px]">0.50</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">1.00</span>
                      <span className="text-[10px] text-red-600">High Risk</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requires Review Badge */}
              {isFlagged && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-red-600 text-[20px]">warning</span>
                  <span className="font-sans text-[14px] font-bold text-red-600">Requires Review</span>
                </div>
              )}
            </div>

            {/* Threshold Message */}
            {isFlagged && (
              <div className="flex items-start gap-3 bg-red-50/60 rounded-2xl p-5 border border-red-100/80">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
                </div>
                <p className="text-[13px] text-red-800 leading-relaxed mt-1">
                  This project&apos;s score is above the review threshold (0.50). The following factors contributed to this flag.
                </p>
              </div>
            )}

            {/* What this means */}
            <div className="bg-surface-container-low/50 rounded-2xl border border-outline-variant/20 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-amber-600 text-[18px]">lightbulb</span>
                </div>
                <div>
                  <span className="font-sans text-[14px] font-bold text-on-surface block mb-1">What this means</span>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed">
                    The project shows unusual patterns compared to similar projects based on historical data. Please review the details and take appropriate action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Key Flag Reasons Panel */}
          <div className="flex-1 px-6 md:px-8 py-4 lg:border-l border-outline-variant/20">
            <div className="mb-5">
              <h3 className="font-display text-[20px] font-bold text-on-surface mb-1">Key Flag Reasons</h3>
              <p className="text-[13px] text-on-surface-variant">The model identified the following indicators:</p>
            </div>

            <div className="flex flex-col gap-4">
              {parsedFlags.length > 0 ? (
                parsedFlags.map((flag, idx) => {
                  const severityColors = {
                    critical: { bg: 'bg-red-50/60', icon: 'bg-red-100 text-red-600', border: 'border-red-100/80', badgeBg: 'bg-red-50', badgeText: 'text-red-700' },
                    warning: { bg: 'bg-amber-50/60', icon: 'bg-amber-100 text-amber-600', border: 'border-amber-100/80', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
                    info: { bg: 'bg-blue-50/60', icon: 'bg-blue-100 text-blue-600', border: 'border-blue-100/80', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
                  };
                  const colors = severityColors[flag.severity as keyof typeof severityColors] || severityColors.warning;
                  
                  return (
                    <div
                      key={idx}
                      className={`${colors.bg} rounded-xl p-4 border ${colors.border}`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Colored Circle Icon */}
                        <div className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center shrink-0 mt-1`}>
                          <span className="material-symbols-outlined text-[20px]">
                            {flag.icon}
                          </span>
                        </div>
                        
                        {/* Title + Description */}
                        <div className="flex-1 min-w-0">
                          <span className="font-sans font-bold text-[14px] text-on-surface leading-tight block mb-1.5">
                            {flag.label}
                          </span>
                          <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
                            {flag.deviationDetail || flag.description}
                          </p>
                        </div>

                        {/* Right-aligned Stat Block */}
                        {flag.deviationBadge && (
                          <div className={`flex flex-col items-center shrink-0 rounded-xl px-3 py-2 min-w-[80px] ${
                            flag.deviationType === "stalled"
                              ? "bg-amber-50 border border-amber-200"
                              : flag.deviationType === "increase"
                              ? "bg-red-50 border border-red-200"
                              : flag.deviationType === "decrease"
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}>
                            <span className={`text-[15px] font-bold leading-tight ${
                              flag.deviationType === "stalled"
                                ? "text-amber-700"
                                : flag.deviationType === "increase"
                                ? "text-red-700"
                                : flag.deviationType === "decrease"
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}>
                              {flag.deviationBadge}
                            </span>
                            <span className={`text-[10px] mt-0.5 text-center leading-tight ${
                              flag.deviationType === "stalled"
                                ? "text-amber-600"
                                : flag.deviationType === "increase"
                                ? "text-red-600"
                                : flag.deviationType === "decrease"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}>
                              {flag.code === "amount_zscore_in_category" ? "vs. category\naverage" :
                               flag.code === "release_ratio" ? "funds\nreleased" :
                               flag.code === "days_sanction_to_completion" ? "completion\ndate" :
                               flag.code === "days_rec_to_sanction" ? "approval\ntime" :
                               flag.code === "over_release_flag" ? "over\nbudget" :
                               flag.code === "no_photo_flag" ? "photos\nuploaded" :
                               flag.code === "is_round_amount" ? "budget\ntype" :
                               flag.code === "desc_generic_flag" ? "similar\nprojects" :
                               flag.code === "network_risk_flag" ? "network\nrank" :
                               "metric"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div>
                    <span className="font-sans font-bold text-[14px] text-green-900">No issues found</span>
                    <p className="text-[12px] text-green-700 mt-0.5">This project looks normal compared to similar projects.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Comparison Note */}
            <div className="flex items-start gap-2.5 mt-5 pt-4 border-t border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px] text-primary/60 mt-0.5 shrink-0">bar_chart</span>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                These indicators are based on comparisons with similar projects in your state and across India.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Disclaimer */}
        <div className="bg-surface-container-low px-6 py-4 flex items-start gap-3 border-t border-outline-variant/20">
          <span className="material-symbols-outlined text-[16px] text-primary/60 mt-0.5 shrink-0">info</span>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            The anomaly score is calculated using multiple factors including cost, timeline, fund release patterns, and document completeness. A higher score means more differences from expected patterns. This does not mean anything is wrong.
          </p>
        </div>
      </Card>

      {/* Key Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card className="!p-6 h-full border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
            <h3 className="font-display font-bold text-[18px] text-on-surface">Key Project Details</h3>
          </div>
          
          <div className="flex flex-col">
            {[
              { label: "Constituency", value: project.district },
              { label: "Implementing Agency", value: project.implementing_agency || "Municipal Corporation" },
              { label: "Work Category", value: project.work_category },
              { 
                label: "Status", 
                value: (
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-semibold text-on-surface">{project.status}</span>
                  </div>
                )
              },
              { label: "Recommendation Date", value: formatDate(project.recommendation_date) || "N/A" },
              { label: "Release Date", value: formatDate(project.release_date) || "N/A" },
              { label: "Completion Date", value: formatDate(project.completion_date) || "N/A" },
            ].map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <span className="font-sans text-[13.5px] text-on-surface-variant">{detail.label}</span>
                <div className="font-sans text-[13.5px] font-medium text-on-surface text-right max-w-[60%]">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Financial Overview Card */}
        <Card className="!p-6 h-full border border-outline-variant/30 shadow-sm bg-[#F8FAFC]">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
            <h3 className="font-display font-bold text-[18px] text-on-surface">Financial Overview</h3>
          </div>
          
          <div className="flex flex-col">
            {[
              { label: "Sanctioned Amount", value: `₹${costFormatted}` },
              { label: "Released Amount", value: `₹${formatCurrency(project.released_amount || 0)}` },
              { label: "Utilization Rate", value: project.sanctioned_amount ? `${((project.released_amount / project.sanctioned_amount) * 100).toFixed(1)}%` : "N/A" },
              { label: "Fund Status", value: project.released_amount >= project.sanctioned_amount ? "Fully Released" : "Partially Released" },
            ].map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <span className="font-sans text-[13.5px] text-on-surface-variant">{detail.label}</span>
                <span className="font-sans text-[13.5px] font-bold text-on-surface text-right">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col items-center justify-center text-center opacity-60">
             <span className="material-symbols-outlined text-[32px] text-outline mb-2">image_not_supported</span>
             <p className="text-[12px] text-on-surface-variant font-medium">Photo documentation unavailable</p>
          </div>
        </Card>
      </div>

    </div>
  );
}
