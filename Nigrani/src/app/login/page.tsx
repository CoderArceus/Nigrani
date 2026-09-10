"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#F8FAFC]">
      
      {/* Background Image Container with Saturation Filter */}
      <div 
        className="absolute inset-0 z-0 saturate-50 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: "url('/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Scaled horizontal card */}
      <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center scale-[0.95] origin-center">
        <div className="bg-white/95 backdrop-blur-xl border-t border-l border-white/80 border-b border-r border-[#E2E8F0]/50 rounded-[24px] w-full flex flex-col md:flex-row shadow-[0_40px_100px_-20px_rgba(0,20,209,0.15),_0_20px_40px_-10px_rgba(0,0,0,0.05)] overflow-hidden relative">
          
          {/* Decorative Leaves (Left Corner) */}
          <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0014D1]" fill="currentColor">
              <path d="M10,90 Q30,60 10,20 Q40,40 50,70 Q70,50 90,40 Q60,80 10,90 Z" />
              <path d="M10,90 Q15,70 5,50 Q25,65 30,80 Z" />
            </svg>
          </div>

          {/* Left Column (Text & Branding) */}
          <div className="p-10 md:p-12 flex flex-col flex-1 relative z-10">
            {/* Wordmark */}
            <div className="flex flex-col items-start w-full">
              <h1 className="font-display text-[40px] font-bold text-[#0014D1] tracking-tight leading-none mb-2">
                Nigrani
              </h1>
              <p className="font-display text-[11px] text-[#475569] uppercase tracking-[0.15em] font-bold mb-4">
                Internal Monitoring Console
              </p>
              <div className="h-[2px] bg-[#0014D1] w-12 mb-10" />
            </div>

            <div className="w-full flex-1 flex flex-col justify-center">
              <h2 className="text-[26px] font-bold text-[#0F172A] mb-3 leading-tight">
                Sign in to your account
              </h2>
              <p className="text-[14.5px] text-[#64748B] leading-relaxed max-w-[300px]">
                Access project data, insights and monitoring tools for a more transparent India.
              </p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] my-10 bg-[#E2E8F0] relative z-10" />

          {/* Right Column (Form) */}
          <div className="p-10 md:p-12 flex flex-col justify-center flex-1 relative z-10">
            <form className="w-full space-y-6" onSubmit={handleLogin}>
              
              {/* Email Input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Institutional email address"
                  className="w-full bg-transparent border border-[#CBD5E1] rounded-[10px] py-3.5 pl-12 pr-4 font-sans text-[14px] font-medium text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#0014D1] focus:ring-1 focus:ring-[#0014D1] outline-none transition-colors"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent border border-[#CBD5E1] rounded-[10px] py-3.5 pl-12 pr-12 font-sans text-[14px] font-medium text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#0014D1] focus:ring-1 focus:ring-[#0014D1] outline-none transition-colors"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] border-[1.5px] border-[#CBD5E1] rounded-[4px] checked:bg-[#0014D1] checked:border-[#0014D1] transition-colors cursor-pointer" />
                    <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-[13.5px] font-medium text-[#475569] group-hover:text-[#1E293B] transition-colors">Keep me signed in</span>
                </label>
                <a href="#" className="text-[13.5px] font-bold text-[#0014D1] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0014D1] text-white rounded-[10px] py-3.5 px-6 font-sans text-[15px] font-semibold hover:bg-[#000EB3] hover:shadow-[0_8px_24px_rgba(0,20,209,0.25)] hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 mt-4"
              >
                Sign In
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
