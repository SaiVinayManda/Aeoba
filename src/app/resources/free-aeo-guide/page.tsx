import { CallToAction, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { GuideNavigator } from "@/components/interactive/Resources";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Free AEO Field Guide", "Seven practical Aeoba chapters on buyer prompts, technical foundations, useful answers, schema, authority, and measurement.", "/resources/free-aeo-guide");
export default function GuidePage() { return <><PageHero eyebrow="The Aeoba AEO field guide" title="Build an answer system you can inspect." description="Seven chapters, seven practical actions. Work through the guide in your browser or download the complete Markdown edition without an email gate." parent={{ label: "Resources", href: "/resources" }} actions={false} /><PageSection><GuideNavigator /></PageSection><CallToAction /></>; }
