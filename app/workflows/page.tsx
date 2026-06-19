import type { Metadata } from "next";
import { ArrowRight, Bot, ClipboardCheck, Sparkles, Workflow } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { AssetCard } from "@/components/site/asset-card";
import { getAllAssets, toSummary } from "@/lib/library";

export const metadata: Metadata = {
  title: "Workflows — PromptDir",
  description:
    "Four asset types that chain together: prompts, checklists, agents, and workflows. Agents resolve the next prompt instead of ending at one answer."
};

const types: { icon: typeof Sparkles; title: string; body: string }[] = [
  { icon: Sparkles, title: "Prompt", body: "Single reusable instruction for a creator-business task." },
  { icon: ClipboardCheck, title: "Checklist", body: "Decision or quality-control asset before shipping work." },
  { icon: Bot, title: "Agent", body: "Role-based worker with goals, a workflow, and handoff ids." },
  { icon: Workflow, title: "Workflow", body: "Multi-step chain for repurposing, research, offers, and ops." }
];

const chain = [
  { id: "content-strategist-agent", label: "Plans pillars and priorities" },
  { id: "linkedin-post-generator", label: "Drafts platform-native copy" },
  { id: "newsletter-to-linkedin", label: "Packages repeatable output" }
];

export default function WorkflowsPage() {
  const chainable = getAllAssets().filter((a) => a.type === "agent" || a.type === "workflow");

  return (
    <SiteShell>
      <PageHero
        label="Workflow graph"
        title="Agents resolve the next prompt instead of ending at one answer."
        intro="Every asset declares how it connects to others. Agents carry handoff ids; workflows chain prompts end to end. The value compounds as the library grows."
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid gap-3 lg:grid-cols-4">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <article key={type.title} className="rounded-md border border-border-soft bg-panel p-5 shadow-sm">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-black text-foreground">{type.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{type.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-md border border-border-soft bg-panel p-4 shadow-sm sm:p-5">
          <p className="mb-4 text-xs font-black uppercase tracking-wide text-muted">
            Example chain
          </p>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {chain.map((step, index) => (
              <div key={step.id} className="contents">
                <div className="rounded-md border border-border-soft bg-canvas p-4">
                  <code className="block text-xs font-black text-accent">{step.id}</code>
                  <p className="mt-2 text-sm font-bold text-foreground">{step.label}</p>
                </div>
                {index < chain.length - 1 ? (
                  <ArrowRight className="hidden size-5 text-muted/50 md:block" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-12 text-xs font-black uppercase tracking-wide text-muted">
          Agents and workflows in the library
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chainable.map((asset) => (
            <AssetCard key={asset.id} asset={toSummary(asset)} />
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
