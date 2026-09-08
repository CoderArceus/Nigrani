"use client";

import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { StateMetrics } from "@/data/mock-states";

const STATE_GEO_URL = "/india_state.json";
const DISTRICT_GEO_URL = "/india_district.json";

// Semantic Colors
const COLOR_GOOD = "#22c55e"; // Green
const COLOR_WARN = "#f59e0b"; // Orange
const COLOR_BAD = "#ef4444";  // Red

const STATE_COORDS: Record<string, [number, number]> = {
  "andhra-pradesh": [79.74, 15.91],
  "arunanchal-pradesh": [94.72, 28.21],
  "assam": [92.93, 26.20],
  "bihar": [85.31, 25.09],
  "chhattisgarh": [81.86, 21.27],
  "goa": [74.12, 15.29],
  "gujarat": [71.19, 22.25],
  "haryana": [76.08, 29.05],
  "himachal-pradesh": [77.17, 31.10],
  "jharkhand": [85.27, 23.61],
  "karnataka": [75.71, 15.31],
  "kerala": [76.27, 10.85],
  "madhya-pradesh": [78.65, 22.97],
  "maharashtra": [75.71, 19.75],
  "manipur": [93.90, 24.66],
  "meghalaya": [91.36, 25.46],
  "mizoram": [92.93, 23.16],
  "nagaland": [94.10, 26.15],
  "odisha": [85.09, 20.95],
  "punjab": [75.34, 31.14],
  "rajasthan": [74.21, 27.02],
  "sikkim": [88.51, 27.53],
  "tamil-nadu": [78.65, 11.12],
  "telangana": [79.01, 18.11],
  "tripura": [91.98, 23.94],
  "uttar-pradesh": [80.94, 26.84],
  "uttarakhand": [79.01, 30.06],
  "west-bengal": [87.85, 22.98],
  "andaman-nicobar-island": [92.65, 11.74],
  "chandigarh": [76.77, 30.73],
  "dadara-nagar-havelli": [73.01, 20.18],
  "daman-diu": [72.83, 20.42],
  "nct-of-delhi": [77.10, 28.70],
  "puducherry": [79.80, 11.94],
  "lakshadweep": [72.62, 10.56],
};

interface IndiaMapProps {
  data: any[];
  stateData?: any[]; // Passed to preserve background state colors when zoomed in
  metric: "Fund Utilization" | "Delayed Projects" | "Anomaly Score";
  selectedStateId?: string | null;
  hoveredStateId?: string | null;
  onStateSelect?: (stateId: string | null) => void;
}

