import { CallToAction, ContentCard, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { ScopePlanner } from "@/components/interactive/Workbenches";
import { services } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("AEO, GEO & SEO Services", "Agency-led technical SEO, structured data, content, authority, and citation analytics from Aeoba.", "/services");
export default function ServicesPage() { return <><PageHero eyebrow="Services" title="One accountable agency. A connected visibility program." description="Start with a specific commercial need. Connect technical foundations, useful answers, and independent evidence rather than commissioning disconnected activity." /><PageSection title="Choose your starting point"><div className="native-grid">{services.map(service => <ContentCard key={service.slug} href={`/services/${service.slug}`} title={service.title} description={service.description} />)}</div></PageSection><PageSection><ScopePlanner /></PageSection><CallToAction /></>; }
