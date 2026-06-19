import type { Metadata } from "next";
import { Check, KeyRound, Library, Lock } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { AccessForm } from "@/components/site/access-form";
import {
  categories,
  categoryLabel,
  getAssetsByCategory,
  TOTAL_ASSETS,
  type LibraryAsset
} from "@/lib/library";

export const metadata: Metadata = {
  title: "Get free access — PromptDir",
  description:
    "Enter your email to unlock the full PromptDir library of prompts, agents, checklists, and workflows. Free."
};

const included = [
  `${TOTAL_ASSETS} starter prompts, agents, checklists, and workflows`,
  "Raw JSON files for every asset",
  "n8n-ready structures and automation notes",
  "Weekly CreatorLab drops"
];

const tiers: { name: string; price: string; icon: typeof Library; features: string[] }[] = [
  {
    name: "Free",
    price: "$0",
    icon: Library,
    features: [
      "Browse the full library",
      "Copy prompts and view JSON",
      "Public API for free assets",
      "Download the free JSON pack"
    ]
  },
  {
    name: "Pro",
    price: "Coming soon",
    icon: KeyRound,
    features: [
      "API keys with higher rate limits",
      "Private, curated collection links",
      "Author and store custom JSON assets",
      "Premium agent and workflow packs"
    ]
  }
];

export default async function AccessPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // One real asset per category — a clear "what's inside" peek that stays locked.
  const peek = categories
    .map((category) => getAssetsByCategory(category.id)[0])
    .filter((asset): asset is LibraryAsset => Boolean(asset));

  return (
    <SiteShell>
      <PageHero
        label="Free access"
        title={`Unlock all ${TOTAL_ASSETS} assets — free.`}
        intro="Enter your email to browse the full library of prompts, agents, checklists, and workflows. Execution stays on your stack — we only use your email to send new packs and Pro updates."
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-md border border-border-soft bg-panel px-3 py-2 text-sm font-black text-foreground shadow-sm"
                >
                  <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.name}
                    className="rounded-md border border-border-soft bg-panel p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-black text-foreground">
                        <Icon className="size-4 text-accent" aria-hidden="true" />
                        {tier.name}
                      </div>
                      <span className="text-xs font-black uppercase text-muted">{tier.price}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm font-semibold text-muted">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="self-start rounded-md border border-border-soft bg-panel p-6 shadow-[0_12px_30px_rgba(24,24,27,0.05)]">
            <div className="flex items-center gap-2 text-sm font-black text-accent">
              <Lock className="size-4" aria-hidden="true" />
              One step to unlock
            </div>
            <h2 className="mt-4 text-2xl font-black text-foreground">Get instant free access</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Drop your email and the full library opens immediately.
            </p>
            <div className="mt-5">
              <AccessForm next={next} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-black uppercase tracking-[0.14em] text-muted">
              A peek inside
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-muted">
              <Lock className="size-3.5 text-accent" aria-hidden="true" />
              {TOTAL_ASSETS} assets locked
            </span>
          </div>

          <div className="relative mt-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {peek.map((asset) => (
                <div
                  key={asset.id}
                  className="relative overflow-hidden rounded-md border border-border-soft bg-panel p-4 shadow-sm"
                  aria-hidden="true"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.6rem] font-black uppercase text-accent">
                      {asset.type}
                    </span>
                    <Lock className="size-3.5 text-muted" />
                  </div>
                  <h3 className="mt-3 text-sm font-black leading-snug text-foreground">
                    {asset.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-5 text-muted">
                    {asset.promise}
                  </p>
                  <p className="mt-3 text-[0.6rem] font-black uppercase text-muted">
                    {categoryLabel(asset.category)}
                  </p>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas to-transparent" />
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-muted">
            Enter your email above to open every prompt, agent, checklist, and workflow.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
