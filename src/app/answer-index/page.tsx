import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { CitationTracker } from "@/components/interactive/Workbenches";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("The Aeoba Answer Index", "Create a dated, source-linked citation baseline from actual AI answers and save or export your observations.", "/answer-index");
export default function AnswerIndexPage() { return <><PageHero eyebrow="The Aeoba Answer Index" title="A citation baseline you can actually inspect." description="Keep the exact prompt, engine, answer excerpt, and source together. This is your evidence workspace, not a published ranking study or an automated AI-engine feed." actions={false} /><PageSection><CitationTracker /></PageSection></>; }
