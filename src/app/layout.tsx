import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/sites/aeoba/aeoba.css";
import "@/components/sites/aeoba/sections.css";
import "@/components/aeoba/native.css";
import { FloatingBookingLink } from "@/components/CalBooking";
import { Navigation, CookieConsent, ScrollControls } from "@/components/sites/aeoba/navigation";
import { Footer } from "@/components/sites/aeoba/footer";
import { organizationSchema, websiteSchema, site } from "@/config/site";
import { RouteStructuredData } from "@/components/aeoba/RouteStructuredData";
import { routeCatalog } from "@/lib/seo-routes";

const geistSans = localFont({
  src: "../../public/sites/aeoba/fonts/Geist_Variable-s.p.12e_ny3np-tt-.ttf",
  variable: "--font-text",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/sites/aeoba/fonts/GeistMono_Variable-s.p.3dh31094ct3u4.ttf",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: site.metadata.title,
  description: site.metadata.description,
  alternates: { canonical: site.url },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48 96x96 144x144" },
      ...[48, 96, 144, 192, 512].map(size => ({ url: `/icon-${size}.png`, type: "image/png", sizes: `${size}x${size}` })),
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: { title: site.metadata.title, description: site.metadata.description, siteName: site.name, url: site.url, type: "website", images: [{ url: `${site.url}${site.metadata.socialImage}`, width: 1200, height: 630, alt: "Aeoba — Become the answer. AEO, GEO, and Technical SEO." }] },
  twitter: { card: "summary_large_image", title: site.metadata.title, description: site.metadata.description, images: [`${site.url}${site.metadata.socialImage}`] },
  other: { "msapplication-config": "/browserconfig.xml", "msapplication-TileColor": "#09090D", "msapplication-TileImage": "/icon-144.png" },
};

export const viewport: Viewport = { themeColor: "#09090D" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><link rel="alternate" type="text/plain" href={`${site.url}/llms.txt`} title="LLMs.txt" /></head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [websiteSchema, organizationSchema] }).replace(/</g, "\\u003c") }} />
        <RouteStructuredData routes={routeCatalog.map(({ path, name }) => ({ path, name }))} />
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        <ScrollControls />
        <FloatingBookingLink />
      </body>
    </html>
  );
}
