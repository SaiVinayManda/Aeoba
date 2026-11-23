import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CalPopupButton } from "@/components/CalBooking";
import { site } from "@/config/site";

export function PageHero({ eyebrow, title, description, parent, actions = true }: { eyebrow: string; title: string; description: string; parent?: { label: string; href: string }; actions?: boolean }) {
  return <section className="native-hero"><div className="native-container">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">{site.name}</Link><span>/</span>{parent && <><Link href={parent.href}>{parent.label}</Link><span>/</span></>}<span aria-current="page">{eyebrow}</span></nav>
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="native-lead">{description}</p>
    {actions && <div className="native-actions"><Link href="/free-aeo-report" className="btn-primary">Run Your Free AEO Report<ArrowUpRight size={16} /></Link><CalPopupButton className="btn-secondary-strong">Book a Strategy Call</CalPopupButton></div>}
  </div></section>;
}

export function PageSection({ title, eyebrow, children, id }: { title?: string; eyebrow?: string; children: React.ReactNode; id?: string }) {
  return <section id={id} className="native-section"><div className="native-container">{eyebrow && <p className="eyebrow">{eyebrow}</p>}{title && <h2 className="section-heading">{title}</h2>}{children}</div></section>;
}

export function ContentCard({ href, title, description, label, index }: { href: string; title: string; description: string; label?: string; index?: number }) {
  return <Link className="native-card" href={href}>{label && <span className="eyebrow">{label}</span>}{index !== undefined && <span className="card-number">{String(index + 1).padStart(2, "0")}</span>}<div className="card-heading"><h3>{title}</h3><ArrowUpRight size={20} /></div><p>{description}</p><span className="native-text-link">Explore<ArrowUpRight size={14} /></span></Link>;
}

export function Deliverables({ items }: { items: readonly string[] }) {
  return <ul className="native-deliverables">{items.map(item => <li key={item}><Check size={18} /><span>{item}</span></li>)}</ul>;
}

export function CallToAction() {
  return <section className="native-section native-cta"><div className="native-container"><p className="eyebrow">Your next step</p><h2>Find the gap between your expertise and your AI visibility.</h2><p>Start with your website and the questions you want to be recommended for. Build the program around evidence.</p><div className="native-actions"><Link className="btn-primary" href="/free-aeo-report">Run Your Free AEO Report</Link><CalPopupButton className="btn-secondary-strong">Book a Strategy Call</CalPopupButton></div></div></section>;
}

export function FaqSection() {
  return <PageSection id="faq" eyebrow="Clear answers" title="Before we get started"><div className="native-faq">{site.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></PageSection>;
}
