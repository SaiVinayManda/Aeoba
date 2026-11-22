import { notFound } from "next/navigation";
import { CallToAction, Deliverables, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { PromptPlanner } from "@/components/interactive/Workbenches";
import { playbooks } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return playbooks.map(playbook => ({ slug: playbook.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const study = playbooks.find(item => item.slug === slug); if (!study) notFound(); return pageMetadata(study.title, study.description, `/case-studies/${slug}`); }
export default async function CaseStudyPage({ params }: Props) { const { slug } = await params; const study = playbooks.find(item => item.slug === slug); if (!study) notFound(); return <><PageHero eyebrow="Illustrative implementation · not client results" title={study.title} description={study.description} parent={{ label: "Case Studies", href: "/case-studies" }} /><PageSection title="The buyer problem"><p className="native-copy">{study.challenge}</p><div className="founder-note"><p className="eyebrow">A representative buyer question</p><h3>{study.prompt}</h3></div></PageSection><PageSection title="What Aeoba would build"><Deliverables items={study.work} /></PageSection><PageSection title="What we would inspect before calling it a result"><Deliverables items={study.evidence} /><p className="native-note">No performance numbers are attached to this demonstration. Real campaign reporting requires a dated baseline and actual observations.</p></PageSection><PageSection><PromptPlanner offering={study.sector.toLowerCase()} /></PageSection><CallToAction /></>; }