export function IndiaMap({ data, stateData, metric, selectedStateId, hoveredStateId, onStateSelect }: IndiaMapProps) {
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | string>("");
  const [position, setPosition] = useState({ coordinates: [82, 22] as [number, number], zoom: 1 });
  const [mapHoveredStateId, setMapHoveredStateId] = useState<string | null>(null);
  const [mapHoveredDistrictId, setMapHoveredDistrictId] = useState<string | null>(null);

  // Map state name from GeoJSON to our mock data ID format
  const normalizeStateName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  // Compute absolute domains based on metric (prevents bugs when zooming into small datasets)
  const scaleInfo = useMemo(() => {
    if (metric === "Fund Utilization") {
      return { domain: [0, 50, 100], range: [COLOR_BAD, COLOR_WARN, COLOR_GOOD] };
    } else if (metric === "Delayed Projects") {
      return { domain: [0, 2, 5], range: [COLOR_GOOD, COLOR_WARN, COLOR_BAD] };
    } else {
      return { domain: [0, 0.5, 1], range: [COLOR_GOOD, COLOR_WARN, COLOR_BAD] };
    }
  }, [metric]);

  const colorScale = scaleLinear<string>().domain(scaleInfo.domain).range(scaleInfo.range).clamp(true);

  // Handle zooming
  function handleZoomIn() {
    if (position.zoom >= 6) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  }

  const handleStateClick = (stateId: string) => {
    onStateSelect?.(stateId);
    
    const coords = STATE_COORDS[stateId];
    if (coords) {
      setPosition({ coordinates: coords, zoom: 3.5 });
    } else {
      setPosition({ coordinates: [82, 22], zoom: 1 });
    }
  };

  return (
    <div className="relative w-full h-full bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden flex flex-col">
      {/* Legend & Controls Overlay */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 bg-surface/90 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30 shadow-sm">
        <span className="text-[12px] font-sans font-bold text-on-surface uppercase tracking-wider">
          {metric}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[12px] font-sans text-on-surface-variant">Low</span>
          <div
            className="w-24 h-2 rounded-full"
            style={{
              background: `linear-gradient(to right, ${scaleInfo.range[0]}, ${scaleInfo.range[1]}, ${scaleInfo.range[2]})`,
            }}
          />
          <span className="text-[12px] font-sans text-on-surface-variant">High</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-surface text-on-surface shadow-sm border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        <button
          onClick={() => {
            onStateSelect?.("");
            setPosition({ coordinates: [82, 22], zoom: 1 });
          }}
          className="w-10 h-10 bg-surface text-on-surface shadow-sm border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          title="Reset Zoom"
        >
          <span className="material-symbols-outlined text-[20px]">zoom_out_map</span>
        </button>
      </div>

      {/* Tooltip Overlay */}
      {tooltipContent && (
        <div className="absolute top-6 left-6 z-10 bg-surface/95 backdrop-blur shadow-md border border-outline-variant/30 rounded-lg px-4 py-3 pointer-events-none max-w-xs transition-opacity duration-200">
          {tooltipContent}
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 w-full h-full min-h-[400px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 800,
            center: [82, 22], // India's approx center
          }}
          width={800}
          height={600}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={(pos: any) => setPosition(pos)}
          >
            {/* STATE BASE LAYER */}
            <Geographies geography={STATE_GEO_URL}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const stateName = geo.properties.ST_NM;
                  const stateId = normalizeStateName(stateName);
                  const activeStateData = (stateData || data).find((s) => s.id === stateId);
                  
                  let fill = "#e2e8f0"; // Neutral slate-200 for missing data
                  if (activeStateData) {
                    let metricValue = 0;
                    if (metric === "Fund Utilization") metricValue = activeStateData.utilizationPercent;
                    else if (metric === "Delayed Projects") metricValue = activeStateData.delayedProjects;
                    else metricValue = activeStateData.avgAnomalyScore;
                    fill = colorScale(metricValue);
                  }

                  return (
                    <Geography
                      key={`base-${geo.rsmKey}`}
                      geography={geo}
                      fill={fill}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" }
                      }}
                      onMouseEnter={() => {
                        setMapHoveredStateId(stateId);
                        if (!activeStateData) {
                          setTooltipContent(stateName);
                          return;
                        }
                        const content = (
                          <div className="flex flex-col gap-1">
                            <span className="font-display font-bold text-[16px] text-on-surface">
                              {stateName}
                            </span>
                            <div className="flex items-center justify-between gap-4 mt-1">
                              <span className="text-[12px] font-sans text-on-surface-variant">
                                {metric}:
                              </span>
                              <span className="font-mono text-[13px] font-medium text-primary">
                                {metric === "Fund Utilization" ? `${activeStateData.utilizationPercent.toFixed(1)}%` : 
                                 metric === "Delayed Projects" ? activeStateData.delayedProjects : 
                                 activeStateData.avgAnomalyScore.toFixed(3)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[12px] font-sans text-on-surface-variant">
                                MPs:
                              </span>
                              <span className="font-mono text-[13px] font-medium text-secondary">
                                {activeStateData.totalProjects}
                              </span>
                            </div>
                          </div>
                        );
                        setTooltipContent(content as any);
                      }}
                      onMouseLeave={() => {
                        setMapHoveredStateId(null);
                        setTooltipContent("");
                      }}
                      onClick={() => handleStateClick(stateId)}
                    />
                  );
                })
              }
            </Geographies>

            {/* STATE HOVER LAYER */}
            <Geographies geography={STATE_GEO_URL}>
              {({ geographies }: any) =>
                geographies.map((geo: any) => {
                  const stateName = geo.properties.ST_NM;
                  const stateId = normalizeStateName(stateName);
                  if (selectedStateId && stateId === selectedStateId) return null;

                  const activeHoverId = hoveredStateId || mapHoveredStateId;
                  const isActive = stateId === activeHoverId;

                  const activeStateData = (stateData || data).find((s) => s.id === stateId);
                  
                  let actualFill = "#e2e8f0"; 
                  if (activeStateData) {
                    let metricValue = 0;
                    if (metric === "Fund Utilization") metricValue = activeStateData.utilizationPercent;
                    else if (metric === "Delayed Projects") metricValue = activeStateData.delayedProjects;
                    else metricValue = activeStateData.avgAnomalyScore;
                    actualFill = colorScale(metricValue);
                  }

                  return (
                    <Geography
                      key={`hover-${geo.rsmKey}`}
                      geography={geo}
                      fill={isActive ? actualFill : "transparent"}
                      stroke={isActive ? "#000000" : "transparent"}
                      strokeWidth={isActive ? 0.3 : 0}
                      style={{
                        default: { 
                          outline: "none", 
                          pointerEvents: "none",
                          filter: isActive ? `drop-shadow(0px 0px 14px ${actualFill})` : "none",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                          transformOrigin: "center",
                          transformBox: "fill-box",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        },
                        hover: { outline: "none" },
                        pressed: { outline: "none" }
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* DISTRICT BASE LAYER */}
            {selectedStateId && (
              <Geographies geography={DISTRICT_GEO_URL}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => {
                    const stateName = geo.properties.st_nm;
                    const stateId = normalizeStateName(stateName);
                    if (stateId !== selectedStateId) return null;
                    
                    const districtName = geo.properties.district;
                    const districtId = normalizeStateName(districtName);
                    const districtData = data.find((d) => d.id === districtId);

                    let fill = "#e2e8f0";
                    if (districtData) {
                      let metricValue = 0;
                      if (metric === "Fund Utilization") metricValue = districtData.utilizationPercent;
                      else if (metric === "Delayed Projects") metricValue = districtData.delayedProjects;
                      else metricValue = districtData.avgAnomalyScore;
                      fill = colorScale(metricValue);
                    }

                    return (
                      <Geography
                        key={`base-${geo.rsmKey}`}
                        geography={geo}
                        fill={fill}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" }
                        }}
                        onMouseEnter={() => {
                          setMapHoveredDistrictId(districtId);
                          if (!districtData) {
                            setTooltipContent(
                              <div className="flex flex-col gap-1">
                                <span className="font-display font-bold text-[16px] text-on-surface">
                                  {districtName}
                                </span>
                                <span className="text-[12px] font-sans text-on-surface-variant">
                                  No data available
                                </span>
                              </div>
                            );
                            return;
                          }
                          const content = (
                            <div className="flex flex-col gap-1">
                              <span className="font-display font-bold text-[16px] text-on-surface">
                                {districtName}
                              </span>
                              <div className="flex items-center justify-between gap-4 mt-1">
                                <span className="text-[12px] font-sans text-on-surface-variant">
                                  {metric}:
                                </span>
                                <span className="font-mono text-[13px] font-medium text-primary">
                                  {metric === "Fund Utilization" ? `${districtData.utilizationPercent.toFixed(1)}%` : 
                                   metric === "Delayed Projects" ? districtData.delayedProjects : 
                                   districtData.avgAnomalyScore.toFixed(3)}
                                </span>
                              </div>
                            </div>
                          );
                          setTooltipContent(content as any);
                        }}
                        onMouseLeave={() => {
                          setMapHoveredDistrictId(null);
                          setTooltipContent("");
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            )}

            {/* DISTRICT HOVER LAYER */}
            {selectedStateId && (
              <Geographies geography={DISTRICT_GEO_URL}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => {
                    const stateName = geo.properties.st_nm;
                    const stateId = normalizeStateName(stateName);
                    if (stateId !== selectedStateId) return null;
                    
                    const districtName = geo.properties.district;
                    const districtId = normalizeStateName(districtName);
                    
                    const isActive = districtId === mapHoveredDistrictId;
                    const districtData = data.find((d) => d.id === districtId);

                    let actualFill = "#e2e8f0";
                    if (districtData) {
                      let metricValue = 0;
                      if (metric === "Fund Utilization") metricValue = districtData.utilizationPercent;
                      else if (metric === "Delayed Projects") metricValue = districtData.delayedProjects;
                      else metricValue = districtData.avgAnomalyScore;
                      actualFill = colorScale(metricValue);
                    }

                    return (
                      <Geography
                      key={`hover-${geo.rsmKey}`}
                      geography={geo}
                      fill={isActive ? actualFill : "transparent"}
                      stroke={isActive ? "#000000" : "transparent"}
                      strokeWidth={isActive ? 0.3 : 0}
                      style={{
                        default: { 
                          outline: "none", 
                          pointerEvents: "none",
                          filter: isActive ? `drop-shadow(0px 0px 10px ${actualFill})` : "none",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                          transformOrigin: "center",
                          transformBox: "fill-box",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        },
                        hover: { outline: "none" },
                        pressed: { outline: "none" }
                      }}
                    />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
