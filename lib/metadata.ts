import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  /** Plain page title — the layout template appends "— VYUH MEDIA". */
  title: string;
  description: string;
  /** Path from the domain root, e.g. "/services". */
  path: string;
};

/** Canonical + Open Graph + Twitter metadata for a single page. */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const socialTitle = `${title} — ${site.brand}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.brand,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
