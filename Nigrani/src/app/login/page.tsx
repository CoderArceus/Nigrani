"use client";

import { AccentRule } from "@/components/ui";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simulate authentication and role-based redirect
    // Navigating the Officer to the overview dashboard by default
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-accent-subtle border-[1.5px] border-border-translucent rounded-[14px] p-10 w-full max-w-[420px] flex flex-col items-center">
        {/* Wordmark */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="font-display text-[36px] font-bold text-primary tracking-tight leading-[1.2]">
            NIGRANI
          </h1>
          <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
        </div>
        <p className="font-display text-[12px] text-secondary uppercase tracking-[0.08em] font-semibold mb-10">
          Internal Monitoring Console
        </p>

        {/* Form */}
        <form className="w-full space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              mail
            </span>
            <input
              type="email"
              placeholder="Institutional email address"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 pl-12 pr-4 font-sans text-[14px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              required
            />
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              lock
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 pl-12 pr-4 font-sans text-[14px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary rounded-full py-3 px-6 font-sans text-[15.2px] font-semibold hover:shadow-[0_8px_24px_rgba(30,43,250,0.25)] hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 mt-3"
          >
            Sign In
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 font-sans text-[11px] text-text-light text-center tracking-wide">
          Secured Institutional Access Only
        </p>
      </div>
    </div>
  );
}
