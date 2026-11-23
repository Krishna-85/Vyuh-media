import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact VYUH MEDIA to discuss a political communication, public relations or digital branding brief. Email admin@vaibhavpratap.in.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/contact`,
    siteName: site.brand,
    title: `Contact — ${site.brand}`,
    description:
      "Discuss a political communication, public relations or digital branding brief with VYUH MEDIA.",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `Contact — ${site.brand}`,
    description:
      "Discuss a political communication, public relations or digital branding brief with VYUH MEDIA.",
  },
};

const expectations = [
  {
    title: "A reply, not an autoresponder",
    body: "Enquiries are read by the founder. A genuine message receives a personal reply, usually within two working days.",
  },
  {
    title: "Honest scoping",
    body: "If a brief sits outside what the practice does well, you will be told so at the start rather than after an engagement begins.",
  },
  {
    title: "Discretion by default",
    body: "Enquiries and their contents are treated as confidential. Nothing is used publicly without explicit agreement.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Start with a <span className="italic text-ink-soft">conversation.</span>
          </>
        }
        lede={
          <>
            Tell us who you are, what the situation is and when it matters.
            There is no obligation in an enquiry, and no pitch deck is required
            to begin.
          </>
        }
      />

      <section className="container-site pb-section pt-block">
        <div className="grid gap-x-grid gap-y-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-ink-soft">Send an enquiry</p>
              <div className="mt-8 border-t border-charcoal/15 pt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* Aside */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="eyebrow text-ink-soft">Direct</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block font-display text-display-sm underline decoration-gold decoration-1 underline-offset-[0.3em] transition-colors duration-fast hover:text-gold"
              >
                {site.email}
              </a>
              <p className="mt-5 text-small leading-relaxed text-ink-soft">
                {site.domain}
              </p>

              <div className="mt-10 border-t border-charcoal/15 pt-8">
                <p className="eyebrow text-ink-soft">What to expect</p>
                <ul className="mt-7 flex flex-col gap-7">
                  {expectations.map((item) => (
                    <li key={item.title}>
                      <h2 className="font-display text-[1.0625rem] leading-snug">
                        {item.title}
                      </h2>
                      <p className="mt-2.5 text-small leading-relaxed text-ink-soft">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="container-site pb-section">
        <Reveal>
          <figure>
            <div className="figure-frame ratio-landscape">
              <Image src={images.contactArrival} alt="" sizes="100vw" />
            </div>
            <figcaption className="figure-caption">
              An open colonnade — the way in
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </>
  );
}
