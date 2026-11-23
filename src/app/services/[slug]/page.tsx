import { notFound } from "next/navigation";
import { CallToAction, ContentCard, Deliverables, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { ScopePlanner } from "@/components/interactive/Workbenches";
import { platformFeatures, services } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, QuestionAnswers } from "@/components/aeoba/StructuredData";
import { serviceAnswers, serviceFaqs } from "@/content/seo-answers";
import { site } from "@/config/site";
export const dynamicParams = false;
export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const service = services.find(item => item.slug === slug); if (!service) notFound(); return pageMetadata(service.title, service.description, `/services/${slug}`); }
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  const features = platformFeatures.filter(feature => service.features.includes(feature.slug));
  const answer = serviceAnswers[slug];
  return <>
    <JsonLd value={{ "@context": "https://schema.org", "@type": "Service", "@id": `${site.url}/services/${slug}#service`, name: service.title, description: service.description, url: `${site.url}/services/${slug}`, provider: { "@id": `${site.url}/#organization` } }} />
    <PageHero eyebrow="Agency-led services" title={service.title} description={service.description} parent={{ label: "Services", href: "/services" }} />
    <article>
      <PageSection><div className="article-body"><h2>{answer.question}</h2><p>{answer.answer}</p></div></PageSection>
      <PageSection title="What this program resolves"><div className="native-grid-two"><p className="native-copy">{service.challenge}</p><Deliverables items={service.outcomes} /></div></PageSection>
      <PageSection><ScopePlanner /></PageSection>
      <PageSection title="Explore the underlying workflows"><div className="native-grid">{features.map(feature => <ContentCard key={feature.slug} href={`/platform/${feature.slug}`} title={feature.title} description={feature.description} />)}</div></PageSection>
      <QuestionAnswers path={`/services/${slug}`} items={serviceFaqs(slug, service.title)} />
    </article>
    <CallToAction />
  </>;
}
