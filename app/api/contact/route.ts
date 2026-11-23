import { NextResponse } from "next/server";
import {
  hasErrors,
  limits,
  validateContact,
  type ContactValues,
} from "@/lib/contact";
import { site } from "@/lib/site";

/**
 * Contact delivery.
 *
 * Two transports, both configured through environment variables:
 *   CONTACT_WEBHOOK_URL — POSTs the submission as JSON (Formspree, Zapier,
 *                         a CRM, your own endpoint…).
 *   RESEND_API_KEY       — sends an email through the Resend HTTP API.
 *
 * When neither is set the route answers 503 rather than pretending the
 * message was sent. The form surfaces that honestly, with a mailto fallback.
 */

const MAX_BODY_BYTES = 32 * 1024;

/** Minimal in-memory throttle — one submission per IP per window. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const previous = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (previous.length >= MAX_PER_WINDOW) {
    recent.set(ip, previous);
    return true;
  }
  previous.push(now);
  recent.set(ip, previous);

  // Bound the map so it cannot grow without limit.
  if (recent.size > 5_000) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
      if (recent.size <= 5_000) break;
    }
  }
  return false;
}

type DeliveryResult = { ok: true; via: string } | { ok: false; error: string };

async function deliver(values: ContactValues): Promise<DeliveryResult> {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    organisation: values.organisation.trim(),
    topic: values.topic.trim(),
    message: values.message.trim(),
    submittedAt: new Date().toISOString(),
    source: site.url,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        return { ok: false, error: `Webhook responded with ${response.status}.` };
      }
      return { ok: true, via: "webhook" };
    } catch {
      return { ok: false, error: "The delivery endpoint could not be reached." };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from =
      process.env.CONTACT_FROM_EMAIL ?? `${site.brand} <no-reply@${site.domain}>`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: payload.email,
          subject: `Enquiry — ${payload.topic} — ${payload.name}`,
          text: [
            `Name: ${payload.name}`,
            `Email: ${payload.email}`,
            `Organisation: ${payload.organisation || "—"}`,
            `Topic: ${payload.topic}`,
            `Submitted: ${payload.submittedAt}`,
            "",
            payload.message,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        console.error("[contact] Resend error:", response.status, detail.slice(0, 300));
        return { ok: false, error: `Mail service responded with ${response.status}.` };
      }
      return { ok: true, via: "email" };
    } catch {
      return { ok: false, error: "The mail service could not be reached." };
    }
  }

  return { ok: false, error: "no-transport" };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unexpected request format." },
      { status: 415 },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read the submission." },
      { status: 400 },
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "That submission is too large." },
      { status: 413 },
    );
  }

  let body: Partial<ContactValues>;
  try {
    body = JSON.parse(raw) as Partial<ContactValues>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed submission." },
      { status: 400 },
    );
  }

  // Honeypot: a filled field means an automated submitter.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    // Answer identically to a success so bots learn nothing from the response.
    return NextResponse.json({ ok: true });
  }

  const values: ContactValues = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    organisation: String(body.organisation ?? ""),
    topic: String(body.topic ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
  };

  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  // Guard against absurd input that passed the regex-shaped checks.
  if (
    values.name.length > limits.name.max ||
    values.message.length > limits.message.max
  ) {
    return NextResponse.json(
      { ok: false, message: "One of the fields exceeds its maximum length." },
      { status: 400 },
    );
  }

  const result = await deliver(values);

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  if (result.error === "no-transport") {
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        message:
          "The enquiry form is not yet connected to a delivery service. Nothing was sent — please email us directly instead.",
        fallbackEmail: site.email,
      },
      { status: 503 },
    );
  }

  console.error("[contact] delivery failed:", result.error);
  return NextResponse.json(
    {
      ok: false,
      message: `Your message could not be sent — ${result.error} Please email ${site.email} directly.`,
      fallbackEmail: site.email,
    },
    { status: 502 },
  );
}
