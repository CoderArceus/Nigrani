export function TopBar({ title, searchPlaceholder = "Search..." }: { title: string; searchPlaceholder?: string }) {
  return (
    <header className="bg-surface border-b border-outline-variant flex justify-between items-center h-[72px] px-8 w-full z-50 flex-shrink-0">
      {/* Page Title */}
      <div className="flex items-center gap-4">
        <h1 className="font-display text-[clamp(28.8px,3vw,41.6px)] font-semibold text-on-surface leading-[1.1] tracking-[-0.02em]">
          {title}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Search Pill */}
        <div className="relative hidden md:block w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 font-sans text-[13.6px] text-on-surface focus:ring-1 focus:ring-primary outline-none transition-shadow"
          />
        </div>

        {/* Icon Cluster */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-[22px]">
              settings
            </span>
          </button>

          {/* Officer Avatar */}
          <div className="flex items-center gap-2 pl-4 border-l border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-sm">
              OF
            </div>
            <span className="font-sans text-[15.2px] font-semibold text-on-surface hidden lg:block">
              Officer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
