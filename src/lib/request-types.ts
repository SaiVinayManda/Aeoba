export const requestKinds = ["report", "contact", "onboarding", "career", "portal-access"] as const;
export type RequestKind = typeof requestKinds[number];
export interface AeobaRequest { id: string; createdAt: string; kind: RequestKind; email: string; name: string; website: string; prompts: string[]; message: string; plan: string }
