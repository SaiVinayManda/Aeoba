export interface PipelineInputs { dealValue: number; prompts: number; coverage: number; clickRate: number; leadRate: number; winRate: number; monthlyFee: number }
export function calculatePipeline(input: PipelineInputs) {
  const positive = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
  const rate = (value: number) => Math.min(100, positive(value)) / 100;
  const visits = positive(input.prompts) * rate(input.coverage) * rate(input.clickRate);
  const opportunities = visits * rate(input.leadRate);
  const pipeline = opportunities * positive(input.dealValue);
  const revenue = pipeline * rate(input.winRate);
  return { visits, opportunities, pipeline, revenue, net: revenue - positive(input.monthlyFee) };
}

export function makeBuyerPrompts(offering: string, audience: string, market: string, intent: string) {
  const context = market.trim() ? ` in ${market.trim()}` : "";
  const subject = offering.trim() || "this service";
  const buyer = audience.trim() || "our team";
  const prompts: Record<string, string[]> = {
    Comparison: [`Which ${subject} options are best suited to ${buyer}${context}?`, `How should ${buyer} compare ${subject} providers${context}?`, `What tradeoffs matter when choosing ${subject} for ${buyer}?`],
    Suitability: [`Is ${subject} a good fit for ${buyer}${context}?`, `What should ${buyer} check before choosing ${subject}?`, `Which ${subject} capabilities matter most for ${buyer}?`],
    Implementation: [`What does implementing ${subject} involve for ${buyer}?`, `What access and preparation does ${subject} require?`, `How should ${buyer} evaluate the first 90 days of ${subject}?`],
    Commercial: [`What affects the cost of ${subject}${context}?`, `What should a ${subject} proposal include for ${buyer}?`, `Which questions should ${buyer} ask a ${subject} provider before signing?`],
  };
  return prompts[intent] ?? prompts.Comparison;
}

export function csvCell(value: string) {
  const safe = /^\s*[=+\-@]|^[\t\r\n]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
