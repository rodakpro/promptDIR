"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Placeholder login form. Auth is not wired up yet — accounts arrive with
 * PromptDir Pro. Submitting validates and shows a notice; nothing is sent.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(false);
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setNotice(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-xs font-black uppercase text-muted">
          Email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="focus-ring h-11 w-full rounded-lg border border-border-soft bg-panel pl-9 pr-3 text-sm font-semibold text-foreground placeholder:text-muted"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="mb-1.5 block text-xs font-black uppercase text-muted"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className="focus-ring h-11 w-full rounded-lg border border-border-soft bg-panel pl-9 pr-3 text-sm font-semibold text-foreground placeholder:text-muted"
          />
        </div>
      </div>

      <button
        type="submit"
        className="focus-ring inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-black text-white shadow-glow transition hover:brightness-105"
      >
        Log in
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      {error ? (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {notice ? (
        <div className="rounded-lg border border-border-soft bg-panel-soft p-3 text-sm font-semibold text-muted">
          Accounts are coming with PromptDir Pro.{" "}
          <Link href="/access" className="font-black text-accent hover:underline">
            Join the list
          </Link>{" "}
          to get notified.
        </div>
      ) : null}
    </form>
  );
}
