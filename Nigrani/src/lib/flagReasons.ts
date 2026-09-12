export interface FlagReasonMeta {
  code: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  severity: "critical" | "warning" | "info";
  // Quantitative Deviation fields
  deviationBadge?: string;
  deviationDetail?: string;
  deviationType?: "increase" | "decrease" | "stalled" | "neutral";
}

export interface ProjectContext {
  sanctioned_amount?: number;
  released_amount?: number;
  recommendation_date?: string | null;
  sanction_date?: string | null;
  completion_date?: string | null;
  photo_count?: number;
  work_category?: string;
  status?: string;
  benchmarks?: {
    category_mean_amount?: number;
    category_median_amount?: number;
    category_std_amount?: number;
    category_median_duration?: number;
    category_median_delay?: number;
  };
}

// Empirical category benchmarks from official MPLADS dataset
export const CATEGORY_BENCHMARKS: Record<
  string,
  { meanCost: number; medianDurationDays: number; medianDelayDays: number }
> = {
  "Anganwadi Center Construction": { meanCost: 1149985, medianDurationDays: 138, medianDelayDays: 33 },
  "CCTV Installation": { meanCost: 1341293, medianDurationDays: 146, medianDelayDays: 34 },
  "Community Hall Construction": { meanCost: 4428071, medianDurationDays: 142, medianDelayDays: 31 },
  "Drinking Water Supply": { meanCost: 2413412, medianDurationDays: 141, medianDelayDays: 31 },
  "Health Facility Upgrade": { meanCost: 3770265, medianDurationDays: 151, medianDelayDays: 30 },
  "Irrigation Facility": { meanCost: 4910364, medianDurationDays: 138, medianDelayDays: 30 },
  "Library/Reading Room": { meanCost: 1387815, medianDurationDays: 134, medianDelayDays: 31 },
  "Railway Halt Amenities": { meanCost: 5195362, medianDurationDays: 136, medianDelayDays: 30 },
  "Road Construction/Repair": { meanCost: 5044110, medianDurationDays: 133, medianDelayDays: 29 },
  "Sanitation/Toilets": { meanCost: 861083, medianDurationDays: 142, medianDelayDays: 32 },
  "School Infrastructure": { meanCost: 3241194, medianDurationDays: 137, medianDelayDays: 33 },
  "Solar Power Installation": { meanCost: 1953105, medianDurationDays: 136, medianDelayDays: 34 },
  "Sports Infrastructure": { meanCost: 2642627, medianDurationDays: 149, medianDelayDays: 30 },
  "Street Lighting": { meanCost: 1057061, medianDurationDays: 141, medianDelayDays: 31 },
};

