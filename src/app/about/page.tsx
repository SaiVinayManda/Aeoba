import { CallToAction, Deliverables, PageHero, PageSection } from "@/components/aeoba/PageSections";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About Aeoba", "Aeoba is an AEO, GEO, and SEO agency operating from Milan, Italy and Sliema, Malta.", "/about");

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About Aeoba" title="The agency building your AI search visibility." description="Aeoba connects technical SEO, clear entities, useful content, and citation measurement in one accountable operating system." />
    <PageSection id="research">
      <h2 className="section-heading">Service-as-a-Software, operated by Aeoba.</h2>
      <p className="native-copy">The interface makes the work visible. The Aeoba Strategy Team supplies judgment, implementation, and accountability. Our agency combines research, technical execution, content workflows, and weekly reporting around your commercial priorities.</p>
      <p className="native-copy">Aeoba Research publishes our practical guides to AEO, GEO, technical search, and citation measurement.</p>
      <Deliverables items={["A commercial prompt baseline agreed together", "Human approval of substantive claims and priorities", "Technical and content changes you can inspect", "Weekly evidence, decisions, and next actions"]} />
    </PageSection>
    <PageSection id="locations" title="Milan, Italy ? Sliema, Malta">
      <div className="native-grid-two">{site.locations.map(location => <div className="native-card" key={location.city}>
        <span className="eyebrow">Aeoba ? {location.country}</span><h3>{location.city}</h3>
        <p>Aeoba operates from {location.label}, connected through a shared execution and reporting rhythm.</p>
      </div>)}</div>
      <p className="native-note">Contact <a href={"mailto:" + site.email}>{site.email}</a> to discuss your project.</p>
    </PageSection>
    <CallToAction />
  </>;
}
