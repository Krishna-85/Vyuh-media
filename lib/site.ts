/**
 * Single source of truth for brand, domain and navigation.
 * The website is published at https://vaibhavpratap.in and presents
 * the brand VYUH MEDIA.
 */
export const site = {
  brand: "VYUH MEDIA",
  domain: "vaibhavpratap.in",
  url: "https://vaibhavpratap.in",
  email: "admin@vaibhavpratap.in",
  founder: "Vaibhav Pratap",
  taglineHi: "रणनीति। संवाद। प्रभाव।",
  positioning: "Strategic Communication. Powerful Presence.",
  description:
    "VYUH MEDIA is a boutique political communication and public relations consultancy working across political PR, digital branding, creative communication and campaign strategy.",
  keywords: [
    "political communication",
    "political public relations",
    "digital branding",
    "campaign strategy",
    "political social media",
    "communication consultancy",
    "reputation management",
    "VYUH MEDIA",
  ],
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNavigation = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;
