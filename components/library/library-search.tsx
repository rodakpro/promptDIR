"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function LibrarySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.trim()) params.set("q", next.trim());
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `/library?${qs}` : "/library", { scroll: false });
  }

  function onChange(next: string) {
    setValue(next);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => pushQuery(next), 250);
  }

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <label className="sr-only" htmlFor="library-search">
        Search the library
      </label>
      <input
        id="library-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search assets…"
        className="focus-ring h-10 w-full rounded-lg border border-border-soft bg-panel pl-9 pr-9 text-sm font-semibold text-foreground placeholder:text-muted"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
