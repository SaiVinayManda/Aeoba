"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const buyers = [
  { id: "saas", label: "SaaS", title: "Make your product understandable at comparison time.", href: "/industries/saas", priorities: [["Clarify", "Category & entities"], ["Answer", "Fit & integrations"], ["Measure", "Buyer prompts"]], context: "Connect use cases, implementation details, comparisons, and pricing answers with the decision a team needs to make." },
  { id: "legal", label: "Legal", title: "Make expertise, jurisdiction, and the next step clear.", href: "/industries/law-firm-seo", priorities: [["Clarify", "Practice & location"], ["Answer", "Client questions"], ["Measure", "Qualified enquiries"]], context: "Build specific, reviewed practice-area explanations with accurate credentials and a clear consultation process." },
  { id: "services", label: "Services", title: "Connect a specific problem with your expertise.", href: "/industries/local-business-seo", priorities: [["Clarify", "Scope & expertise"], ["Answer", "Selection criteria"], ["Measure", "Relevant citations"]], context: "Explain how the work happens, who is responsible, and what a good fit looks like before someone books a call." },
  { id: "ecommerce", label: "Ecommerce", title: "Help a shopper choose the product that fits.", href: "/industries/ecommerce", priorities: [["Clarify", "Product facts"], ["Answer", "Buying criteria"], ["Measure", "Product discovery"]], context: "Use consistent product attributes and original buying advice to support considered purchase decisions." },
];

export function BuyerTabs() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) { case "ArrowRight": next = (index + 1) % buyers.length; break; case "ArrowLeft": next = (index + buyers.length - 1) % buyers.length; break; case "Home": next = 0; break; case "End": next = buyers.length - 1; break; default: return; }
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };
  return <section className="buyer-section" aria-labelledby="buyer-heading"><div className="buyer-inner"><div className="buyer-header"><h2 id="buyer-heading" className="text-heading-1">Built for your kind of buyer</h2><div className="buyer-tabs" role="tablist" aria-labelledby="buyer-heading">{buyers.map((buyer, index) => <button key={buyer.id} ref={element => { tabs.current[index] = element; }} id={`buyer-tab-${buyer.id}`} role="tab" aria-selected={selected === index} aria-controls={`buyer-panel-${buyer.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => handleKey(event, index)}>{buyer.label}</button>)}</div></div><div className="buyer-panels">{buyers.map((buyer, index) => <div key={buyer.id} className="buyer-panel" role="tabpanel" id={`buyer-panel-${buyer.id}`} aria-labelledby={`buyer-tab-${buyer.id}`} aria-hidden={selected !== index} inert={selected !== index} tabIndex={0}><div className="buyer-client"><p><strong>{buyer.title}</strong></p><Link className="buyer-source" href={buyer.href}>Explore the workflow<ArrowUpRight size={18} /></Link></div><div className="buyer-evidence"><dl className="buyer-stats">{buyer.priorities.map(([label, value]) => <div className="buyer-stat" key={label}><dt>{label}</dt><dd className="buyer-value buyer-priority">{value}</dd></div>)}</dl><p className="buyer-context">{buyer.context}</p></div></div>)}</div></div></section>;
}
