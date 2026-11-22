import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { articles } from "@/content/resources";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; const article = articles.find(item => item.slug === slug); if (!article) notFound(); return pageMetadata(article.title, article.summary, `/resources/blog/${slug}`); }
export default async function ArticlePage({ params }: Props) { const { slug } = await params; const article = articles.find(item => item.slug === slug); if (!article) notFound(); return <><PageHero eyebrow={article.category} title={article.title} description={article.summary} parent={{ label: "Blog", href: "/resources/blog" }} actions={false} /><PageSection><div className="article-layout"><aside className="article-aside"><span className="native-badge">{article.minutes} min read</span><p>By {site.founder.name}<br />{site.founder.role}, {site.name}</p><time dateTime="2026-11-22">22 November 2026</time><strong>In this article</strong>{article.sections.map((section, index) => <Link href={`#section-${index + 1}`} key={section.heading}>{section.heading}</Link>)}<Link href="/resources/free-aeo-guide">Download the field guide →</Link></aside><article className="article-body">{article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</article></div></PageSection><CallToAction /></>; }
