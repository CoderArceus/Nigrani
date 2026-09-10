import { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { UnifiedSearchBar } from "@/components/UnifiedSearchBar";

export function AppShell({
  children,
  title,
  searchPlaceholder = "Search...",
  bannerText,
  topBar,
}: {
  children: React.ReactNode;
  title: string;
  searchPlaceholder?: string;
  bannerText?: string;
  topBar?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
          {/* TopBar */}
          {topBar ?? (
            <header className="bg-white border-b border-[#E2E8F0] h-[72px] flex items-center justify-between px-8 shrink-0">
              <div className="flex-1 flex items-center">
                <div className="hidden md:flex items-center w-full max-w-[760px] bg-[#F1F5F9] rounded-full px-4 py-2.5">
                  <span className="material-symbols-outlined text-[#64748B] text-[20px] mr-2">search</span>
                  <input 
                    type="text" 
                    placeholder="Search by project ID, name, location or implementing agency..." 
                    className="bg-transparent border-none outline-none w-full text-[14px] text-[#1E293B] placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative flex items-center justify-center text-[#64748B] hover:text-[#1E293B] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[24px]">notifications</span>
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full border border-white" />
                </button>
                
                <div className="h-8 w-px bg-[#E2E8F0]" />
                
                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-[#334155] text-white flex items-center justify-center font-display font-medium text-[14px]">
                    O
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[14px] text-[#1E293B] leading-tight">
                      Officer
                    </span>
                    <span className="font-sans text-[11px] text-[#64748B] leading-tight flex items-center gap-1">
                      MPLADS Monitoring
                      <span className="material-symbols-outlined text-[14px]">expand_more</span>
                    </span>
                  </div>
                </div>
              </div>
            </header>
          )}
          <div className="flex-1 overflow-y-auto p-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
