export default function DashboardLoading() {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-12 font-sans animate-pulse mt-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <div className="h-8 bg-slate-200 rounded-md w-64 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded-md w-96"></div>
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-[16px] border border-slate-200 p-5 shadow-sm flex items-center justify-center gap-4 h-[104px]">
            <div className="w-[48px] h-[48px] rounded-full bg-slate-200 shrink-0"></div>
            <div className="flex flex-col items-start w-full gap-2">
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Visualizations Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <div className="bg-white rounded-[16px] border border-slate-200 p-6 shadow-sm h-[400px]">
          <div className="h-5 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0"></div>
                <div className="h-2 bg-slate-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[16px] border border-slate-200 p-6 shadow-sm h-[400px]">
          <div className="h-5 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-2 bg-slate-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
