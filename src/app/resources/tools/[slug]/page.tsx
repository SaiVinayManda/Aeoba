import { notFound } from "next/navigation";
import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { PromptPlanner } from "@/components/interactive/Workbenches";
import { ReadinessScanner } from "@/components/interactive/ReadinessScanner";
import { RoiCalculator } from "@/components/interactive/RoiCalculator";
import { freeTools } from "@/config/tools";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return freeTools.map(tool => ({ slug: tool.slug })); }
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const tool = freeTools.find(item => item.slug === slug); if (!tool) notFound(); return pageMetadata(tool.title, tool.description, `/resources/tools/${slug}`); }
export default async function ToolPage({ params, searchParams }: Props) { const { slug } = await params; const tool = freeTools.find(item => item.slug === slug); if (!tool) notFound(); const query = await searchParams; const initialUrl = typeof query.url === "string" ? query.url.slice(0, 2000) : ""; return <><PageHero eyebrow="Free Aeoba tool" title={tool.title} description={tool.description} parent={{ label: "Free Tools", href: "/resources/tools" }} actions={false} /><PageSection>{slug === "aeo-roi-calculator" ? <RoiCalculator /> : <ReadinessScanner initialUrl={initialUrl} geo={slug === "geo-audit"} />}</PageSection>{slug === "geo-audit" && <PageSection title="Connect technical findings with buyer questions"><PromptPlanner /></PageSection>}</>; }
