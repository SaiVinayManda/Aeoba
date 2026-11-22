import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { GlossarySearch } from "@/components/interactive/Resources";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("AEO Glossary", "Search Aeoba's definitions of entities, citations, schema, buyer intent, crawlability, and AI search measurement.", "/resources/glossary");
export default function GlossaryPage() { return <><PageHero eyebrow="AEO glossary" title="Clear definitions. More useful conversations." description="Search a term, expand the definition, and connect it to the practical work in your program." parent={{ label: "Resources", href: "/resources" }} /><PageSection><GlossarySearch /></PageSection></>; }
