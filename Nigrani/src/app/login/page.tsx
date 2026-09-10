"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Removed the light overlay to ensure the background remains exactly as provided, in full clarity */}
      
      {/* Scaled down by ~35-40% using CSS transform (scale-75 to scale-65 is roughly that range) */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center scale-[0.70] origin-center">
        <div className="bg-white/95 backdrop-blur-xl border border-white/60 rounded-[20px] p-10 w-full flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Wordmark */}
          <div className="text-center flex flex-col items-center w-full">
            <h1 className="font-display text-[40px] font-bold text-[#0014D1] tracking-tight leading-none mb-2">
              Nigrani
            </h1>
            <p className="font-display text-[11px] text-[#475569] uppercase tracking-[0.15em] font-bold mb-6">
              Internal Monitoring Console
            </p>
            <div className="h-[1px] bg-[#E2E8F0] w-full mb-8" />
          </div>

          <div className="text-center w-full mb-8">
            <h2 className="text-[24px] font-bold text-[#0F172A] mb-2">
              Sign in to your account
            </h2>
            <p className="text-[14px] text-[#64748B] leading-relaxed max-w-[340px] mx-auto">
              Access project data, insights and monitoring tools for a more transparent India.
            </p>
          </div>

          {/* Form */}
          <form className="w-full space-y-6" onSubmit={handleLogin}>
            
            {/* Email Input with floating label style */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] font-semibold text-[#64748B] z-10">
                Institutional email address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[22px]">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="name@department.gov.in"
                  className="w-full bg-transparent border border-[#CBD5E1] rounded-[10px] py-3.5 pl-12 pr-4 font-sans text-[15px] text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#0014D1] focus:ring-1 focus:ring-[#0014D1] outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input with floating label style */}
            <div className="relative">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] font-semibold text-[#64748B] z-10">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[22px]">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border border-[#CBD5E1] rounded-[10px] py-3.5 pl-12 pr-12 font-sans text-[15px] text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#0014D1] focus:ring-1 focus:ring-[#0014D1] outline-none transition-colors"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] border-[1.5px] border-[#CBD5E1] rounded-[4px] checked:bg-[#0014D1] checked:border-[#0014D1] transition-colors cursor-pointer" />
                  <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                    check
                  </span>
                </div>
                <span className="text-[14px] font-medium text-[#64748B] group-hover:text-[#475569] transition-colors">Keep me signed in</span>
              </label>
              <a href="#" className="text-[14px] font-semibold text-[#0014D1] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0014D1] text-white rounded-[10px] py-3.5 px-6 font-sans text-[16px] font-semibold hover:bg-[#000EB3] hover:shadow-[0_8px_24px_rgba(0,20,209,0.25)] hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 mt-4"
            >
              Sign In
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-8">
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
            <span className="px-4 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">OR</span>
            <div className="flex-1 h-[1px] bg-[#E2E8F0]"></div>
          </div>

          {/* Info Box */}
          <div className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#0014D1] text-[24px]">
              local_police
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-[#0F172A]">Secured Institutional Access Only</span>
              <span className="text-[13px] text-[#64748B]">This portal is restricted to authorized government officials.</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-8 text-[14px] font-bold text-[#64748B] tracking-wide">
          Transparent Projects <span className="mx-2 text-[#94A3B8]">•</span> Stronger India
        </div>
      </div>
    </div>
  );
}
