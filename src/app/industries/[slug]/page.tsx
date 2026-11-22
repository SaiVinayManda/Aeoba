import { notFound } from "next/navigation";
import { CallToAction, Deliverables, FounderNote, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { PromptPlanner } from "@/components/interactive/Workbenches";
import { industries } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return industries.map(industry => ({ slug: industry.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const industry = industries.find(item => item.slug === slug); if (!industry) notFound(); return pageMetadata(`AEO & SEO for ${industry.title}`, industry.description, `/industries/${slug}`); }
export default async function IndustryPage({ params }: Props) { const { slug } = await params; const industry = industries.find(item => item.slug === slug); if (!industry) notFound(); return <><PageHero eyebrow={industry.title} title={`Become a useful answer for ${industry.title.toLowerCase()} buyers.`} description={industry.description} parent={{ label: "Industries", href: "/industries" }} /><PageSection title="Start with what changes the buying decision"><div className="native-grid-two"><div className="native-copy"><p>Your audience is {industry.audience}. The program begins with their real questions and the evidence your business can support.</p><p>We connect commercial pages, consistent organization and service entities, useful explanations, and a repeatable citation baseline. Industry-specific claims stay subject to your expert and compliance review.</p></div><Deliverables items={industry.priorities} /></div></PageSection><PageSection><PromptPlanner offering={industry.title.toLowerCase() + " services"} audience={industry.audience} topics={industry.topics} /></PageSection><PageSection><FounderNote /></PageSection><CallToAction /></>; }
