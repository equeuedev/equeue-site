export type Feature = { slug: string; name: string; description: string; bullets: [string, string, string] };
export const FEATURES: Feature[] = [
  { slug: "counter-board", name: "Counter board", description: "See every counter, its doctor and who's being served.", bullets: ["Call, start, complete and skip in one tap.", "Idle counters with patients waiting are flagged.", "One live view for your team."] },
  { slug: "waiting-room-display", name: "Waiting-room display", description: "Large Now serving token and counter.", bullets: ["Recent calls are easy to see.", "A clear closed alert.", "Tokens only, never names."] },
  { slug: "printed-slip", name: "Printed slip", description: "A POS-size slip with a large token number.", bullets: ["Prints in seconds.", "The token is still created if the printer is offline.", "Works for patients without the app."] },
  { slug: "analytics", name: "Analytics", description: "Waits, service times, peak hours and outcome rates.", bullets: ["A sample size on every number.", "Per counter, never per person.", "Export to CSV."] },
];
