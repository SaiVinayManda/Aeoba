import Link from "next/link";
import type { ArticleBlock, ArticleSection } from "@/content/article-types";

// Content supports explicit links and inline code without injecting raw HTML.
export function ArticleText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/") && !href.startsWith("//")) return <Link href={href} key={index}>{label}</Link>;
      if (href.startsWith("https://")) return <a href={href} key={index}>{label}</a>;
      return label;
    }
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  })}</>;
}

function BlockContent({ block }: { block: ArticleBlock }) {
  return <>
    {block.paragraphs.map(paragraph => <p key={paragraph}><ArticleText text={paragraph} /></p>)}
    {block.bullets && <ul>{block.bullets.map(bullet => <li key={bullet}><ArticleText text={bullet} /></li>)}</ul>}
  </>;
}

export function ArticleContent({ section, id }: { section: ArticleSection; id: string }) {
  return <section id={id}>
    <h2>{section.heading}</h2>
    <BlockContent block={section} />
    {section.table && <div className="article-table-scroll" role="region" aria-label={`${section.heading}: comparison table`} tabIndex={0}>
      <table>
        <thead><tr>{section.table.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}><ArticleText text={cell} /></th> : <td key={index}><ArticleText text={cell} /></td>)}</tr>)}</tbody>
      </table>
    </div>}
    {section.code && <pre className="article-code"><code>{section.code}</code></pre>}
    {section.subsections?.map(subsection => <div key={subsection.heading}>
      <h3>{subsection.heading}</h3><BlockContent block={subsection} />
    </div>)}
  </section>;
}
