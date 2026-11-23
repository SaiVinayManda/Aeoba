import type { Metadata } from "next";
import type { Article } from "@/content/article-types";
import { site } from "@/config/site";
import { pageMetadata } from "./metadata";
import { editorialSchema } from "./structured-data";

export function articleMetadata(article: Article): Metadata {
  const path = `/resources/blog/${article.slug}`;
  const metadata = pageMetadata(article.title, article.summary, path);
  return {
    ...metadata,
    authors: [{ name: article.author, url: site.url }],
    keywords: article.keywords,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [article.author],
      section: article.category,
      tags: article.keywords,
    },
  };
}

export function articleSchema(article: Article) {
  const url = `${site.url}/resources/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...editorialSchema({ path: `/resources/blog/${article.slug}`, title: article.title, description: article.summary, published: article.publishedAt, modified: article.modifiedAt, type: "BlogPosting" }),
        articleSection: article.category,
        keywords: article.keywords.join(", "),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: article.faq.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
