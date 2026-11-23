import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { GuideNavigator } from "@/components/interactive/Resources";
import { pageMetadata } from "@/lib/metadata";
import { guideChapters } from "@/content/resources";
import { contentDates } from "@/config/content-dates";
import { JsonLd } from "@/components/aeoba/StructuredData";
import { editorialSchema } from "@/lib/structured-data";
import { site } from "@/config/site";

const title = "Free AEO Field Guide";
const description = "Seven practical Aeoba chapters on buyer prompts, technical foundations, useful answers, schema, authority, and measurement.";
const path = "/resources/free-aeo-guide";
const questions = ["How do you choose buyer questions for AEO?", "How do you establish an AI citation baseline?", "Which technical foundations should you fix first?", "How do you publish useful answer-engine content?", "How should you represent business facts in schema?", "How do you earn relevant third-party references?", "How do you review AEO progress and choose the next action?"];
const baseMetadata = pageMetadata(title, description, path);
export const metadata = { ...baseMetadata, authors: [{ name: site.name, url: site.url }], openGraph: { ...baseMetadata.openGraph, type: "article" as const, publishedTime: contentDates.published, modifiedTime: contentDates.updated, authors: [site.name] } };

export default function GuidePage() {
  return <>
    <JsonLd value={editorialSchema({ path, title, description, published: contentDates.published, modified: contentDates.updated })} />
    <PageHero eyebrow="The Aeoba AEO field guide" title="Build an answer system you can inspect." description="Seven chapters, seven practical actions. Work through the guide in your browser or download the complete Markdown edition without an email gate." parent={{ label: "Resources", href: "/resources" }} actions={false} />
    <PageSection><GuideNavigator /></PageSection>
    <PageSection title="The complete AEO field guide"><article className="article-body blog-article">
      <p>By {site.name}. Updated <time dateTime={contentDates.updated}>23 November 2026</time>.</p>
      {guideChapters.map((chapter, index) => <section id={`chapter-${index + 1}`} key={chapter.title}><h2>{questions[index]}</h2><p>{chapter.body} {chapter.task}</p></section>)}
    </article></PageSection>
    <CallToAction />
  </>;
}
