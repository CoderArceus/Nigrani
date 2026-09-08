export type ReviewPriority = 'High' | 'Medium' | 'Review' | 'Normal';
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

export const mockProjects: Project[] = [
  {
    "id": "MPLADS-100865",
    "name": "Street Lighting in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 15,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-100865-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.462Z"
      },
      {
        "id": "SIG-100865-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100865-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.13696039908061697
  },
  {
    "id": "MPLADS-103529",
    "name": "Sanitation/Toilets in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.95,
    "expenditureLakhs": 8.89893,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-103529-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103529-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103529-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.13279047506174912
  },
  {
    "id": "MPLADS-102680",
    "name": "Railway Halt Amenities in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 43,
    "expenditureLakhs": 41.38552,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-102680-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102680-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102680-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.11320869060641914
  },
  {
    "id": "MPLADS-105283",
    "name": "Railway Halt Amenities in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 99.32938,
    "expenditureLakhs": 58.0767,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-105283-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105283-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105283-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.10470063735705937
  },
  {
    "id": "MPLADS-104878",
    "name": "Railway Halt Amenities in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 130.6325,
    "expenditureLakhs": 63.59007,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-104878-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104878-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104878-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.10290902490838094
  },
  {
    "id": "MPLADS-104915",
    "name": "Community Hall Construction in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 97.65309,
    "expenditureLakhs": 53.15775,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-104915-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104915-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104915-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.1019255421059796
  },
  {
    "id": "MPLADS-101580",
    "name": "Anganwadi Center Construction in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3,
    "expenditureLakhs": 3,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "High",
    "activeSignals": [
      {
        "id": "SIG-101580-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101580-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101580-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.10064326650521915
  },
  {
    "id": "MPLADS-101545",
    "name": "Solar Power Installation in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 40.05354,
    "expenditureLakhs": 29.1934,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101545-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101545-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101545-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09903184926988784
  },
  {
    "id": "MPLADS-101024",
    "name": "CCTV Installation in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 9.40537,
    "expenditureLakhs": 5.70674,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101024-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101024-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101024-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09866582050698103
  },
  {
    "id": "MPLADS-103946",
    "name": "Street Lighting in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 12.99219,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103946-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103946-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103946-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09822400832490141
  },
  {
    "id": "MPLADS-100622",
    "name": "Anganwadi Center Construction in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.5,
    "expenditureLakhs": 12.47692,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100622-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100622-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100622-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09796913547925634
  },
  {
    "id": "MPLADS-105098",
    "name": "Drinking Water Supply in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3.57,
    "expenditureLakhs": 3.53284,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105098-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105098-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105098-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0971512978420701
  },
  {
    "id": "MPLADS-103647",
    "name": "School Infrastructure in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 83.09192,
    "expenditureLakhs": 55.65168,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103647-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103647-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103647-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0970283701242356
  },
  {
    "id": "MPLADS-102323",
    "name": "Sanitation/Toilets in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 5,
    "expenditureLakhs": 5.59371,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102323-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102323-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102323-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09645660251620514
  },
  {
    "id": "MPLADS-103958",
    "name": "Road Construction/Repair in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 177.30769,
    "expenditureLakhs": 90.282,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103958-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103958-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103958-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09383937345038917
  },
  {
    "id": "MPLADS-103049",
    "name": "Road Construction/Repair in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 90.74,
    "expenditureLakhs": 103.89879,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103049-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103049-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103049-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0919710601632403
  },
  {
    "id": "MPLADS-105891",
    "name": "Library/Reading Room in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4,
    "expenditureLakhs": 4.29067,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105891-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105891-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105891-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.09193624452917037
  },
  {
    "id": "MPLADS-102124",
    "name": "CCTV Installation in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 26.03963,
    "expenditureLakhs": 16.24743,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102124-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102124-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102124-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0907388878136699
  },
  {
    "id": "MPLADS-101700",
    "name": "Library/Reading Room in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 34.58674,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101700-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101700-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101700-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08872690507707814
  },
  {
    "id": "MPLADS-104756",
    "name": "Sports Infrastructure in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 58.18962,
    "expenditureLakhs": 40.95687,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104756-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104756-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104756-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08768315195224241
  },
  {
    "id": "MPLADS-101027",
    "name": "Community Hall Construction in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 103.89796,
    "expenditureLakhs": 31.22649,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101027-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101027-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101027-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08716319690723806
  },
  {
    "id": "MPLADS-105808",
    "name": "Sports Infrastructure in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 73.3262,
    "expenditureLakhs": 46.31895,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105808-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105808-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105808-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08676002218884205
  },
  {
    "id": "MPLADS-105992",
    "name": "Library/Reading Room in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 15.74736,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105992-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105992-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105992-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08660060235009803
  },
  {
    "id": "MPLADS-105026",
    "name": "CCTV Installation in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 33.19751,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105026-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105026-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105026-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08602555486610786
  },
  {
    "id": "MPLADS-100724",
    "name": "Sports Infrastructure in Kota",
    "constituency": "Kota",
    "district": "Kota",
    "state": "Rajasthan",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 25.12,
    "expenditureLakhs": 25.08971,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100724-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100724-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100724-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08586186692331366
  },
  {
    "id": "MPLADS-102585",
    "name": "Irrigation Facility in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 102.11462,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102585-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102585-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102585-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08305651398588265
  },
  {
    "id": "MPLADS-101038",
    "name": "Irrigation Facility in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 110.51506,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101038-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101038-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101038-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08207260797521632
  },
  {
    "id": "MPLADS-102933",
    "name": "School Infrastructure in Gaya",
    "constituency": "Gaya",
    "district": "Gaya",
    "state": "Bihar",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 10.56,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102933-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102933-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102933-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08081634611399757
  },
  {
    "id": "MPLADS-103932",
    "name": "Sanitation/Toilets in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.27,
    "expenditureLakhs": 9.51791,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103932-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103932-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103932-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08050804324898442
  },
  {
    "id": "MPLADS-104544",
    "name": "Library/Reading Room in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 7.05,
    "expenditureLakhs": 4.68977,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104544-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104544-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104544-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08029743012894597
  },
  {
    "id": "MPLADS-105364",
    "name": "Community Hall Construction in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 104.60372,
    "expenditureLakhs": 38.93834,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105364-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105364-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105364-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.08011851840403039
  },
  {
    "id": "MPLADS-102713",
    "name": "Sanitation/Toilets in Bhagalpur",
    "constituency": "Bhagalpur",
    "district": "Bhagalpur",
    "state": "Bihar",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 5.63,
    "expenditureLakhs": 2.50214,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102713-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102713-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102713-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07980393906310002
  },
  {
    "id": "MPLADS-102966",
    "name": "Library/Reading Room in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 23.11,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102966-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102966-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102966-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07946537457465408
  },
  {
    "id": "MPLADS-105319",
    "name": "Sports Infrastructure in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 38.48,
    "expenditureLakhs": 36.23009,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105319-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105319-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105319-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07924448039249787
  },
  {
    "id": "MPLADS-102977",
    "name": "Street Lighting in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 21.59207,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102977-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102977-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102977-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07904736325855877
  },
  {
    "id": "MPLADS-100267",
    "name": "School Infrastructure in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 7.23,
    "expenditureLakhs": 3.22817,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100267-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100267-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100267-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07824517727252289
  },
  {
    "id": "MPLADS-101438",
    "name": "Library/Reading Room in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 34.69191,
    "expenditureLakhs": 20.87188,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101438-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101438-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101438-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.078225987290786
  },
  {
    "id": "MPLADS-104956",
    "name": "Sports Infrastructure in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 11.01997,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104956-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104956-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104956-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07792357259645177
  },
  {
    "id": "MPLADS-102913",
    "name": "Sanitation/Toilets in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 2.43057,
    "expenditureLakhs": 1.58927,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102913-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102913-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102913-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0777620704026043
  },
  {
    "id": "MPLADS-100514",
    "name": "Sports Infrastructure in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 40.5,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100514-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100514-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100514-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0770893346645054
  },
  {
    "id": "MPLADS-103285",
    "name": "CCTV Installation in Gaya",
    "constituency": "Gaya",
    "district": "Gaya",
    "state": "Bihar",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 29.86617,
    "expenditureLakhs": 21.87402,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103285-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103285-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103285-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07688315714636595
  },
  {
    "id": "MPLADS-103320",
    "name": "Irrigation Facility in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 55.07976,
    "expenditureLakhs": 25.96964,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103320-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103320-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103320-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0763308510416073
  },
  {
    "id": "MPLADS-104579",
    "name": "Solar Power Installation in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 28.91,
    "expenditureLakhs": 27.66748,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104579-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104579-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104579-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07336697604426967
  },
  {
    "id": "MPLADS-102079",
    "name": "School Infrastructure in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 7.65,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102079-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102079-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102079-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07163631535720716
  },
  {
    "id": "MPLADS-104953",
    "name": "Solar Power Installation in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 6.8945,
    "expenditureLakhs": 2.46084,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104953-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104953-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104953-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07097545707012398
  },
  {
    "id": "MPLADS-105146",
    "name": "School Infrastructure in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 15.95,
    "expenditureLakhs": 14.71221,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105146-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105146-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105146-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07038292831700832
  },
  {
    "id": "MPLADS-100810",
    "name": "Sanitation/Toilets in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 13.86243,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100810-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100810-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100810-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.07035309452812621
  },
  {
    "id": "MPLADS-105940",
    "name": "Irrigation Facility in Lucknow",
    "constituency": "Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 8.53,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105940-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105940-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-105940-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.070267447296392
  },
  {
    "id": "MPLADS-104433",
    "name": "Road Construction/Repair in Lucknow",
    "constituency": "Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 89.11,
    "expenditureLakhs": 46.58604,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104433-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104433-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104433-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06942118385034923
  },
  {
    "id": "MPLADS-102244",
    "name": "Sanitation/Toilets in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.06,
    "expenditureLakhs": 4.90983,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102244-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102244-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102244-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06941763544797974
  },
  {
    "id": "MPLADS-101561",
    "name": "Anganwadi Center Construction in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 8.06,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101561-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101561-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101561-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06922005787552321
  },
  {
    "id": "MPLADS-104526",
    "name": "CCTV Installation in Lucknow",
    "constituency": "Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.62253,
    "expenditureLakhs": 4.67943,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104526-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104526-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-104526-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06796962834276188
  },
  {
    "id": "MPLADS-102631",
    "name": "Street Lighting in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.36,
    "expenditureLakhs": 10.1994,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102631-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102631-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102631-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06535747701472161
  },
  {
    "id": "MPLADS-101694",
    "name": "Library/Reading Room in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 17.90612,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101694-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101694-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101694-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06461700641663981
  },
  {
    "id": "MPLADS-103316",
    "name": "Sports Infrastructure in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 18.29,
    "expenditureLakhs": 18.29,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103316-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103316-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103316-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06394747653631083
  },
  {
    "id": "MPLADS-100449",
    "name": "Railway Halt Amenities in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 93,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100449-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100449-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100449-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.0639191471571835
  },
  {
    "id": "MPLADS-101851",
    "name": "Sports Infrastructure in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 37.51,
    "expenditureLakhs": 23.39474,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101851-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101851-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101851-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06366570157977824
  },
  {
    "id": "MPLADS-101033",
    "name": "Sanitation/Toilets in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 8.06835,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101033-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101033-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101033-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.062282709923597634
  },
  {
    "id": "MPLADS-101206",
    "name": "Sanitation/Toilets in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 2.08,
    "expenditureLakhs": 1.36386,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101206-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101206-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101206-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06113937737255615
  },
  {
    "id": "MPLADS-103733",
    "name": "Sanitation/Toilets in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.56151,
    "expenditureLakhs": 2.71101,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103733-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103733-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-103733-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06098318212045872
  },
  {
    "id": "MPLADS-102181",
    "name": "Street Lighting in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 20.63033,
    "expenditureLakhs": 9.10068,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102181-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102181-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102181-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.060965760130718194
  },
  {
    "id": "MPLADS-102387",
    "name": "Library/Reading Room in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16.43,
    "expenditureLakhs": 15.94281,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102387-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102387-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-102387-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06058253989516238
  },
  {
    "id": "MPLADS-101632",
    "name": "Sanitation/Toilets in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.45,
    "expenditureLakhs": 15.6736,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101632-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101632-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101632-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06043904399387823
  },
  {
    "id": "MPLADS-101412",
    "name": "Drinking Water Supply in Agra",
    "constituency": "Agra",
    "district": "Agra",
    "state": "Uttar Pradesh",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 35.76,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101412-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101412-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-101412-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.060427767918204256
  },
  {
    "id": "MPLADS-100157",
    "name": "Drinking Water Supply in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 36.22821,
    "expenditureLakhs": 7.71374,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100157-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100157-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.463Z"
      },
      {
        "id": "SIG-100157-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.463Z"
      }
    ],
    "mlAnomalyScore": 0.06042122422437357
  },
  {
    "id": "MPLADS-104250",
    "name": "Solar Power Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 11.6747,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104250-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104250-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104250-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.06003735688017031
  },
  {
    "id": "MPLADS-105374",
    "name": "Library/Reading Room in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 21,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105374-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105374-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105374-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.059753269576301116
  },
  {
    "id": "MPLADS-104870",
    "name": "Sports Infrastructure in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.25,
    "expenditureLakhs": 5.12096,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104870-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104870-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104870-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.059548522136542714
  },
  {
    "id": "MPLADS-104145",
    "name": "Street Lighting in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 19.96,
    "expenditureLakhs": 19.64419,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104145-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104145-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104145-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05941669432661745
  },
  {
    "id": "MPLADS-105359",
    "name": "Anganwadi Center Construction in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 19,
    "expenditureLakhs": 17.99756,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105359-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105359-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105359-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05883617903761218
  },
  {
    "id": "MPLADS-105841",
    "name": "Anganwadi Center Construction in Coimbatore",
    "constituency": "Coimbatore",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 14.93,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105841-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105841-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105841-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05883263692943308
  },
  {
    "id": "MPLADS-104159",
    "name": "Library/Reading Room in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 12.23749,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104159-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104159-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104159-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05879904554962201
  },
  {
    "id": "MPLADS-101204",
    "name": "Solar Power Installation in Aurangabad",
    "constituency": "Aurangabad",
    "district": "Aurangabad",
    "state": "Maharashtra",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.59814,
    "expenditureLakhs": 7.32158,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101204-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101204-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101204-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05837799804657451
  },
  {
    "id": "MPLADS-104863",
    "name": "Sanitation/Toilets in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 15.92473,
    "expenditureLakhs": 10.31373,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104863-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104863-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104863-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05835065583539678
  },
  {
    "id": "MPLADS-101902",
    "name": "CCTV Installation in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.55,
    "expenditureLakhs": 9.82989,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101902-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101902-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101902-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05820575917275217
  },
  {
    "id": "MPLADS-102097",
    "name": "Street Lighting in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 15.55,
    "expenditureLakhs": 15.4295,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102097-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102097-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102097-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.057884604637468806
  },
  {
    "id": "MPLADS-100387",
    "name": "CCTV Installation in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 11.8,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100387-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100387-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100387-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05751988178394263
  },
  {
    "id": "MPLADS-102168",
    "name": "Library/Reading Room in Varanasi",
    "constituency": "Varanasi",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 24.45593,
    "expenditureLakhs": 12.10451,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102168-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102168-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102168-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0572557576179078
  },
  {
    "id": "MPLADS-102570",
    "name": "Railway Halt Amenities in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 17.32,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102570-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102570-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102570-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.057237562129983655
  },
  {
    "id": "MPLADS-103077",
    "name": "Railway Halt Amenities in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 33.34836,
    "expenditureLakhs": 21.55276,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103077-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103077-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103077-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05701298384502529
  },
  {
    "id": "MPLADS-101860",
    "name": "Community Hall Construction in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 71,
    "expenditureLakhs": 66.42886,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101860-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101860-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101860-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05670140149461522
  },
  {
    "id": "MPLADS-102677",
    "name": "Community Hall Construction in Lucknow",
    "constituency": "Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.23,
    "expenditureLakhs": 11.96157,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102677-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102677-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102677-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05617820461651579
  },
  {
    "id": "MPLADS-103185",
    "name": "Health Facility Upgrade in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 68,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103185-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103185-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103185-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05504895337136728
  },
  {
    "id": "MPLADS-103047",
    "name": "Road Construction/Repair in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 80.49,
    "expenditureLakhs": 66.12495,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103047-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103047-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103047-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05435390507173621
  },
  {
    "id": "MPLADS-103969",
    "name": "Library/Reading Room in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 9.5,
    "expenditureLakhs": 7.04265,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103969-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103969-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103969-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.054323442921846654
  },
  {
    "id": "MPLADS-100296",
    "name": "Street Lighting in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16.77958,
    "expenditureLakhs": 10.55556,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100296-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100296-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100296-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.054047103130036134
  },
  {
    "id": "MPLADS-105907",
    "name": "Health Facility Upgrade in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 16.46,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105907-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105907-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105907-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05363132811367166
  },
  {
    "id": "MPLADS-103419",
    "name": "Health Facility Upgrade in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 47.92,
    "expenditureLakhs": 45.65052,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103419-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103419-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103419-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05357891110231039
  },
  {
    "id": "MPLADS-101706",
    "name": "Railway Halt Amenities in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 92,
    "expenditureLakhs": 88.21988,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-101706-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101706-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101706-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.052602847104996076
  },
  {
    "id": "MPLADS-102348",
    "name": "Sports Infrastructure in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 18.91,
    "expenditureLakhs": 18.50595,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102348-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102348-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102348-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.052381996267259145
  },
  {
    "id": "MPLADS-104899",
    "name": "Solar Power Installation in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.73,
    "expenditureLakhs": 10.35488,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104899-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104899-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104899-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05185719696867319
  },
  {
    "id": "MPLADS-103967",
    "name": "Health Facility Upgrade in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103967-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103967-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103967-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05182044667711727
  },
  {
    "id": "MPLADS-102582",
    "name": "Railway Halt Amenities in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 31.63697,
    "expenditureLakhs": 13.86824,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-102582-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102582-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102582-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05176513589567
  },
  {
    "id": "MPLADS-104767",
    "name": "Community Hall Construction in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 78.54,
    "expenditureLakhs": 75.09349,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104767-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104767-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104767-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.051711989098704336
  },
  {
    "id": "MPLADS-105195",
    "name": "Street Lighting in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.65,
    "expenditureLakhs": 14.19297,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-105195-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105195-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105195-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.051562204781839704
  },
  {
    "id": "MPLADS-100177",
    "name": "Street Lighting in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 15.8064,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100177-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100177-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100177-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.051403651258780325
  },
  {
    "id": "MPLADS-100476",
    "name": "Sports Infrastructure in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 28.71,
    "expenditureLakhs": 13.72602,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-100476-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100476-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100476-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0503791677523826
  },
  {
    "id": "MPLADS-103452",
    "name": "CCTV Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 5.69,
    "expenditureLakhs": 5.39235,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-103452-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103452-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103452-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.05021787644576414
  },
  {
    "id": "MPLADS-104786",
    "name": "School Infrastructure in Chennai",
    "constituency": "Chennai",
    "district": "Chennai",
    "state": "Tamil Nadu",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 8.63,
    "expenditureLakhs": 9.45141,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Medium",
    "activeSignals": [
      {
        "id": "SIG-104786-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104786-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104786-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.050189361124494014
  },
  {
    "id": "MPLADS-102355",
    "name": "Road Construction/Repair in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 64,
    "expenditureLakhs": 59.09098,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102355-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102355-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102355-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.049504527856157665
  },
  {
    "id": "MPLADS-105038",
    "name": "Street Lighting in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 6.75,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105038-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105038-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105038-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04925978464567338
  },
  {
    "id": "MPLADS-102287",
    "name": "Railway Halt Amenities in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 92.1,
    "expenditureLakhs": 87.81599,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102287-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102287-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102287-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04923043378789771
  },
  {
    "id": "MPLADS-100410",
    "name": "Railway Halt Amenities in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 57.76885,
    "expenditureLakhs": 36.20852,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100410-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100410-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100410-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04898815522920019
  },
  {
    "id": "MPLADS-102453",
    "name": "CCTV Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 21,
    "expenditureLakhs": 20.39063,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102453-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102453-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102453-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0480355051490321
  },
  {
    "id": "MPLADS-105163",
    "name": "Street Lighting in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 6.33026,
    "expenditureLakhs": 3.65991,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105163-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105163-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105163-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04787855232540439
  },
  {
    "id": "MPLADS-105437",
    "name": "School Infrastructure in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.77,
    "expenditureLakhs": 5.7637,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105437-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105437-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105437-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.047596439961447023
  },
  {
    "id": "MPLADS-104747",
    "name": "Sanitation/Toilets in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.42,
    "expenditureLakhs": 15.68871,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104747-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104747-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104747-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04747227576536339
  },
  {
    "id": "MPLADS-104331",
    "name": "Health Facility Upgrade in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 7.93,
    "expenditureLakhs": 3.62,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104331-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104331-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104331-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04710363954725816
  },
  {
    "id": "MPLADS-101536",
    "name": "Anganwadi Center Construction in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 19.99,
    "expenditureLakhs": 23.15428,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101536-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101536-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101536-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04704598156797368
  },
  {
    "id": "MPLADS-100303",
    "name": "Sanitation/Toilets in Kota",
    "constituency": "Kota",
    "district": "Kota",
    "state": "Rajasthan",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 1.11,
    "expenditureLakhs": 1.022,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100303-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100303-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100303-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04637607975811775
  },
  {
    "id": "MPLADS-103841",
    "name": "Anganwadi Center Construction in Howrah",
    "constituency": "Howrah",
    "district": "Howrah",
    "state": "West Bengal",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.71,
    "expenditureLakhs": 4.68447,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103841-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103841-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103841-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.046066559247567085
  },
  {
    "id": "MPLADS-104142",
    "name": "Solar Power Installation in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.37,
    "expenditureLakhs": 11.26461,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104142-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104142-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104142-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04592475951374431
  },
  {
    "id": "MPLADS-105261",
    "name": "School Infrastructure in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.14,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105261-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105261-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105261-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04573657137053533
  },
  {
    "id": "MPLADS-104424",
    "name": "Solar Power Installation in Agra",
    "constituency": "Agra",
    "district": "Agra",
    "state": "Uttar Pradesh",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 5,
    "expenditureLakhs": 2.55893,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104424-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104424-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104424-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0456479431372091
  },
  {
    "id": "MPLADS-102704",
    "name": "CCTV Installation in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.2932,
    "expenditureLakhs": 7.23885,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102704-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102704-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102704-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.045489019685144516
  },
  {
    "id": "MPLADS-105937",
    "name": "Drinking Water Supply in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 31.63631,
    "expenditureLakhs": 8.72966,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105937-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105937-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105937-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04541234284254714
  },
  {
    "id": "MPLADS-102883",
    "name": "Solar Power Installation in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.85,
    "expenditureLakhs": 12.65971,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102883-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102883-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102883-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04510939734352881
  },
  {
    "id": "MPLADS-105273",
    "name": "Library/Reading Room in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 23.49,
    "expenditureLakhs": 22.83515,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105273-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105273-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105273-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04478147869474769
  },
  {
    "id": "MPLADS-105871",
    "name": "Railway Halt Amenities in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 30.2462,
    "expenditureLakhs": 15.96906,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105871-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105871-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105871-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.044545511093622814
  },
  {
    "id": "MPLADS-100593",
    "name": "CCTV Installation in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 24.13,
    "expenditureLakhs": 19.84452,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100593-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100593-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100593-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.044532292004345164
  },
  {
    "id": "MPLADS-105447",
    "name": "Irrigation Facility in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 50.54049,
    "expenditureLakhs": 28.16619,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105447-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105447-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105447-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04448403318732097
  },
  {
    "id": "MPLADS-104329",
    "name": "Street Lighting in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 17,
    "expenditureLakhs": 13.24985,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104329-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104329-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104329-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.043829213518354115
  },
  {
    "id": "MPLADS-101082",
    "name": "School Infrastructure in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 4.32,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101082-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101082-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101082-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.043487201393178854
  },
  {
    "id": "MPLADS-104402",
    "name": "Street Lighting in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 4.8,
    "expenditureLakhs": 2.04603,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104402-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104402-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104402-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.043463506581109757
  },
  {
    "id": "MPLADS-104567",
    "name": "Solar Power Installation in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.68,
    "expenditureLakhs": 10.32391,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104567-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104567-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104567-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04242773837674463
  },
  {
    "id": "MPLADS-102478",
    "name": "Drinking Water Supply in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 36.71,
    "expenditureLakhs": 35.848,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102478-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102478-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102478-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04208192082689044
  },
  {
    "id": "MPLADS-104453",
    "name": "Railway Halt Amenities in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 66,
    "expenditureLakhs": 49.66257,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104453-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104453-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104453-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.041829696910701486
  },
  {
    "id": "MPLADS-104708",
    "name": "Anganwadi Center Construction in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14,
    "expenditureLakhs": 13.84448,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104708-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104708-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104708-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04118100637013167
  },
  {
    "id": "MPLADS-104289",
    "name": "CCTV Installation in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 17,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104289-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104289-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104289-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0411411926862576
  },
  {
    "id": "MPLADS-105746",
    "name": "Irrigation Facility in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 44.45,
    "expenditureLakhs": 30.24209,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105746-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105746-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105746-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.040847204952424665
  },
  {
    "id": "MPLADS-101170",
    "name": "Road Construction/Repair in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 94,
    "expenditureLakhs": 89.47073,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101170-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101170-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101170-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04030209725041323
  },
  {
    "id": "MPLADS-103615",
    "name": "Railway Halt Amenities in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 26.1873,
    "expenditureLakhs": 12.97758,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103615-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103615-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103615-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.04023319802916214
  },
  {
    "id": "MPLADS-104135",
    "name": "CCTV Installation in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 14.68,
    "expenditureLakhs": 5.68416,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104135-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104135-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104135-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03968607110695632
  },
  {
    "id": "MPLADS-104942",
    "name": "Road Construction/Repair in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 90,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104942-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104942-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104942-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03923287244524254
  },
  {
    "id": "MPLADS-105538",
    "name": "School Infrastructure in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 42.59,
    "expenditureLakhs": 31.7183,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105538-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105538-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105538-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03921883074338428
  },
  {
    "id": "MPLADS-103400",
    "name": "Sports Infrastructure in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8,
    "expenditureLakhs": 7.73967,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103400-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103400-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103400-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03905872822559364
  },
  {
    "id": "MPLADS-100932",
    "name": "Street Lighting in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.08,
    "expenditureLakhs": 12.74902,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100932-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100932-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100932-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.038975573522238016
  },
  {
    "id": "MPLADS-102118",
    "name": "Community Hall Construction in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 41,
    "expenditureLakhs": 40.93092,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102118-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102118-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102118-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.038973780192381624
  },
  {
    "id": "MPLADS-104405",
    "name": "Library/Reading Room in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 3.7,
    "expenditureLakhs": 4.62097,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104405-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104405-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104405-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03892783270542732
  },
  {
    "id": "MPLADS-104418",
    "name": "Anganwadi Center Construction in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.71,
    "expenditureLakhs": 2.91403,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104418-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104418-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104418-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03882379239840439
  },
  {
    "id": "MPLADS-102868",
    "name": "Drinking Water Supply in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.46,
    "expenditureLakhs": 4.11179,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102868-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102868-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102868-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03875434100651154
  },
  {
    "id": "MPLADS-104648",
    "name": "CCTV Installation in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 4.15,
    "expenditureLakhs": 3.45379,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104648-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104648-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104648-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.038337372008449
  },
  {
    "id": "MPLADS-100093",
    "name": "Road Construction/Repair in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 83,
    "expenditureLakhs": 78.22287,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100093-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100093-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100093-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03809406705007001
  },
  {
    "id": "MPLADS-105294",
    "name": "Health Facility Upgrade in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 27.48296,
    "expenditureLakhs": 9.77185,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105294-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105294-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105294-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.038093376975843585
  },
  {
    "id": "MPLADS-103736",
    "name": "Sports Infrastructure in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 24.8,
    "expenditureLakhs": 17.50125,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103736-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103736-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103736-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.037628367496972404
  },
  {
    "id": "MPLADS-104095",
    "name": "Sports Infrastructure in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.52,
    "expenditureLakhs": 8.51771,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104095-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104095-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104095-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0374650809260999
  },
  {
    "id": "MPLADS-100255",
    "name": "CCTV Installation in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 2,
    "expenditureLakhs": 1.95854,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100255-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100255-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100255-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.037112143852085056
  },
  {
    "id": "MPLADS-103488",
    "name": "Railway Halt Amenities in Coimbatore",
    "constituency": "Coimbatore",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 84,
    "expenditureLakhs": 84,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103488-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103488-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103488-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.036841853087921206
  },
  {
    "id": "MPLADS-104973",
    "name": "Sanitation/Toilets in Kota",
    "constituency": "Kota",
    "district": "Kota",
    "state": "Rajasthan",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 9.34,
    "expenditureLakhs": 5.87116,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104973-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104973-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104973-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03678568753034073
  },
  {
    "id": "MPLADS-104745",
    "name": "School Infrastructure in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 17,
    "expenditureLakhs": 13.7578,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104745-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104745-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104745-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03633929193437091
  },
  {
    "id": "MPLADS-101839",
    "name": "School Infrastructure in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.44,
    "expenditureLakhs": 13.07407,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101839-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101839-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101839-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03621632713455625
  },
  {
    "id": "MPLADS-100401",
    "name": "Road Construction/Repair in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 32,
    "expenditureLakhs": 19.77447,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100401-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100401-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100401-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03621147315442552
  },
  {
    "id": "MPLADS-104872",
    "name": "Library/Reading Room in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.86,
    "expenditureLakhs": 12.72227,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104872-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104872-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104872-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.036158795226764906
  },
  {
    "id": "MPLADS-103547",
    "name": "CCTV Installation in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 2,
    "expenditureLakhs": 1.85059,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103547-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103547-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103547-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03611730906652777
  },
  {
    "id": "MPLADS-103423",
    "name": "Community Hall Construction in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 50.16,
    "expenditureLakhs": 47.56658,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103423-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103423-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103423-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03603472702308841
  },
  {
    "id": "MPLADS-104168",
    "name": "Sanitation/Toilets in Aurangabad",
    "constituency": "Aurangabad",
    "district": "Aurangabad",
    "state": "Maharashtra",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3,
    "expenditureLakhs": 2.83388,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104168-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104168-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104168-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.035859637828922764
  },
  {
    "id": "MPLADS-100441",
    "name": "Irrigation Facility in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 41.2,
    "expenditureLakhs": 40.32526,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100441-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100441-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100441-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0358202236680496
  },
  {
    "id": "MPLADS-100829",
    "name": "Health Facility Upgrade in Muzaffarpur",
    "constituency": "Muzaffarpur",
    "district": "Muzaffarpur",
    "state": "Bihar",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 25.62,
    "expenditureLakhs": 24.63029,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100829-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100829-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100829-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03561352770446702
  },
  {
    "id": "MPLADS-100812",
    "name": "Drinking Water Supply in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 7,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100812-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100812-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100812-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03547112678357478
  },
  {
    "id": "MPLADS-102310",
    "name": "School Infrastructure in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 44,
    "expenditureLakhs": 39.80282,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102310-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102310-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102310-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03543134302320161
  },
  {
    "id": "MPLADS-103297",
    "name": "CCTV Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 20.19,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103297-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103297-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103297-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.034978304202083255
  },
  {
    "id": "MPLADS-100080",
    "name": "Library/Reading Room in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 15.01186,
    "expenditureLakhs": 5.9274,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100080-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100080-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100080-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.034698574747765165
  },
  {
    "id": "MPLADS-104559",
    "name": "Irrigation Facility in Muzaffarpur",
    "constituency": "Muzaffarpur",
    "district": "Muzaffarpur",
    "state": "Bihar",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 67.96,
    "expenditureLakhs": 56.78447,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104559-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104559-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104559-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03404627709740471
  },
  {
    "id": "MPLADS-104817",
    "name": "Road Construction/Repair in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 86.72,
    "expenditureLakhs": 86.17209,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104817-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104817-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104817-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03385655657849862
  },
  {
    "id": "MPLADS-103499",
    "name": "Sanitation/Toilets in Chennai",
    "constituency": "Chennai",
    "district": "Chennai",
    "state": "Tamil Nadu",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.27,
    "expenditureLakhs": 4.96312,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103499-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103499-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103499-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.033697716062301986
  },
  {
    "id": "MPLADS-104673",
    "name": "Sanitation/Toilets in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.75,
    "expenditureLakhs": 4.61611,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104673-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104673-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104673-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03353928887349311
  },
  {
    "id": "MPLADS-101949",
    "name": "CCTV Installation in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.69,
    "expenditureLakhs": 5.55388,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101949-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101949-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101949-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03347638212810111
  },
  {
    "id": "MPLADS-104572",
    "name": "Solar Power Installation in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 11.7103,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104572-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104572-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104572-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03335099314642065
  },
  {
    "id": "MPLADS-102887",
    "name": "Sports Infrastructure in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 21,
    "expenditureLakhs": 10.79327,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102887-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102887-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102887-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.033126308633874446
  },
  {
    "id": "MPLADS-103715",
    "name": "Road Construction/Repair in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 27.59,
    "expenditureLakhs": 26.30742,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103715-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103715-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103715-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.032938399283154896
  },
  {
    "id": "MPLADS-103710",
    "name": "Library/Reading Room in Coimbatore",
    "constituency": "Coimbatore",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.79,
    "expenditureLakhs": 11.28145,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103710-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103710-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103710-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03285650608360724
  },
  {
    "id": "MPLADS-103438",
    "name": "Health Facility Upgrade in Lucknow",
    "constituency": "Lucknow",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 25,
    "expenditureLakhs": 9.40015,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103438-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103438-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103438-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.032818070424108226
  },
  {
    "id": "MPLADS-105542",
    "name": "Railway Halt Amenities in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 93.71,
    "expenditureLakhs": 93.71,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105542-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105542-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105542-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03265967500756972
  },
  {
    "id": "MPLADS-103971",
    "name": "Sports Infrastructure in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 47.4,
    "expenditureLakhs": 51.60295,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103971-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103971-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103971-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.032121707095975394
  },
  {
    "id": "MPLADS-103795",
    "name": "Irrigation Facility in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 43.98332,
    "expenditureLakhs": 22.62482,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103795-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103795-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103795-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03204774797063359
  },
  {
    "id": "MPLADS-102450",
    "name": "Road Construction/Repair in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 28,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102450-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102450-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102450-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03196299378609313
  },
  {
    "id": "MPLADS-100160",
    "name": "Street Lighting in Varanasi",
    "constituency": "Varanasi",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.41,
    "expenditureLakhs": 11.40313,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100160-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100160-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100160-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03183666187172818
  },
  {
    "id": "MPLADS-103018",
    "name": "Irrigation Facility in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 38,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103018-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103018-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103018-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03182467380248721
  },
  {
    "id": "MPLADS-102549",
    "name": "Drinking Water Supply in Bhagalpur",
    "constituency": "Bhagalpur",
    "district": "Bhagalpur",
    "state": "Bihar",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16,
    "expenditureLakhs": 14.85788,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102549-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102549-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102549-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03179580836928175
  },
  {
    "id": "MPLADS-103204",
    "name": "Library/Reading Room in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 20,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103204-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103204-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103204-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03149529613218671
  },
  {
    "id": "MPLADS-101760",
    "name": "Community Hall Construction in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 30.08,
    "expenditureLakhs": 36.83225,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101760-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101760-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101760-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.031179053134325896
  },
  {
    "id": "MPLADS-105544",
    "name": "Street Lighting in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 17,
    "expenditureLakhs": 15.80823,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105544-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105544-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105544-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.03111243139933484
  },
  {
    "id": "MPLADS-102640",
    "name": "Irrigation Facility in Gaya",
    "constituency": "Gaya",
    "district": "Gaya",
    "state": "Bihar",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 74,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102640-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102640-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102640-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.030783517055261944
  },
  {
    "id": "MPLADS-105175",
    "name": "Anganwadi Center Construction in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 19.19,
    "expenditureLakhs": 21.24298,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105175-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105175-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105175-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.030704681726337224
  },
  {
    "id": "MPLADS-101232",
    "name": "Street Lighting in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.12,
    "expenditureLakhs": 10.10864,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101232-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101232-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101232-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.0306595576680726
  },
  {
    "id": "MPLADS-105692",
    "name": "Drinking Water Supply in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 29,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105692-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105692-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-105692-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.030317516460786842
  },
  {
    "id": "MPLADS-100101",
    "name": "CCTV Installation in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 17.92,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100101-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100101-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100101-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.030281209169655265
  },
  {
    "id": "MPLADS-102873",
    "name": "Drinking Water Supply in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 30,
    "expenditureLakhs": 19.79676,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102873-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102873-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102873-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02985174568662108
  },
  {
    "id": "MPLADS-101382",
    "name": "Anganwadi Center Construction in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16.07,
    "expenditureLakhs": 15.21144,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101382-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101382-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101382-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02977720826631436
  },
  {
    "id": "MPLADS-100861",
    "name": "Street Lighting in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.71,
    "expenditureLakhs": 11.96143,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100861-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100861-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100861-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02913165671146012
  },
  {
    "id": "MPLADS-103944",
    "name": "Library/Reading Room in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10,
    "expenditureLakhs": 9.27361,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103944-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103944-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103944-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02892717365209374
  },
  {
    "id": "MPLADS-102268",
    "name": "Road Construction/Repair in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 44,
    "expenditureLakhs": 20.47551,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102268-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102268-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-102268-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.028647301072928122
  },
  {
    "id": "MPLADS-101691",
    "name": "CCTV Installation in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16.3,
    "expenditureLakhs": 15.45856,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101691-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101691-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-101691-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.028378523194293237
  },
  {
    "id": "MPLADS-103149",
    "name": "Irrigation Facility in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 35,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103149-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103149-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103149-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.028175346998732365
  },
  {
    "id": "MPLADS-104744",
    "name": "Irrigation Facility in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 6.72,
    "expenditureLakhs": 6.43183,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104744-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104744-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-104744-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02766996796689325
  },
  {
    "id": "MPLADS-100445",
    "name": "Street Lighting in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 3,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100445-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100445-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100445-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02660965398710935
  },
  {
    "id": "MPLADS-103934",
    "name": "School Infrastructure in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 22.42,
    "expenditureLakhs": 22.42,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103934-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103934-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-103934-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.026562439671811267
  },
  {
    "id": "MPLADS-100017",
    "name": "Health Facility Upgrade in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 65.88,
    "expenditureLakhs": 77.45763,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100017-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100017-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.464Z"
      },
      {
        "id": "SIG-100017-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.464Z"
      }
    ],
    "mlAnomalyScore": 0.02604583623415857
  },
  {
    "id": "MPLADS-104245",
    "name": "Road Construction/Repair in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 15.97,
    "expenditureLakhs": 15.40618,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104245-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104245-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104245-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.025813775059220112
  },
  {
    "id": "MPLADS-104714",
    "name": "Railway Halt Amenities in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.5,
    "expenditureLakhs": 11.43971,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104714-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104714-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104714-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02556857566947346
  },
  {
    "id": "MPLADS-102115",
    "name": "Anganwadi Center Construction in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 4,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102115-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102115-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102115-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.025265145126665445
  },
  {
    "id": "MPLADS-105091",
    "name": "School Infrastructure in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 45.23,
    "expenditureLakhs": 54.16952,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105091-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105091-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105091-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02505920200210543
  },
  {
    "id": "MPLADS-102796",
    "name": "Solar Power Installation in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 9.49,
    "expenditureLakhs": 8.75517,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102796-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102796-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102796-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02476061735008228
  },
  {
    "id": "MPLADS-105178",
    "name": "Sanitation/Toilets in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 2,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105178-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105178-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105178-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.024529658841514035
  },
  {
    "id": "MPLADS-101699",
    "name": "Drinking Water Supply in Muzaffarpur",
    "constituency": "Muzaffarpur",
    "district": "Muzaffarpur",
    "state": "Bihar",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 26,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101699-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101699-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101699-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.023961569968820262
  },
  {
    "id": "MPLADS-102077",
    "name": "Health Facility Upgrade in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 6,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-102077-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102077-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102077-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02357266769230637
  },
  {
    "id": "MPLADS-104790",
    "name": "Railway Halt Amenities in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 14.3,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104790-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104790-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104790-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.023509287907568455
  },
  {
    "id": "MPLADS-103023",
    "name": "Library/Reading Room in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4,
    "expenditureLakhs": 3.91726,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103023-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103023-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103023-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.023399074510104922
  },
  {
    "id": "MPLADS-101837",
    "name": "Street Lighting in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 18,
    "expenditureLakhs": 17.46791,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101837-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101837-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101837-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.023099278399773993
  },
  {
    "id": "MPLADS-104346",
    "name": "Irrigation Facility in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 6,
    "expenditureLakhs": 5.91828,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104346-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104346-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104346-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02307185565142078
  },
  {
    "id": "MPLADS-101366",
    "name": "Railway Halt Amenities in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 31,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101366-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101366-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101366-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022879937187130328
  },
  {
    "id": "MPLADS-100869",
    "name": "Sanitation/Toilets in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 2.73,
    "expenditureLakhs": 2.61902,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100869-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100869-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100869-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022856518524232206
  },
  {
    "id": "MPLADS-101483",
    "name": "CCTV Installation in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 6,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-101483-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101483-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101483-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022459282688707227
  },
  {
    "id": "MPLADS-105959",
    "name": "Irrigation Facility in Howrah",
    "constituency": "Howrah",
    "district": "Howrah",
    "state": "West Bengal",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 41.69,
    "expenditureLakhs": 40.65906,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105959-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105959-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105959-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022365205932764476
  },
  {
    "id": "MPLADS-104325",
    "name": "Sanitation/Toilets in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.34,
    "expenditureLakhs": 14.20106,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104325-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104325-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104325-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022353718278626533
  },
  {
    "id": "MPLADS-100913",
    "name": "Sports Infrastructure in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.76,
    "expenditureLakhs": 8.54659,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100913-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100913-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100913-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022285793682858324
  },
  {
    "id": "MPLADS-104039",
    "name": "Health Facility Upgrade in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 6.58,
    "expenditureLakhs": 6.53799,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104039-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104039-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104039-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02224579828791584
  },
  {
    "id": "MPLADS-104554",
    "name": "Drinking Water Supply in South Delhi",
    "constituency": "South Delhi",
    "district": "South Delhi",
    "state": "Delhi",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 7,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104554-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104554-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104554-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.022049187270077653
  },
  {
    "id": "MPLADS-105075",
    "name": "Library/Reading Room in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 21.86,
    "expenditureLakhs": 24.61042,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105075-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105075-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105075-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.021877707588718764
  },
  {
    "id": "MPLADS-103119",
    "name": "School Infrastructure in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 36,
    "expenditureLakhs": 29.86,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-103119-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103119-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103119-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02134387789201564
  },
  {
    "id": "MPLADS-104969",
    "name": "School Infrastructure in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 33.84,
    "expenditureLakhs": 21.18609,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-104969-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104969-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104969-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.021289175546526318
  },
  {
    "id": "MPLADS-105875",
    "name": "Library/Reading Room in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 5.16062,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-105875-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105875-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105875-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.02115084493640651
  },
  {
    "id": "MPLADS-100325",
    "name": "Sports Infrastructure in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 9.59,
    "expenditureLakhs": 4.09237,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100325-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100325-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100325-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.021051948366948903
  },
  {
    "id": "MPLADS-100760",
    "name": "Irrigation Facility in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.8,
    "expenditureLakhs": 8.7513,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Review",
    "activeSignals": [
      {
        "id": "SIG-100760-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100760-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100760-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.020533335517018414
  },
  {
    "id": "MPLADS-101945",
    "name": "Drinking Water Supply in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 44.82,
    "expenditureLakhs": 48.71277,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101945-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101945-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101945-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.019089180786811433
  },
  {
    "id": "MPLADS-101950",
    "name": "Anganwadi Center Construction in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.67,
    "expenditureLakhs": 5.57748,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101950-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101950-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101950-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01903057005230402
  },
  {
    "id": "MPLADS-105778",
    "name": "Drinking Water Supply in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 30,
    "expenditureLakhs": 28.56077,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105778-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105778-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105778-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018961290369151396
  },
  {
    "id": "MPLADS-105427",
    "name": "Community Hall Construction in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 52.51,
    "expenditureLakhs": 56.64009,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105427-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105427-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105427-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01895500829014729
  },
  {
    "id": "MPLADS-104949",
    "name": "Solar Power Installation in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 11,
    "expenditureLakhs": 5.26007,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104949-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104949-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104949-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018947940836765764
  },
  {
    "id": "MPLADS-104343",
    "name": "CCTV Installation in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 8,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104343-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104343-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104343-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018666211788312514
  },
  {
    "id": "MPLADS-100586",
    "name": "Irrigation Facility in Nashik",
    "constituency": "Nashik",
    "district": "Nashik",
    "state": "Maharashtra",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 55.2,
    "expenditureLakhs": 53.49762,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100586-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100586-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100586-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01863517245581847
  },
  {
    "id": "MPLADS-101393",
    "name": "Road Construction/Repair in Darjeeling",
    "constituency": "Darjeeling",
    "district": "Darjeeling",
    "state": "West Bengal",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 77.05,
    "expenditureLakhs": 73.4757,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101393-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101393-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101393-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018609352135779522
  },
  {
    "id": "MPLADS-102565",
    "name": "Community Hall Construction in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 25,
    "expenditureLakhs": 23.44522,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102565-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102565-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102565-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018366224391918706
  },
  {
    "id": "MPLADS-102193",
    "name": "Road Construction/Repair in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 70,
    "expenditureLakhs": 65.59421,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102193-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102193-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102193-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.018308889714060195
  },
  {
    "id": "MPLADS-105181",
    "name": "Solar Power Installation in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 31.53,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105181-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105181-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105181-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017876840672654826
  },
  {
    "id": "MPLADS-105520",
    "name": "Road Construction/Repair in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 36.09,
    "expenditureLakhs": 33.833,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105520-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105520-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105520-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017786550548316793
  },
  {
    "id": "MPLADS-105099",
    "name": "Sports Infrastructure in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.08,
    "expenditureLakhs": 3.99744,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105099-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105099-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105099-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017771268466448498
  },
  {
    "id": "MPLADS-102213",
    "name": "Solar Power Installation in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 27,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102213-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102213-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102213-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017468237235597206
  },
  {
    "id": "MPLADS-102831",
    "name": "School Infrastructure in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 44.17,
    "expenditureLakhs": 43.77414,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102831-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102831-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102831-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01714146963867791
  },
  {
    "id": "MPLADS-100552",
    "name": "Community Hall Construction in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 75,
    "expenditureLakhs": 69.39166,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100552-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100552-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100552-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017083822463123566
  },
  {
    "id": "MPLADS-102718",
    "name": "School Infrastructure in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 30.48,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102718-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102718-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102718-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017063986602374404
  },
  {
    "id": "MPLADS-105642",
    "name": "Sports Infrastructure in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 19.02,
    "expenditureLakhs": 20.42352,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105642-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105642-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105642-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.017036558750952446
  },
  {
    "id": "MPLADS-100787",
    "name": "Drinking Water Supply in Howrah",
    "constituency": "Howrah",
    "district": "Howrah",
    "state": "West Bengal",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 36,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100787-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100787-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100787-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.016967447918186496
  },
  {
    "id": "MPLADS-100518",
    "name": "Sanitation/Toilets in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.3,
    "expenditureLakhs": 10.02094,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100518-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100518-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100518-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01677385152785471
  },
  {
    "id": "MPLADS-103048",
    "name": "Drinking Water Supply in Darjeeling",
    "constituency": "Darjeeling",
    "district": "Darjeeling",
    "state": "West Bengal",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 42,
    "expenditureLakhs": 38.9083,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103048-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103048-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103048-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.016756731625694465
  },
  {
    "id": "MPLADS-100501",
    "name": "Anganwadi Center Construction in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 10.41,
    "expenditureLakhs": 12.68941,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100501-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100501-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100501-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01668128424843962
  },
  {
    "id": "MPLADS-104078",
    "name": "Community Hall Construction in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 68,
    "expenditureLakhs": 49.30352,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104078-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104078-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104078-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.016627278434543702
  },
  {
    "id": "MPLADS-103862",
    "name": "Irrigation Facility in Aurangabad",
    "constituency": "Aurangabad",
    "district": "Aurangabad",
    "state": "Maharashtra",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 7,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103862-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103862-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103862-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.016158488124990322
  },
  {
    "id": "MPLADS-102607",
    "name": "Community Hall Construction in Aurangabad",
    "constituency": "Aurangabad",
    "district": "Aurangabad",
    "state": "Maharashtra",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 58,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102607-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102607-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102607-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01603944796523049
  },
  {
    "id": "MPLADS-100546",
    "name": "Library/Reading Room in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 21.27,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100546-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100546-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100546-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01595512166635704
  },
  {
    "id": "MPLADS-102902",
    "name": "Sanitation/Toilets in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.99,
    "expenditureLakhs": 15.96355,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102902-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102902-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102902-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.015685062882161094
  },
  {
    "id": "MPLADS-101178",
    "name": "Anganwadi Center Construction in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3,
    "expenditureLakhs": 2.92192,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101178-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101178-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101178-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01559647377367468
  },
  {
    "id": "MPLADS-104120",
    "name": "Community Hall Construction in Nagpur",
    "constituency": "Nagpur",
    "district": "Nagpur",
    "state": "Maharashtra",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 75.86,
    "expenditureLakhs": 71.65839,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104120-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104120-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104120-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.015369161570440437
  },
  {
    "id": "MPLADS-101554",
    "name": "School Infrastructure in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 34.9,
    "expenditureLakhs": 42.57782,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101554-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101554-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101554-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.015339734444382191
  },
  {
    "id": "MPLADS-103339",
    "name": "Anganwadi Center Construction in Bhagalpur",
    "constituency": "Bhagalpur",
    "district": "Bhagalpur",
    "state": "Bihar",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.6,
    "expenditureLakhs": 12.6478,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103339-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103339-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103339-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.015302291273787016
  },
  {
    "id": "MPLADS-100565",
    "name": "Railway Halt Amenities in Aurangabad",
    "constituency": "Aurangabad",
    "district": "Aurangabad",
    "state": "Maharashtra",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 92,
    "expenditureLakhs": 85.68881,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100565-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100565-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100565-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.015011127415750836
  },
  {
    "id": "MPLADS-105328",
    "name": "Drinking Water Supply in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 41.62,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105328-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105328-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105328-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.014980767492185354
  },
  {
    "id": "MPLADS-103596",
    "name": "Sanitation/Toilets in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 9,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103596-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103596-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103596-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.014517727533696623
  },
  {
    "id": "MPLADS-100910",
    "name": "School Infrastructure in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 57.41,
    "expenditureLakhs": 55.00492,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100910-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100910-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100910-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.014271220977071564
  },
  {
    "id": "MPLADS-103079",
    "name": "Solar Power Installation in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 30.09,
    "expenditureLakhs": 27.89091,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103079-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103079-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103079-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01391372399625268
  },
  {
    "id": "MPLADS-101784",
    "name": "CCTV Installation in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 15.21,
    "expenditureLakhs": 14.9902,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101784-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101784-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101784-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01386272396627275
  },
  {
    "id": "MPLADS-105050",
    "name": "Road Construction/Repair in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 61.34,
    "expenditureLakhs": 57.03098,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105050-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105050-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105050-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.013827408041629186
  },
  {
    "id": "MPLADS-101050",
    "name": "Sanitation/Toilets in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 6,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101050-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101050-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101050-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.013810563819033228
  },
  {
    "id": "MPLADS-100031",
    "name": "CCTV Installation in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 24,
    "expenditureLakhs": 23.48377,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100031-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100031-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100031-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01361900198461341
  },
  {
    "id": "MPLADS-104716",
    "name": "Railway Halt Amenities in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 11.92152,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104716-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104716-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104716-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01332250694689352
  },
  {
    "id": "MPLADS-101525",
    "name": "Anganwadi Center Construction in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 7.96,
    "expenditureLakhs": 7.71108,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101525-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101525-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101525-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.013157428493992929
  },
  {
    "id": "MPLADS-103543",
    "name": "Anganwadi Center Construction in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 18.78,
    "expenditureLakhs": 17.74008,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103543-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103543-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103543-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.013107758105047385
  },
  {
    "id": "MPLADS-103885",
    "name": "CCTV Installation in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 19.88,
    "expenditureLakhs": 18.34835,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103885-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103885-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103885-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012962358485470005
  },
  {
    "id": "MPLADS-101283",
    "name": "School Infrastructure in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 40.84,
    "expenditureLakhs": 39.773,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101283-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101283-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101283-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012837084567549284
  },
  {
    "id": "MPLADS-103700",
    "name": "Road Construction/Repair in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 55,
    "expenditureLakhs": 55,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103700-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103700-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103700-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012806406842372109
  },
  {
    "id": "MPLADS-105491",
    "name": "Health Facility Upgrade in Patna",
    "constituency": "Patna",
    "district": "Patna",
    "state": "Bihar",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 63.46,
    "expenditureLakhs": 60.30544,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105491-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105491-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105491-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012776745422156233
  },
  {
    "id": "MPLADS-101194",
    "name": "Railway Halt Amenities in Chennai",
    "constituency": "Chennai",
    "district": "Chennai",
    "state": "Tamil Nadu",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 36,
    "expenditureLakhs": 31.56182,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101194-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101194-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101194-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012766027926186085
  },
  {
    "id": "MPLADS-100472",
    "name": "Sanitation/Toilets in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 14.37,
    "expenditureLakhs": 15.88134,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100472-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100472-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100472-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01271608335814578
  },
  {
    "id": "MPLADS-102215",
    "name": "Community Hall Construction in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 55.25,
    "expenditureLakhs": 54.12386,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102215-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102215-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102215-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012690051824516102
  },
  {
    "id": "MPLADS-105407",
    "name": "CCTV Installation in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 16.17,
    "expenditureLakhs": 15.7496,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105407-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105407-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105407-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012657010316672213
  },
  {
    "id": "MPLADS-101803",
    "name": "Street Lighting in Darjeeling",
    "constituency": "Darjeeling",
    "district": "Darjeeling",
    "state": "West Bengal",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 19.79,
    "expenditureLakhs": 22.32539,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101803-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101803-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101803-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01265326356059393
  },
  {
    "id": "MPLADS-105785",
    "name": "Solar Power Installation in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 6.9,
    "expenditureLakhs": 6.89453,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105785-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105785-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105785-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012479714710988188
  },
  {
    "id": "MPLADS-103164",
    "name": "Street Lighting in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 2.59,
    "expenditureLakhs": 2.59,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103164-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103164-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103164-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.012160015594399609
  },
  {
    "id": "MPLADS-101452",
    "name": "Health Facility Upgrade in Muzaffarpur",
    "constituency": "Muzaffarpur",
    "district": "Muzaffarpur",
    "state": "Bihar",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 40,
    "expenditureLakhs": 37.1474,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101452-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101452-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101452-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01181865003460525
  },
  {
    "id": "MPLADS-100408",
    "name": "Library/Reading Room in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 18.52,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100408-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100408-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100408-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0114241194741449
  },
  {
    "id": "MPLADS-103366",
    "name": "Sanitation/Toilets in Chennai",
    "constituency": "Chennai",
    "district": "Chennai",
    "state": "Tamil Nadu",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.91,
    "expenditureLakhs": 14.20694,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103366-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103366-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103366-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.011325699620120089
  },
  {
    "id": "MPLADS-103551",
    "name": "Sanitation/Toilets in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 2.22,
    "expenditureLakhs": 2.74195,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103551-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103551-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103551-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.01128119822755591
  },
  {
    "id": "MPLADS-102842",
    "name": "Community Hall Construction in Nashik",
    "constituency": "Nashik",
    "district": "Nashik",
    "state": "Maharashtra",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.85,
    "expenditureLakhs": 13.14633,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102842-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102842-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102842-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.011275691264942322
  },
  {
    "id": "MPLADS-104562",
    "name": "Road Construction/Repair in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 77.3,
    "expenditureLakhs": 83.7933,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104562-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104562-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104562-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.011243712382562276
  },
  {
    "id": "MPLADS-105790",
    "name": "Street Lighting in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.25,
    "expenditureLakhs": 13.40867,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105790-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105790-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105790-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.011195374806375336
  },
  {
    "id": "MPLADS-104607",
    "name": "Sanitation/Toilets in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8,
    "expenditureLakhs": 7.39779,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104607-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104607-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104607-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.010811752433567245
  },
  {
    "id": "MPLADS-102362",
    "name": "Health Facility Upgrade in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 67,
    "expenditureLakhs": 61.95103,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102362-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102362-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102362-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.010470080382045333
  },
  {
    "id": "MPLADS-105208",
    "name": "CCTV Installation in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13.38,
    "expenditureLakhs": 12.93177,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105208-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105208-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105208-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.010443112997751802
  },
  {
    "id": "MPLADS-105094",
    "name": "Sports Infrastructure in Jaipur",
    "constituency": "Jaipur",
    "district": "Jaipur",
    "state": "Rajasthan",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 34.02,
    "expenditureLakhs": 37.60909,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105094-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105094-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105094-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.010050753741173701
  },
  {
    "id": "MPLADS-100262",
    "name": "Library/Reading Room in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5,
    "expenditureLakhs": 4.76171,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100262-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100262-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100262-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.009852344405179236
  },
  {
    "id": "MPLADS-101500",
    "name": "Sanitation/Toilets in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 9.67,
    "expenditureLakhs": 9.23574,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101500-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101500-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101500-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.009792912476250804
  },
  {
    "id": "MPLADS-103942",
    "name": "Solar Power Installation in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 5.98,
    "expenditureLakhs": 2.99,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103942-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103942-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103942-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.009218343622919067
  },
  {
    "id": "MPLADS-102403",
    "name": "Sanitation/Toilets in Howrah",
    "constituency": "Howrah",
    "district": "Howrah",
    "state": "West Bengal",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 10,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102403-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102403-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102403-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.009015665133778494
  },
  {
    "id": "MPLADS-101335",
    "name": "Sanitation/Toilets in Mysuru",
    "constituency": "Mysuru",
    "district": "Mysuru",
    "state": "Karnataka",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.65,
    "expenditureLakhs": 5.61738,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101335-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101335-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101335-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.009015226014431277
  },
  {
    "id": "MPLADS-102628",
    "name": "Solar Power Installation in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 21.96,
    "expenditureLakhs": 21.46636,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102628-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102628-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102628-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.008670503926110906
  },
  {
    "id": "MPLADS-105658",
    "name": "Street Lighting in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 14.2,
    "expenditureLakhs": 13.63438,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105658-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105658-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105658-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.008579859437414683
  },
  {
    "id": "MPLADS-100599",
    "name": "Railway Halt Amenities in North Delhi",
    "constituency": "North Delhi",
    "district": "North Delhi",
    "state": "Delhi",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 30,
    "expenditureLakhs": 15.13809,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100599-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100599-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100599-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.008334262949547866
  },
  {
    "id": "MPLADS-101544",
    "name": "Drinking Water Supply in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 37.41,
    "expenditureLakhs": 41.931,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101544-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101544-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101544-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.008086473494917534
  },
  {
    "id": "MPLADS-105239",
    "name": "Health Facility Upgrade in Madurai",
    "constituency": "Madurai",
    "district": "Madurai",
    "state": "Tamil Nadu",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 59.99,
    "expenditureLakhs": 67.89627,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105239-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105239-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105239-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.00801605549067319
  },
  {
    "id": "MPLADS-105639",
    "name": "Library/Reading Room in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 13,
    "expenditureLakhs": 12.39443,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105639-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105639-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105639-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007995752474582285
  },
  {
    "id": "MPLADS-100706",
    "name": "Sports Infrastructure in Muzaffarpur",
    "constituency": "Muzaffarpur",
    "district": "Muzaffarpur",
    "state": "Bihar",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 32.03,
    "expenditureLakhs": 37.75338,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100706-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100706-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100706-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007889756583620122
  },
  {
    "id": "MPLADS-100604",
    "name": "Sanitation/Toilets in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Sanitation/Toilets",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 10,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100604-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100604-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100604-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007875518845416485
  },
  {
    "id": "MPLADS-100730",
    "name": "Sports Infrastructure in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 41.78,
    "expenditureLakhs": 39.09349,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100730-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100730-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100730-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007841865755742528
  },
  {
    "id": "MPLADS-101477",
    "name": "CCTV Installation in Darjeeling",
    "constituency": "Darjeeling",
    "district": "Darjeeling",
    "state": "West Bengal",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 16,
    "expenditureLakhs": 12.47497,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101477-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101477-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101477-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007737442547681939
  },
  {
    "id": "MPLADS-100530",
    "name": "Drinking Water Supply in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 17.36,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100530-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100530-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100530-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007631167333650768
  },
  {
    "id": "MPLADS-100696",
    "name": "Library/Reading Room in Nashik",
    "constituency": "Nashik",
    "district": "Nashik",
    "state": "Maharashtra",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 17.43,
    "expenditureLakhs": 17.05284,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100696-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100696-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100696-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007430454965735911
  },
  {
    "id": "MPLADS-102980",
    "name": "Anganwadi Center Construction in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 4.83,
    "expenditureLakhs": 4.73849,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102980-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102980-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102980-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007131524702760239
  },
  {
    "id": "MPLADS-102745",
    "name": "Anganwadi Center Construction in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.62,
    "expenditureLakhs": 8.49681,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102745-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102745-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102745-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007126430995999855
  },
  {
    "id": "MPLADS-101021",
    "name": "School Infrastructure in Meerut",
    "constituency": "Meerut",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 48.02,
    "expenditureLakhs": 47.51177,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101021-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101021-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101021-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0071030797069938645
  },
  {
    "id": "MPLADS-100023",
    "name": "Anganwadi Center Construction in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 6.31,
    "expenditureLakhs": 6.31,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100023-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100023-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100023-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.007031206708977056
  },
  {
    "id": "MPLADS-101906",
    "name": "School Infrastructure in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 28.82,
    "expenditureLakhs": 27.53669,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101906-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101906-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101906-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006796739960845066
  },
  {
    "id": "MPLADS-102488",
    "name": "CCTV Installation in Howrah",
    "constituency": "Howrah",
    "district": "Howrah",
    "state": "West Bengal",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3.58,
    "expenditureLakhs": 4.08425,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102488-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102488-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102488-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006689301130987091
  },
  {
    "id": "MPLADS-101374",
    "name": "Sports Infrastructure in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 31.04,
    "expenditureLakhs": 37.81798,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101374-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101374-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101374-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006510500342461589
  },
  {
    "id": "MPLADS-102053",
    "name": "Sports Infrastructure in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 31,
    "expenditureLakhs": 29.30011,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102053-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102053-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102053-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006453660090723012
  },
  {
    "id": "MPLADS-102759",
    "name": "Road Construction/Repair in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 81.69,
    "expenditureLakhs": 76.8908,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102759-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102759-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102759-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0064313304168310825
  },
  {
    "id": "MPLADS-101586",
    "name": "Solar Power Installation in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 25,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101586-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101586-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101586-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006331266499256083
  },
  {
    "id": "MPLADS-102840",
    "name": "Solar Power Installation in Malda",
    "constituency": "Malda",
    "district": "Malda",
    "state": "West Bengal",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 27.68,
    "expenditureLakhs": 25.92958,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102840-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102840-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102840-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006224008447340168
  },
  {
    "id": "MPLADS-101501",
    "name": "Solar Power Installation in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 34.81,
    "expenditureLakhs": 32.78136,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101501-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101501-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101501-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006139060466128665
  },
  {
    "id": "MPLADS-105633",
    "name": "CCTV Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 23,
    "expenditureLakhs": 22.09096,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105633-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105633-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105633-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.006025028182583547
  },
  {
    "id": "MPLADS-103601",
    "name": "Health Facility Upgrade in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.13,
    "expenditureLakhs": 12.94516,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103601-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103601-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103601-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005976037607158369
  },
  {
    "id": "MPLADS-105206",
    "name": "Drinking Water Supply in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.41,
    "expenditureLakhs": 11.47503,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105206-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105206-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105206-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005561961674941496
  },
  {
    "id": "MPLADS-103364",
    "name": "Anganwadi Center Construction in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 5.14,
    "expenditureLakhs": 4.84145,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103364-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103364-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103364-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005414644719285766
  },
  {
    "id": "MPLADS-101370",
    "name": "Irrigation Facility in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 55,
    "expenditureLakhs": 51.90731,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101370-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101370-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101370-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005392251888729049
  },
  {
    "id": "MPLADS-104143",
    "name": "School Infrastructure in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 47.86,
    "expenditureLakhs": 46.117,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104143-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104143-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104143-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005176750926454754
  },
  {
    "id": "MPLADS-102465",
    "name": "Solar Power Installation in Gaya",
    "constituency": "Gaya",
    "district": "Gaya",
    "state": "Bihar",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 30.51,
    "expenditureLakhs": 10.723,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102465-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102465-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102465-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.005007151751094341
  },
  {
    "id": "MPLADS-105853",
    "name": "Drinking Water Supply in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 11.40748,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105853-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105853-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105853-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004957343664326319
  },
  {
    "id": "MPLADS-100624",
    "name": "Health Facility Upgrade in Gaya",
    "constituency": "Gaya",
    "district": "Gaya",
    "state": "Bihar",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 47.31,
    "expenditureLakhs": 45.4865,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100624-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100624-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100624-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004935174479083981
  },
  {
    "id": "MPLADS-105217",
    "name": "Anganwadi Center Construction in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Anganwadi Center Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 10.86,
    "expenditureLakhs": 11.8304,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105217-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105217-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105217-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004792237999215021
  },
  {
    "id": "MPLADS-100930",
    "name": "Solar Power Installation in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 13,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100930-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100930-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100930-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004783819971858394
  },
  {
    "id": "MPLADS-101158",
    "name": "CCTV Installation in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 15.2,
    "expenditureLakhs": 16.32455,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101158-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101158-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101158-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004714522479863037
  },
  {
    "id": "MPLADS-105454",
    "name": "School Infrastructure in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 55.13,
    "expenditureLakhs": 36.7246,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105454-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105454-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105454-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004682940415785097
  },
  {
    "id": "MPLADS-104601",
    "name": "Solar Power Installation in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 27.28,
    "expenditureLakhs": 25.73675,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104601-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104601-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104601-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004271065135204921
  },
  {
    "id": "MPLADS-104734",
    "name": "Railway Halt Amenities in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Railway Halt Amenities",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": null,
    "currentStatus": "Recommended",
    "estimatedCostLakhs": 72,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104734-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104734-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104734-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.004247691878791815
  },
  {
    "id": "MPLADS-101658",
    "name": "Library/Reading Room in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 8.54,
    "expenditureLakhs": 8.47245,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101658-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101658-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101658-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0041230136757890445
  },
  {
    "id": "MPLADS-101570",
    "name": "CCTV Installation in Kolkata",
    "constituency": "Kolkata",
    "district": "Kolkata",
    "state": "West Bengal",
    "sector": "CCTV Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 22.22,
    "expenditureLakhs": 22.02155,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101570-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101570-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101570-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.003908301344354048
  },
  {
    "id": "MPLADS-104717",
    "name": "Sports Infrastructure in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Sports Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.2,
    "expenditureLakhs": 12.17029,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104717-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104717-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104717-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.003885473125234018
  },
  {
    "id": "MPLADS-101550",
    "name": "Street Lighting in Bengaluru",
    "constituency": "Bengaluru",
    "district": "Bengaluru",
    "state": "Karnataka",
    "sector": "Street Lighting",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 19,
    "expenditureLakhs": 18.22989,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101550-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101550-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101550-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.003565987513823199
  },
  {
    "id": "MPLADS-100254",
    "name": "Solar Power Installation in New Delhi",
    "constituency": "New Delhi",
    "district": "New Delhi",
    "state": "Delhi",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 19.39,
    "expenditureLakhs": 19.39,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100254-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100254-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100254-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0032614774636370303
  },
  {
    "id": "MPLADS-104816",
    "name": "Library/Reading Room in Kochi",
    "constituency": "Kochi",
    "district": "Kochi",
    "state": "Kerala",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 3.33,
    "expenditureLakhs": 3.99974,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104816-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104816-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104816-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.00304625239710421
  },
  {
    "id": "MPLADS-100681",
    "name": "Drinking Water Supply in Thane",
    "constituency": "Thane",
    "district": "Thane",
    "state": "Maharashtra",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 15.25,
    "expenditureLakhs": 16.60213,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100681-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100681-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100681-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0029722044787729995
  },
  {
    "id": "MPLADS-100469",
    "name": "Irrigation Facility in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 32,
    "expenditureLakhs": 31.5338,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100469-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100469-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100469-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0024934626407063787
  },
  {
    "id": "MPLADS-103891",
    "name": "Community Hall Construction in Varanasi",
    "constituency": "Varanasi",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 23.47,
    "expenditureLakhs": 22.83467,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103891-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103891-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103891-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0021321270639058643
  },
  {
    "id": "MPLADS-104239",
    "name": "Drinking Water Supply in Varanasi",
    "constituency": "Varanasi",
    "district": "Varanasi",
    "state": "Uttar Pradesh",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 3.46,
    "expenditureLakhs": 4.11413,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104239-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104239-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104239-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0021129606326225625
  },
  {
    "id": "MPLADS-105755",
    "name": "Community Hall Construction in Ahmedabad",
    "constituency": "Ahmedabad",
    "district": "Ahmedabad",
    "state": "Gujarat",
    "sector": "Community Hall Construction",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 78.64,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105755-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105755-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105755-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0020002914591527032
  },
  {
    "id": "MPLADS-100715",
    "name": "Library/Reading Room in Hubli",
    "constituency": "Hubli",
    "district": "Hubli",
    "state": "Karnataka",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 20.77,
    "expenditureLakhs": 19.19232,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-100715-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100715-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-100715-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.00197302200117655
  },
  {
    "id": "MPLADS-102240",
    "name": "Solar Power Installation in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 18.66,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102240-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102240-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102240-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.001944922982194397
  },
  {
    "id": "MPLADS-102271",
    "name": "Health Facility Upgrade in Jodhpur",
    "constituency": "Jodhpur",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 17,
    "expenditureLakhs": 14.6843,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102271-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102271-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102271-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0017766510669158242
  },
  {
    "id": "MPLADS-105314",
    "name": "Health Facility Upgrade in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 67.91,
    "expenditureLakhs": 67.91,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105314-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105314-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105314-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0017720910595682149
  },
  {
    "id": "MPLADS-105717",
    "name": "Road Construction/Repair in Kanpur",
    "constituency": "Kanpur",
    "district": "Kanpur",
    "state": "Uttar Pradesh",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12.61,
    "expenditureLakhs": 12.345,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105717-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105717-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105717-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0015731726430391335
  },
  {
    "id": "MPLADS-104386",
    "name": "Library/Reading Room in Rajkot",
    "constituency": "Rajkot",
    "district": "Rajkot",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 12,
    "expenditureLakhs": 11.89563,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104386-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104386-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104386-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0015000903736615001
  },
  {
    "id": "MPLADS-101354",
    "name": "Road Construction/Repair in Thiruvananthapuram",
    "constituency": "Thiruvananthapuram",
    "district": "Thiruvananthapuram",
    "state": "Kerala",
    "sector": "Road Construction/Repair",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 18.62,
    "expenditureLakhs": 0,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101354-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101354-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101354-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0014130256458866342
  },
  {
    "id": "MPLADS-101309",
    "name": "Solar Power Installation in Salem",
    "constituency": "Salem",
    "district": "Salem",
    "state": "Tamil Nadu",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 11.25,
    "expenditureLakhs": 11.0947,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-101309-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101309-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-101309-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.00137660312103427
  },
  {
    "id": "MPLADS-103143",
    "name": "School Infrastructure in Surat",
    "constituency": "Surat",
    "district": "Surat",
    "state": "Gujarat",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 38.52,
    "expenditureLakhs": 38.52,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103143-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103143-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Desc Genericness Score",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103143-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Vendor Total Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0011364411605206959
  },
  {
    "id": "MPLADS-103063",
    "name": "Solar Power Installation in Kozhikode",
    "constituency": "Kozhikode",
    "district": "Kozhikode",
    "state": "Kerala",
    "sector": "Solar Power Installation",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 24,
    "expenditureLakhs": 22.08401,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103063-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103063-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103063-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0008238584774304947
  },
  {
    "id": "MPLADS-102717",
    "name": "Irrigation Facility in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 70.01,
    "expenditureLakhs": 66.05511,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-102717-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102717-2",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-102717-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.000797720023746229
  },
  {
    "id": "MPLADS-103817",
    "name": "Drinking Water Supply in Pune",
    "constituency": "Pune",
    "district": "Pune",
    "state": "Maharashtra",
    "sector": "Drinking Water Supply",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 28,
    "expenditureLakhs": 24.46811,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-103817-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103817-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Vendor Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-103817-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0005733803648518832
  },
  {
    "id": "MPLADS-104378",
    "name": "School Infrastructure in Nashik",
    "constituency": "Nashik",
    "district": "Nashik",
    "state": "Maharashtra",
    "sector": "School Infrastructure",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Sanctioned",
    "estimatedCostLakhs": 38.36,
    "expenditureLakhs": 43.74179,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104378-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104378-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104378-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0005291860850349384
  },
  {
    "id": "MPLADS-104600",
    "name": "Health Facility Upgrade in Belagavi",
    "constituency": "Belagavi",
    "district": "Belagavi",
    "state": "Karnataka",
    "sector": "Health Facility Upgrade",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 19.58,
    "expenditureLakhs": 22.31223,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-104600-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Over Release Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104600-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Release Ratio",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-104600-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Rec To Sanction",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0002882678326794341
  },
  {
    "id": "MPLADS-105165",
    "name": "Irrigation Facility in Udaipur",
    "constituency": "Udaipur",
    "district": "Udaipur",
    "state": "Rajasthan",
    "sector": "Irrigation Facility",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "In Progress",
    "estimatedCostLakhs": 34,
    "expenditureLakhs": 17.05046,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105165-1",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Is Round Amount",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105165-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105165-3",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Days Sanction To Completion",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.0002747318498933504
  },
  {
    "id": "MPLADS-105878",
    "name": "Library/Reading Room in Vadodara",
    "constituency": "Vadodara",
    "district": "Vadodara",
    "state": "Gujarat",
    "sector": "Library/Reading Room",
    "recommendationDate": "2023-01-15T00:00:00.000Z",
    "sanctionDate": "2023-03-01T00:00:00.000Z",
    "currentStatus": "Completed",
    "estimatedCostLakhs": 20.77,
    "expenditureLakhs": 19.91168,
    "lastUpdateDate": "2023-12-01T00:00:00.000Z",
    "reviewPriority": "Normal",
    "activeSignals": [
      {
        "id": "SIG-105878-1",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "No Photo Flag",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105878-2",
        "type": "ML_ANOMALY",
        "source": "EXECUTION_STALL",
        "status": "ACTIVE",
        "reason": "Agency Work Count",
        "createdAt": "2026-09-05T09:16:06.465Z"
      },
      {
        "id": "SIG-105878-3",
        "type": "ML_ANOMALY",
        "source": "COST_DEVIATION",
        "status": "ACTIVE",
        "reason": "Amount Zscore In Category",
        "createdAt": "2026-09-05T09:16:06.465Z"
      }
    ],
    "mlAnomalyScore": 0.000009535031953111783
  }
];
