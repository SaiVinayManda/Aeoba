export interface ReadinessCheck { id: string; label: string; passed: boolean; detail: string }
export interface ReadinessResult { url: string; fetchedAt: string; title: string; description: string; canonical: string; h1Count: number; schemaTypes: string[]; checks: ReadinessCheck[] }
