export function SyntheticDataBanner({ text = "Synthetic demonstration data" }: { text?: string }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[28px] z-[60] bg-secondary text-on-secondary flex items-center justify-center px-4">
      <span className="font-sans text-[12px] font-semibold uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
}
