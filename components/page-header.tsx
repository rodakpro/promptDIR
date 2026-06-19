import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">{title}</h1>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
