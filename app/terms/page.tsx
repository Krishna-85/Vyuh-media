import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionCta } from "@/components/section-cta";
import { lastRevised } from "@/lib/dates";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description: `The terms on which ${site.brand} provides services and makes this website available.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/terms`,
    siteName: site.brand,
    title: `Terms & Conditions — ${site.brand}`,
    description: `The terms on which ${site.brand} provides services and makes this website available.`,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `Terms & Conditions — ${site.brand}`,
    description: `The terms on which ${site.brand} provides services and makes this website available.`,
  },
};

const sections: { heading: string; body: ReactNode[] }[] = [
  {
    heading: "1. About these terms",
    body: [
      `These terms govern your use of ${site.domain} and, where a separate written agreement does not apply, the services provided by ${site.brand}.`,
      "By using this website you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "2. About the practice",
    body: [
      `${site.brand} is a boutique political communication and public relations consultancy. References to “we”, “us” and “the practice” mean ${site.brand}, led by ${site.founder}.`,
      "Nothing on this website constitutes a registered-company claim, professional certification, or assurance of any particular outcome.",
    ],
  },
  {
    heading: "3. Information on this site",
    body: [
      "The content of this website is provided for general information about the practice and its services. It is not legal, electoral, financial or any other professional advice, and should not be relied on as such.",
      "We take care to keep this information accurate and current, but we do not warrant that it is complete, error-free or up to date at all times.",
    ],
  },
  {
    heading: "4. Services and engagements",
    body: [
      "The services described on this site describe the work the practice can undertake. They are not an offer, and no engagement exists until scope, fees, timing and responsibilities have been agreed in writing.",
      "Fees, timelines and deliverables are confirmed separately for each engagement and take precedence over anything stated generally on this website.",
    ],
  },
  {
    heading: "5. No guaranteed outcomes",
    body: [
      "We do not guarantee electoral results, media coverage, audience reach, rankings, engagement figures or any other measurable outcome. Communication work influences how a message is received; it does not control how audiences or institutions respond.",
      "Descriptions of our method describe how work is conducted, not what results it will produce.",
    ],
  },
  {
    heading: "6. Intellectual property",
    body: [
      `The design, text, monogram and layout of this website belong to ${site.brand}. You may view and print pages for personal, non-commercial reference.`,
      "You may not reproduce, republish, distribute or commercially exploit any part of this site without written permission. Brand names and marks of third parties remain the property of their respective owners.",
    ],
  },
  {
    heading: "7. Acceptable use",
    body: [
      "You must not use this website to transmit malicious code, attempt unauthorised access, overload the service, or submit false, unlawful or deceptive enquiries.",
      "We may suspend or restrict access to the site where we reasonably believe these terms are being breached.",
    ],
  },
  {
    heading: "8. External links",
    body: [
      "This site may link to third-party websites. Those links are provided for convenience; we do not control and are not responsible for the content, policies or practices of any third-party site.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we exclude liability for loss or damage arising from use of this website or reliance on its content.",
      "Nothing in these terms limits liability that cannot lawfully be limited, including liability for fraud or personal injury caused by negligence.",
    ],
  },
  {
    heading: "10. Privacy",
    body: [
      <>
        How we collect and handle personal information is set out in the{" "}
        <a href="/privacy-policy" className="link-inline">
          Privacy Policy
        </a>
        .
      </>,
    ],
  },
  {
    heading: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. Changes take effect when published on this page. Continued use of the site after a change means you accept the revised terms.",
    ],
  },
  {
    heading: "12. Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts at the place of the practice's principal operation shall have exclusive jurisdiction, subject to any mandatory consumer protections that apply to you.",
    ],
  },
  {
    heading: "13. Contact",
    body: [`For any question about these terms, write to ${site.email}.`],
  },
];

export default async function TermsPage() {
  const revised = await lastRevised();

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={<>Terms & Conditions</>}
        lede={
          <>
            The basis on which this website is provided and on which the
            practice is engaged.
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
                delay={Math.min(index * 30, 200)}
                className="border-t border-charcoal/15 py-9 first:border-t-0 first:pt-0"
              >
                <h2 className="font-display text-display-sm">{section.heading}</h2>
                {section.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
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

      <SectionCta eyebrow="Contact" title="Any question about these terms?" />
    </>
  );
}
