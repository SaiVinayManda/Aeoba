"use client";
import Link from "next/link";
export default function PageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="native-container native-section"><p className="eyebrow">Aeoba</p><h1 className="text-heading-1">This page could not finish loading.</h1><p className="native-note">Try again, or return to a working Aeoba page.</p><div className="native-actions"><button className="btn-primary" onClick={reset}>Try again</button><Link className="btn-secondary-strong" href="/">Return home</Link></div></div>; }
