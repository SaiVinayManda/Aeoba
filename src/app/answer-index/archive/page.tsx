import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { CitationTracker } from "@/components/interactive/Workbenches";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Citation Archive", "Restore your locally saved Aeoba citation observations, filter engines, and export the evidence.", "/answer-index/archive");
export default function ArchivePage() { return <><PageHero eyebrow="Your citation archive" title="Review the evidence you chose to keep." description="Restore the observations saved on this browser, filter them by engine, or export your records. An empty archive means no observations have been saved here." parent={{ label: "Answer Index", href: "/answer-index" }} actions={false} /><PageSection><CitationTracker archive /></PageSection></>; }
