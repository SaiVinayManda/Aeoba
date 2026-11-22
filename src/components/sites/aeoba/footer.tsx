import Link from "next/link";
import { Mail } from "lucide-react";
import { AeobaLogo } from "@/components/AeobaLogo";
import { CalPopupButton } from "@/components/CalBooking";
import { site } from "@/config/site";
import "./footer.css";

function FooterLinks({ links }: { links: readonly { label: string; href: string }[] }) {
  return <ul className="aeo-footer-links">{links.map(link => <li key={link.href}>
    <Link href={link.href}><span className="aeo-footer-arrow" aria-hidden="true">→</span><span>{link.label}</span></Link>
  </li>)}</ul>;
}

export function Footer() {
  return <footer className="aeo-footer bg-instrument on-dark">
    <div className="aeo-footer-inner">
      <div className="aeo-footer-grid">
        <div className="aeo-footer-brand">
          <Link href="/" className="aeo-footer-logo" aria-label={`${site.name} home`}><AeobaLogo /></Link>
          <p>Founder-led AEO, GEO, and SEO. Clear entities, useful answers, technical execution, and citation evidence—operated by the systems architect responsible for the work.</p>
          <address>{site.locations.map(location => <span key={location.city}>{location.label}</span>)}</address>
        </div>
        <div><h4>Explore</h4><FooterLinks links={site.footerLinks} /></div>
        <div><h4>Resources</h4><FooterLinks links={site.resourceLinks} /></div>
        <div className="aeo-footer-contact">
          <h4>Contact</h4>
          <a className="aeo-footer-email" href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" />{site.email}</a>
          <p>{site.founder.name} · {site.founder.role}</p>
          <CalPopupButton>Book a Strategy Call →</CalPopupButton>
          <Link href="/free-aeo-report">Free AEO Report →</Link>
          <Link href="/login">Client Portal →</Link>
        </div>
      </div>
      <div className="aeo-footer-callout">
        <p>Dominate <strong>AI Search</strong> before your competitors even know what hit them.</p>
        <CalPopupButton>Book a Strategy Call</CalPopupButton>
      </div>
      <div className="aeo-footer-legal">
        <p>{site.copyright}</p>
        <nav aria-label="Footer navigation"><Link href="/about">About {site.name}</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
      </div>
    </div>
  </footer>;
}
