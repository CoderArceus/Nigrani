export default function QueueLoading() {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pb-12 font-sans bg-transparent min-h-screen -mt-6 pt-6 animate-pulse">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="h-8 bg-slate-200 rounded-md w-48 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded-md w-80"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 bg-slate-200 rounded-md w-32"></div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-[12px] border border-slate-200 p-5 flex items-start gap-4 shadow-sm h-[94px]">
            <div className="w-[44px] h-[44px] rounded-full bg-slate-200 shrink-0"></div>
            <div className="flex flex-col w-full gap-2">
              <div className="h-6 bg-slate-200 rounded w-16"></div>
              <div className="h-4 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <div className="w-full md:w-[280px] shrink-0">
          <div className="bg-white rounded-[16px] border border-slate-200 p-6 shadow-sm">
            <div className="h-5 bg-slate-200 rounded w-32 mb-6"></div>
            <div className="flex flex-col gap-5">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Table */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex gap-6 border-b border-slate-200 w-full sm:w-auto">
              <div className="h-6 bg-slate-200 rounded w-20 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-20 mb-2"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-lg w-64"></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[16px] shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between">
              <div className="h-5 bg-slate-200 rounded w-48"></div>
              <div className="h-5 bg-slate-200 rounded w-24"></div>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {[...Array(6)].map((_, i) => (
                      <th key={i} className="py-4 px-4"><div className="h-4 bg-slate-200 rounded w-20"></div></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b border-slate-200">
                      {[...Array(6)].map((_, j) => (
                        <td key={j} className="py-5 px-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
