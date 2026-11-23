import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { ArticleContent, ArticleText } from "@/components/aeoba/ArticleContent";
import { articles } from "@/content/resources";
import { articleMetadata, articleSchema } from "@/lib/articles";
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return articleMetadata(article);
}

const formatDate = (date: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article)).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow={article.category} title={article.title} description={article.summary} parent={{ label: "Blog", href: "/resources/blog" }} actions={false} />
    <PageSection><div className="article-layout">
      <aside className="article-aside">
        <span className="native-badge">{article.minutes} min read</span>
        <p>By <Link href="/about#research">{article.author}</Link></p>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        {article.modifiedAt !== article.publishedAt && <span>Updated <time dateTime={article.modifiedAt}>{formatDate(article.modifiedAt)}</time></span>}
        <strong>In this article</strong>
        {article.sections.map((section, index) => <Link href={`#section-${index + 1}`} key={section.heading}>{section.heading}</Link>)}
        <Link href="#faq">Frequently asked questions</Link>
        <Link href="/free-aeo-report">Get your Free AEO Report</Link>
        <Link href="/resources/free-aeo-guide">Download the field guide</Link>
      </aside>
      <article className="article-body blog-article">
        <p className="article-hook"><ArticleText text={article.hook} /></p>
        {article.sections.map((section, index) => <ArticleContent section={section} id={`section-${index + 1}`} key={section.heading} />)}
        <section id="faq">
          <h2>Frequently asked questions</h2>
          {article.faq.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
        </section>
      </article>
    </div></PageSection>
    <CallToAction />
  </>;
}
