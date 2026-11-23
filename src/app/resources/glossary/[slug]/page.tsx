import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { JsonLd } from "@/components/aeoba/StructuredData";
import { glossaryEntries } from "@/content/glossary";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() { return glossaryEntries.map(term => ({ slug: term.slug })); }
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const term = glossaryEntries.find(item => item.slug === slug);
  if (!term) notFound();
  return pageMetadata(`${term.title}: Definition & AEO Context`, term.definition, `/resources/glossary/${term.slug}`);
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryEntries.find(item => item.slug === slug);
  if (!term) notFound();
  return <>
    <JsonLd value={{ "@context": "https://schema.org", "@type": "DefinedTerm", "@id": `${site.url}/resources/glossary/${slug}#term`, name: term.title, alternateName: term.short, description: term.answer, url: `${site.url}/resources/glossary/${slug}`, inDefinedTermSet: `${site.url}/resources/glossary` }} />
    <PageHero eyebrow="AEO glossary" title={term.title} description={term.definition} parent={{ label: "Glossary", href: "/resources/glossary" }} actions={false} />
    <PageSection><article className="article-body blog-article"><h2>{term.question}</h2><p>{term.answer}</p>
      <dl><dt>Term</dt><dd>{term.title} ({term.short})</dd><dt>Definition</dt><dd>{term.definition}</dd></dl>
      <section><h2>How can you apply this to your website?</h2><p>Use the <Link href="/resources/free-aeo-guide">AEO field guide</Link> to connect this concept to buyer questions, technical checks, and evidence. Explore <Link href="/services/technical-aeo">Technical AEO</Link> for implementation, or request the <Link href="/free-aeo-report">Free AEO Report</Link> to identify a useful starting point.</p></section>
      <section><h2>Related definitions</h2><ul>{glossaryEntries.filter(item => item.slug !== slug).map(item => <li key={item.slug}><Link href={`/resources/glossary/${item.slug}`}>{item.title}</Link></li>)}</ul></section>
    </article></PageSection><CallToAction />
  </>;
}
