import { allowRequest, objectBody, readJson, sameOrigin } from "@/server/http";
import { scanWebsite } from "@/server/readiness";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Run the check from the Aeoba website." }, { status: 403 });
  if (!allowRequest(request, "readiness", 12)) return Response.json({ error: "Please wait 15 minutes before running more checks." }, { status: 429 });
  try { const data = objectBody(await readJson(request, 3000)); if (typeof data.url !== "string" || data.url.length > 2000 || !data.url.trim()) throw new Error("Enter your public website URL."); return Response.json(await scanWebsite(data.url.trim())); } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "The website could not be checked." }, { status: 422 }); }
}
