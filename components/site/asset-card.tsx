import Link from "next/link";
import { Bot, ClipboardCheck, Sparkles, Workflow } from "lucide-react";
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

export function AssetCard({ asset }: { asset: AssetSummary }) {
  const Icon = typeIcon[asset.type];
  return (
    <Link
      href={`/library/${asset.slug}`}
      className="glass-panel focus-ring group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
    >
      <div className="flex items-center justify-between">
        <Icon className="size-5 text-accent" aria-hidden="true" />
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.64rem] font-black uppercase text-accent">
          {typeLabel[asset.type]}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-black leading-tight text-foreground group-hover:text-accent">
        {asset.title}
      </h3>
      <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-muted">{asset.promise}</p>
      <p className="mt-4 text-xs font-black uppercase text-muted">{categoryLabel(asset.category)}</p>
    </Link>
  );
}
