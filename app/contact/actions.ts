"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2),
  businessName: z.string().trim().min(2),
  businessType: z.enum(["Clinic", "Dermatologist", "Salon", "Other"]),
  city: z.string().trim().min(2),
  phone: z.string().trim().min(5),
  email: z.string().email(),
  counters: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal("on"),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactResult = { status: "success" } | { status: "error"; message: string; fields?: Record<string, string> };

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields." };
  if (parsed.data.website) return { status: "success" };

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    if (!parsed.data.turnstileToken) return { status: "error", message: "Please complete the verification and try again." };
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: parsed.data.turnstileToken }),
    });
    const result = (await verification.json()) as { success?: boolean };
    if (!result.success) return { status: "error", message: "Verification failed. Please try again." };
  } else if (process.env.NODE_ENV === "production") {
    return { status: "error", message: "Contact verification is not configured." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { status: "error", message: "Something went wrong. Please try again or email us." };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `New E-Queue enquiry from ${parsed.data.businessName}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Business: ${parsed.data.businessName} (${parsed.data.businessType})`,
      `City: ${parsed.data.city}`,
      `Phone: ${parsed.data.phone}`,
      `Counters: ${parsed.data.counters ?? "Not provided"}`,
      `Message: ${parsed.data.message ?? "Not provided"}`,
    ].join("\n"),
  });
  return error ? { status: "error", message: "Something went wrong. Please try again or email us." } : { status: "success" };
}
