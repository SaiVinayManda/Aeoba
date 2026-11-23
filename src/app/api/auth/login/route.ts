import { cookies } from "next/headers";
import { createSession, portalConfigured, sessionCookie, sessionSeconds, validCredentials } from "@/server/auth";
import { allowRequest, objectBody, readJson, sameOrigin } from "@/server/http";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Sign in from the Aeoba website." }, { status: 403 });
  if (!allowRequest(request, "login", 6)) return Response.json({ error: "Too many attempts. Please try again in 15 minutes." }, { status: 429 });
  if (!portalConfigured()) return Response.json({ error: "Portal sign-in is invitation only. Request access from Aeoba or explore the demo workspace." }, { status: 503 });
  try {
    const data = objectBody(await readJson(request, 2500));
    if (typeof data.email !== "string" || typeof data.password !== "string" || !validCredentials(data.email.trim(), data.password)) return Response.json({ error: "Those sign-in details were not recognized." }, { status: 401 });
    (await cookies()).set(sessionCookie, createSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionSeconds });
    return Response.json({ redirect: "/portal" });
  } catch { return Response.json({ error: "Your sign-in request could not be processed." }, { status: 400 }); }
}
