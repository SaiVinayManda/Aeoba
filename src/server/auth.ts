import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { site } from "@/config/site";

export const sessionCookie = "aeoba-session";
export const sessionSeconds = 8 * 60 * 60;
export function portalConfigured() { return (process.env.AEOBA_PORTAL_PASSWORD || "").length >= 16 && (process.env.AEOBA_SESSION_SECRET || "").length >= 32; }
const operatorEmail = () => (process.env.AEOBA_PORTAL_EMAIL || site.email).toLowerCase();

export function validCredentials(email: string, password: string) {
  if (!portalConfigured()) return false;
  const actual = createHash("sha256").update(password).digest(), expected = createHash("sha256").update(process.env.AEOBA_PORTAL_PASSWORD || "").digest();
  const match = timingSafeEqual(actual, expected);
  return match && email.toLowerCase() === operatorEmail();
}

export function createSession(now = Date.now()) {
  if (!portalConfigured()) throw new Error("Portal access is not configured.");
  const payload = Buffer.from(JSON.stringify({ email: operatorEmail(), expires: now + sessionSeconds * 1000, nonce: randomUUID() })).toString("base64url");
  const signature = createHmac("sha256", process.env.AEOBA_SESSION_SECRET || "").update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSession(token: string | undefined, now = Date.now()): { email: string } | null {
  if (!token || token.length > 2000 || !portalConfigured()) return null;
  const parts = token.split("."); if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const actual = Buffer.from(signature, "base64url"), expected = createHmac("sha256", process.env.AEOBA_SESSION_SECRET || "").update(payload).digest();
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Record<string, unknown>;
    if (data.email !== operatorEmail() || typeof data.expires !== "number" || data.expires <= now || data.expires > now + sessionSeconds * 1000) return null;
    return { email: data.email as string };
  } catch { return null; }
}
