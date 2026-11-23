"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu when the route changes (covers link clicks and history
  // navigation). Adjusted during render rather than in an effect, per React's
  // guidance for derived state.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scrolling and allow Escape while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ivory transition-[border-color] duration-base ease-out-expo ${
        scrolled ? "border-b border-charcoal/10" : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between lg:h-[5.75rem]">
        <Link
          href="/"
          aria-label={`${site.brand} — home`}
          className="group flex items-baseline gap-2.5"
        >
          <span className="font-display text-[1.0625rem] uppercase tracking-[0.26em] lg:text-[1.125rem]">
            Vyuh
          </span>
          <span
            aria-hidden="true"
            className="h-px w-5 -translate-y-[0.3em] bg-gold transition-colors duration-fast group-hover:bg-gold"
          />
          <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.34em] text-ink-soft lg:text-[0.6875rem]">
            Media
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`eyebrow group relative py-2 transition-colors duration-fast ${
                      active ? "text-charcoal" : "text-ink-soft hover:text-charcoal"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-base ease-out-expo ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-px bg-charcoal transition-transform duration-base ease-out-expo ${
              menuOpen ? "w-6 translate-y-[4px] rotate-45" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-charcoal transition-all duration-base ease-out-expo ${
              menuOpen ? "w-6 -translate-y-[4px] -rotate-45" : "w-4"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 bg-ivory transition-opacity duration-base ease-out-expo lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        inert={!menuOpen}
      >
        <div className="flex h-full flex-col justify-between pt-[4.5rem]">
          <nav aria-label="Mobile" className="container-site mt-10">
            <ul className="flex flex-col">
              {navigation.map((item, index) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li
                    key={item.href}
                    className={`border-b border-charcoal/10 transition-[opacity,transform] duration-slow ease-out-expo ${
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${80 + index * 70}ms` : "0ms" }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-5 font-display text-display-md"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`eyebrow ${active ? "text-gold" : "text-grey"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={`container-site pb-12 transition-opacity duration-slow ease-out-expo ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "360ms" : "0ms" }}
          >
            <p className="font-deva text-lg text-charcoal">{site.taglineHi}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-small text-ink-soft underline decoration-gold underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