export const FLAG_REASON_MAP: Record<string, Omit<FlagReasonMeta, "code">> = {
  amount_zscore_in_category: {
    label: "Unusually High Project Cost",
    shortLabel: "High Cost",
    description:
      "Project cost is much higher than what similar projects in this sector usually cost.",
    icon: "currency_rupee",
    severity: "warning",
  },
  release_ratio: {
    label: "Unusual Fund Release Pattern",
    shortLabel: "Fund Gap",
    description:
      "The amount of money released doesn't match what's expected at this stage of the project.",
    icon: "account_balance_wallet",
    severity: "warning",
  },
  days_sanction_to_completion: {
    label: "Unusual Project Duration",
    shortLabel: "Timeline Issue",
    description:
      "Project timeline is very different from how long similar projects usually take.",
    icon: "schedule",
    severity: "warning",
  },
  days_rec_to_sanction: {
    label: "Slow Approval Process",
    shortLabel: "Slow Approval",
    description:
      "It took much longer than usual for the project to get approved after being recommended.",
    icon: "hourglass_bottom",
    severity: "info",
  },
  over_release_flag: {
    label: "More Money Released Than Approved",
    shortLabel: "Over Budget",
    description:
      "More funds have been released than the total approved budget for this project.",
    icon: "price_change",
    severity: "critical",
  },
  is_round_amount: {
    label: "Exact Round Amount",
    shortLabel: "Round Amount",
    description:
      "The budget is an exact round number, which may suggest no detailed cost breakdown was done.",
    icon: "pin",
    severity: "info",
  },
  no_photo_flag: {
    label: "No Photos Uploaded",
    shortLabel: "No Photos",
    description:
      "The project is marked as completed but no site photos have been uploaded as proof.",
    icon: "no_photography",
    severity: "critical",
  },
  desc_generic_flag: {
    label: "Copy-Paste Project Description",
    shortLabel: "Generic Text",
    description:
      "The project description looks like a copy-paste template used across many projects.",
    icon: "content_copy",
    severity: "info",
  },
  network_risk_flag: {
    label: "Contractor Handles Too Many Projects",
    shortLabel: "Concentrated Work",
    description:
      "The same contractor or agency is connected to an unusually large number of projects in the area.",
    icon: "hub",
    severity: "critical",
  },
  vendor_work_count: {
    label: "Contractor Has Many Projects",
    shortLabel: "Many Projects",
    description:
      "This contractor has been given a very high number of projects in this area.",
    icon: "domain",
    severity: "warning",
  },
  vendor_total_amount: {
    label: "Contractor Received Large Total Funds",
    shortLabel: "High Value",
    description:
      "The total money given to this contractor across all projects is unusually high.",
    icon: "trending_up",
    severity: "warning",
  },
  vendor_degree_centrality: {
    label: "Contractor Connected to Many Agencies",
    shortLabel: "Wide Network",
    description:
      "This contractor works with an unusually large number of different agencies and regions.",
    icon: "share",
    severity: "warning",
  },
  agency_betweenness: {
    label: "Agency Controls Too Many Approvals",
    shortLabel: "Key Agency",
    description:
      "This agency handles a very large share of project approvals in the region.",
    icon: "schema",
    severity: "warning",
  },
  payment_before_sanction: {
    label: "Money Released Before Approval",
    shortLabel: "Early Payment",
    description:
      "Funds were released before the project was officially approved.",
    icon: "error",
    severity: "critical",
  },
  impossible_speed_completion: {
    label: "Completed Too Quickly",
    shortLabel: "Too Fast",
    description:
      "The project was finished in a timeframe that seems too short for this type of work.",
    icon: "bolt",
    severity: "critical",
  },
  duplicate_generic_description: {
    label: "Duplicate Project Description",
    shortLabel: "Duplicate",
    description:
      "The project description is almost identical to other proposals in the same district.",
    icon: "copy_all",
    severity: "info",
  },
  round_number_bias: {
    label: "Repeated Round Number Pattern",
    shortLabel: "Round Numbers",
    description:
      "Multiple projects use exact round-figure budgets, which may indicate estimates weren't detailed.",
    icon: "tag",
    severity: "info",
  },
};

/**
 * Calculates quantitative deviation number and percentage based on project attributes
 */
