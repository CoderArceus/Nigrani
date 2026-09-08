import { mockProjects, Project } from "./mock-projects";

export interface StateMetrics {
  id: string;
  name: string;
  allocatedCr: number;
  utilizedCr: number;
  utilizationPercent: number;
  mpCount: number;
  completedProjects: number;
  totalProjects: number;
  delayedProjects: number;
  avgAnomalyScore: number;
}

const rawStates = [
  "Andaman & Nicobar Island", "Andhra Pradesh", "Arunanchal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadara & Nagar Havelli", "Daman & Diu", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala",
  "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "NCT of Delhi", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Odisha"
];

export const mockStateMetrics: StateMetrics[] = rawStates.map(name => {
  // Normalize state name for comparison
  const normalizedSearch = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const stateProjects = mockProjects.filter(p => {
    const normalizedProjectState = p.state.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalizedProjectState.includes(normalizedSearch) || normalizedSearch.includes(normalizedProjectState);
  });
  
  if (stateProjects.length > 0) {
    const totalProjects = stateProjects.length;
    const completedProjects = stateProjects.filter(p => p.currentStatus === 'Completed').length;
    
    const delayedProjects = stateProjects.filter(p => 
      p.activeSignals.some(s => s.source === 'EXECUTION_STALL' || s.source === 'SANCTION_DELAY')
    ).length;
    
    const validAnomalies = stateProjects.map(p => p.mlAnomalyScore).filter((s): s is number => s !== undefined);
    const avgAnomalyScore = validAnomalies.length > 0 
      ? validAnomalies.reduce((a, b) => a + b, 0) / validAnomalies.length 
      : 0;

    const allocatedLakhs = stateProjects.reduce((acc, p) => acc + p.estimatedCostLakhs, 0);
    const utilizedLakhs = stateProjects.reduce((acc, p) => acc + p.expenditureLakhs, 0);
    
    const allocatedCr = allocatedLakhs / 100;
    const utilizedCr = utilizedLakhs / 100;
    
    const utilizationPercent = allocatedCr > 0 ? (utilizedCr / allocatedCr) * 100 : 0;
    
    // Estimate MP count based on allocated funds (assume ~5Cr per MP)
    const mpCount = Math.max(1, Math.round(allocatedCr / 5));

    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      allocatedCr: parseFloat(allocatedCr.toFixed(2)),
      utilizedCr: parseFloat(utilizedCr.toFixed(2)),
      utilizationPercent: parseFloat(utilizationPercent.toFixed(1)),
      mpCount,
      totalProjects,
      completedProjects,
      delayedProjects,
      avgAnomalyScore: parseFloat(avgAnomalyScore.toFixed(3)),
    };
  } else {
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      allocatedCr: 0,
      utilizedCr: 0,
      utilizationPercent: 0,
      mpCount: 0,
      totalProjects: 0,
      completedProjects: 0,
      delayedProjects: 0,
      avgAnomalyScore: 0,
    };
  }
});

export function getDistrictMetrics(stateId: string): StateMetrics[] {
  const normalizedSearch = stateId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const stateProjects = mockProjects.filter(p => {
    const normalizedProjectState = p.state.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalizedProjectState.includes(normalizedSearch) || normalizedSearch.includes(normalizedProjectState);
  });

  const districts = Array.from(new Set(stateProjects.map(p => p.district)));

  return districts.map(districtName => {
    const districtProjects = stateProjects.filter(p => p.district === districtName);
    const totalProjects = districtProjects.length;
    const completedProjects = districtProjects.filter(p => p.currentStatus === 'Completed').length;
    
    const delayedProjects = districtProjects.filter(p => 
      p.activeSignals.some(s => s.source === 'EXECUTION_STALL' || s.source === 'SANCTION_DELAY')
    ).length;
    
    const validAnomalies = districtProjects.map(p => p.mlAnomalyScore).filter((s): s is number => s !== undefined);
    const avgAnomalyScore = validAnomalies.length > 0 
      ? validAnomalies.reduce((a, b) => a + b, 0) / validAnomalies.length 
      : 0;

    const allocatedLakhs = districtProjects.reduce((acc, p) => acc + p.estimatedCostLakhs, 0);
    const utilizedLakhs = districtProjects.reduce((acc, p) => acc + p.expenditureLakhs, 0);
    
    const allocatedCr = allocatedLakhs / 100;
    const utilizedCr = utilizedLakhs / 100;
    const utilizationPercent = allocatedCr > 0 ? (utilizedCr / allocatedCr) * 100 : 0;
    const mpCount = Math.max(1, Math.round(allocatedCr / 5));

    return {
      id: districtName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: districtName,
      allocatedCr: parseFloat(allocatedCr.toFixed(2)),
      utilizedCr: parseFloat(utilizedCr.toFixed(2)),
      utilizationPercent: parseFloat(utilizationPercent.toFixed(1)),
      mpCount,
      totalProjects,
      completedProjects,
      delayedProjects,
      avgAnomalyScore: parseFloat(avgAnomalyScore.toFixed(3)),
    };
  });
}
