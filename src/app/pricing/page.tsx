import { FaqSection, PageHero } from "@/components/aeoba/PageSections";
import { Pricing } from "@/components/sites/aeoba/pricing";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Pricing & Citation Guarantee", "Explore Aeoba Growth, Scale, and Enterprise programs, the 90-day initial term, and the citation guarantee.", "/pricing");
export default function PricingPage() { return <><PageHero eyebrow="Pricing" title="An inspectable program. A clear investment." description="Choose a starting scope, expand the technical deliverables, and review the guarantee before requesting onboarding. No payment is collected on this website." actions={false} /><Pricing /><FaqSection path="/pricing" /></>; }
