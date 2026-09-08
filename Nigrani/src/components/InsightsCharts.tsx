"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  Area,
  AreaChart,
  ComposedChart
} from "recharts";

interface InsightsChartsProps {
  nationalTrend: any[];
  categories: any[];
  demographics: any[];
}

const COLORS = ['#4f46e5', '#818cf8', '#10b981', '#34d399', '#f59e0b', '#fbbf24', '#ef4444', '#f87171'];

export function InsightsCharts({ nationalTrend, categories, demographics }: InsightsChartsProps) {
  
  // Format Data
  const trendData = nationalTrend.map(t => ({
    name: t.year_quarter,
    sanctioned: parseFloat((t.total_sanctioned / 10000000).toFixed(2)),
    released: parseFloat((t.total_released / 10000000).toFixed(2)),
    completion: parseFloat(t.completion_rate.toFixed(1))
  }));

  const demographicData = demographics.map(d => ({
    name: d.is_sc_st_area ? "SC/ST Designated Areas" : "General Areas",
    fundingShare: parseFloat(d.funding_share.toFixed(1)),
    projectShare: parseFloat(d.project_share.toFixed(1)),
    completionRate: parseFloat(d.completion_rate.toFixed(1)),
    medianDuration: d.median_duration,
    zeroPhotoPct: parseFloat(d.zero_photo_pct || 0)
  }));

  return (
    <div className="flex flex-col gap-8 w-full mt-8">
      
      {/* Chart 1: National Trend */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] p-8 shadow-sm flex flex-col h-[450px]">
        <div className="flex flex-col items-center mb-6 text-center">
          <h3 className="font-display font-bold text-[22px] text-on-surface tracking-tight mb-2">
            National Fund Utilization Trend
          </h3>
          <p className="font-sans text-[14px] text-on-surface-variant">
            Quarterly trajectory of sanctioned vs released capital (₹Cr) nationally.
          </p>
        </div>
        
        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(val) => `₹${val}Cr`}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area yAxisId="left" type="monotone" dataKey="sanctioned" name="Sanctioned (₹Cr)" fill="#818cf8" stroke="#4f46e5" fillOpacity={0.3} />
              <Line yAxisId="left" type="monotone" dataKey="released" name="Released (₹Cr)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
        {/* Chart 2: SC/ST Comparison */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] p-8 shadow-sm flex flex-col h-[400px]">
          <div className="flex flex-col items-center mb-6 text-center">
            <h3 className="font-display font-bold text-[22px] text-on-surface tracking-tight mb-2">
              SC/ST Area Allocation
            </h3>
            <p className="font-sans text-[13px] text-on-surface-variant max-w-md mx-auto">
              Comparing funding and project share. Note: Differences may reflect project type mix or geography, not necessarily intent.
            </p>
          </div>
          
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="projectShare" name="Share of Projects (%)" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="fundingShare" name="Share of Funding (%)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Work Category Delays */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[20px] p-8 shadow-sm flex flex-col h-[400px]">
          <div className="flex flex-col items-center mb-6 text-center">
            <h3 className="font-display font-bold text-[22px] text-on-surface tracking-tight mb-2">
              Category Execution Times
            </h3>
            <p className="font-sans text-[13px] text-on-surface-variant">
              Median execution duration (days) across top project categories.
            </p>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories.slice(0, 6)} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#cbd5e1" opacity={0.4} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="category" dataKey="work_category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} width={120} />
                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="median_duration" name="Median Days to Complete" fill="#f59e0b" radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
