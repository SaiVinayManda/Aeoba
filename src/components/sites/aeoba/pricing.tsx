import Link from "next/link";
import { Check } from "lucide-react";
import { CalPopupButton } from "@/components/CalBooking";
import { plans } from "@/config/plans";
import { site } from "@/config/site";

export function Pricing() {
  return <section id="pricing" className="aeo-section aeo-alternate"><div className="aeo-inner">
    <div className="aeo-pricingHeader"><h2 className="text-heading-1">Choose Your Visibility Plan</h2><p className="aeo-readingBody">Founder-led strategy, inspectable execution, and one commercial goal: become an answer your buyers can find and verify.</p></div>
    <div id="guarantee" className="aeo-pricingGuarantee"><div className="aeo-pricingGuaranteeMain"><p className="aeo-guaranteeLabel"><Check size={16} />90-day citation guarantee</p><h3 className="text-heading-2">{site.guarantee}</h3><p>{site.guaranteeTerms}</p></div><div className="aeo-pricingRisk"><p>Built-in risk reversal</p><ul>{["A 90-day initial term and an agreed prompt baseline", "Direct work with Sai, your systems architect", "You keep every page, schema update, and asset we ship"].map(item => <li className="flex gap-3" key={item}><Check size={18} className="text-action flex-shrink-0 mt-1" /><span>{item}</span></li>)}</ul></div></div>
    <div className="aeo-plans">{plans.map(plan => <article className={`aeo-plan${plan.id === "scale" ? " aeo-featuredPlan" : ""}`} key={plan.id} id={plan.id}>
      <div className="aeo-planHeader"><h3 className="text-heading-3">{plan.name}</h3><span className="aeo-planBadge">{plan.badge}</span></div>
      <p className="aeo-planPrice">{plan.id === "enterprise" && <span className="text-ink-500">From </span>}<strong className="text-heading-1">${plan.price.toLocaleString("en-US")}</strong><span className="text-ink-500"> /month</span></p>
      <p className="aeo-planTerm">90-day initial term · billed monthly</p><p className="aeo-planSummary">{plan.summary}</p>
      <ul className="aeo-planDeliverables">{plan.deliverables.map(item => <li key={item}><Check size={17} className="flex-shrink-0 mt-1" /><span>{item}</span></li>)}</ul>
      <details className="deliverables-details"><summary>See full deliverables</summary><ul>{plan.technical.map(item => <li key={item}>{item}</li>)}</ul></details>
      <div className="aeo-planActions"><Link className="btn-primary" href={`/checkout?plan=${plan.id}`}>{plan.id === "enterprise" ? "Scope Enterprise" : `Start ${plan.name}`}</Link><CalPopupButton className="aeo-planDetailLink">Discuss this plan with Sai</CalPopupButton></div>
    </article>)}</div>
    <div className="aeo-pricingDifference"><h3 className="text-heading-2">Service-as-a-Software. Founder-operated.</h3><div><p>You work directly with {site.founder.name}. Custom automation supports research, checks, content workflows, and reporting. Sai owns the architecture, reviews the claims, and stays accountable for what ships.</p><p>We agree on access, approval deadlines, and the scope before work begins. Every week, you can inspect the work, the evidence, and the next priorities.</p></div></div>
    <div className="aeo-pricingCall"><div><h3 className="text-heading-2">Find the right starting point</h3><p>A focused audit identifies the technical gaps and buyer questions your program should address first.</p></div><div className="aeo-pricingCallAction"><Link href="/free-aeo-report" className="btn-primary">Run Your Free AEO Report</Link></div></div>
  </div></section>;
}
