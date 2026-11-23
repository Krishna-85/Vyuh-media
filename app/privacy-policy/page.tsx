import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { lastRevised } from "@/lib/dates";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${site.brand} collects, uses and protects information shared through ${site.domain}.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/privacy-policy`,
    siteName: site.brand,
    title: `Privacy Policy — ${site.brand}`,
    description: `How ${site.brand} collects, uses and protects information shared through ${site.domain}.`,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `Privacy Policy — ${site.brand}`,
    description: `How ${site.brand} collects, uses and protects information shared through ${site.domain}.`,
  },
};

const sections = [
  {
    heading: "1. Who we are",
    body: [
      `${site.brand} is a boutique political communication and public relations consultancy operating through ${site.domain}. For any question about this policy, write to ${site.email}.`,
      "This policy applies to information submitted through this website, including the contact form and direct email.",
    ],
  },
  {
    heading: "2. What we collect",
    body: [
      "When you send an enquiry we receive the details you choose to provide: your name, email address, organisation, the subject you select and the content of your message.",
      "We do not ask for sensitive personal data, and we ask that you do not include it. Please avoid submitting identity documents, financial details or health information through the contact form.",
      "The site does not use advertising trackers, profiling scripts or third-party analytics cookies.",
    ],
  },
  {
    heading: "3. Why we use it",
    body: [
      "We use what you send solely to read your enquiry, respond to it, and — where a working relationship follows — to conduct that correspondence.",
      "We rely on your request for information as the basis for responding. Where processing requires consent, we will ask for it explicitly.",
    ],
  },
  {
    heading: "4. Who sees it",
    body: [
      "Enquiries are read by the founder and, where necessary, by people directly working on the matter you raised.",
      "We do not sell, rent or trade personal information. We do not share it with political parties, campaigns, media organisations or any other third party for their own use.",
    ],
  },
  {
    heading: "5. How long we keep it",
    body: [
      "Correspondence that does not lead to an engagement is deleted on a periodic basis. Where an engagement takes place, records are retained for as long as needed for legitimate business and legal purposes, then deleted or anonymised.",
    ],
  },
  {
    heading: "6. Delivery of messages",
    body: [
      "The contact form passes your message to a delivery service configured for this site. Message content is transmitted to that service for the purpose of delivering it to us, and is not used for marketing.",
      "Email sent directly to us is processed by our email provider under its own terms.",
    ],
  },
  {
    heading: "7. Your rights",
    body: [
      "You may ask what information we hold about you, request correction or deletion, and object to or restrict processing. Write to us at the address above and we will respond within a reasonable period.",
      "If you are unsatisfied with how we handle your information, you may raise the matter with the data protection authority in your jurisdiction.",
    ],
  },
  {
    heading: "8. Security",
    body: [
      "This site is served over HTTPS. Access to correspondence is limited to the people who need it, and reasonable technical and organisational measures are used to protect it.",
      "No method of transmission is entirely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    body: [
      "This policy may be updated to reflect how the practice operates. The current version will always be published on this page, with the date of the last revision shown below.",
    ],
  },
  {
    heading: "10. Contact",
    body: [
      `Questions, requests and complaints can be sent to ${site.email}.`,
    ],
  },
];

export default async function PrivacyPolicyPage() {
  const revised = await lastRevised();

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={<>Privacy Policy</>}
        lede={
          <>
            A plain account of what this site collects, why it is used, and
            what you can ask us to do with it.
          </>
        }
      />

      <section className="container-site py-block">
        <div className="grid gap-x-grid gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="eyebrow text-ink-soft">Last revised</p>
              <p className="mt-4 text-small text-ink-soft">{revised}</p>
              <a href={`mailto:${site.email}`} className="link-arrow mt-8">
                Questions
                <span aria-hidden="true" className="link-arrow__glyph">
                  →
                </span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {sections.map((section, index) => (
              <Reveal
                as="article"
                key={section.heading}
                delay={Math.min(index * 35, 210)}
                className="border-t border-charcoal/15 py-9 first:border-t-0 first:pt-0"
              >
                <h2 className="font-display text-display-sm">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-4 max-w-[var(--width-prose)] text-body-lg text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionCta
        eyebrow="Contact"
        title="Questions about your information?"
      />
    </>
  );
}
