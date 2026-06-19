export default function LibraryLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-panel-soft" />
          <div className="h-8 w-48 animate-pulse rounded bg-panel-soft" />
          <div className="h-3 w-72 animate-pulse rounded bg-panel-soft" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-panel-soft sm:w-64" />
      </div>

      <div className="h-px w-full bg-border-soft" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-panel space-y-3 p-5">
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 animate-pulse rounded-full bg-panel-soft" />
              <div className="h-3 w-12 animate-pulse rounded bg-panel-soft" />
            </div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-panel-soft" />
            <div className="h-3 w-full animate-pulse rounded bg-panel-soft" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-panel-soft" />
            <div className="flex gap-1.5 pt-1">
              <div className="h-4 w-12 animate-pulse rounded-full bg-panel-soft" />
              <div className="h-4 w-12 animate-pulse rounded-full bg-panel-soft" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
