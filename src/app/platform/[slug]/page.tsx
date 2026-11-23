import { notFound } from "next/navigation";
import { CallToAction, Deliverables, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { FeatureWorkbench } from "@/components/interactive/Workbenches";
import { platformFeatures } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return platformFeatures.map(feature => ({ slug: feature.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const feature = platformFeatures.find(item => item.slug === slug); if (!feature) notFound(); return pageMetadata(feature.title, feature.description, `/platform/${slug}`); }
export default async function PlatformFeaturePage({ params }: Props) {
  const { slug } = await params; const feature = platformFeatures.find(item => item.slug === slug); if (!feature) notFound();
  return <><PageHero eyebrow={feature.category} title={feature.title} description={feature.description} parent={{ label: "Platform", href: "/platform" }} /><PageSection title="Make the next decision easier."><div className="native-grid-two"><p className="native-copy">{feature.problem}</p><Deliverables items={feature.deliverables} /></div></PageSection><PageSection eyebrow="Try the workflow" title="Turn the idea into something reviewable."><FeatureWorkbench mode={feature.mode} /></PageSection><PageSection title="How Aeoba operates this for you"><div className="native-grid"><div className="native-card"><span className="card-number">01</span><h3>Baseline the facts</h3><p>Review the pages, evidence, access, and buyer questions relevant to {feature.title.toLowerCase()}. Keep assumptions visible.</p></div><div className="native-card"><span className="card-number">02</span><h3>Approve and execute</h3><p>Aeoba prioritizes the work, explains the reason, and ships approved changes with an inspectable record.</p></div><div className="native-card"><span className="card-number">03</span><h3>Verify and refine</h3><p>Check what changed, record the actual evidence, and select the next action in your weekly review.</p></div></div></PageSection><CallToAction /></>;
}
