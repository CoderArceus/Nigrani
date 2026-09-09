import Link from "next/link";
import React from "react";

// Helper to determine status styling
const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-[#DCFCE7] text-[#16A34A]";
    case "in progress":
      return "bg-[#DBEAFE] text-[#2563EB]";
    default:
      return "bg-amber-100 text-amber-700"; // For delayed/flagged or others
  }
};

const getCategoryStyles = (category: string) => {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("irrigation") || cat.includes("water")) {
    return { bg: "bg-[#CCFBF1]", text: "text-[#0D9488]", icon: "water_drop" };
  }
  if (cat.includes("road") || cat.includes("bridge") || cat.includes("transport")) {
    return { bg: "bg-[#FFEDD5]", text: "text-[#C2410C]", icon: "add_road" };
  }
  if (cat.includes("sanitation") || cat.includes("health") || cat.includes("medical")) {
    return { bg: "bg-[#EDE9FE]", text: "text-[#7C3AED]", icon: "health_and_safety" };
  }
  if (cat.includes("education") || cat.includes("school") || cat.includes("library")) {
    return { bg: "bg-[#E0E7FF]", text: "text-[#4F46E5]", icon: "school" };
  }
  if (cat.includes("light") || cat.includes("power") || cat.includes("solar") || cat.includes("energy")) {
    return { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", icon: "lightbulb" };
  }
  if (cat.includes("community") || cat.includes("hall") || cat.includes("public")) {
    return { bg: "bg-[#F3E8FF]", text: "text-[#9333EA]", icon: "groups" };
  }
  return { bg: "bg-gray-100", text: "text-gray-700", icon: "account_tree" };
};

// Helper for anomaly gauge colors
const getGaugeColor = (score: number) => {
  if (score >= 0.65) return "bg-[#DC2626]"; // High risk
  if (score >= 0.40) return "bg-[#F59E0B]"; // Elevated risk
  return "bg-[#16A34A]"; // Safe/Normal
};

export function ProjectCard({ project }: { project: any }) {
  const id = project.work_id || "ID-UNKNOWN";
  const status = project.status || "Unknown";
  const title = project.work_name || `${project.work_category} in ${project.district}`;
  const location = `${project.district}, ${project.state}`;
  const category = project.work_category || "Uncategorized";
  const cost = project.sanctioned_amount || 0;
  const score = project.ensemble_score || 0;
  
  const statusStyle = getStatusStyles(status);
  const catStyle = getCategoryStyles(category);
  const gaugeColor = getGaugeColor(score);
  
  // Format score
  const scoreDisplay = typeof score === 'number' ? score.toFixed(2) : "0.00";
  // Progress bar width
  const scorePercent = Math.min(Math.max((score || 0) * 100, 0), 100);

  return (
    <Link href={`/project/${id}`} className="block h-full">
      <div className="h-full bg-white rounded-[20px] border border-[#E4E7F5] p-6 flex flex-col hover:shadow-[0_8px_20px_rgba(79,91,213,0.08)] transition-all duration-300 group cursor-pointer">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[13px] text-[#9CA3AF] tracking-wide">
              {id}
            </span>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${statusStyle}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="font-sans text-[12px] font-semibold">{status}</span>
            </div>
          </div>
          
          <button className="w-7 h-7 rounded-full border border-[#E4E7F5] bg-white flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors" aria-label="View Project">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="mb-4 flex-1">
          <h3 className="font-display font-bold text-[20px] text-[#111827] leading-tight mb-2 truncate">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-[#6B7280] font-sans text-[14px] mb-3">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            {location}
          </div>
          
          <div className={`w-fit flex items-center gap-1.5 px-2.5 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}>
            <span className="material-symbols-outlined text-[14px]">{catStyle.icon}</span>
            <span className="font-sans text-[13px] font-medium">{category}</span>
          </div>
        </div>

        {/* Dividers & Stats */}
        <div className="mt-auto">
          <div className="h-[1px] w-full bg-[#E4E7F5] mb-4" />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Cost Column */}
            <div>
              <div className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-[#6B7280] mb-1">
                <div className="w-4 h-4 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                  <span className="text-[10px] font-bold">₹</span>
                </div>
                Approved Cost
              </div>
              <div className="font-display font-bold text-[20px] text-[#2563EB]">
                ₹{cost.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Score Column */}
            <div>
              <div className="font-sans text-[13px] font-medium text-[#6B7280] mb-1">
                Anomaly Score
              </div>
              <div className="font-display font-bold text-[20px] text-[#111827] mb-1">
                {scoreDisplay}
              </div>
              <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${gaugeColor}`} 
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
            </div>
          </div>


        </div>
        
      </div>
    </Link>
  );
}
