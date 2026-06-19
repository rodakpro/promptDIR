import Link from "next/link";
import { ArrowRight, Bot, ClipboardCheck, Sparkles, Workflow } from "lucide-react";
import type { AssetSummary, AssetType } from "@/lib/library";
import { categoryLabel } from "@/lib/library/categories";

const typeIcon: Record<AssetType, typeof Sparkles> = {
  prompt: Sparkles,
  checklist: ClipboardCheck,
  agent: Bot,
  workflow: Workflow
};

const typeLabel: Record<AssetType, string> = {
  prompt: "Prompt",
  checklist: "Checklist",
  agent: "Agent",
  workflow: "Workflow"
};

/** Token-styled asset card for the dashboard-style library (akademia layout). */
export function LibraryAssetCard({ asset }: { asset: AssetSummary }) {
  const Icon = typeIcon[asset.type];
  return (
    <Link
      href={`/library/${asset.slug}`}
      className="glass-panel focus-ring group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.62rem] font-black uppercase tracking-wide text-accent">
          <Icon className="size-3" aria-hidden="true" />
          {typeLabel[asset.type]}
        </span>
        <span className="text-[0.62rem] font-black uppercase tracking-wide text-muted">
          {asset.difficulty}
        </span>
      </div>

      <h3 className="mt-3 text-base font-black leading-snug tracking-tight text-foreground group-hover:text-accent">
        {asset.title}
      </h3>
      <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-muted">{asset.promise}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {asset.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border-soft bg-panel-soft px-2 py-0.5 text-[0.62rem] font-bold text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-3">
        <span className="text-[0.62rem] font-black uppercase tracking-wide text-muted">
          {categoryLabel(asset.category)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-black text-accent">
          View
          <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
