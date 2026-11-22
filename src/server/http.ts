const attempts = new Map<string, { count: number; until: number }>();

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const url = new URL(request.url);
  // Next may construct an internal request URL with a different hostname.
  // Compare the browser origin with the actual incoming host and proxy scheme.
  const host = request.headers.get("host") || url.host;
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || url.protocol.slice(0, -1);
  return ["http", "https"].includes(protocol) && origin === `${protocol}://${host.toLowerCase()}`;
}

export function allowRequest(request: Request, bucket: string, limit: number, now = Date.now()) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = `${bucket}:${address}`;
  if (attempts.size > 5000) for (const [entry, value] of attempts) if (value.until <= now) attempts.delete(entry);
  const previous = attempts.get(key);
  const current = previous && previous.until > now ? previous : { count: 0, until: now + 15 * 60 * 1000 };
  current.count++; attempts.set(key, current);
  return current.count <= limit;
}

export async function readJson(request: Request, maxBytes = 12000): Promise<unknown> {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("Send a JSON request.");
  if (Number(request.headers.get("content-length") || 0) > maxBytes) throw new Error("The request is too large.");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("The request is empty.");
  const parts: Uint8Array[] = []; let bytes = 0;
  for (;;) {
    const result = await reader.read(); if (result.done) break;
    bytes += result.value.byteLength;
    if (bytes > maxBytes) { await reader.cancel(); throw new Error("The request is too large."); }
    parts.push(result.value);
  }
  try { return JSON.parse(Buffer.concat(parts).toString("utf8")) as unknown; } catch { throw new Error("The request is not valid JSON."); }
}

export function objectBody(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Enter the required details.");
  return value as Record<string, unknown>;
}
