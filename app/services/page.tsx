import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { images } from "@/lib/images";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = {
  title: "Services",
  description:
    "Ten practices from VYUH MEDIA: political PR, social media management, creative communication, video, digital advertising, campaign creative, content, websites, media coordination and reputation management.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/services`,
    siteName: site.brand,
    title: `Services — ${site.brand}`,
    description:
      "Ten practices covering political PR, digital branding, creative communication and campaign strategy.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `Services — ${site.brand}`,
    description:
      "Ten practices covering political PR, digital branding, creative communication and campaign strategy.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Ten practices that speak with <span className="italic text-ink-soft">one voice.</span>
          </>
        }
        lede={
          <>
            Each practice can be engaged on its own. Most clients arrive for
            one and stay for the combination — because reputation, design and
            channels stop contradicting one another only when they are planned
            together.
          </>
        }
      />

      <section className="container-site pb-section pt-block">
        <Reveal>
          <figure>
            <div className="figure-frame ratio-wide">
              <Image
                src={images.bandFormation}
                alt="A long colonnade where columns repeat into shadow, each one offset from the last."
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="figure-caption">
              Ten disciplines, one formation
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="container-site pb-section">
        <div className="border-t border-charcoal/15">
          {services.map((service, index) => (
            <Reveal
              as="article"
              key={service.id}
              id={service.id}
              delay={Math.min(index * 40, 280)}
              className="scroll-mt-32 border-b border-charcoal/15 py-block"
            >
              <div className="grid gap-x-grid gap-y-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="eyebrow text-gold">{service.number}</p>
                  <h2 className="mt-5 max-w-[18ch] font-display text-display-md">
                    {service.title}
                  </h2>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="text-lede text-ink-soft">{service.description}</p>

                  <h3 className="eyebrow mt-9 text-ink-soft">Focus areas</h3>
                  <ul className="mt-5 grid gap-x-grid gap-y-3 sm:grid-cols-2">
                    {service.focus.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3.5 border-t border-charcoal/10 pt-3.5 text-small leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-block h-px w-4 flex-none bg-gold"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-stone">
        <div className="container-site py-block">
          <div className="grid gap-x-grid gap-y-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow text-ink-soft">A note on scope</p>
            </Reveal>
            <Reveal delay={90} className="md:col-span-8">
              <p className="text-body-lg text-ink-soft">
                {site.brand} does not promise outcomes, reach or electoral
                results. What is offered is disciplined work: a clear
                position, a consistent voice, and execution held to an agreed
                standard — with reporting that stays factual about what was
                observed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionCta />
    </>
  );
}
