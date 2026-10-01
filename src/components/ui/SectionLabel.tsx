export function SectionLabel({ index, label, className = "" }: { index: string; label: string; className?: string }) {
  return (
    <p className={`text-xs uppercase tracking-[0.3em] text-muted ${className}`}>
      <span className="text-accent">{index}</span> — {label}
    </p>
  );
}
