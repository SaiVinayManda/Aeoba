import { organizationLogo, site } from "@/config/site";

export interface QuestionAnswer { question: string; answer: string }

export function faqPageSchema(path: string, items: readonly QuestionAnswer[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}${path === "/" ? "/" : path}#faq`,
    mainEntity: items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function breadcrumbSchema(path: string, items: { path: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${site.url}${path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.path === "/" ? site.url : `${site.url}${item.path}` })),
  };
}

export function editorialSchema({ path, title, description, published, modified, type = "Article" }: { path: string; title: string; description: string; published: string; modified: string; type?: "Article" | "BlogPosting" }) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org", "@type": type, "@id": `${url}#article`, url,
    headline: title, description, datePublished: published, dateModified: modified, inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
    publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: organizationLogo },
    image: { "@type": "ImageObject", url: `${site.url}${site.metadata.socialImage}`, width: 1200, height: 630 },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}
