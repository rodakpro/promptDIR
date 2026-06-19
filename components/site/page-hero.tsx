import { SectionLabel } from "./section-label";

export function PageHero({
  label,
  title,
  intro
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-4 pt-12 sm:px-8 sm:pt-16">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-5 max-w-3xl text-4xl font-black leading-none text-foreground sm:text-5xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
