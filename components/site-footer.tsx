import Link from "next/link";
import { Monogram } from "@/components/monogram";
import { currentYear } from "@/lib/dates";
import { legalNavigation, navigation, site } from "@/lib/site";

const columnTitle = "eyebrow text-gold-soft";
const footerLink =
  "text-small text-ivory-soft transition-colors duration-fast hover:text-ivory";

export async function SiteFooter() {
  const year = await currentYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-site pb-12 pt-[clamp(4rem,7vw,6rem)]">
        <div className="grid gap-x-grid gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Monogram className="h-10 w-10 text-ivory" />
              <span className="font-display text-[1.0625rem] uppercase tracking-[0.26em]">
                Vyuh Media
              </span>
            </div>
            <p className="mt-7 font-deva text-lg leading-relaxed text-gold-soft">
              {site.taglineHi}
            </p>
            <p className="mt-3 text-small italic text-ivory-soft">
              {site.positioning}
            </p>
            <p className="mt-6 max-w-sm text-small leading-relaxed text-ivory-soft">
              A boutique consultancy for political communication, public
              relations and digital presence.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <h2 className={columnTitle}>Navigate</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="lg:col-span-2">
            <h2 className={columnTitle}>Legal</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className={columnTitle}>Enquiries</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-small text-ivory underline decoration-gold underline-offset-4 transition-colors duration-fast hover:text-gold-soft"
            >
              {site.email}
            </a>
            <p className="mt-3 text-small text-ivory-soft">{site.domain}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory-soft sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.brand}
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
