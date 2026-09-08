import React from "react";
import { Card } from "./ui";

interface AttentionProject {
  work_id: string;
  category: string;
  state: string;
  district: string;
  utilization: number;
  sanctioned_amount: number;
  released_amount: number;
  photo_count: number;
  status: string;
  health_score: string;
  reasons: string[];
}

interface ProjectsAttentionProps {
  projects: AttentionProject[];
}

export function ProjectsAttention({ projects }: ProjectsAttentionProps) {
  return (
    <Card className="flex-1 flex flex-col min-h-[500px]">
      <div className="flex flex-col gap-2 p-6 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-on-surface">Projects Requiring Attention</h3>
          <span className="text-xs font-medium text-on-surface-variant px-2 py-1 rounded bg-surface-container-high border border-outline-variant/30">Priority Monitoring</span>
        </div>
        <p className="text-xs text-on-surface-variant/80 italic border-l-2 border-primary pl-2">
          This is a project monitoring priority score, not a corruption or fraud score.
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 min-h-0">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center h-full text-on-surface-variant text-sm">
            No critical projects detected.
          </div>
        ) : (
          projects.map((p, i) => (
            <div 
              key={i} 
              className="p-4 m-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors border border-transparent flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${p.health_score === 'Critical Review' ? 'bg-error' : (p.health_score === 'At Risk' ? 'bg-amber-500' : 'bg-primary')}`} />
                  <span className="font-medium text-on-surface text-sm">{p.work_id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    p.health_score === 'Critical Review' ? 'bg-error/10 text-error border border-error/20' : 
                    (p.health_score === 'At Risk' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-primary/10 text-primary border border-primary/20')
                  }`}>
                    {p.health_score}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="text-sm font-medium text-on-surface-variant truncate">
                  {p.category}
                </div>
                <span className="text-xs text-on-surface-variant">{p.state}, {p.district}</span>
              </div>
              
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Funds Released</span>
                  <span className="text-on-surface font-medium text-sm">₹ {(p.released_amount / 10000000).toFixed(2)} Cr ({p.utilization}%)</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Status</span>
                  <span className="text-on-surface text-sm">{p.status}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 mt-1">
                {p.reasons.map((r, idx) => (
                  <div key={idx} className="text-[11px] text-on-surface-variant bg-surface-container-low p-1.5 rounded border border-outline-variant/20 flex items-start gap-2">
                    <span className="text-error/70 mt-0.5">•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
