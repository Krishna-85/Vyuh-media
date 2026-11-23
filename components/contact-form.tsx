"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  hasErrors,
  topicOptions,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";
import { site } from "@/lib/site";

type Status =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "sent" }
  | { phase: "error"; message: string; fallbackEmail?: string; errors?: ContactErrors };

const emptyValues: ContactValues = {
  name: "",
  email: "",
  organisation: "",
  topic: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ phase: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const submitting = status.phase === "sending";

  /** Fields are only flagged once the visitor has left them. */
  const errorFor = (field: ContactField) =>
    touched[field] ? errors[field] : undefined;

  function set(field: ContactField, value: string) {
    const next = { ...values, [field]: value } as ContactValues;
    setValues(next);
    if (touched[field]) {
      const nextErrors = validateContact(next);
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    }
  }

  function setConsent(checked: boolean) {
    const next = { ...values, consent: checked };
    setValues(next);
    if (touched.consent) {
      setErrors((prev) => ({ ...prev, consent: validateContact(next).consent }));
    }
  }

  function blur(field: ContactField) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validateContact(values);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  const disabled = useMemo(() => submitting, [submitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const allErrors = validateContact(values);
    setErrors(allErrors);
    setTouched({
      name: true,
      email: true,
      organisation: true,
      topic: true,
      message: true,
      consent: true,
    });

    if (hasErrors(allErrors)) {
      setStatus({ phase: "idle" });
      // Move focus to the first field that needs attention.
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus({ phase: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        unconfigured?: boolean;
        fallbackEmail?: string;
        errors?: ContactErrors;
      };

      if (response.ok && data.ok) {
        setStatus({ phase: "sent" });
        setValues(emptyValues);
        setErrors({});
        setTouched({});
        formRef.current?.reset();
        return;
      }

      if (data.errors) setErrors(data.errors);

      setStatus({
        phase: "error",
        message:
          data.message ??
          "Something went wrong while sending. Please try again, or email us directly.",
        fallbackEmail: data.fallbackEmail ?? site.email,
        errors: data.errors,
      });
    } catch {
      setStatus({
        phase: "error",
        message:
          "We could not reach the server. Check your connection and try again, or email us directly.",
        fallbackEmail: site.email,
      });
    }
  }

  if (status.phase === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-t border-gold bg-stone px-7 py-10 sm:px-10"
      >
        <p className="eyebrow text-gold">Received</p>
        <h3 className="mt-5 font-display text-display-sm">
          Thank you — your enquiry has been sent.
        </h3>
        <p className="mt-4 max-w-[var(--width-prose)] text-body-lg text-ink-soft">
          We read every message and reply to genuine enquiries, usually within
          two working days. If it is urgent, please write to{" "}
          <a href={`mailto:${site.email}`} className="link-inline">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-8"
          onClick={() => setStatus({ phase: "idle" })}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {status.phase === "error" ? (
        <div
          role="alert"
          className="mb-10 border-l-2 border-[#8a3d30] bg-stone px-6 py-6"
        >
          <p className="eyebrow text-[#8a3d30]">Not sent</p>
          <p className="mt-4 text-body leading-relaxed text-ink-soft">
            {status.message}
          </p>
          {status.fallbackEmail ? (
            <a
              href={`mailto:${status.fallbackEmail}`}
              className="link-arrow mt-6"
            >
              {status.fallbackEmail}
              <span aria-hidden="true" className="link-arrow__glyph">
                →
              </span>
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-x-grid gap-y-9 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="field-label" htmlFor="contact-name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className="field-input"
            placeholder="Your full name"
            value={values.name}
            aria-invalid={errorFor("name") ? true : undefined}
            aria-describedby={errorFor("name") ? "contact-name-error" : undefined}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
          />
          {errorFor("name") ? (
            <span id="contact-name-error" className="field-error">
              {errorFor("name")}
            </span>
          ) : null}
        </div>

        {/* Email */}
        <div>
          <label className="field-label" htmlFor="contact-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            className="field-input"
            placeholder="you@example.com"
            value={values.email}
            aria-invalid={errorFor("email") ? true : undefined}
            aria-describedby={errorFor("email") ? "contact-email-error" : undefined}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
          />
          {errorFor("email") ? (
            <span id="contact-email-error" className="field-error">
              {errorFor("email")}
            </span>
          ) : null}
        </div>

        {/* Organisation */}
        <div>
          <label className="field-label" htmlFor="contact-organisation">
            Organisation <span className="normal-case tracking-normal text-grey">(optional)</span>
          </label>
          <input
            id="contact-organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className="field-input"
            placeholder="Party, office or company"
            value={values.organisation}
            aria-invalid={errorFor("organisation") ? true : undefined}
            aria-describedby={
              errorFor("organisation") ? "contact-organisation-error" : undefined
            }
            onChange={(e) => set("organisation", e.target.value)}
            onBlur={() => blur("organisation")}
          />
          {errorFor("organisation") ? (
            <span id="contact-organisation-error" className="field-error">
              {errorFor("organisation")}
            </span>
          ) : null}
        </div>

        {/* Topic */}
        <div>
          <label className="field-label" htmlFor="contact-topic">
            Subject <span aria-hidden="true">*</span>
          </label>
          <select
            id="contact-topic"
            name="topic"
            required
            className="field-input appearance-none"
            value={values.topic}
            aria-invalid={errorFor("topic") ? true : undefined}
            aria-describedby={errorFor("topic") ? "contact-topic-error" : undefined}
            onChange={(e) => set("topic", e.target.value)}
            onBlur={() => blur("topic")}
          >
            <option value="">Choose a subject…</option>
            {topicOptions.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errorFor("topic") ? (
            <span id="contact-topic-error" className="field-error">
              {errorFor("topic")}
            </span>
          ) : null}
        </div>
      </div>

      {/* Message */}
      <div className="mt-9">
        <label className="field-label" htmlFor="contact-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          maxLength={4000}
          className="field-input resize-y"
          placeholder="Tell us about the situation, the audience and the timeline."
          value={values.message}
          aria-invalid={errorFor("message") ? true : undefined}
          aria-describedby={errorFor("message") ? "contact-message-error" : "contact-message-hint"}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
        />
        {errorFor("message") ? (
          <span id="contact-message-error" className="field-error">
            {errorFor("message")}
          </span>
        ) : (
          <span id="contact-message-hint" className="field-hint">
            {values.message.length} / 4000 characters
          </span>
        )}
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="field-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, website: e.target.value }))
          }
        />
      </div>

      {/* Consent */}
      <div className="mt-9">
        <label className="flex cursor-pointer items-start gap-3.5">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            aria-invalid={errorFor("consent") ? true : undefined}
            aria-describedby={errorFor("consent") ? "contact-consent-error" : undefined}
            className="mt-1.5 h-4 w-4 flex-none accent-[#a58b60]"
            onChange={(e) => setConsent(e.target.checked)}
            onBlur={() => blur("consent")}
          />
          <span className="text-small leading-relaxed text-ink-soft">
            I have read the{" "}
            <a href="/privacy-policy" className="link-inline">
              privacy policy
            </a>{" "}
            and agree that {site.brand} may use these details to respond to my
            enquiry. <span aria-hidden="true">*</span>
          </span>
        </label>
        {errorFor("consent") ? (
          <span id="contact-consent-error" className="field-error">
            {errorFor("consent")}
          </span>
        ) : null}
      </div>

      <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-small text-ink-soft">
          Or write directly to{" "}
          <a href={`mailto:${site.email}`} className="link-inline">
            {site.email}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status.phase === "sending"
          ? "Sending your enquiry."
          : status.phase === "error"
            ? status.message
            : ""}
      </p>
    </form>
  );
}
