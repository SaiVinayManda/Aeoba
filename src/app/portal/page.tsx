import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PortalWorkspace } from "@/components/interactive/Portal";
import { pageMetadata } from "@/lib/metadata";
import { readSession, sessionCookie } from "@/server/auth";
import { readRequests } from "@/server/requests";
export const dynamic = "force-dynamic";
export const metadata = { ...pageMetadata("Private Workspace", "Private Aeoba operator workspace.", "/portal"), robots: { index: false, follow: false } };
export default async function PortalPage() { if (!readSession((await cookies()).get(sessionCookie)?.value)) redirect("/login"); return <PortalWorkspace records={await readRequests()} />; }
