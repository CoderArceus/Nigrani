"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] pb-12">
      
      {/* Top Hero Section */}
      <div className="flex flex-col gap-6 pt-12 pb-8">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4 max-w-[650px]">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-sans text-[12px] font-bold tracking-widest uppercase self-start border border-blue-100">
              About Nigrani
            </div>
            
            <h1 className="font-display text-[48px] leading-tight font-bold text-[#0F172A] tracking-tight">
              Building a more accountable India
            </h1>
            
            <p className="font-sans text-[18px] leading-relaxed text-[#475569] max-w-[600px]">
              Nigrani is an AI-powered monitoring platform for MPLADS projects, designed to bring transparency, efficiency, and accountability to public development works across India.
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col items-end gap-2 pt-4">
            <span className="font-display text-[16px] text-[#0014D1] opacity-80 uppercase tracking-widest text-right leading-tight">
              Transparent Projects<br/>Stronger India
            </span>
            <div className="h-[2px] w-12 bg-[#0014D1] opacity-40 mt-1" />
          </div>
        </div>
      </div>

      {/* Four Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Transparency */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">target</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-sans font-bold text-[16px] text-[#0F172A]">Transparency</h3>
            <p className="font-sans text-[13px] text-[#64748B] leading-relaxed">
              Open access to project information for every citizen.
            </p>
          </div>
        </div>

        {/* Accountability */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">security</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-sans font-bold text-[16px] text-[#0F172A]">Accountability</h3>
            <p className="font-sans text-[13px] text-[#64748B] leading-relaxed">
              Identify delays, anomalies and misuse of funds.
            </p>
          </div>
        </div>

        {/* Data-Driven Insights */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">bar_chart</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-sans font-bold text-[16px] text-[#0F172A]">Data-Driven Insights</h3>
            <p className="font-sans text-[13px] text-[#64748B] leading-relaxed">
              Actionable insights through AI and analytics.
            </p>
          </div>
        </div>

        {/* Citizen Empowerment */}
        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E2E8F0] flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">groups</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-sans font-bold text-[16px] text-[#0F172A]">Citizen Empowerment</h3>
            <p className="font-sans text-[13px] text-[#64748B] leading-relaxed">
              Enable people to stay informed and voice concerns.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-sm border border-[#E2E8F0] flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 flex flex-col gap-5">
          <div className="font-sans text-[12px] font-bold tracking-widest text-[#64748B] uppercase">
            How it works
          </div>
          <h2 className="font-display text-[32px] font-bold text-[#0F172A] leading-tight">
            From data to real impact
          </h2>
          <p className="font-sans text-[15px] leading-relaxed text-[#475569] max-w-[480px]">
            Nigrani collects and analyzes MPLADS project data from official sources, applies AI to detect anomalies and delays, and presents easy-to-understand insights for citizens, officials, and stakeholders.
          </p>
          <div>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0014D1] text-white font-sans text-[15px] font-semibold hover:bg-[#000EB3] transition-colors mt-2 shadow-[0_4px_12px_rgba(0,20,209,0.25)]">
              Explore Projects
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Flowchart Steps */}
        <div className="flex-1 flex items-center justify-between w-full max-w-[600px] gap-2 lg:gap-4 overflow-x-auto pb-4 lg:pb-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3 w-[110px] shrink-0 text-center relative">
            <div className="w-16 h-16 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shadow-sm relative z-10">
              <span className="material-symbols-outlined text-[28px]">database</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-[14px] text-[#0F172A]">1. Collect</span>
              <span className="font-sans text-[11px] text-[#64748B] leading-tight">Aggregate data from government sources</span>
            </div>
          </div>

          <span className="material-symbols-outlined text-[#94A3B8] opacity-50 shrink-0">arrow_forward</span>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3 w-[110px] shrink-0 text-center relative">
            <div className="w-16 h-16 rounded-full bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center shadow-sm relative z-10">
              <span className="material-symbols-outlined text-[28px]">settings_suggest</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-[14px] text-[#0F172A]">2. Analyse</span>
              <span className="font-sans text-[11px] text-[#64748B] leading-tight">Detect anomalies using AI/ML</span>
            </div>
          </div>

          <span className="material-symbols-outlined text-[#94A3B8] opacity-50 shrink-0">arrow_forward</span>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3 w-[110px] shrink-0 text-center relative">
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shadow-sm relative z-10">
              <span className="material-symbols-outlined text-[28px]">description</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-[14px] text-[#0F172A]">3. Visualize</span>
              <span className="font-sans text-[11px] text-[#64748B] leading-tight">Present insights in an intuitive way</span>
            </div>
          </div>

          <span className="material-symbols-outlined text-[#94A3B8] opacity-50 shrink-0">arrow_forward</span>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-3 w-[110px] shrink-0 text-center relative">
            <div className="w-16 h-16 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shadow-sm relative z-10">
              <span className="material-symbols-outlined text-[28px]">groups</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-[14px] text-[#0F172A]">4. Empower</span>
              <span className="font-sans text-[11px] text-[#64748B] leading-tight">Enable informed action by citizens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Our Impact */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#E2E8F0] lg:col-span-2 flex flex-col gap-6">
          <div className="font-sans text-[12px] font-bold tracking-widest text-[#64748B] uppercase">
            Our Impact
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#2563EB] text-[28px]">book</span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[28px] text-[#0F172A]">6,000+</span>
                <span className="font-sans text-[13px] text-[#64748B]">Projects Tracked</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#059669] text-[28px]">location_on</span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[28px] text-[#0F172A]">700+</span>
                <span className="font-sans text-[13px] text-[#64748B]">Districts Covered</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#9333EA] text-[28px]">groups</span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[28px] text-[#0F172A]">28</span>
                <span className="font-sans text-[13px] text-[#64748B]">States & UTs</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#D97706] text-[28px]">monitoring</span>
              <div className="flex flex-col mt-2">
                <span className="font-display font-bold text-[22px] text-[#0F172A]">Real-time</span>
                <span className="font-sans text-[13px] text-[#64748B]">Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#E2E8F0] flex flex-col gap-6 relative overflow-hidden">
          <div className="font-sans text-[12px] font-bold tracking-widest text-[#64748B] uppercase relative z-10">
            Our Vision
          </div>
          
          <div className="flex-1 bg-[#F8FAFC] rounded-[16px] p-6 relative flex items-center justify-center">
            <span className="material-symbols-outlined absolute top-4 left-4 text-[#CBD5E1] text-[40px] opacity-40">format_quote</span>
            <p className="font-display text-[18px] text-[#334155] leading-relaxed italic font-medium relative z-10 text-center max-w-[280px]">
              "A future where every public project is transparent, efficient and delivers real impact for the people."
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
