import aboutStone from "@/assets/images/about-stone.jpg";
import approachSequence from "@/assets/images/approach-sequence.jpg";
import bandFormation from "@/assets/images/band-formation.jpg";
import contactArrival from "@/assets/images/contact-arrival.jpg";
import heroStudy from "@/assets/images/hero-study.jpg";
import servicesCorridor from "@/assets/images/services-corridor.jpg";

/**
 * Photography used across the site. All frames are cropped to the aspect
 * ratios declared in the design system (4/5, 3/2, 2/1) and carry the same
 * light grade so the set reads as one commission.
 */
export const images = {
  heroStudy,
  bandFormation,
  aboutStone,
  approachSequence,
  servicesCorridor,
  contactArrival,
} as const;
