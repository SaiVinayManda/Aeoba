import { faqPageSchema, type QuestionAnswer } from "@/lib/structured-data";

export function JsonLd({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}

export function QuestionAnswers({ path, items }: { path: string; items: readonly QuestionAnswer[] }) {
  return <section id="faq" className="native-section"><div className="native-container">
    <JsonLd value={faqPageSchema(path, items)} />
    <h2 className="section-heading">Frequently asked questions</h2>
    <div className="native-faq">{items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
  </div></section>;
}
