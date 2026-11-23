export interface ArticleBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleSection extends ArticleBlock {
  subsections?: ArticleBlock[];
  table?: { headings: string[]; rows: string[][] };
  code?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: "Aeoba Research";
  publishedAt: string;
  modifiedAt: string;
  hook: string;
  keywords: string[];
  minutes: number;
  sections: ArticleSection[];
  faq: { question: string; answer: string }[];
}

export type ArticleDraft = Omit<Article, "author" | "minutes">;

export function finishArticle(article: ArticleDraft): Article {
  const words = [article.title, article.hook, ...article.sections.flatMap(section => [section.heading, ...section.paragraphs, ...(section.bullets ?? []), ...(section.subsections ?? []).flatMap(subsection => [subsection.heading, ...subsection.paragraphs, ...(subsection.bullets ?? [])]), ...(section.table?.rows.flat() ?? [])]), ...article.faq.flatMap(item => [item.question, item.answer])].join(" ").split(/\s+/).length;
  return { ...article, author: "Aeoba Research", minutes: Math.max(1, Math.ceil(words / 200)) };
}
