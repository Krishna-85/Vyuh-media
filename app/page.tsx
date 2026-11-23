import Image from "next/image";
import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { stages } from "@/lib/approach";
import { images } from "@/lib/images";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="container-site pb-[clamp(3.5rem,6vw,5.5rem)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="grid items-end gap-x-grid gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-ink-soft">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-gold" />
                Boutique communication consultancy
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-8 font-display text-display-2xl">
                Strategic Communication.
                <br />
                <span className="italic text-ink-soft">Powerful Presence.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 font-deva text-[clamp(1.25rem,2vw,1.625rem)] leading-relaxed text-gold">
                {site.taglineHi}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-9 max-w-[var(--width-prose)] text-lede text-ink-soft">
                {site.brand} works with political leaders, parties and public
                figures on the things that decide how they are understood —
                reputation, narrative, design and digital presence, built as one
                considered system.
              </p>
            </Reveal>

            <Reveal delay={340} className="mt-11 flex flex-wrap items-center gap-x-10 gap-y-6">
              <Link href="/contact" className="btn btn-primary">
                Discuss a brief
              </Link>
              <Link href="/services" className="link-arrow">
                View all services
                <span aria-hidden="true" className="link-arrow__glyph">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={220} className="lg:col-span-5">
            <figure>
              <div className="figure-frame ratio-portrait">
                <Image
                  src={images.heroStudy}
                  alt="A stone colonnade receding into light, its arches repeating in sequence."
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <figcaption className="figure-caption">
                Vyūha — a considered formation
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── Statement band ───────────────────────────────────────────── */}
      <section className="bg-charcoal text-ivory">
        <div className="container-site py-block">
          <div className="grid gap-x-grid gap-y-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow text-gold-soft">What we believe</p>
            </Reveal>
            <Reveal delay={100} className="md:col-span-8">
              <p className="font-display text-display-md">
                Public standing is not improvised. It is framed, produced and
                sustained — deliberately, and over time.
              </p>
              <p className="mt-8 max-w-[var(--width-medium)] text-body-lg text-ivory-soft">
                Political communication rewards consistency more than volume.
                We build the framework first, then produce against it, so that
                every statement, design and post belongs to the same argument.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Services index ───────────────────────────────────────────── */}
      <section className="container-site py-section">
        <div className="flex flex-col gap-6 border-b border-charcoal/10 pb-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-ink-soft">Services</p>
            <h2 className="mt-6 max-w-[16ch] font-display text-display-lg">
              Ten practices, one argument.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/services" className="link-arrow">
              All services
              <span aria-hidden="true" className="link-arrow__glyph">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <ol className="mt-2">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.id}
              delay={Math.min(index * 45, 320)}
              className="border-b border-charcoal/10"
            >
              <Link
                href={`/services#${service.id}`}
                className="group grid gap-x-grid gap-y-3 py-7 md:grid-cols-12 md:items-baseline"
              >
                <span className="eyebrow text-gold md:col-span-1">
                  {service.number}
                </span>
                <span className="font-display text-display-sm md:col-span-5">
                  {service.title}
                </span>
                <span className="text-small leading-relaxed text-ink-soft md:col-span-5">
                  {service.summary}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-charcoal/40 transition-transform duration-base ease-out-expo group-hover:translate-x-1 group-hover:text-charcoal md:col-span-1 md:block md:text-right"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Full-bleed image band ────────────────────────────────────── */}
      <section aria-hidden="true" className="relative">
        <div className="ratio-wide w-full overflow-hidden bg-stone">
          <Image
            src={images.bandFormation}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ── Approach preview ─────────────────────────────────────────── */}
      <section className="container-site py-section">
        <div className="grid gap-x-grid gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-ink-soft">Approach</p>
              <h2 className="mt-6 max-w-[14ch] font-display text-display-lg">
                A method that holds under pressure.
              </h2>
              <p className="mt-7 max-w-sm text-body-lg text-ink-soft">
                Five stages, repeated on every engagement — from a single
                announcement to a full campaign.
              </p>
              <div className="mt-9">
                <Link href="/approach" className="link-arrow">
                  How we work
                  <span aria-hidden="true" className="link-arrow__glyph">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          <ol className="lg:col-span-8">
            {stages.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.number}
                delay={index * 70}
                className="grid gap-x-grid gap-y-2 border-t border-charcoal/10 py-7 md:grid-cols-12"
              >
                <span className="eyebrow text-gold md:col-span-2">
                  {stage.number}
                </span>
                <span className="font-display text-display-sm md:col-span-4">
                  {stage.title}
                </span>
                <span className="text-small leading-relaxed text-ink-soft md:col-span-6">
                  {stage.summary}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Founder teaser ───────────────────────────────────────────── */}
      <section className="bg-stone">
        <div className="container-site py-section">
          <div className="grid items-center gap-x-grid gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="figure-frame ratio-portrait">
                  <Image
                    src={images.aboutStone}
                    alt="Warm sandstone piers catching low sunlight, their edges in shadow."
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                </div>
                <figcaption className="figure-caption">
                  Considered, not loud
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={90}>
                <Monogram className="h-11 w-11 text-charcoal" />
                <p className="eyebrow mt-9 text-ink-soft">The founder</p>
                <h2 className="mt-6 max-w-[16ch] font-display text-display-lg">
                  {site.founder}
                </h2>
                <p className="mt-7 max-w-[var(--width-prose)] text-body-lg text-ink-soft">
                  {site.brand} is led by its founder, who built the practice
                  around a single conviction: that political communication
                  should be as disciplined as the decisions it represents.
                </p>
                <p className="mt-5 max-w-[var(--width-prose)] text-body-lg text-ink-soft">
                  The work is deliberately selective. Fewer engagements, closer
                  attention, and a standard held across every surface a
                  principal is seen on.
                </p>
                <div className="mt-9">
                  <Link href="/about" className="link-arrow">
                    About {site.brand}
                    <span aria-hidden="true" className="link-arrow__glyph">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SectionCta />
    </>
  );
}
