/**
 * Dates rendered into the page.
 *
 * With cacheComponents enabled, `new Date()` may not be called during
 * prerendering — the value would differ between renders. These helpers are
 * cached instead, so each build produces one stable value and the pages that
 * display them stay fully static.
 *
 * "use cache" functions must be async, hence the awaits at each call site.
 */

/** Copyright year shown in the footer. */
export async function currentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

/** Human-readable "last revised" date for the legal pages. */
export async function lastRevised(): Promise<string> {
  "use cache";
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Last-modified stamp for the sitemap. */
export async function lastModified(): Promise<Date> {
  "use cache";
  return new Date();
}
