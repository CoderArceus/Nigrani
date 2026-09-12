"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { globalClearedIds } from "@/lib/mockStore";

import {
  Card,
  ProgressBar,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui";

import { getProjectExplanation } from "@/lib/api";
import { parseFlagReasons } from "@/lib/flagReasons";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMarkAsReviewed = () => {
    try {
      globalClearedIds.add(id);
      router.push("/dashboard/queue");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProjectExplanation(id)
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load project details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-on-surface">
        Loading project analysis...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-red-600">
        {error || "Project not found"}
      </div>
    );
  }

  const project = data.project;

  const ensembleScore = Number(data.ensemble_score ?? 0);

  const riskLevel = data.risk_level ?? "Normal";

  const reasons: string[] = data.reasons ?? [];
  const parsedReasons = parseFlagReasons(reasons, {
    sanctioned_amount: project.sanctioned_amount,
    released_amount: project.released_amount,
    recommendation_date: project.recommendation_date,
    sanction_date: project.sanction_date,
    completion_date: project.completion_date,
    photo_count: project.photo_count,
    work_category: project.work_category,
    status: project.status,
  });

  const sanctionedAmount = Number(project.sanctioned_amount ?? 0);
  const releasedAmount = Number(project.released_amount ?? 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getRiskClass = () => {
    if (riskLevel === "Critical") return "text-red-600";
    if (riskLevel === "High Risk") return "text-orange-600";
    if (riskLevel === "Medium Risk") return "text-yellow-600";
    return "text-primary";
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/dashboard/queue"
          className="inline-flex items-center gap-1 text-primary hover:text-on-surface font-sans text-[15.2px] font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_left
          </span>
          Back to review queue
        </Link>
      </div>

      {/* Project Title */}
      <div>
        <h1 className="font-display text-[clamp(44.8px,5vw,67.2px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em] mb-2">
          {project.work_category}
        </h1>

        <p className="font-display text-[16px] font-semibold text-primary tracking-[0.08em]">
          ID: {data.work_id}
        </p>
      </div>

      {/* Status Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card className="flex flex-col justify-between min-w-0 overflow-hidden">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Sector
          </span>

          <span className="font-display text-[clamp(22px,2vw,32px)] font-bold text-primary break-words leading-tight">
            {project.work_category}
          </span>
        </Card>

        <Card className="flex flex-col justify-between min-w-0 overflow-hidden">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Sanctioned Cost
          </span>

          <span className="font-display text-[clamp(22px,2vw,32px)] font-bold text-primary tracking-tight break-words">
            {formatCurrency(sanctionedAmount)}
          </span>
        </Card>

        <Card className="flex flex-col justify-between min-w-0 overflow-hidden">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Current Status
          </span>

          <span
            className={`font-display text-[clamp(24px,2.2vw,32px)] font-bold break-words ${getRiskClass()}`}
          >
            {project.status}
          </span>
        </Card>

      </section>

      {/* Signal Analysis + Officer Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Signal Analysis */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          <div>

            <h2 className="font-display text-[clamp(28.8px,3vw,41.6px)] font-semibold text-on-surface leading-[1.1] tracking-[-0.02em] mb-6">
              Why was this flagged?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2rem] min-w-0">

              {/* Timeline Check */}
              <Card className="min-w-0 overflow-hidden">
                <div className="w-fit mb-6">
                  <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                    Timeline Check
                  </h3>

                  <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
                </div>

                <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                  Project dates
                </p>

                <div className="space-y-4 mb-6 font-sans text-[13.6px]">

                  <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                    <span className="text-text-muted">
                      Recommendation
                    </span>

                    <span className="font-display text-[18px] text-primary font-bold">
                      {formatDate(project.recommendation_date)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                    <span className="text-text-muted">
                      Sanction
                    </span>

                    <span className="font-display text-[18px] text-on-surface font-bold">
                      {formatDate(project.sanction_date)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-text-muted">
                      Completion
                    </span>

                    <span className="font-display text-[18px] text-on-surface font-bold">
                      {formatDate(project.completion_date)}
                    </span>
                  </div>

                </div>

                <p className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4">
                  Timeline information is shown directly from the MPLADS
                  project record.
                </p>
              </Card>

              {/* Cost Check */}
              <Card className="min-w-0 overflow-hidden">

                <div className="w-fit mb-6">
                  <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                    Cost Check
                  </h3>

                  <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
                </div>

                <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                  Financial signals
                </p>

                <div className="space-y-4 mb-6 font-sans text-[13.6px]">

                  <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                    <span className="text-text-muted">
                      Sanctioned
                    </span>

                    <span className="font-display text-[20px] text-primary font-bold">
                      {formatCurrency(sanctionedAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                    <span className="text-text-muted">
                      Released
                    </span>

                    <span className="font-display text-[20px] text-on-surface font-bold">
                      {formatCurrency(releasedAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-text-muted">
                      Release ratio
                    </span>

                    <span className="font-display text-[20px] text-on-surface font-bold">
                      {sanctionedAmount > 0
                        ? `${((releasedAmount / sanctionedAmount) * 100).toFixed(1)}%`
                        : "0%"}
                    </span>
                  </div>

                </div>

                <p className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4">
                  Financial values are taken directly from the project
                  record.
                </p>

              </Card>

              {/* ML Detection */}
              <Card className="flex flex-col min-w-0 overflow-hidden">

                <div className="w-fit mb-6">
                  <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                    AI Analysis
                  </h3>

                  <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
                </div>

                <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                  {riskLevel} risk detected
                </p>

                <div className="mb-6">

                  <div className="flex justify-between items-end mb-2">

                    <span className="font-sans text-[15.2px] font-semibold text-on-surface">
                      Ensemble Score
                    </span>

                    <span className="font-display text-[clamp(25.6px,2.4vw,33.6px)] text-primary font-bold">
                      {ensembleScore.toFixed(2)}
                    </span>

                  </div>

                  <ProgressBar
                    value={ensembleScore * 100}
                    className="mt-2"
                  />

                </div>

                <div className="space-y-2 mb-6">

                  <p className="font-sans text-[13px] font-semibold text-on-surface">
                    Detection signals ({parsedReasons.length})
                  </p>

                  {parsedReasons.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                      {parsedReasons.map((reason, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-high/50 border border-border-translucent"
                        >
                          <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 bg-red-100/80 text-red-600">
                            <span className="material-symbols-outlined text-[14px]">
                              {reason.icon}
                            </span>
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-sans text-[13px] font-semibold text-on-surface leading-tight">
                                {reason.label}
                              </span>
                              {reason.deviationBadge && (
                                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full border bg-surface-container text-primary border-outline-variant/40 font-mono whitespace-nowrap">
                                  {reason.deviationBadge}
                                </span>
                              )}
                            </div>

                            {reason.deviationDetail && (
                              <div className="text-[11px] font-medium text-text-muted bg-surface/60 rounded px-2 py-1 mt-1 border border-border-translucent flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[12px] text-primary shrink-0">
                                  analytics
                                </span>
                                <span>{reason.deviationDetail}</span>
                              </div>
                            )}

                            <span className="font-sans text-[11.5px] text-text-muted leading-snug mt-1">
                              {reason.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-sans text-[13px] text-text-muted">
                      No specific signals recorded.
                    </p>
                  )}

                </div>

                <p className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4 mt-auto">
                  Detection combines Isolation Forest, Local Outlier Factor,
                  and network-risk signals.
                </p>

              </Card>

            </div>
          </div>
        </div>

        {/* Right: Officer Actions */}
        <div className="lg:col-span-4">

          <Card className="sticky top-8">

            <h2 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface leading-[1.3] tracking-[-0.02em] pb-3 border-b border-border-translucent mb-6">
              Officer Actions
            </h2>

            <div className="space-y-6">

              {/* Project Information */}
              <div className="space-y-3">

                <div>
                  <span className="block font-sans text-[12px] text-text-muted">
                    MP
                  </span>

                  <span className="font-sans text-[14px] font-semibold text-on-surface">
                    {project.mp_name}
                  </span>
                </div>

                <div>
                  <span className="block font-sans text-[12px] text-text-muted">
                    Location
                  </span>

                  <span className="font-sans text-[14px] font-semibold text-on-surface">
                    {project.district}, {project.state}
                  </span>
                </div>

                <div>
                  <span className="block font-sans text-[12px] text-text-muted">
                    ML Model
                  </span>

                  <span className="font-sans text-[14px] font-semibold text-on-surface">
                    {data.model_version}
                  </span>
                </div>

              </div>

              {/* Status Dropdown */}
              <div>

                <label className="block font-sans text-[13.6px] font-semibold text-on-surface-variant mb-2">
                  Update Status
                </label>

                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-sans text-[13.6px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none">

                  <option>Under Investigation</option>
                  <option>Cleared</option>
                  <option>Requires Field Audit</option>
                  <option>Escalated to District Collector</option>

                </select>

              </div>

              {/* Remark */}
              <div>

                <label className="block font-sans text-[13.6px] font-semibold text-on-surface-variant mb-2">
                  Record Remark
                </label>

                <textarea
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-sans text-[13.6px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  placeholder="Enter findings or justification..."
                  rows={4}
                />

              </div>

              {/* Buttons */}
              <div className="pt-2 space-y-3">

                <PrimaryButton
                  icon="done_all"
                  className="w-full"
                  onClick={handleMarkAsReviewed}
                >
                  Mark as Reviewed
                </PrimaryButton>

                <SecondaryButton
                  icon="priority_high"
                  className="w-full"
                >
                  Escalate Issue
                </SecondaryButton>

              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

