import { CallToAction, ContentCard, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { industries } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Industries", "AEO and SEO programs shaped around the questions buyers ask in your industry.", "/industries");
export default function IndustriesPage() { return <><PageHero eyebrow="Industries" title="Different buying decisions. The same demand for evidence." description="A useful AI answer depends on the question, the audience, and the facts that change a decision. Build the program around your market's actual requirements." /><PageSection title="Find your buyer context"><div className="native-grid">{industries.map(industry => <ContentCard key={industry.slug} href={`/industries/${industry.slug}`} title={industry.title} description={industry.description} />)}</div></PageSection><CallToAction /></>; }
