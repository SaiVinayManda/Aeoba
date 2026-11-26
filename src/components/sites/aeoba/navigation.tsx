"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ChevronDown, Menu, X } from "lucide-react";
import { AeobaLogo } from "@/components/AeobaLogo";
import { CalPopupButton } from "@/components/CalBooking";
import { navigationMenus as menus, type NavGroup, type NavMenu } from "@/config/navigation";

function MenuGroups({ groups, onNavigate }: { groups: NavGroup[]; onNavigate: () => void }) {
  return <div className="nav-groups">{groups.map((group, index) => <div className="nav-group" key={group.title ?? index}>
    {group.title && <p className="nav-group-title">{group.title}</p>}
    {group.links.map(item => <Link className="dropdown-link" key={item.href} href={item.href} onNavigate={onNavigate}>{item.label}{item.description && <small>{item.description}</small>}</Link>)}
  </div>)}</div>;
}

export function Navigation() {
  const [announcement, setAnnouncement] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const closeNavigation = () => { setActiveMenu(null); setMobileOpen(false); };

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!header.current?.contains(event.target as Node)) setActiveMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setActiveMenu(null); setMobileOpen(false); } };
    document.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", escape); if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => { setActiveMenu(null); setMobileOpen(false); });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const open = (slug: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveMenu(slug); };
  const close = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 150); };
  const renderMenu = (menu: NavMenu) => <div key={menu.slug} className="nav-item" onMouseEnter={() => open(menu.slug)} onMouseLeave={close}>
    {menu.slug === "resources" ? <button className="nav-trigger" aria-expanded={activeMenu === menu.slug} aria-controls={`nav-${menu.slug}`} onClick={() => open(menu.slug)}>{menu.label}<ChevronDown size={16} /></button> : <Link className="nav-trigger" href={`/${menu.slug}`} aria-expanded={activeMenu === menu.slug} aria-controls={`nav-${menu.slug}`} onNavigate={closeNavigation} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); open(menu.slug); } }}>{menu.label}<ChevronDown size={16} /></Link>}
    {activeMenu === menu.slug && <div id={`nav-${menu.slug}`} className={`nav-dropdown nav-dropdown-${menu.slug}`}><MenuGroups groups={menu.groups} onNavigate={closeNavigation} />{menu.slug === "platform" && <div className="nav-dropdown-footer"><Link href="/platform" onNavigate={closeNavigation}>View All Platform Features ›</Link></div>}</div>}
  </div>;

  return <>
    <Link className="skip-link" href="#main-content">Skip to main content</Link>
    {announcement && <div className="announcement" role="region" aria-label="Answer Index announcement">
      <Link href="/answer-index"><span className="announcement-long">The Aeoba Answer Index: keep your buyer prompts, AI answers, and citation evidence in one place.</span><span className="announcement-short">Explore the Aeoba Answer Index. →</span></Link>
      <button aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={16} /></button>
    </div>}
    <header ref={header} className="site-header"><div className="header-inner">
      <Link className="header-brand" href="/" onNavigate={closeNavigation}><AeobaLogo /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{menus.slice(0, 3).map(renderMenu)}<Link className="nav-direct" href="/case-studies" onNavigate={closeNavigation}>Case Studies</Link><Link className="nav-direct" href="/pricing" onNavigate={closeNavigation}>Pricing</Link>{renderMenu(menus[3])}</nav>
      <div className="header-actions"><Link className="header-login" href="/login" onNavigate={closeNavigation}>Login</Link><CalPopupButton className="header-cta" onNavigate={closeNavigation}>Book a Strategy Call</CalPopupButton></div>
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={28} /> : <Menu size={28} />}</button>
    </div>{mobileOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{menus.slice(0, 3).map(menu => <details name="mobile-site-menu" key={menu.slug}><summary>{menu.label}<ChevronDown size={20} /></summary><MenuGroups groups={menu.groups} onNavigate={closeNavigation} />{menu.slug === "platform" && <Link className="mobile-platform-all" href="/platform" onNavigate={closeNavigation}>View All Platform Features →</Link>}</details>)}<Link className="mobile-direct" href="/case-studies" onNavigate={closeNavigation}>Case Studies</Link><Link className="mobile-direct" href="/pricing" onNavigate={closeNavigation}>Pricing</Link><details name="mobile-site-menu"><summary>Resources<ChevronDown size={20} /></summary><MenuGroups groups={menus[3].groups} onNavigate={closeNavigation} /></details><Link className="header-login" href="/login" onNavigate={closeNavigation}>Login</Link><CalPopupButton className="header-cta" onNavigate={closeNavigation}>Book a Strategy Call</CalPopupButton></nav>}</header>
  </>;
}

export function ScrollControls() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <><div className="scroll-progress" style={{ width: `${progress}%` }} />{progress > 8 && <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={20} /></button>}</>;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => { try { setVisible(!localStorage.getItem("aeoba-consent")); } catch { setVisible(true); } });
    return () => cancelAnimationFrame(frame);
  }, []);
  const choose = (choice: string) => { try { localStorage.setItem("aeoba-consent", choice); } catch { /* Storage is optional. */ } setVisible(false); };
  if (!visible) return null;
  return <aside className="cookie-banner" aria-labelledby="cookie-heading"><p className="cookie-heading" id="cookie-heading">Your privacy</p><p className="cookie-description">Tools save your work on this device only when you choose to save it. The booking page loads our scheduling provider. Read our <Link href="/privacy">privacy policy</Link>.</p><div className="cookie-actions"><button className="cookie-accept" onClick={() => choose("acknowledged")}>Got it</button><button className="cookie-decline" onClick={() => choose("dismissed")}>Dismiss</button></div></aside>;
}
