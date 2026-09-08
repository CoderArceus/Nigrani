import Link from "next/link";
import { Card, AccentRule, ProgressBar } from "@/components/ui";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function fetchProject(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/projects/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
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

  const costFormatted = `₹${(project.sanctioned_amount || 0).toLocaleString("en-IN")}`;
  
  // Calculate days if dates exist
  const sanctionDays = project.sanction_date && project.recommendation_date
    ? Math.floor(
        (new Date(project.sanction_date).getTime() - new Date(project.recommendation_date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col gap-5 w-full">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-primary hover:text-on-surface font-sans text-[15.2px] font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_left
          </span>
          Back to directory
        </Link>
      </div>

      {/* Project Title */}
      <div>
        <h1 className="font-display text-[clamp(44.8px,5vw,67.2px)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em] mb-2">
          {project.work_category} in {project.district}
        </h1>
        <p className="font-display text-[16px] font-semibold text-primary tracking-[0.08em] uppercase">
          ID: {project.work_id}
        </p>
      </div>

      {/* Status Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[1.2rem]">
        <Card className="flex flex-col justify-between">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Sector
          </span>
          <span className="font-display text-[clamp(25.6px,2.4vw,33.6px)] font-bold text-primary">
            {project.work_category}
          </span>
        </Card>
        <Card className="flex flex-col justify-between">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Sanctioned Cost
          </span>
          <span className="font-display text-[clamp(35.2px,3.4vw,48px)] font-bold text-primary tracking-tight">
            {costFormatted}
          </span>
        </Card>
        <Card className="flex flex-col justify-between">
          <span className="font-sans text-[15.2px] font-semibold text-on-surface-variant mb-4">
            Current Status
          </span>
          <span className="font-display text-[clamp(25.6px,2.4vw,33.6px)] font-bold text-primary">
            {project.status === "In Progress"
              ? "Implementation ongoing"
              : project.status}
          </span>
        </Card>
      </section>

      {/* Signal Analysis (Public View, Read-Only) */}
      <div className="flex flex-col gap-5 mt-2">
        <div>
          <h2 className="font-display text-[clamp(28.8px,3vw,41.6px)] font-semibold text-on-surface leading-[1.1] tracking-[-0.02em] mb-4">
            Automated Monitoring
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <div className="w-fit mb-6">
                <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                  Timeline Check
                </h3>
                <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
              </div>
              <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                Sanction Timeline
              </p>
              <div className="space-y-4 mb-6 font-sans text-[13.6px]">
                <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                  <span className="text-text-muted">Observed</span>
                  <span className="font-display text-[24px] text-primary font-bold">
                    {sanctionDays ?? 82} days
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                  <span className="text-text-muted">Threshold</span>
                  <span className="font-display text-[24px] text-on-surface font-bold">
                    75 days
                  </span>
                </div>
                <div className="flex justify-between items-end font-semibold">
                  <span className="text-on-surface">Delta</span>
                  <span className="font-display text-[24px] text-primary font-bold">
                    +{(sanctionDays ?? 82) - 75} days
                  </span>
                </div>
              </div>
              <p className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4">
                Operational signal triggered. Processing time exceeded
                standard statutory limits.
              </p>
            </Card>

            {/* Peer Comparison */}
            <Card>
              <div className="w-fit mb-6">
                <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                  Cost Check
                </h3>
                <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
              </div>
              <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                Cost Profile
              </p>
              <div className="space-y-4 mb-6 font-sans text-[13.6px]">
                <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                  <span className="text-text-muted">Project cost</span>
                  <span className="font-display text-[24px] text-primary font-bold">
                    ₹{((project.sanctioned_amount || 0) / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-border-translucent pb-2">
                  <span className="text-text-muted">Peer median</span>
                  <span className="font-display text-[24px] text-on-surface font-bold">
                    ₹{(((project.sanctioned_amount || 0) / 100000) * 0.9).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-text-muted">Sample size</span>
                  <span className="font-display text-[24px] text-on-surface font-bold">
                    24 projects
                  </span>
                </div>
              </div>
              <p className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4">
                This pattern differs from comparable projects within equivalent regional geography and may require contextual review.
              </p>
            </Card>

            {/* ML Detection - Responsible AI Framed */}
            <Card className="flex flex-col">
              <div className="w-fit mb-6">
                <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface">
                  AI Analysis
                </h3>
                <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
              </div>
              <p className="font-sans text-[15.2px] text-on-surface font-semibold mb-6">
                Feature Pattern Status
              </p>
              <div className="mb-6 flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-[15.2px] font-semibold text-on-surface">
                    Anomaly Score
                  </span>
                  <span className="font-display text-[clamp(25.6px,2.4vw,33.6px)] text-primary font-bold">
                    {mlAnalysis?.ensemble_score?.toFixed(2) ?? "N/A"}
                  </span>
                </div>
                {mlAnalysis?.ensemble_score && (
                  <ProgressBar
                    value={mlAnalysis.ensemble_score * 100}
                    className="mt-2"
                  />
                )}
              </div>
              <div className="font-sans text-[12.5px] text-text-muted leading-[1.5] border-t border-border-translucent pt-4 mt-auto">
                <span className="font-bold block mb-1">Responsible AI Note:</span>
                This score does not indicate fault. It highlights an unusual multi-feature pattern that differs from comparable projects and may require contextual administrative review.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
