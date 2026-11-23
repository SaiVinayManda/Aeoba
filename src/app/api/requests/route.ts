import { allowRequest, objectBody, readJson, sameOrigin } from "@/server/http";
import { saveRequest, validateSubmission } from "@/server/requests";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Submit this form from the Aeoba website." }, { status: 403 });
  if (!allowRequest(request, "enquiry", 8)) return Response.json({ error: "Too many requests. Please try again in 15 minutes." }, { status: 429 });
  let data;
  try { const input = objectBody(await readJson(request)); if (input.fax) return Response.json({ error: "This request could not be accepted." }, { status: 400 }); data = validateSubmission(input); } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Check the form details." }, { status: 400 }); }
  try { const saved = await saveRequest(data); return Response.json({ id: saved.id, status: "saved" }, { status: 201 }); } catch { return Response.json({ error: "Your request could not be saved. Please contact Aeoba using the email shown below." }, { status: 503 }); }
}
