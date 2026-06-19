import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Privacy — PromptDir",
  description:
    "PromptDir distributes prompt and agent definitions. It never receives the private business context you feed to your own tools."
};

const guarantees: { title: string; body: string }[] = [
  {
    title: "No uploaded data",
    body: "The API accepts no code, files, emails, or customer data. There is nothing to upload — you fetch definitions, you do not send context."
  },
  {
    title: "No stored prompts",
    body: "We do not store your prompts, transcripts, or private chats. What you run against your own model stays with your model."
  },
  {
    title: "No server-side model",
    body: "We never run an AI model on our side. There is no token billing and no hidden inference reading your work."
  },
  {
    title: "Only what is needed",
    body: "We store only versioned assets, collection definitions, hashed API keys, and aggregate rate-limit counters."
  }
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageHero
        label="Privacy-first"
        title="The strongest product claim is what PromptDir never touches."
        intro="Most prompt tools want your data. PromptDir is built the opposite way: it is a one-way distribution layer. Definitions flow out; your private context never flows in."
      />
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        <div className="grid gap-3 md:grid-cols-2">
          {guarantees.map((rule) => (
            <article key={rule.title} className="rounded-md border border-border-soft bg-panel p-6 shadow-sm">
              <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-black text-foreground">{rule.title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">{rule.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-md border border-border-soft bg-panel p-6 shadow-sm">
          <p className="text-sm font-semibold leading-7 text-muted">
            In short: analysis and execution always stay local — in your CLI, skill, MCP server, or
            automation tool. PromptDir is the library, not the runtime.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
