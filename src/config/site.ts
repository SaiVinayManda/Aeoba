const name = "Aeoba";
const url = "https://aeoba.com";

export const site = {
  name,
  url,
  email: "info@aeoba.com",
  locations: [
    { city: "Milan", country: "Italy", countryCode: "IT", label: "Milan, Italy" },
    { city: "Sliema", country: "Malta", countryCode: "MT", label: "Sliema, Malta" },
  ],
  copyright: `© 2026 ${name}. All rights reserved.`,
  metadata: {
    title: `The AI SEO Agency That Wins Brands AI Citations | ${name}`,
    description: `${name} is the AI SEO agency for the answer era, managed technical SEO, schema, content, and authority systems that win Google rankings and AI citations in ChatGPT, Perplexity, and AI Overviews.`,
    icon: "/favicon.ico",
    logo: "/logo.png",
    socialImage: "/og-image.png",
  },
  booking: {
    // The local booking page embeds this one editable Aeoba scheduling link.
    calLink: "manasflow/aeoba",
    namespace: "aeoba",
    origin: "https://app.cal.com",
    scriptUrl: "https://app.cal.com/embed/embed.js",
    layout: "month_view",
  },
  guarantee: "Ranked and cited in ChatGPT & Perplexity for at least 10 buyer-intent prompts in 90 days—or we keep working free until you are.",
  guaranteeTerms: "We agree on at least 10 relevant buyer-intent prompts at kickoff and record a dated baseline. A qualifying result is a named brand recommendation with a verifiable citation in both ChatGPT and Perplexity for each agreed prompt. The initial term is 90 days. You provide agreed access and approvals; if the agreed citation target is not met, our management work continues free until it is. You keep every page, schema update, and asset we ship.",
  footerLinks: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Guarantee", href: "/pricing#guarantee" },
    { label: "FAQ", href: "/#faq" },
  ],
  resourceLinks: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "The Answer Index", href: "/answer-index" },
    { label: "What Is AEO?", href: "/resources/free-aeo-guide" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Free Tools", href: "/resources/tools" },
  ],
  faq: [
    {
      question: `Is ${name} an SEO agency?`,
      answer: `Yes. ${name} is an SEO agency with full technical SEO execution plus the AEO layer: schema, answer-ready content, entity optimization, authority systems, and AI citation tracking.`,
    },
    {
      question: "How is an AI SEO agency different from a traditional SEO agency?",
      answer: "A traditional SEO agency usually optimizes for search rankings and organic clicks. An AI SEO agency still handles technical SEO, content, and authority, but also structures entities, schema, answer-ready pages, and third-party proof so ChatGPT, Perplexity, and AI Overviews can cite the brand.",
    },
  ],
} as const;

export const bookingUrl = "/book-call";

export const reportUrl = "/free-aeo-report";

export const organizationLogo = {
  "@type": "ImageObject",
  "@id": `${site.url}/#logo`,
  url: `${site.url}${site.metadata.logo}`,
  contentUrl: `${site.url}${site.metadata.logo}`,
  width: 512,
  height: 512,
  caption: site.name,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: "Aeoba AI SEO Agency",
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: organizationLogo,
  image: `${site.url}${site.metadata.logo}`,
  description: "B2B Answer Engine Optimization, Generative Engine Optimization, and technical SEO agency based in Milan, Italy and Sliema, Malta.",
  email: site.email,
  location: site.locations.map(location => ({
    "@type": "Place",
    name: location.label,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.countryCode,
    },
  })),
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: site.faq.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
