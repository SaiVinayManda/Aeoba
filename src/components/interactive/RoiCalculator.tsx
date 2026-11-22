"use client";

import Link from "next/link";
import { useState } from "react";
import { calculatePipeline, type PipelineInputs } from "@/lib/tools";
import { plans } from "@/config/plans";
import { downloadFile } from "@/components/interactive/Workbenches";

const currency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
export function RoiCalculator() {
  const [inputs, setInputs] = useState<PipelineInputs>({ dealValue: 10000, prompts: 1000, coverage: 20, clickRate: 5, leadRate: 10, winRate: 20, monthlyFee: 1597 });
  const output = calculatePipeline(inputs);
  const controls: { key: keyof PipelineInputs; label: string; min: number; max: number; step: number; currency?: boolean }[] = [
    { key: "dealValue", label: "Average deal value", min: 500, max: 100000, step: 500, currency: true },
    { key: "prompts", label: "Monthly high-intent AI prompts (your estimate)", min: 100, max: 20000, step: 100 },
    { key: "coverage", label: "Estimated citation coverage", min: 1, max: 100, step: 1 },
    { key: "clickRate", label: "Citation click-through rate", min: .5, max: 30, step: .5 },
    { key: "leadRate", label: "Visit-to-opportunity conversion rate", min: 1, max: 30, step: 1 },
    { key: "winRate", label: "Opportunity win rate", min: 1, max: 80, step: 1 },
  ];
  return <div className="workbench"><div className="workbench-heading"><div><p className="eyebrow">AEO demand & ROI calculator</p><h2>What could qualified AI discovery be worth?</h2></div><span className="native-badge">Illustrative model · your assumptions</span></div><div className="workbench-grid"><div className="field-stack">{controls.map(control => <label className="range-field" htmlFor={`roi-${control.key}`} key={control.key}><span className="range-label"><span>{control.label}</span><output htmlFor={`roi-${control.key}`}>{control.currency ? currency(inputs[control.key]) : control.key === "prompts" ? inputs[control.key].toLocaleString("en-US") : `${inputs[control.key]}%`}</output></span><input id={`roi-${control.key}`} type="range" min={control.min} max={control.max} step={control.step} value={inputs[control.key]} onChange={event => setInputs(current => ({ ...current, [control.key]: Number(event.target.value) }))} /></label>)}<label>Monthly program fee<select value={inputs.monthlyFee} onChange={event => setInputs(current => ({ ...current, monthlyFee: Number(event.target.value) }))}>{plans.map(plan => <option key={plan.id} value={plan.price}>{plan.name} · {currency(plan.price)}</option>)}</select></label></div><div className="workbench-output"><dl className="roi-results" aria-live="polite"><div><dt>Illustrative monthly pipeline</dt><dd className="roi-value">{currency(output.pipeline)}</dd></div><div><dt>Estimated qualified visits / opportunities</dt><dd>{output.visits.toFixed(1)} / {output.opportunities.toFixed(1)}</dd></div><div><dt>Revenue at your assumed win rate</dt><dd>{currency(output.revenue)}</dd></div><div><dt>Revenue less program fee</dt><dd>{currency(output.net)}</dd></div></dl><p className="native-note">Prompts × citation coverage × click-through × opportunity conversion × deal value = pipeline. Pipeline × win rate = revenue. This is a scenario, not a traffic forecast, profit calculation, or guarantee.</p><Link className="btn-primary" href="/free-aeo-report?source=roi">Run Your Free AEO Report</Link><button className="btn-secondary-strong" onClick={() => downloadFile("aeoba-pipeline-scenario.json", JSON.stringify({ assumptions: inputs, scenario: output, note: "Illustrative scenario, not a forecast." }, null, 2), "application/json")}>Download this scenario</button></div></div></div>;
}
