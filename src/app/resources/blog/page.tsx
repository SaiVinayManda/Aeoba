import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { ArticleLibrary } from "@/components/interactive/Resources";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("AEO Blog", "Original Aeoba articles on buyer-intent prompts, consistent schema, citation evidence, and relevant authority.", "/resources/blog");
export default function BlogPage() { return <><PageHero eyebrow="The Aeoba blog" title="Field notes for the answer era." description="Original, practical writing about the systems behind AI visibility. Search by topic or choose a category." parent={{ label: "Resources", href: "/resources" }} /><PageSection><ArticleLibrary /></PageSection><CallToAction /></>; }
