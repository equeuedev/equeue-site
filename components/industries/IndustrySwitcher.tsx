"use client";

import { useState } from "react";
import { INDUSTRIES } from "@/lib/industries";
import { trackEvent } from "@/lib/analytics";

export function IndustrySwitcher() {
  const [selected, setSelected] = useState(INDUSTRIES[0]);
  return <div><div role="tablist" aria-label="Industries" className="flex flex-wrap gap-2">{INDUSTRIES.slice(0, 3).map((industry) => <button key={industry.slug} role="tab" aria-selected={selected.slug === industry.slug} onClick={() => { setSelected(industry); trackEvent("industry_tab", { industry: industry.slug }); }} className={`min-h-11 rounded-full px-5 py-2 font-semibold ${selected.slug === industry.slug ? "bg-aubergine text-white" : "border border-aubergine text-aubergine"}`}>{industry.name}</button>)}</div><div className="mt-8 rounded-3xl border border-soft-grey bg-white p-8"><h3 className="font-display text-2xl font-bold">{selected.oneLiner}</h3><ul className="mt-5 grid gap-3 sm:grid-cols-3">{selected.highlights.map((highlight) => <li key={highlight} className="rounded-xl bg-ivory p-4">{highlight}</li>)}</ul><div aria-hidden="true" className="mt-8 flex items-center justify-between rounded-xl bg-charcoal p-5 text-white"><span>{selected.mockup.service}</span><strong>{selected.mockup.token}</strong><span>{selected.mockup.counter}</span></div></div></div>;
}
