"use client";

import { useState } from "react";
import { Card, AccentRule, PrimaryButton } from "@/components/ui";
import { mockUsers } from "@/data/mock-users";

export default function ThresholdConfigPage() {
  const [costDeviation, setCostDeviation] = useState(15);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Form Card */}
        <div className="xl:col-span-2">
          <Card>
            <div className="w-fit mb-8">
              <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface flex items-center gap-2 leading-[1.3] tracking-[-0.02em]">
                <span
                  className="material-symbols-outlined text-primary"
                  data-weight="fill"
                >
                  tune
                </span>
                System Alert Settings
              </h3>
              <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sanction Delay */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-on-surface-variant flex items-center gap-2"
                    htmlFor="sanction-delay"
                  >
                    Sanction Delay Threshold
                    <span
                      className="material-symbols-outlined text-[16px] text-text-light cursor-help"
                      title="Days before a pending sanction triggers a critical alert."
                    >
                      info
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 font-display text-[24px] text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      id="sanction-delay"
                      type="number"
                      defaultValue={75}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[clamp(12px,0.9vw,13.6px)] text-secondary">
                      Days
                    </span>
                  </div>
                </div>

                {/* Execution Stall */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-on-surface-variant flex items-center gap-2"
                    htmlFor="execution-stall"
                  >
                    Execution Stall Inactivity
                    <span
                      className="material-symbols-outlined text-[16px] text-text-light cursor-help"
                      title="Days without recorded progress before a project is marked 'Stalled'."
                    >
                      info
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-3 px-4 font-display text-[24px] text-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      id="execution-stall"
                      type="number"
                      defaultValue={90}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-[clamp(12px,0.9vw,13.6px)] text-secondary">
                      Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant">
                <div className="flex justify-between items-end">
                  <label
                    className="font-sans text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-on-surface-variant"
                    htmlFor="cost-deviation"
                  >
                    Cost Deviation Sensitivity
                  </label>
                  <span className="font-display text-[24px] text-primary font-bold">
                    {costDeviation}%
                  </span>
                </div>
                <input
                  className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                  id="cost-deviation"
                  type="range"
                  min={1}
                  max={50}
                  value={costDeviation}
                  onChange={(e) => setCostDeviation(Number(e.target.value))}
                />
                <p className="font-sans text-[clamp(12.5px,0.95vw,14.4px)] text-secondary">
                  Percentage of budget overrun required to trigger an immediate
                  audit flag.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <PrimaryButton type="submit" className="px-8">
                  Save Configuration
                </PrimaryButton>
              </div>
            </form>
          </Card>
        </div>

        {/* User Access Panel */}
        <div>
          <Card className="flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="w-fit">
                <h3 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface flex items-center gap-2 leading-[1.3] tracking-[-0.02em]">
                  <span className="material-symbols-outlined text-primary">
                    group
                  </span>
                  Team Access
                </h3>
                <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2" />
              </div>
              <button className="border border-border-translucent text-primary font-sans text-[13px] font-medium py-2 px-4 rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                Add New User
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {mockUsers.map((user) => (
                <div
                  key={user.initials}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.role === "ADMIN"
                          ? "bg-accent-medium text-primary"
                          : "bg-surface-variant text-on-surface-variant"
                      }`}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <p className="font-sans text-[clamp(13.6px,1vw,15.2px)] font-medium text-on-surface">
                        {user.name}
                      </p>
                      <p className="font-sans text-[11px] text-secondary">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full font-display text-[10px] uppercase tracking-wider ${
                      user.role === "ADMIN"
                        ? "bg-surface-variant text-on-surface-variant"
                        : user.role === "OFFICER"
                        ? "bg-[rgba(30,43,250,0.1)] text-primary"
                        : "bg-surface-container text-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
