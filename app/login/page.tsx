import type { Metadata } from "next";
import Link from "next/link";
import { Library } from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { LoginForm } from "@/components/site/login-form";

export const metadata: Metadata = {
  title: "Log in — PromptDir",
  description: "Log in to PromptDir. Accounts and API keys arrive with PromptDir Pro."
};

export default function LoginPage() {
  return (
    <SiteShell>
      <div className="mx-auto flex w-full max-w-md flex-col px-5 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-white">
            <Library className="size-5" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm font-semibold text-muted">
            Log in to manage your collections and API keys.
          </p>
        </div>

        <div className="glass-panel mt-8 p-6 sm:p-7">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-muted">
          New to PromptDir?{" "}
          <Link href="/access" className="font-black text-accent hover:underline">
            Get the free pack
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
