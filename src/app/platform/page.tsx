import Link from "next/link";
import { CallToAction, ContentCard, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { platformFeatures } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("The Aeoba Platform", "Explore agency-operated workflows for entities, content, technical SEO, authority, and AI citation measurement.", "/platform");
export default function PlatformPage() {
  const groups = [...new Set(platformFeatures.map(feature => feature.category))];
  return <><PageHero eyebrow="The Aeoba Platform" title="A connected system for becoming the answer." description="Explore the workflows behind your program. Try the native planning and tracking tools, then connect the work to one commercial prompt set." /><PageSection><nav className="source-pills" aria-label="Platform categories">{groups.map(group => <Link key={group} href={`#${group.toLowerCase().replaceAll(" ", "-")}`}>{group}</Link>)}</nav><p className="native-copy">Aeoba is an agency-operated service with interactive workbenches. The tools help you prepare briefs, inspect facts, and keep observations. Managed execution and live engine checks are scoped with Aeoba.</p></PageSection>{groups.map(group => <PageSection key={group} id={group.toLowerCase().replaceAll(" ", "-")} title={group}><div className="native-grid">{platformFeatures.filter(feature => feature.category === group).map(feature => <ContentCard key={feature.slug} href={`/platform/${feature.slug}`} title={feature.title} description={feature.description} />)}</div></PageSection>)}<CallToAction /></>;
}
