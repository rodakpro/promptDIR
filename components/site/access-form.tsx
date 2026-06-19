"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeNext(next?: string) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/library";
}

export function AccessForm({
  next,
  buttonLabel = "Unlock the library"
}: {
  next?: string;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!isValidEmail(value)) {
      setError("Use a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value })
      });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      router.push(safeNext(next));
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="access-email">
          Email address
        </label>
        <input
          id="access-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={loading}
          className="focus-ring min-h-11 w-full rounded-md border border-border-soft bg-panel px-4 text-sm font-bold text-foreground shadow-sm placeholder:text-muted disabled:opacity-60"
          aria-invalid={error ? "true" : "false"}
          aria-describedby="access-email-message"
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <p
        id="access-email-message"
        className="mt-2 min-h-5 text-sm font-semibold text-red-600 dark:text-red-400"
      >
        {error}
      </p>
      <p className="mt-1 text-xs font-semibold text-muted">
        No spam. Unsubscribe anytime. We will email you about new packs and Pro.
      </p>
    </form>
  );
}
