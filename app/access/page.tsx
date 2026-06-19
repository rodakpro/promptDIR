import type { Metadata } from "next";
import { Check, KeyRound, Library, Mail } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { EmailCapture } from "@/components/site/email-capture";
import { TOTAL_ASSETS } from "@/lib/library";

export const metadata: Metadata = {
  title: "Access — PromptDir",
  description:
    "Start with the free creator-solopreneur pack. Pro later adds API keys, private collections, and custom JSON."
};

const included = [
  `${TOTAL_ASSETS} starter prompts, agents, checklists, and workflows`,
  "Raw JSON files for every asset",
  "n8n-ready structures and automation notes",
  "Weekly CreatorLab drops"
];

const tiers: { name: string; price: string; icon: typeof Library; features: string[]; cta: string; highlight: boolean }[] = [
  {
    name: "Free",
    price: "$0",
    icon: Library,
    features: [
      "Browse the full public library",
      "Copy prompts and view JSON",
      "Public API (no key) for free assets",
      "Download the free JSON pack"
    ],
    cta: "Join the list",
    highlight: false
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
    ],
    cta: "Get notified",
    highlight: true
  }
];

export default function AccessPage() {
  return (
    <SiteShell>
      <PageHero
        label="Launch pack"
        title={`Start with ${TOTAL_ASSETS} creator-solopreneur assets.`}
        intro="The foundation pack covers content, research, offers, automation, and two agents. Free assets stay public; Pro adds keys, private collections, and custom JSON."
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
                    className={`rounded-md border p-5 shadow-sm ${
                      tier.highlight ? "border-accent bg-accent/5" : "border-border-soft bg-panel"
                    }`}
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
              <Mail className="size-4" aria-hidden="true" />
              CreatorLab.pro distribution list
            </div>
            <h2 className="mt-4 text-2xl font-black text-foreground">Get the free JSON pack</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Join the list for the first PromptDir asset pack and weekly additions.
            </p>
            <div className="mt-5">
              <EmailCapture id="access-email" buttonLabel="Join the list" />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
