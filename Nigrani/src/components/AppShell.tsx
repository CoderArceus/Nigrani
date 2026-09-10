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
          {topBar}
          <div className="flex-1 overflow-y-auto p-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
