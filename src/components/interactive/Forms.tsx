"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { site } from "@/config/site";
import type { RequestKind } from "@/lib/request-types";

async function submitRequest(payload: Record<string, unknown>) {
  const response = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
  const result = await response.json() as { id?: string; error?: string };
  if (!response.ok || !result.id) throw new Error(result.error || "The request could not be saved.");
  return result.id;
}

function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input tabIndex={-1} autoComplete="off" name="fax" value={value} onChange={event => onChange(event.target.value)} /></label></div>;
}

function Confirmation({ id, kind, website }: { id: string; kind: RequestKind; website?: string }) {
  return <div className="confirmation" role="status"><span className="native-badge"><Check size={14} /> Request saved</span><h2>{kind === "report" ? "Your AEO report request is recorded." : "Your enquiry is recorded."}</h2><p>Sai can review your details and follow up by email. This confirmation records your request; it does not mean an email has already been sent.</p><p>Reference: <code>{id}</code></p>{kind === "onboarding" && <p>This is an onboarding enquiry. No payment has been taken.</p>}<div className="native-actions"><Link className="btn-primary" href={kind === "report" && website ? `/resources/tools/ai-visibility-checker?url=${encodeURIComponent(website)}` : "/book-call"}>{kind === "report" ? "Run instant homepage checks" : "Book a Strategy Call"}</Link><Link className="btn-secondary-strong" href="/resources/free-aeo-guide">Read the AEO guide</Link></div><p className="native-note">Need to add something? Contact <a href={`mailto:${site.email}`}>{site.email}</a> and include your reference.</p></div>;
}

export function ReportForm() {
  const [step, setStep] = useState(1), [website, setWebsite] = useState(""), [prompt, setPrompt] = useState(""), [secondPrompt, setSecondPrompt] = useState(""), [email, setEmail] = useState(""), [fax, setFax] = useState("");
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [id, setId] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    if (step === 1) { setStep(2); return; }
    setBusy(true);
    try { setId(await submitRequest({ kind: "report", website, prompts: [prompt, secondPrompt], email, fax })); } catch (failure) { setError(failure instanceof Error ? failure.message : "Your request could not be saved. Please try again."); } finally { setBusy(false); }
  };
  if (id) return <Confirmation id={id} kind="report" website={website} />;
  return <form className="native-form" onSubmit={submit}><div className="form-steps" aria-label={`Step ${step} of 2`}><span aria-current={step === 1 ? "step" : undefined}>1</span><i /><span aria-current={step === 2 ? "step" : undefined}>2</span></div><div className="form-heading"><h2>{step === 1 ? "Where should buyers find you?" : "Where should Sai follow up?"}</h2><p>{step === 1 ? "Share your website and one or two real buying questions." : "Your website and prompts stay attached to this request."}</p></div>
    {step === 1 ? <><label>Website URL<input type="url" inputMode="url" required autoComplete="url" name="website" placeholder="https://your-website.com" maxLength={1500} value={website} onChange={event => setWebsite(event.target.value)} /></label><label>Buyer prompt you want to show up for<textarea required name="prompt" maxLength={500} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder="Which provider is a good fit for our specific need?" /></label><label>A second buyer prompt (optional)<textarea name="secondPrompt" maxLength={500} value={secondPrompt} onChange={event => setSecondPrompt(event.target.value)} /></label></> : <><p className="native-note">Website: <strong>{website}</strong><br />Primary prompt: {prompt}</p><label>Work email<input type="email" required autoComplete="email" name="email" maxLength={254} value={email} onChange={event => setEmail(event.target.value)} /></label><p className="native-note">We use these details to review your website and respond to your request. <Link href="/privacy">How Aeoba handles your data</Link>.</p></>}
    <Honeypot value={fax} onChange={setFax} />{error && <p className="form-error" role="alert">{error}</p>}<div className="workbench-actions">{step === 2 && <button type="button" className="btn-secondary-strong" onClick={() => { setStep(1); setError(""); }} disabled={busy}>Back</button>}<button className="btn-primary" disabled={busy}>{busy ? <><LoaderCircle size={16} />Saving request…</> : step === 1 ? <>Continue<ArrowRight size={16} /></> : "Request Your Free AEO Report"}</button></div>
  </form>;
}

export function EnquiryForm({ kind = "contact", plan = "", subject = "" }: { kind?: Exclude<RequestKind, "report">; plan?: string; subject?: string }) {
  const [name, setName] = useState(""), [email, setEmail] = useState(""), [website, setWebsite] = useState(""), [message, setMessage] = useState(subject), [fax, setFax] = useState("");
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [id, setId] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setBusy(true); setError(""); try { setId(await submitRequest({ kind, plan, name, email, website, message, fax })); } catch (failure) { setError(failure instanceof Error ? failure.message : "Your request could not be saved."); } finally { setBusy(false); } };
  if (id) return <Confirmation id={id} kind={kind} />;
  const title = kind === "portal-access" ? "Request portal access" : kind === "career" ? "Introduce your expertise" : kind === "onboarding" ? "Request your kickoff" : "Tell Sai what you are working on";
  return <form className="native-form" onSubmit={submit}><div className="form-heading"><h2>{title}</h2><p>{kind === "onboarding" ? `Selected plan: ${plan}. Sai will review scope and fit before an agreement or payment.` : "Your message is saved for Sai to review."}</p></div><label>Your name<input name="name" autoComplete="name" required maxLength={120} value={name} onChange={event => setName(event.target.value)} /></label><label>Email<input name="email" autoComplete="email" type="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} /></label>{kind !== "portal-access" && <label>Website (optional)<input type="url" name="website" maxLength={1500} value={website} onChange={event => setWebsite(event.target.value)} placeholder="https://your-website.com" /></label>}<label>{kind === "portal-access" ? "Workspace or access details" : "How can Aeoba help?"}<textarea name="message" required={kind !== "portal-access"} minLength={kind === "contact" || kind === "career" ? 10 : undefined} maxLength={4000} value={message} onChange={event => setMessage(event.target.value)} /></label><Honeypot value={fax} onChange={setFax} />{error && <p className="form-error" role="alert">{error}</p>}<button className="btn-primary" disabled={busy}>{busy ? "Saving…" : kind === "onboarding" ? "Request onboarding — no payment" : "Send enquiry"}</button><p className="native-note">By sending this enquiry you ask Aeoba to use these details to respond. <Link href="/privacy">Privacy information</Link>.</p></form>;
}
