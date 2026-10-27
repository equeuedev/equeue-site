"use client";

import { useEffect, useState } from "react";
import { submitContact, type ContactResult } from "@/app/contact/actions";
import { trackEvent } from "@/lib/analytics";
import Script from "next/script";

export function ContactForm() {
  const [result, setResult] = useState<ContactResult | null>(null);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    (window as Window & { turnstileCallback?: (token: string) => void }).turnstileCallback = (
      token,
    ) => {
      const input = document.querySelector<HTMLInputElement>('input[name="turnstileToken"]');
      if (input) input.value = token;
    };
    return () => {
      delete (window as Window & { turnstileCallback?: (token: string) => void }).turnstileCallback;
    };
  }, []);
  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setResult(null);
    const response = await submitContact(formData);
    setResult(response);
    setSubmitting(false);
    if (response.status === "success") trackEvent("contact_submit");
  }
  return (
    <>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      ) : null}
      <form
        action={onSubmit}
        className="space-y-5"
        onFocus={() => {
          if (!started) {
            setStarted(true);
            trackEvent("contact_start");
          }
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Business name" name="businessName" required />
          <label className="block text-sm font-semibold">
            Business type
            <select
              name="businessType"
              required
              className="mt-2 min-h-11 w-full rounded-lg border border-soft-grey bg-white px-3"
            >
              <option>Clinic</option>
              <option>Dermatologist</option>
              <option>Salon</option>
              <option>Other</option>
            </select>
          </label>
          <Field label="City" name="city" required />
          <Field label="Phone or WhatsApp" name="phone" required type="tel" />
          <Field label="Email" name="email" required type="email" />
          <Field label="Number of counters (optional)" name="counters" />
        </div>
        <label className="block text-sm font-semibold">
          Message (optional)
          <textarea
            name="message"
            rows={4}
            className="mt-2 w-full rounded-lg border border-soft-grey bg-white p-3"
          />
        </label>
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px]"
          aria-hidden="true"
        />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <>
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="turnstileCallback"
            />
            <input type="hidden" name="turnstileToken" />
          </>
        ) : (
          <input type="hidden" name="turnstileToken" value="" />
        )}
        <label className="flex gap-3 text-sm">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />I agree to be
          contacted about E-Queue. See our{" "}
          <a className="underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </label>
        <button
          disabled={submitting}
          className="min-h-11 rounded-full bg-aubergine px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
        <p
          aria-live="polite"
          className={result?.status === "error" ? "text-error" : "text-success"}
        >
          {result?.status === "success" ? "Thanks. We'll be in touch shortly." : result?.message}
        </p>
      </form>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 min-h-11 w-full rounded-lg border border-soft-grey bg-white px-3"
      />
    </label>
  );
}
