import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

type SectionCtaProps = {
  eyebrow?: string;
  title?: string;
};

/** Compact closing band shared by every interior page. */
export function SectionCta({
  eyebrow = "Begin",
  title = "Discuss a brief with VYUH MEDIA.",
}: SectionCtaProps) {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="container-site flex flex-col gap-10 py-block md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-md">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col items-start gap-5">
          <Link href="/contact" className="btn btn-light">
            Start an enquiry
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-small text-ivory-soft underline decoration-gold underline-offset-4 transition-colors duration-fast hover:text-ivory"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
