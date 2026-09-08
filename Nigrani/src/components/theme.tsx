import React from 'react';
import Link from 'next/link';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card-bg border-[1.5px] border-border rounded-[14px] p-6 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card-bg border border-border rounded-[12px] p-5 ${className}`}>
      {children}
    </div>
  );
}

export function MiniStatCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card-bg border border-border rounded-[10px] p-4 ${className}`}>
      {children}
    </div>
  );
}

export function TagPill({ text }: { text: string }) {
  return (
    <span className="font-display font-medium text-[12px] bg-accent-light text-primary py-[0.35rem] px-[0.9rem] rounded-full">
      {text}
    </span>
  );
}

export function Eyebrow({ text }: { text: string }) {
  return (
    <h4 className="font-display font-semibold text-[clamp(13.6px,1.2vw,16px)] uppercase tracking-[0.08em] text-primary">
      {text}
    </h4>
  );
}

export function AccentLine() {
  return <div className="w-[60px] h-[4px] bg-primary rounded-[2px]" />;
}

export function CtaButton({ text, href, onClick }: { text: string, href?: string, onClick?: () => void }) {
  const baseClasses = "inline-block font-display font-semibold text-[15.2px] bg-primary text-background py-[0.9rem] px-[2.2rem] rounded-full transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(30,43,250,0.25)] cursor-pointer";
  
  if (href) {
    return <Link href={href} className={baseClasses}>{text}</Link>;
  }
  return (
    <button onClick={onClick} className={baseClasses}>
      {text}
    </button>
  );
}

export function SlideHeader({ eyebrow, tag }: { eyebrow: string, tag: string }) {
  return (
    <div className="flex items-center justify-between mb-[2.5vh] flex-shrink-0">
      <Eyebrow text={eyebrow} />
      <TagPill text={tag} />
    </div>
  );
}

export function MetricChange({ value, type }: { value: string, type: 'positive' | 'negative' }) {
  const isPositive = type === 'positive';
  return (
    <div className={`inline-flex items-center gap-1 font-display font-semibold text-[12.5px] mt-1 ${isPositive ? 'text-positive' : 'text-negative'}`}>
      <span>{isPositive ? '↑' : '↓'}</span> {value}
    </div>
  );
}
