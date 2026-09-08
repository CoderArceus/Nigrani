"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import nextDynamic from "next/dynamic";
import { API_BASE_URL } from "@/lib/api";

const IndiaMap = nextDynamic(() => import("@/components/IndiaMap").then(mod => ({ default: mod.IndiaMap })), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-on-surface-variant">Loading map…</div>,
});

export const dynamic = "force-dynamic";

type Metric = "Fund Utilization" | "Delayed Projects" | "Anomaly Score";

export default function PublicMapPage() {
  const [metric, setMetric] = useState<Metric>("Fund Utilization");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  
  const [stateMetrics, setStateMetrics] = useState<any[]>([]);
  const [districtMetrics, setDistrictMetrics] = useState<any[]>([]);

  // Refs for scrolling
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Fetch state metrics on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard/state-summary`)
      .then(res => res.json())
      .then(data => {
        const metrics = data.states.map((s: any) => ({
          id: s.state.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: s.state,
          allocatedCr: s.total_sanctioned_amount / 10000000, 
          utilizedCr: s.total_released_amount / 10000000,
          utilizationPercent: s.total_sanctioned_amount > 0 ? Math.round((s.total_released_amount / s.total_sanctioned_amount) * 100) : 0,
          mpCount: s.unique_mps,
          completedProjects: s.completed_projects,
          totalProjects: s.total_projects,
          delayedProjects: s.delayed_projects,
          avgAnomalyScore: s.avg_anomaly_score || 0,
        }));
        setStateMetrics(metrics);
      })
      .catch(console.error);
  }, []);

  // Fetch district metrics when a state is selected
  useEffect(() => {
    if (!selectedStateId) {
      setDistrictMetrics([]);
      return;
    }

    // Find the real state name from the slug ID
    const actualStateName = stateMetrics.find(s => s.id === selectedStateId)?.name || selectedStateId;

    fetch(`${API_BASE_URL}/dashboard/district-summary?state=${encodeURIComponent(actualStateName)}`)
      .then(res => res.json())
      .then(data => {
        const metrics = data.districts.map((d: any) => ({
          id: d.district.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: d.district,
          allocatedCr: d.total_sanctioned_amount / 10000000,
          utilizedCr: d.total_released_amount / 10000000,
          utilizationPercent: d.total_sanctioned_amount > 0 ? Math.round((d.total_released_amount / d.total_sanctioned_amount) * 100) : 0,
          mpCount: d.unique_mps,
          completedProjects: d.completed_projects,
          totalProjects: d.total_projects,
          delayedProjects: d.delayed_projects,
          avgAnomalyScore: d.avg_anomaly_score,
        }));
        setDistrictMetrics(metrics);
      })
      .catch(console.error);
  }, [selectedStateId, stateMetrics]);

  const filteredStates = useMemo(() => {
    // 1. Get base data (State metrics OR District metrics if a state is selected)
    const baseData = selectedStateId ? districtMetrics : stateMetrics;

    // 2. Sort data
    let sorted = [...baseData].sort((a, b) => {
      if (metric === "Fund Utilization") return b.utilizationPercent - a.utilizationPercent;
      if (metric === "Delayed Projects") return b.delayedProjects - a.delayedProjects;
      return b.avgAnomalyScore - a.avgAnomalyScore;
    });

    // 3. Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      sorted = sorted.filter((item) => item.name.toLowerCase().includes(q));
    }

    return sorted;
  }, [metric, searchQuery, selectedStateId, stateMetrics, districtMetrics]);

  // We need a separate useMemo for the state data that is ALWAYS states, but still respects searchQuery!
  // This is passed to IndiaMap so that when zoomed into a state, the background states remain beautifully colored!
  const filteredBackgroundStates = useMemo(() => {
    let sorted = [...stateMetrics];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      sorted = sorted.filter((item) => item.name.toLowerCase().includes(q));
    }
    return sorted;
  }, [searchQuery, stateMetrics]);

  // Handle sync scrolling
  useEffect(() => {
    if (selectedStateId && rowRefs.current[selectedStateId]) {
      rowRefs.current[selectedStateId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedStateId]);

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Title Area matching the Public page style */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-on-surface tracking-tight leading-tight">
          State Map
        </h1>
        <p className="font-sans text-[15.2px] text-on-surface-variant max-w-3xl leading-relaxed">
          Interactive geographic visualization of state-level utilization and signals.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-220px)] min-h-[600px]">
        {/* LEFT COLUMN: Map Area */}
        <div className="flex-1 flex flex-col gap-4 min-w-[50%] h-full">
          {/* Metric Toggle */}
          <div className="flex items-center bg-surface-container-low rounded-full p-1 w-fit border border-outline-variant/30">
            {(["Fund Utilization", "Delayed Projects", "Anomaly Score"] as Metric[]).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-4 py-2 rounded-full font-sans text-[13.6px] font-medium transition-all ${
                  metric === m
                    ? "bg-surface text-on-surface shadow-sm border border-outline-variant/30"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface/50 border border-transparent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-0 relative">
            <IndiaMap
              data={filteredStates}
              stateData={filteredBackgroundStates}
              metric={metric}
              selectedStateId={selectedStateId}
              hoveredStateId={hoveredStateId}
              onStateSelect={(id) => setSelectedStateId(id)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Ranked State List */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4 h-full shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest text-on-surface border border-outline-variant/50 rounded-2xl font-sans text-[13.6px] focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/70 transition-colors shadow-sm"
            />
          </div>

          <div className="flex items-center justify-between px-2">
            <span className="font-sans text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Ranked by {metric}
            </span>
            <span className="font-sans text-[12px] text-on-surface-variant">
              {filteredStates.length} Results
            </span>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 custom-scrollbar pb-10"
          >
            {filteredStates.map((state, index) => {
              const isSelected = selectedStateId === state.id;
              
              // Format value based on metric
              let metricValueDisplay = "";
              let progressValue = 0;
              
              if (metric === "Fund Utilization") {
                metricValueDisplay = `${state.utilizationPercent}%`;
                progressValue = state.utilizationPercent;
              } else if (metric === "Delayed Projects") {
                metricValueDisplay = `${state.delayedProjects}`;
                progressValue = (state.delayedProjects / Math.max(1, ...stateMetrics.map(s => s.delayedProjects))) * 100;
              } else {
                metricValueDisplay = `${state.avgAnomalyScore.toFixed(3)}`;
                progressValue = (state.avgAnomalyScore / Math.max(0.001, ...stateMetrics.map(s => s.avgAnomalyScore))) * 100;
              }

              return (
                <div
                  key={state.id}
                  ref={(el) => {
                    rowRefs.current[state.id] = el;
                  }}
                  onClick={() => setSelectedStateId(state.id)}
                  onMouseEnter={() => setHoveredStateId(state.id)}
                  onMouseLeave={() => setHoveredStateId(null)}
                  className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary/5 border-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/60 hover:bg-surface-container-lowest/80 hover:-translate-y-[1px]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-display font-bold text-[11px] text-on-surface-variant border border-outline-variant/20">
                        {index + 1}
                      </span>
                      <span className="font-display font-bold text-[15.2px] text-on-surface">
                        {state.name}
                      </span>
                    </div>
                    <span className="font-display font-bold text-[16px] text-primary">
                      {metricValueDisplay}
                    </span>
                  </div>

                  {/* Progress Bar (matching the existing blue fill component) */}
                  <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-outline">group</span>
                      <span className="font-sans text-[12px] text-on-surface-variant">{state.mpCount} MPs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-outline">task_alt</span>
                      <span className="font-sans text-[12px] text-on-surface-variant">{state.completedProjects} Completed</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
