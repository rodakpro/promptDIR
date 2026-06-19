import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";
import { getCategoryCounts } from "@/lib/library";

export const metadata: Metadata = {
  title: "Categories — PromptDir",
  description:
    "The eight jobs a solo creator-business repeats every week, each with its own set of prompts, agents, and workflows."
};

export default function CategoriesPage() {
  const counts = getCategoryCounts();

  return (
    <SiteShell>
      <PageHero
        label="Creator jobs"
        title="Organized around the work a solo creator repeats every week."
        intro="Research the audience, publish consistently, validate offers, and automate the rest. Pick a category to see its assets."
      />
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {counts.map((category) => {
            const Icon = (Icons[category.icon as keyof typeof Icons] ??
              Icons.CircleDot) as Icons.LucideIcon;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="focus-ring group flex flex-col rounded-md border border-border-soft bg-panel p-5 shadow-[0_12px_30px_rgba(24,24,27,0.05)] transition hover:-translate-y-0.5 hover:border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-black text-foreground">
                    <Icon className="size-4 text-accent" aria-hidden="true" />
                    {category.label}
                  </div>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.64rem] font-black uppercase text-accent">
                    {category.count} {category.count === 1 ? "asset" : "assets"}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
