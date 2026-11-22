import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { requestKinds, type AeobaRequest, type RequestKind } from "@/lib/request-types";
import { objectBody } from "@/server/http";

function text(value: unknown, limit: number) { return typeof value === "string" ? value.trim().slice(0, limit) : ""; }
export function validateSubmission(input: unknown): Omit<AeobaRequest, "id" | "createdAt"> {
  const data = objectBody(input), kind = text(data.kind, 30) as RequestKind;
  if (!requestKinds.includes(kind)) throw new Error("Choose a valid request type.");
  const email = text(data.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
  const websiteInput = text(data.website, 1500); let website = "";
  if (websiteInput) {
    let parsed: URL;
    try { parsed = new URL(websiteInput.includes("://") ? websiteInput : `https://${websiteInput}`); } catch { throw new Error("Enter a valid website URL."); }
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error("Use a website URL without credentials.");
    website = parsed.href;
  }
  const prompts = Array.isArray(data.prompts) ? data.prompts.slice(0, 2).map(value => text(value, 500)).filter(Boolean) : [];
  const message = text(data.message, 4000), name = text(data.name, 120), plan = text(data.plan, 30);
  if (kind === "report" && (!website || !prompts.length)) throw new Error("Add your website and at least one buyer prompt.");
  if ((kind === "contact" || kind === "career") && message.length < 10) throw new Error("Add a short message so Sai can understand your enquiry.");
  if (kind === "onboarding" && !["growth", "scale", "enterprise"].includes(plan)) throw new Error("Choose a valid plan.");
  return { kind, email, name, website, prompts, message, plan };
}

// Request records are runtime data on the configured persistent volume. They
// must not be traced or copied into a production build artifact.
function dataPath() { return path.resolve(/* turbopackIgnore: true */ process.env.AEOBA_DATA_DIR || path.join(process.cwd(), ".data")); }
export async function saveRequest(data: Omit<AeobaRequest, "id" | "createdAt">) {
  const record: AeobaRequest = { ...data, id: randomUUID(), createdAt: new Date().toISOString() };
  const dir = dataPath(); await mkdir(dir, { recursive: true, mode: 0o700 });
  await appendFile(path.join(dir, "requests.jsonl"), `${JSON.stringify(record)}\n`, { encoding: "utf8", mode: 0o600 });
  return record;
}

export async function readRequests(): Promise<AeobaRequest[]> {
  let source: string;
  try { source = await readFile(path.join(dataPath(), "requests.jsonl"), "utf8"); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
  const records: AeobaRequest[] = [];
  for (const line of source.split("\n").filter(Boolean)) {
    try { const data = objectBody(JSON.parse(line)); if (typeof data.id === "string" && typeof data.createdAt === "string") records.push({ ...validateSubmission(data), id: data.id, createdAt: data.createdAt }); } catch { /* Ignore an incomplete final write rather than exposing a damaged record. */ }
  }
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 500);
}
