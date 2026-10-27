"use client";
import { useState } from "react";
import { FAQS } from "@/lib/faq";
import { trackEvent } from "@/lib/analytics";
export function FaqAccordion() { const [open, setOpen] = useState<number | null>(null); return <div className="space-y-3">{FAQS.map((faq, index) => <div className="rounded-xl border border-soft-grey bg-white" key={faq.question}><button className="flex min-h-14 w-full items-center justify-between px-5 text-left font-semibold" aria-expanded={open === index} onClick={() => { const next = open === index ? null : index; setOpen(next); if (next !== null) trackEvent("faq_open", { question: faq.question }); }}>{faq.question}<span aria-hidden="true">{open === index ? "−" : "+"}</span></button>{open === index && <p className="border-t border-soft-grey px-5 py-4 text-grey-purple">{faq.answer}</p>}</div>)}</div>; }
