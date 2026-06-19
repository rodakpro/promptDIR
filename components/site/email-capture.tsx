"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

type EmailState = {
  value: string;
  error: string;
  submitted: boolean;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Email capture island. Currently validates only — wire `onSubmit` to your ESP
 * (Beehiiv/ConvertKit) before launch. No data leaves the browser yet.
 */
export function EmailCapture({ id, buttonLabel }: { id: string; buttonLabel: string }) {
  const [email, setEmail] = useState<EmailState>({ value: "", error: "", submitted: false });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.value.trim();

    if (!value) {
      setEmail((current) => ({ ...current, error: "Enter your email.", submitted: false }));
      return;
    }

    if (!isValidEmail(value)) {
      setEmail((current) => ({ ...current, error: "Use a valid email address.", submitted: false }));
      return;
    }

    setEmail({ value, error: "", submitted: true });
  }

  return (
    <form className="w-full" onSubmit={onSubmit} noValidate>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          value={email.value}
          onChange={(event) => setEmail({ value: event.target.value, error: "", submitted: false })}
          placeholder="you@example.com"
          className="focus-ring min-h-11 w-full rounded-md border border-border-soft bg-panel px-4 text-sm font-bold text-foreground shadow-sm placeholder:text-muted"
          aria-invalid={email.error ? "true" : "false"}
          aria-describedby={`${id}-message`}
        />
        <button
          type="submit"
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:brightness-105"
        >
          {buttonLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p
        id={`${id}-message`}
        className={`mt-2 min-h-5 text-sm font-semibold ${
          email.error ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {email.error || (email.submitted ? "You are on the list." : "")}
      </p>
    </form>
  );
}
