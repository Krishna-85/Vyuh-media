/**
 * Contact form rules, shared by the browser (for immediate feedback) and the
 * server route (which never trusts the browser). Keeping one definition means
 * the two can not disagree about what is acceptable.
 */

export const contactFields = ["name", "email", "organisation", "topic", "message", "consent"] as const;
export type ContactField = (typeof contactFields)[number];

export const topicOptions = [
  "General enquiry",
  "Services & scope",
  "Campaign or election work",
  "Media & press",
  "Partnership",
  "Other",
] as const;
export type Topic = (typeof topicOptions)[number];

export type ContactValues = {
  name: string;
  email: string;
  organisation: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. Never rendered as a visible label. */
  website?: string;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

export const limits = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  organisation: { max: 160 },
  message: { min: 20, max: 4000 },
} as const;

/** Deliberately permissive: rejects obvious malformation, not unusual names. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Please tell us who you are.";
  else if (name.length < limits.name.min)
    errors.name = "Please enter your full name.";
  else if (name.length > limits.name.max)
    errors.name = `Please keep your name under ${limits.name.max} characters.`;

  const email = values.email.trim();
  if (!email) errors.email = "We need an address to reply to.";
  else if (!EMAIL_RE.test(email))
    errors.email = "That does not look like a valid email address.";
  else if (email.length > limits.email.max)
    errors.email = "That email address is too long.";

  const organisation = values.organisation.trim();
  if (organisation.length > limits.organisation.max)
    errors.organisation = `Please keep this under ${limits.organisation.max} characters.`;

  if (!values.topic.trim()) errors.topic = "Please choose a subject.";

  const message = values.message.trim();
  if (!message) errors.message = "Please tell us what you need.";
  else if (message.length < limits.message.min)
    errors.message = `A little more detail, please — at least ${limits.message.min} characters.`;
  else if (message.length > limits.message.max)
    errors.message = `Please keep your message under ${limits.message.max} characters.`;

  if (!values.consent)
    errors.consent = "Please confirm you have read the privacy policy.";

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
