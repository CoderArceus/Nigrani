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
            <header className="bg-surface-container-lowest border-b border-border-translucent h-[72px] flex items-center justify-between px-8 shrink-0">
              <div className="flex-1 flex items-center">
                {/* Search Input */}
                <div className="hidden md:block w-full max-w-[760px]">
                  <Suspense fallback={<div className="h-10 w-full" />}>
                    <UnifiedSearchBar placeholder={searchPlaceholder} />
                  </Suspense>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-negative rounded-full border-2 border-surface-container-lowest" />
                </button>
                {/* Settings */}
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">settings</span>
                </button>
                <div className="h-6 w-px bg-border-translucent mx-1" />
                {/* Profile */}
                <div className="flex items-center gap-3 pl-1 cursor-pointer group">
                  <div className="w-9 h-9 rounded-full bg-accent-low text-primary flex items-center justify-center font-display font-bold text-[14px] border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    OF
                  </div>
                  <span className="font-sans font-semibold text-[14px] text-on-surface">
                    Officer
                  </span>
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
