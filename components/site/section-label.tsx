export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border-soft bg-panel px-3 py-1 text-[0.68rem] font-black uppercase text-accent shadow-sm">
      {children}
    </span>
  );
}
