"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Download, Volume2, Square } from "lucide-react";
import { articles, glossary, guideChapters } from "@/content/resources";
import { downloadFile } from "@/components/interactive/Workbenches";

export function ArticleLibrary() {
  const [query, setQuery] = useState(""), [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(articles.map(article => article.category))];
  const shown = articles.filter(article => (category === "All" || article.category === category) && `${article.title} ${article.summary}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="resource-toolbar"><label className="search-field">Search articles<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Prompts, schema, measurement…" /></label><div className="filter-tabs" aria-label="Article category">{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div></div><p className="native-note" aria-live="polite">{shown.length} article{shown.length === 1 ? "" : "s"}</p><div className="native-grid">{shown.map(article => <Link className="native-card" href={`/resources/blog/${article.slug}`} key={article.slug}><span className="eyebrow">{article.category} · {article.minutes} min read</span><h3>{article.title}</h3><p>{article.summary}</p><span className="native-text-link">Read article →</span></Link>)}</div>{!shown.length && <p className="empty-state">No articles match. Try a different phrase or choose All.</p>}</>;
}

export function GlossarySearch() {
  const [query, setQuery] = useState("");
  const terms = glossary.filter(term => term.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <><label className="search-field">Search the glossary<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Citation, entity, canonical…" /></label><p className="native-note" aria-live="polite">{terms.length} terms</p><div className="glossary-list">{terms.map(([short, title, definition]) => <details key={short} id={short.toLowerCase().replaceAll(" ", "-")}><summary>{title}{short !== title && ` · ${short}`}</summary><p>{definition}</p><Link className="native-text-link" href="/resources/free-aeo-guide">Put this into practice →</Link></details>)}</div>{!terms.length && <p className="empty-state">No terms match this search.</p>}</>;
}

export function GuideNavigator() {
  const [chapter, setChapter] = useState(0), [complete, setComplete] = useState<number[]>([]);
  const current = guideChapters[chapter];
  return <><div className="workbench-heading"><p className="native-note">{complete.length} / {guideChapters.length} chapters checked. Progress stays in this page session.</p><button className="btn-secondary-strong" onClick={() => downloadFile("aeoba-aeo-field-guide.md", "# Aeoba AEO Field Guide\n\n" + guideChapters.map((item, index) => `## ${index + 1}. ${item.title}\n\n${item.body}\n\nAction: ${item.task}`).join("\n\n"))}><Download size={16} />Download the complete guide</button></div><div className="guide-layout"><nav className="guide-nav" aria-label="Guide chapters">{guideChapters.map((item, index) => <button key={item.title} aria-pressed={chapter === index} onClick={() => setChapter(index)}><span>{complete.includes(index) ? <Check size={16} /> : String(index + 1).padStart(2, "0")}</span>{item.title}</button>)}</nav><article className="guide-content"><p className="eyebrow">Chapter {chapter + 1}</p><h2>{current.title}</h2><p>{current.body}</p><div className="guide-task"><strong>Your next action</strong><p className="native-note">{current.task}</p><button className="native-text-link" onClick={() => setComplete(previous => previous.includes(chapter) ? previous.filter(value => value !== chapter) : [...previous, chapter])}>{complete.includes(chapter) ? "Mark as unfinished" : "Mark this action complete"}</button></div><div className="workbench-actions"><button className="btn-secondary-strong" disabled={chapter === 0} onClick={() => setChapter(chapter - 1)}>Previous</button><button className="btn-primary" disabled={chapter === guideChapters.length - 1} onClick={() => setChapter(chapter + 1)}>Next chapter</button></div></article></div></>;
}

export function PodcastReader() {
  const [selected, setSelected] = useState(0), [speaking, setSpeaking] = useState(false), [notice, setNotice] = useState("");
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  const article = articles[selected];
  const stop = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); setSpeaking(false); };
  const listen = () => { if (!("speechSynthesis" in window)) { setNotice("Audio reading is not supported here. The full transcript is available below."); return; } stop(); const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.sections.map(section => `${section.heading}. ${section.paragraphs.join(" ")}`).join(" ")}`); utterance.lang = "en-GB"; utterance.rate = .95; utterance.onend = () => setSpeaking(false); utterance.onerror = () => { setSpeaking(false); setNotice("Audio could not finish. You can continue with the transcript."); }; window.speechSynthesis.speak(utterance); setSpeaking(true); setNotice(""); };
  return <div className="guide-layout"><nav className="guide-nav" aria-label="Aeoba audio field notes">{articles.map((item, index) => <button key={item.slug} aria-pressed={selected === index} onClick={() => { stop(); setSelected(index); }}>{String(index + 1).padStart(2, "0")} · {item.title}</button>)}</nav><article className="guide-content"><p className="eyebrow">Aeoba AI Search · audio field notes</p><h2>{article.title}</h2><p>{article.summary}</p><div className="workbench-actions"><button className="btn-primary" onClick={speaking ? stop : listen}>{speaking ? <><Square size={16} />Stop audio</> : <><Volume2 size={16} />Listen to this field note</>}</button><Link href={`/resources/blog/${article.slug}`} className="btn-secondary-strong">Read the full transcript</Link></div><p className="native-note" role="status">{notice || "Audio uses your browser's text-to-speech voice. These are original Aeoba written field notes, not recordings of a guest interview."}</p><div className="article-body">{article.sections.map(section => <section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></article></div>;
}
