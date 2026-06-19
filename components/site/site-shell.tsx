import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/** Shared chrome for every public marketing/library page. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
