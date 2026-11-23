import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const principles = [
  {
    number: "01",
    title: "Substance before surface",
    body: "Design and messaging follow from a position that has been thought through. We will not decorate an argument that has not yet been made.",
  },
  {
    number: "02",
    title: "One voice, many surfaces",
    body: "A statement, a poster and a reel should read as the same person speaking. We build systems so that consistency is the default rather than a correction.",
  },
  {
    number: "03",
    title: "Plain reporting",
    body: "Clients are told what was done, what it cost and what was observed — including the results that fell short of expectation.",
  },
  {
    number: "04",
    title: "Restraint as strategy",
    body: "Not every moment calls for a louder voice. Knowing when to speak, how much and at what volume is most of the work.",
  },
];

export const metadata = {
  title: "About",
  description:
    "VYUH MEDIA is a boutique political communication and public relations consultancy founded by Vaibhav Pratap, working on reputation, narrative and digital presence.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/about`,
    siteName: site.brand,
    title: `About — ${site.brand}`,
    description:
      "A boutique political communication and public relations consultancy founded by Vaibhav Pratap.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `About — ${site.brand}`,
    description:
      "A boutique political communication and public relations consultancy founded by Vaibhav Pratap.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Communication practised as a <span className="italic text-ink-soft">discipline.</span>
          </>
        }
        lede={
          <>
            {site.brand} is a boutique consultancy for political communication,
            public relations and digital presence. The practice is small by
            design — so that the people who shape a brief are the people who
            carry it out.
          </>
        }
      />

      <section className="container-site pb-section pt-block">
        <div className="grid items-center gap-x-grid gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <figure>
              <div className="figure-frame ratio-landscape">
                <Image
                  src={images.aboutStone}
                  alt="Warm sandstone piers in raking afternoon light."
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="figure-caption">
                {site.brand} — {site.positioning}
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={110}>
              <p className="eyebrow text-ink-soft">Position</p>
              <h2 className="mt-6 font-display text-display-md">
                A boutique practice, deliberately.
              </h2>
              <p className="mt-7 text-body-lg text-ink-soft">
                Political communication is not a volume business. It depends on
                judgement — knowing what a moment requires, and having the
                discipline to hold a line once it is set. That judgement is
                harder to scale than it is to apply.
              </p>
              <p className="mt-5 text-body-lg text-ink-soft">
                So the practice stays intentionally compact: a focused set of
                engagements, direct involvement from the founder, and work that
                is measured against the brief rather than against a dashboard.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Principles ──────────────────────────────────────────────── */}
      <section className="bg-stone">
        <div className="container-site py-section">
          <Reveal>
            <p className="eyebrow text-ink-soft">How we hold the work</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-display-lg">
              Four principles, applied on every engagement.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-grid gap-y-12 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal
                as="article"
                key={principle.number}
                delay={index * 80}
                className="border-t border-charcoal/15 pt-7"
              >
                <p className="eyebrow text-gold">{principle.number}</p>
                <h3 className="mt-5 font-display text-display-sm">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-[var(--width-prose)] text-body-lg text-ink-soft">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ─────────────────────────────────────────────────── */}
      <section id="founder" className="container-site py-section scroll-mt-28">
        <div className="grid gap-x-grid gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-ink-soft">Founder</p>
              <h2 className="mt-6 font-display text-display-lg">
                {site.founder}
              </h2>
              <p className="mt-6 font-deva text-lg text-gold">
                {site.taglineHi}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={100}>
              <p className="text-lede text-ink-soft">
                {site.founder} founded {site.brand} to give political
                communication the seriousness it is usually denied — treating
                it as a strategic function rather than a promotional one.
              </p>
              <p className="mt-7 text-body-lg text-ink-soft">
                His view is straightforward. A principal&apos;s standing is
                formed across many surfaces at once: the press, search results,
                social platforms, the design of a poster, the cadence of a
                statement. When those are handled separately they contradict
                one another. When they are handled together they compound.
              </p>
              <p className="mt-5 text-body-lg text-ink-soft">
                That is the work {site.brand} takes on — positioning, message
                architecture, identity, content and channel management,
                produced as one system and held to one standard.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Link href="/approach" className="link-arrow">
                  The approach
                  <span aria-hidden="true" className="link-arrow__glyph">
                    →
                  </span>
                </Link>
                <Link href="/contact" className="link-arrow">
                  Contact {site.founder}
                  <span aria-hidden="true" className="link-arrow__glyph">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionCta
        eyebrow="Work with us"
        title="Selective engagements, direct involvement."
      />
    </>
  );
}
