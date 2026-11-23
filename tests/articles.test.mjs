import assert from "node:assert/strict";
import { test } from "node:test";
import { sourceLoader } from "../scripts/lib/load-source.mjs";

const load = sourceLoader();
const { articles, podcastArticles } = load("src/content/resources.ts");
const { researchArticles } = load("src/content/research-articles.ts");
const { publicRoutes } = load("src/config/routes.ts");
const { articleMetadata, articleSchema } = load("src/lib/articles.ts");

test("all articles have brand authorship, hooks, FAQs, service links, and report links", () => {
  assert.equal(researchArticles.length, 7);
  assert.equal(articles.length, 11);
  assert.equal(podcastArticles.length, 4);
  assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
  for (const article of articles) {
    assert.equal(article.author, "Aeoba Research");
    assert.ok(article.hook.length > 80, article.slug);
    assert.ok(article.faq.length >= 3, article.slug);
    assert.ok(article.sections.some(section => section.subsections?.length), article.slug);
    assert.ok(article.sections.some(section => section.bullets?.length), article.slug);
    const content = JSON.stringify(article.sections);
    assert.ok(content.includes("/services/"), article.slug);
    assert.ok(content.includes("/free-aeo-report"), article.slug);
    assert.ok(publicRoutes.includes(`/resources/blog/${article.slug}`), article.slug);
    for (const match of content.matchAll(/\]\((\/[^)]+)\)/g)) {
      assert.ok(publicRoutes.includes(match[1].split("#")[0]), `${article.slug}: broken internal link ${match[1]}`);
    }
  }
});

test("research articles provide substantial, structured decision support", () => {
  for (const article of researchArticles) {
    const prose = article.sections.flatMap(section => [...section.paragraphs, ...(section.subsections ?? []).flatMap(subsection => subsection.paragraphs)]).join(" ");
    assert.ok(prose.split(/\s+/).length >= 750, `${article.slug}: insufficient article body`);
    assert.ok(article.sections.length >= 6, article.slug);
    assert.ok(article.keywords.length >= 3, article.slug);
  }
});

test("article metadata and JSON-LD agree with visible authorship, canonical URLs, dates, and FAQs", () => {
  for (const article of articles) {
    const metadata = articleMetadata(article);
    const schema = JSON.parse(JSON.stringify(articleSchema(article)));
    const [post, faq] = schema["@graph"];
    assert.equal(metadata.authors[0].name, article.author);
    assert.equal(metadata.alternates.canonical, `/resources/blog/${article.slug}`);
    assert.equal(metadata.openGraph.type, "article");
    assert.equal(metadata.openGraph.publishedTime, article.publishedAt);
    assert.equal(post["@type"], "BlogPosting");
    assert.equal(post.author["@type"], "Organization");
    assert.equal(post.author.name, article.author);
    assert.equal(post.headline, article.title);
    assert.equal(post.dateModified, article.modifiedAt);
    assert.equal(faq["@type"], "FAQPage");
    for (const [index, item] of article.faq.entries()) {
      assert.equal(faq.mainEntity[index].name, item.question);
      assert.equal(faq.mainEntity[index].acceptedAnswer.text, item.answer);
    }
    for (const section of article.sections) if (section.code) assert.doesNotThrow(() => JSON.parse(section.code));
  }
});
