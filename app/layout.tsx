import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro-devanagari",
  display: "swap",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.brand,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.positioning,
  founder: {
    "@type": "Person",
    name: site.founder,
    url: site.url,
  },
  knowsLanguage: ["en", "hi"],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — ${site.positioning}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.brand,
  authors: [{ name: site.founder, url: site.url }],
  creator: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} — ${site.positioning}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — ${site.positioning}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${instrumentSans.variable} ${tiroDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-[0.75rem] focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1 pt-[4.5rem] lg:pt-[5.75rem]">
          {children}
        </main>

        <SiteFooter />

        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
