import { PublicSidebar } from "@/components/PublicSidebar";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      <PublicSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="w-full max-w-[1440px] mx-auto px-8 py-6 flex flex-col gap-8 flex-grow">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-background w-full border-t border-outline-variant/30 mt-auto shrink-0">
            <div className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1440px] mx-auto">
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="font-display text-[clamp(13.6px,1.2vw,16px)] text-on-surface font-bold tracking-widest uppercase">
                  Nigrani
                </span>
                <span className="font-sans text-[12px] text-secondary opacity-80">
                  © 2026 Nigrani Transparency Portal. For demonstration purposes
                  only.
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {["Privacy Policy", "Methodology", "Data Dictionary", "Contact Support"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-on-surface-variant hover:text-primary transition-all"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
