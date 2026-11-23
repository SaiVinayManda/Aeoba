import { EnquiryForm } from "@/components/interactive/Forms";
import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Contact Aeoba", "Contact Aeoba to discuss your AI visibility, a strategy call, or an existing request.", "/contact");
export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) { const query = await searchParams; const subject = typeof query.subject === "string" ? query.subject.slice(0, 500) : ""; return <><PageHero eyebrow="Contact" title="Tell Aeoba what you want buyers to find." description="A clear offer, a useful website, and a few real buyer questions make a productive starting conversation." actions={false} /><PageSection><div className="native-grid-two"><div><h2 className="section-heading">Connect with Aeoba.</h2><p className="native-copy">{site.name}<br />Milan, Italy · Sliema, Malta</p><a className="native-text-link" href={`mailto:${site.email}`}>{site.email}</a></div><EnquiryForm subject={subject} /></div></PageSection></>; }
