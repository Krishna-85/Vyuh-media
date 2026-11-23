import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { navigation, site } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-site pb-section pt-[clamp(6rem,12vw,10rem)]">
      <div className="grid gap-x-grid gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Monogram className="h-11 w-11 text-charcoal" />
          <p className="eyebrow mt-10 text-ink-soft">404 — page not found</p>
          <h1 className="mt-7 max-w-[16ch] font-display text-display-xl">
            This page has moved, or never <span className="italic text-ink-soft">existed.</span>
          </h1>
          <p className="mt-8 max-w-[var(--width-prose)] text-lede text-ink-soft">
            The address you followed is not on this site. Try one of the pages
            below, or write to{" "}
            <a href={`mailto:${site.email}`} className="link-inline">
              {site.email}
            </a>
            .
          </p>

          <nav aria-label="Suggested pages" className="mt-11">
            <ul className="flex flex-wrap gap-x-10 gap-y-5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-arrow">
                    {item.label}
                    <span aria-hidden="true" className="link-arrow__glyph">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-charcoal/15 pt-8">
            <p className="eyebrow text-ink-soft">Start again</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <Link href="/" className="link-inline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="link-inline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-inline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