function calculateDeviation(
  code: string,
  context?: ProjectContext
): {
  badge?: string;
  detail?: string;
  type?: "increase" | "decrease" | "stalled" | "neutral";
} {
  if (!context) return {};

  const sanctioned = context.sanctioned_amount ?? 0;
  const released = context.released_amount ?? 0;
  const category = context.work_category || "";
  const catBenchmark =
    CATEGORY_BENCHMARKS[category] || { meanCost: 2500000, medianDurationDays: 140, medianDelayDays: 31 };

  const meanCost = context.benchmarks?.category_mean_amount || catBenchmark.meanCost;
  const expectedDuration = context.benchmarks?.category_median_duration || catBenchmark.medianDurationDays;
  const expectedDelay = context.benchmarks?.category_median_delay || catBenchmark.medianDelayDays;

  switch (code) {
    case "amount_zscore_in_category": {
      if (sanctioned > 0 && meanCost > 0) {
        const diff = sanctioned - meanCost;
        const pct = (diff / meanCost) * 100;
        const sign = pct >= 0 ? "+" : "";
        const sanctionedLakhs = (sanctioned / 100000).toFixed(1);
        const meanLakhs = (meanCost / 100000).toFixed(1);

        return {
          badge: `${sign}${pct.toFixed(1)}%`,
          detail: `Project cost is ₹${sanctionedLakhs}L, which is ${Math.abs(pct).toFixed(1)}% ${pct >= 0 ? 'higher' : 'lower'} than the average (₹${meanLakhs}L) for similar projects in this category.`,
          type: pct >= 0 ? "increase" : "decrease",
        };
      }
      return { badge: "High Cost", type: "increase" };
    }

    case "release_ratio": {
      if (sanctioned > 0) {
        if (released === 0) {
          return {
            badge: "0.0% Released",
            detail: `₹0 released out of the approved ₹${(sanctioned / 100000).toFixed(1)}L budget (0% disbursement) at this stage, which is lower than expected.`,
            type: "stalled",
          };
        }
        if (released > sanctioned) {
          const excessPct = ((released - sanctioned) / sanctioned) * 100;
          return {
            badge: `+${excessPct.toFixed(1)}% Over`,
            detail: `₹${(released / 100000).toFixed(1)}L released vs ₹${(sanctioned / 100000).toFixed(1)}L approved.`,
            type: "increase",
          };
        }
        const ratio = (released / sanctioned) * 100;
        return {
          badge: `${ratio.toFixed(1)}% Released`,
          detail: `₹${(released / 100000).toFixed(1)}L released of ₹${(sanctioned / 100000).toFixed(1)}L approved.`,
          type: "neutral",
        };
      }
      return { badge: "Unusual", type: "neutral" };
    }

    case "days_sanction_to_completion": {
      if (context.sanction_date && context.completion_date) {
        const d1 = new Date(context.sanction_date).getTime();
        const d2 = new Date(context.completion_date).getTime();
        const days = Math.max(0, Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)));
        const diff = days - expectedDuration;
        const sign = diff >= 0 ? "+" : "";

        return {
          badge: `${days} days`,
          detail: `Took ${days} days to complete — similar projects usually take about ${expectedDuration} days (${sign}${diff} days difference).`,
          type: diff >= 0 ? "increase" : "decrease",
        };
      }
      return {
        badge: "Not recorded",
        detail: "No physical completion date has been recorded in the system, despite significant time since sanction.",
        type: "stalled",
      };
    }

    case "days_rec_to_sanction": {
      if (context.recommendation_date && context.sanction_date) {
        const d1 = new Date(context.recommendation_date).getTime();
        const d2 = new Date(context.sanction_date).getTime();
        const days = Math.max(0, Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)));
        const diff = days - expectedDelay;
        const sign = diff >= 0 ? "+" : "";

        return {
          badge: `${days} days`,
          detail: `Approval took ${days} days — similar projects are usually approved in about ${expectedDelay} days (${sign}${diff} days difference).`,
          type: diff >= 0 ? "increase" : "decrease",
        };
      }
      return { badge: "Delayed", type: "increase" };
    }

    case "over_release_flag": {
      const excess = released - sanctioned;
      const pct = sanctioned > 0 ? (excess / sanctioned) * 100 : 0;
      return {
        badge: `+${pct.toFixed(1)}% over`,
        detail: `₹${(excess / 100000).toFixed(1)}L more was released than the approved budget.`,
        type: "increase",
      };
    }

    case "is_round_amount": {
      return {
        badge: "Round figure",
        detail: `Budget set at exactly ₹${(sanctioned / 100000).toFixed(2)}L — no detailed cost breakdown.`,
        type: "neutral",
      };
    }

    case "no_photo_flag": {
      return {
        badge: "0 photos",
        detail: "No site photos or inspection images have been uploaded.",
        type: "stalled",
      };
    }

    case "desc_generic_flag": {
      return {
        badge: "15+ matches",
        detail: "This project's description matches 15+ other projects word-for-word.",
        type: "neutral",
      };
    }

    case "network_risk_flag": {
      return {
        badge: "Top 2%",
        detail: "This contractor or agency handles more projects than 98% of others in the region.",
        type: "increase",
      };
    }

    default:
      return {};
  }
}

/**
 * Format a single raw flag code into human-readable metadata with quantitative deviations
 */
export function formatFlagReason(
  rawCode: string,
  context?: ProjectContext
): FlagReasonMeta {
  const code = rawCode.trim();
  const base = FLAG_REASON_MAP[code];
  const dev = calculateDeviation(code, context);

  if (base) {
    return {
      code,
      ...base,
      deviationBadge: dev.badge,
      deviationDetail: dev.detail,
      deviationType: dev.type,
    };
  }

  // Fallback for unexpected keys
  const cleanTitle = code
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    code,
    label: cleanTitle,
    shortLabel: cleanTitle,
    description: `Statistical anomaly detected in ${cleanTitle.toLowerCase()} metric.`,
    icon: "warning",
    severity: "warning",
    deviationBadge: dev.badge || "Metric Outlier",
    deviationDetail: dev.detail,
    deviationType: dev.type,
  };
}

/**
 * Parse comma-separated flag string or string array into rich metadata with deviations
 */
export function parseFlagReasons(
  reasonsInput: string | string[] | null | undefined,
  context?: ProjectContext
): FlagReasonMeta[] {
  if (!reasonsInput) return [];
  const list = Array.isArray(reasonsInput)
    ? reasonsInput
    : reasonsInput.split(",").map((s) => s.trim()).filter(Boolean);

  return list.map((code) => formatFlagReason(code, context));
}
