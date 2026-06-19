"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  value,
  label = "Copy",
  className = ""
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-live="polite"
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-black text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 ${className}`}
    >
      {copied ? (
        <Check className="size-3.5 text-[#138a4a]" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
