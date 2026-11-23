import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { stages } from "@/lib/approach";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata = {
  title: "Approach",
  description:
    "The VYUH MEDIA method: study, frame, build, deploy, refine — a five-stage approach applied to every political communication engagement.",
  alternates: { canonical: "/approach" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/approach`,
    siteName: site.brand,
    title: `Approach — ${site.brand}`,
    description:
      "The five-stage method applied to every engagement: study, frame, build, deploy, refine.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `Approach — ${site.brand}`,
    description:
      "The five-stage method applied to every engagement: study, frame, build, deploy, refine.",
  },
};

const workingNotes = [
  {
    title: "Direct involvement",
    body: "The founder stays on the account. Briefs are not passed down a chain, and the person you meet is the person doing the thinking.",
  },
  {
    title: "Documented frameworks",
    body: "Positioning, message architecture and design rules are written down and shared, so anyone speaking on your behalf works from the same page.",
  },
  {
    title: "Measured against the brief",
    body: "Reporting is set against what was agreed at the start — activity, response and observation, reported plainly rather than flattered.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Approach"
        title={
          <>
            Five stages, <span className="italic text-ink-soft">repeated with discipline.</span>
          </>
        }
        lede={
          <>
            The method does not change with the size of the engagement. Whether
            the brief is a single announcement or a full campaign, the same
            sequence applies — because skipping a stage is how communication
            loses its argument.
          </>
        }
      />

      <section className="container-site pb-section pt-block">
        <Reveal>
          <figure>
            <div className="figure-frame ratio-landscape">
              <Image
                src={images.approachSequence}
                alt="A white colonnade seen end-on, its columns stepping evenly into the distance."
                sizes="(max-width: 1024px) 100vw, 100%"
              />
            </div>
            <figcaption className="figure-caption">
              Sequence before volume
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ── Stages ──────────────────────────────────────────────────── */}
      <section className="bg-charcoal text-ivory">
        <div className="container-site py-section">
          <Reveal>
            <p className="eyebrow text-gold-soft">The method</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-display-lg">
              From understanding to adjustment.
            </h2>
          </Reveal>

          <ol className="mt-14">
            {stages.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.number}
                delay={index * 70}
                className="grid gap-x-grid gap-y-5 border-t border-ivory/15 py-block lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <p className="eyebrow text-gold-soft">{stage.number}</p>
                  <h3 className="mt-5 font-display text-display-md">
                    {stage.title}
                  </h3>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="text-lede text-ivory">{stage.summary}</p>
                  <p className="mt-5 max-w-[var(--width-medium)] text-body-lg text-ivory-soft">
                    {stage.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Working notes ───────────────────────────────────────────── */}
      <section className="container-site py-section">
        <div className="grid gap-x-grid gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-ink-soft">Working with us</p>
              <h2 className="mt-6 max-w-[14ch] font-display text-display-lg">
                What stays constant.
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-x-grid gap-y-10 lg:col-span-7 lg:col-start-6">
            {workingNotes.map((note, index) => (
              <Reveal
                as="article"
                key={note.title}
                delay={index * 80}
                className="border-t border-charcoal/15 pt-7"
              >
                <h3 className="font-display text-display-sm">{note.title}</h3>
                <p className="mt-4 max-w-[var(--width-prose)] text-body-lg text-ink-soft">
                  {note.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionCta
        eyebrow="Start with the first stage"
        title="Every engagement begins with a study, not a pitch."
      />
    </>
  );
}
