const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../mplads_risk_report.csv');
const tsPath = path.join(__dirname, '../src/data/mock-projects.ts');

const csvData = fs.readFileSync(csvPath, 'utf8');

// Simple CSV parser that handles quotes
function parseCSV(text) {
  let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
  for (l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if (',' === l && s) l = row[++i] = '';
    else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = [l = '']; i = 0;
    } else row[i] += l;
    p = l;
  }
  return ret.filter(r => r.length > 1 || r[0] !== '');
}

const rows = parseCSV(csvData);
const headers = rows[0];

const dataRows = rows.slice(1);

const projects = dataRows.map(row => {
  // work_id,mp_name,state,district,work_category,sanctioned_amount,released_amount,status,vendor,risk_score,top_flag_reasons
  const work_id = row[0];
  const state = row[2];
  const district = row[3];
  const work_category = row[4];
  const sanctioned_amount = parseFloat(row[5]);
  const released_amount = parseFloat(row[6]);
  const status = row[7];
  const risk_score = parseFloat(row[9]);
  const top_flag_reasons = row[10];

  const estimatedCostLakhs = sanctioned_amount / 100000;
  const expenditureLakhs = released_amount / 100000;

  let reviewPriority = 'Normal';
  if (risk_score > 0.1) reviewPriority = 'High';
  else if (risk_score > 0.05) reviewPriority = 'Medium';
  else if (risk_score > 0.02) reviewPriority = 'Review';

  const flagReasonsList = top_flag_reasons ? top_flag_reasons.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const activeSignals = flagReasonsList.map((reason, idx) => {
    let source = 'ISOLATION_FOREST';
    if (reason.includes('amount') || reason.includes('cost')) source = 'COST_DEVIATION';
    if (reason.includes('delay') || reason.includes('stall')) source = 'EXECUTION_STALL';
    
    return {
      id: `SIG-${work_id.split('-')[1]}-${idx + 1}`,
      type: 'ML_ANOMALY',
      source: source,
      status: 'ACTIVE',
      reason: reason.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      createdAt: new Date().toISOString()
    };
  });

  return {
    id: work_id,
    name: `${work_category} in ${district}`,
    constituency: district,
    district: district,
    state: state,
    sector: work_category,
    recommendationDate: "2023-01-15T00:00:00.000Z",
    sanctionDate: (status === 'Sanctioned' || status === 'Completed' || status === 'In Progress') ? "2023-03-01T00:00:00.000Z" : null,
    currentStatus: status,
    estimatedCostLakhs,
    expenditureLakhs,
    lastUpdateDate: "2023-12-01T00:00:00.000Z",
    reviewPriority,
    activeSignals,
    mlAnomalyScore: risk_score,
  };
});

const tsContent = `export type ReviewPriority = 'High' | 'Medium' | 'Review' | 'Normal';
export type ProjectStatus = 'Recommended' | 'Sanctioned' | 'In Progress' | 'Completed';

export interface ProjectSignal {
  id: string;
  type: 'RULE_BASED' | 'ML_ANOMALY' | 'ANALYTICAL';
  source: 'SANCTION_DELAY' | 'EXECUTION_STALL' | 'COST_DEVIATION' | 'ISOLATION_FOREST';
  status: 'ACTIVE' | 'RESOLVED';
  reason: string;
  context?: string;
  createdAt: string;
}

export interface PeerComparison {
  peerGroup: string;
  groupSize: number;
  groupMedianCost: number;
  projectCost: number;
  deviationSigma: number;
}

export interface Project {
  id: string;
  name: string;
  constituency: string;
  district: string;
  state: string;
  sector: string;
  recommendationDate: string;
  sanctionDate: string | null;
  currentStatus: ProjectStatus;
  estimatedCostLakhs: number;
  expenditureLakhs: number;
  lastUpdateDate: string;
  reviewPriority: ReviewPriority;
  activeSignals: ProjectSignal[];
  peerComparison?: PeerComparison;
  mlAnomalyScore?: number;
}

export const mockProjects: Project[] = ${JSON.stringify(projects, null, 2)};
`;

fs.writeFileSync(tsPath, tsContent);
console.log('Successfully generated mock-projects.ts with ' + projects.length + ' projects.');
