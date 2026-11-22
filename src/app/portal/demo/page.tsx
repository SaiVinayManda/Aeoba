import { PortalWorkspace } from "@/components/interactive/Portal";
import type { AeobaRequest } from "@/lib/request-types";
import { pageMetadata } from "@/lib/metadata";
export const metadata = { ...pageMetadata("Demo Workspace", "Explore a clearly labelled Aeoba workspace demo with fictional sample enquiries.", "/portal/demo"), robots: { index: false, follow: false } };
const records: AeobaRequest[] = [
  { id: "DEMO-001", createdAt: "2026-11-22T09:00:00.000Z", kind: "report", email: "sample@example.invalid", name: "Sample request", website: "", prompts: ["How should a buyer compare providers in this category?"], message: "Fictional example for exploring the interface.", plan: "" },
  { id: "DEMO-002", createdAt: "2026-11-21T09:00:00.000Z", kind: "onboarding", email: "sample@example.invalid", name: "Sample onboarding", website: "", prompts: [], message: "Demonstration of a Growth scope enquiry. No transaction occurred.", plan: "growth" },
];
export default function DemoPortalPage() { return <PortalWorkspace demo records={records} />; }
