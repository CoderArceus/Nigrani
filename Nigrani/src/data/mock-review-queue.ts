export interface ReviewQueueItem {
  id: string;
  priority: "High" | "Normal";
  project: string;
  projectId: string;
  districtSector: string;
  waitDays: number;
  signals: { text: string; critical: boolean }[];
  action: "Investigate" | "Review records";
  state: string;
}

export const reviewQueueData: ReviewQueueItem[] = [
  {
    id: "1",
    priority: "High",
    project: "Community Hall Construction",
    projectId: "PRJ-9821-A",
    districtSector: "North District / Infra",
    waitDays: 14,
    signals: [
      { text: "Sanction delay", critical: true },
      { text: "Missing utilization cert", critical: false },
    ],
    action: "Investigate",
    state: "Bihar",
  },
  {
    id: "2",
    priority: "Normal",
    project: "Rural Road Expansion",
    projectId: "PRJ-7734-C",
    districtSector: "East District / Transport",
    waitDays: 5,
    signals: [{ text: "Cost deviation (+18%)", critical: false }],
    action: "Review records",
    state: "Maharashtra",
  },
  {
    id: "3",
    priority: "Normal",
    project: "Solar Lighting Installation",
    projectId: "PRJ-2219-B",
    districtSector: "South District / Energy",
    waitDays: 8,
    signals: [{ text: "Awaiting vendor approval", critical: false }],
    action: "Review records",
    state: "Bihar",
  },
  {
    id: "4",
    priority: "High",
    project: "Water Treatment Facility",
    projectId: "PRJ-4551-X",
    districtSector: "West District / Utility",
    waitDays: 21,
    signals: [
      { text: "Critical timeline breach", critical: true },
      { text: "Funding exhausted", critical: true },
    ],
    action: "Investigate",
    state: "Uttar Pradesh",
  },
  {
    id: "5",
    priority: "Normal",
    project: "Primary School Renovation",
    projectId: "PRJ-1102-D",
    districtSector: "Central District / Edu",
    waitDays: 2,
    signals: [{ text: "Routine inspection pending", critical: false }],
    action: "Review records",
    state: "Bihar",
  },
];
