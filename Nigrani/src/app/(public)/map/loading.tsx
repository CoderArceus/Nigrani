export default function MapLoading() {
  return (
    <div className="w-full flex-1 flex flex-col md:flex-row relative bg-[#F8FAFC] animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-[420px] bg-white border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-200">
          <div className="h-8 bg-slate-200 rounded-md w-3/4 mb-3"></div>
          <div className="h-4 bg-slate-200 rounded-md w-full mb-8"></div>
          
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-slate-200 rounded-full flex-1"></div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 flex-1 overflow-hidden flex flex-col">
          <div className="h-12 bg-slate-200 rounded-xl w-full mb-6 shrink-0"></div>
          <div className="flex-1 overflow-hidden flex flex-col gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[72px] bg-slate-200 rounded-xl w-full shrink-0"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area Skeleton */}
      <div className="flex-1 relative h-[50vh] md:h-[calc(100vh-64px)] bg-[#F1F5F9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <span className="material-symbols-outlined text-[48px]">map</span>
          <span className="text-[14px] font-medium">Loading Map Data...</span>
        </div>
      </div>
    </div>
  );
}
