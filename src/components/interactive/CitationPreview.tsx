"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { site } from "@/config/site";

const scenarios = {
  "B2B SaaS": { question: "How can a SaaS business become easier for AI to recommend?", answer: "Clarify the category, product entities, integrations, and comparison criteria. Aeoba connects those facts with useful answer pages and a repeatable citation baseline.", href: "/industries/saas" },
  Ecommerce: { question: "What makes a product useful as a source in AI answers?", answer: "Specific product facts, original buying advice, and clear suitability criteria give an answer something useful to reference. Aeoba organizes the evidence and the path to the product.", href: "/industries/ecommerce" },
  "Consulting & Agencies": { question: "How should a professional services business explain its expertise?", answer: "Make the service scope, agency expertise, locations, and consultation process consistent. Aeoba structures those facts and tracks the buyer questions they are intended to support.", href: "/industries/local-business-seo" },
};

export function CitationPreview() {
  const [vertical, setVertical] = useState<keyof typeof scenarios>("B2B SaaS"), [engine, setEngine] = useState("ChatGPT");
  const scenario = scenarios[vertical];
  return <div className="home-citation-card"><div className="preview-controls"><label className="sr-only" htmlFor="preview-vertical">Choose a buyer scenario</label><select id="preview-vertical" value={vertical} onChange={event => setVertical(event.target.value as keyof typeof scenarios)}>{Object.keys(scenarios).map(value => <option key={value}>{value}</option>)}</select><div className="engine-buttons" aria-label="Example answer format">{["ChatGPT", "Perplexity"].map(value => <button key={value} type="button" aria-pressed={engine === value} onClick={() => setEngine(value)}>{value}</button>)}</div></div>
    <p className="preview-disclosure">Illustrative {engine} answer format · not a live result</p><div key={`${engine}-${vertical}`} className="preview-answer" aria-live="polite"><div className="home-citation-prompt"><p className="home-citation-label">Buyer question</p><p className="home-citation-question">{scenario.question}</p></div><p className="home-citation-answer">{scenario.answer}</p><span className="home-citation-client"><ShieldCheck size={14} />{site.name} · evidence-led AEO</span></div>
    <p className="home-citation-label preview-source-label">Explore the supporting workflows</p><div className="source-pills"><Link href="/platform/brand-intelligence">Schema Entity</Link><Link href="/resources/blog/authority-without-manufactured-endorsements">Best-Of Listicle</Link><Link href="/platform/reddit-quora-seeding">Reddit Thread</Link></div><Link className="native-text-link" href={scenario.href}>Explore this industry →</Link>
  </div>;
}
