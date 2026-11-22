import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { BookingLink } from "@/components/CalBooking";
import { CitationPreview } from "@/components/interactive/CitationPreview";
import { BuyerTabs } from "@/components/sites/aeoba/buyer-tabs";
import { Pricing } from "@/components/sites/aeoba/pricing";
import { CallToAction, ContentCard, FaqSection, FounderNote } from "@/components/aeoba/PageSections";
import { playbooks } from "@/content/resources";
import { faqSchema, site } from "@/config/site";

function Hero() {
  return <section id="hero" className="home-hero bg-instrument"><div className="home-hero-inner"><div className="home-hero-grid"><div><p className="eyebrow">Founder-led AEO / GEO / SEO</p><h1 className="home-hero-title"><span>The AI SEO agency that makes you the answer</span><span className="home-hero-emphasis">in AI Overviews, ChatGPT, and Google.</span></h1><p className="home-hero-guarantee">{site.guarantee}</p><div className="home-hero-actions"><Link className="btn-primary" href="/free-aeo-report">Run Your Free AEO Report</Link><BookingLink className="btn-secondary-strong">Book a Strategy Call</BookingLink></div><div className="home-founder-note"><ShieldCheck size={22} /><p><strong>{site.founder.name}</strong><span>{site.founder.expertise}</span><span>Milan, Italy · Sliema, Malta. You work directly with the architect.</span></p></div></div><CitationPreview /></div></div></section>;
}

function MarketStats() {
  return <section id="stat-bar" className="aeo-statsSection" aria-label="The Aeoba operating model"><div className="aeo-inner"><div className="aeo-marketStats">{[["10", "buyer-intent prompts in the agreed citation target", "A measurable starting point"], ["90", "days in your initial execution term", "Baseline, ship, verify"], ["1", "founder responsible for your systems and delivery", "Direct access to Sai"], ["2", "European locations: Milan and Sliema", "One connected operating rhythm"]].map(([value, claim, note]) => <div className="aeo-marketStat" key={value}><p className="text-metric aeo-marketValue">{value}</p><p className="aeo-marketClaim">{claim}</p><p className="evidence-annotation aeo-marketSource">{note}</p></div>)}</div></div></section>;
}

function Proof() {
  return <section id="client-results" className="aeo-section bg-instrument on-dark"><div className="aeo-inner"><div className="aeo-proofHeader"><p className="eyebrow">Aeoba implementation studies</p><h2 className="text-heading-1">Inspect the system behind the promise.</h2><p>Illustrative projects showing the work and evidence we would review. These examples are not client performance claims.</p></div><div className="native-grid">{playbooks.map((playbook, index) => <ContentCard key={playbook.slug} href={`/case-studies/${playbook.slug}`} title={playbook.title} description={playbook.description} label={playbook.sector} index={index} />)}</div><div className="aeo-proofAction"><Link className="btn-secondary-strong" href="/case-studies">Explore all case studies</Link></div></div></section>;
}

function HowItWorks() {
  return <section id="how-it-works" className="aeo-section aeo-alternate"><div className="aeo-inner"><p className="eyebrow">A clear execution rhythm</p><h2 className="text-heading-1 aeo-heading">How it works</h2><ol className="aeo-steps">{[["01", "Baseline", "Agree on your buyer prompts. Inspect the technical, entity, content, and source gaps."], ["02", "Build", "Approve the plan. We ship focused technical fixes, structured data, and useful answer pages."], ["03", "Verify", "Review the work, repeat the prompts, and keep the answer and source evidence together."]].map(([number, title, description]) => <li key={number}><span className="aeo-stepNumber">{number}</span><h3 className="text-heading-3">{title}</h3><p>{description}</p></li>)}</ol></div></section>;
}

function Governance() {
  return <section className="aeo-section aeo-alternate"><div className="aeo-inner"><h2 className="text-heading-1 aeo-heading">You can inspect what you are paying for.</h2><ol className="aeo-governanceSteps">{["We plan the work", "You approve the priorities", "Sai owns the execution", "You review the evidence"].map((step, index) => <li key={step}><span className="aeo-stageMarker" /><span>{step}</span>{index < 3 && <span className="aeo-stageArrow" aria-hidden="true">→</span>}</li>)}</ol><div className="aeo-guarantee"><p className="aeo-guaranteeClaim"><strong>90 days.</strong><span>{site.guarantee}</span></p><div><p>{site.guaranteeTerms}</p><Link className="native-text-link" href="/pricing#guarantee">Read the guarantee terms →</Link></div></div><FounderNote /></div></section>;
}

function AnswerIndex() {
  return <section id="answer-index" className="aeo-section"><div className="aeo-inner aeo-readingGrid"><div><p className="eyebrow">The Aeoba Answer Index</p><h2 className="text-heading-1">An answer is useful when you can inspect its source.</h2><div className="aeo-readingActions"><Link href="/answer-index">Build your citation baseline<ArrowUpRight size={18} /></Link><Link href="/answer-index/archive">Review your saved observations<ArrowUpRight size={18} /></Link></div></div><div><p className="aeo-readingBody">Record the exact prompt, engine, date, answer excerpt, and source. Separate a named mention from a citation. Save your own observations on your device or export a CSV for your next review.</p><ul className="native-deliverables">{["No invented rankings or borrowed client results", "A dated record of what you actually observed", "A repeatable process for the questions that matter"].map(item => <li key={item}><Check size={18} />{item}</li>)}</ul></div></div></section>;
}

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} /><Hero /><MarketStats /><Proof /><HowItWorks /><BuyerTabs /><Governance /><AnswerIndex /><Pricing /><section id="what-is-aeo" className="aeo-section"><div className="aeo-inner aeo-readingGrid"><h2 className="text-heading-1">What is Answer Engine Optimization?</h2><div><p className="aeo-readingBody">AEO makes your expertise easier to understand, verify, and reference in an AI answer. Aeoba connects technical SEO, clear entities, useful content, and relevant authority signals with the questions your buyers actually ask.</p><div className="aeo-readingActions"><Link href="/resources/free-aeo-guide">Read the Aeoba AEO guide<ArrowUpRight size={18} /></Link><Link href="/resources/tools/aeo-roi-calculator">Explore potential demand<ArrowUpRight size={18} /></Link></div></div></div></section><FaqSection /><CallToAction /></>;
}
