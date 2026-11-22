import { cookies } from "next/headers";
import { sessionCookie } from "@/server/auth";
import { sameOrigin } from "@/server/http";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Sign out from the Aeoba website." }, { status: 403 });
  (await cookies()).delete(sessionCookie);
  return Response.json({ redirect: "/login" });
}
