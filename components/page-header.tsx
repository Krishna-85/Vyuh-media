import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
};

/** Consistent editorial header for all interior pages. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <section className="container-site pt-[clamp(7rem,13vw,11rem)]">
      <Reveal>
        <p className="eyebrow flex items-center gap-4 text-ink-soft">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h1 className="mt-8 max-w-[18ch] font-display text-display-xl">
          {title}
        </h1>
      </Reveal>
      {lede ? (
        <Reveal delay={180}>
          <p className="mt-9 max-w-[var(--width-medium)] text-lede text-ink-soft">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
