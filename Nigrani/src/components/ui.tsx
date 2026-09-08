import React from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   Card — Flat tinted-lavender panel
   ═══════════════════════════════════════════════ */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-accent-subtle border-[1.5px] border-border-translucent rounded-[14px] p-[1.5rem_1.6rem] ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KPI Tile — Large numerical callout card
   ═══════════════════════════════════════════════ */
export function KPITile({
  value,
  label,
  description,
  children,
  className = "",
}: {
  value: string | number;
  label: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="font-display font-bold text-[clamp(35.2px,3.4vw,48px)] text-primary leading-none tracking-tight">
        {value}
      </div>
      <div className="text-[clamp(15.2px,1.3vw,17.6px)] font-semibold text-on-surface mt-3 font-sans">
        {label}
      </div>
      {description && (
        <div className="text-[clamp(12.5px,0.95vw,14.4px)] text-text-muted mt-2 leading-relaxed font-sans">
          {description}
        </div>
      )}
      {children}
    </Card>
  );
}

/* ═══════════════════════════════════════════════
   Stat Card — Compact metric card
   ═══════════════════════════════════════════════ */
export function StatCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      {children}
    </Card>
  );
}

/* ═══════════════════════════════════════════════
   Accent Rule — 60px × 4px cobalt bar
   ═══════════════════════════════════════════════ */
export function AccentRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-[60px] h-[4px] bg-primary rounded-full ${className}`}
    />
  );
}

/* ═══════════════════════════════════════════════
   Page Header — Title + accent rule + description
   ═══════════════════════════════════════════════ */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="w-fit">
        <h2 className="font-display text-[clamp(17.6px,1.8vw,24px)] font-semibold text-on-surface leading-[1.3] tracking-[-0.02em]">
          {title}
        </h2>
        <div className="h-[4px] bg-primary rounded-full w-[80%] mt-2 mb-4" />
      </div>
      {description && (
        <p className="font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-text-muted mt-1 leading-[1.6]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Large Page Title — For inventory-style pages
   ═══════════════════════════════════════════════ */
export function LargePageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-fit">
        <h2 className="font-display text-[clamp(44.8px,5vw,67.2px)] font-bold text-on-background leading-[1.1] tracking-[-0.02em]">
          {title}
        </h2>
        <div className="h-[4px] bg-primary rounded-full w-[80%] mt-3 mb-4" />
      </div>
      {description && (
        <p className="font-sans text-[clamp(13.6px,1.1vw,16.8px)] text-on-surface-variant mt-2 max-w-2xl leading-[1.6]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Badge / Status Indicator
   ═══════════════════════════════════════════════ */
export function Badge({
  children,
  variant = "default",
  dot = false,
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "positive" | "warning" | "accent" | "outline";
  dot?: boolean;
}) {
  const variantClasses = {
    default:
      "bg-surface-container-low text-on-surface-variant border border-outline-variant/30",
    primary:
      "bg-[#1967d2]/10 text-[#1967d2] border border-[#1967d2]/20",
    positive:
      "bg-[#188038]/10 text-[#188038] border border-[#188038]/20",
    warning:
      "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
    accent:
      "bg-[#9333ea]/10 text-[#9333ea] border border-[#9333ea]/20",
    outline:
      "bg-surface-container-low text-on-surface-variant border border-outline-variant/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.05em] font-medium ${variantClasses[variant]}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === "primary" ? "bg-[#1967d2]" : 
            variant === "positive" ? "bg-[#188038]" : 
            variant === "warning" ? "bg-[#f59e0b]" : 
            variant === "accent" ? "bg-[#9333ea]" : 
            "bg-outline"
          }`}
        />
      )}
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Tag Pill — Small tag indicator
   ═══════════════════════════════════════════════ */
export function TagPill({ text }: { text: string }) {
  return (
    <span className="font-display font-medium text-[12px] bg-accent-low text-primary py-[0.35rem] px-[0.9rem] rounded-full">
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Button — Primary & Secondary
   ═══════════════════════════════════════════════ */
export function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  icon,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  icon?: string;
}) {
  const classes = `inline-flex items-center justify-center gap-2 bg-primary text-on-primary rounded-full py-3 px-6 font-sans text-[15.2px] font-semibold hover:shadow-[0_8px_24px_rgba(30,43,250,0.25)] hover:-translate-y-[1px] transition-all duration-200 cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && (
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        )}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  onClick,
  className = "",
  icon,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: string;
}) {
  const classes = `inline-flex items-center justify-center gap-2 bg-transparent text-primary border-[1.5px] border-primary rounded-full py-3 px-6 font-sans text-[15.2px] font-semibold hover:bg-accent-subtle transition-colors cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && (
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        )}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  onClick,
  className = "",
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2 border-[1.5px] border-outline-variant text-primary font-display text-[12px] font-medium hover:bg-surface-container-low transition-colors rounded-full cursor-pointer ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   Progress Bar — Cobalt fill with 10% bg track
   ═══════════════════════════════════════════════ */
export function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-accent-low h-2 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="bg-primary h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Metric Change — Delta indicator
   ═══════════════════════════════════════════════ */
export function MetricChange({
  value,
  type,
}: {
  value: string;
  type: "positive" | "negative";
}) {
  const isPositive = type === "positive";
  return (
    <div
      className={`inline-flex items-center gap-1 font-display font-semibold text-[12.5px] mt-2 ${isPositive ? "text-positive" : "text-negative"
        }`}
    >
      <span>{isPositive ? "↑" : "↓"}</span> {value}
    </div>
  );
}
