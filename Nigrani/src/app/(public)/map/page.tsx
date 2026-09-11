import { API_BASE_URL } from "@/lib/api";
import MapClient from "@/components/MapClient";

export const dynamic = "force-dynamic";

export default async function PublicMapPage() {
  let initialStates: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/state-summary`);
    if (!res.ok) {
      throw new Error("Failed to fetch state summary");
    }
    const data = await res.json();
    
    // Transform the data matching the client's original logic
    initialStates = data.states.map((s: any) => ({
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
  } catch (err) {
    console.error("Error fetching map state summary:", err);
    error = "Unable to load map data";
  }

  if (error) {
    return <div className="p-8 text-red-600 text-center w-full min-h-screen flex items-center justify-center bg-[#F8FAFC]">{error}</div>;
  }

  return <MapClient initialStates={initialStates} />;
}
