import { PageHero, PageSection } from "@/components/aeoba/PageSections";
import { EnquiryForm } from "@/components/interactive/Forms";
import { PortalLogin } from "@/components/interactive/Portal";
import { pageMetadata } from "@/lib/metadata";
import { portalConfigured } from "@/server/auth";
export const dynamic = "force-dynamic";
export const metadata = { ...pageMetadata("Client Portal", "Sign in to your Aeoba workspace, request access from Aeoba, or explore the demo.", "/login"), robots: { index: false, follow: false } };
export default function LoginPage() { return <><PageHero eyebrow="Aeoba client portal" title="Your work. Your evidence. One workspace." description="Private access is supplied by Aeoba. The public demo lets you explore the interface without client data." actions={false} /><PageSection><div className="native-grid-two"><PortalLogin configured={portalConfigured()} /><div id="request-access"><EnquiryForm kind="portal-access" /></div></div></PageSection></>; }
