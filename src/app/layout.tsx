import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/sites/aeoba/aeoba.css";
import "@/components/sites/aeoba/sections.css";
import "@/components/aeoba/native.css";
import { FloatingBookingLink } from "@/components/CalBooking";
import { Navigation, CookieConsent, ScrollControls } from "@/components/sites/aeoba/navigation";
import { Footer } from "@/components/sites/aeoba/footer";
import { organizationSchema, site } from "@/config/site";

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
  title: site.metadata.title,
  description: site.metadata.description,
  alternates: { canonical: "/" },
  icons: { icon: site.metadata.icon },
  openGraph: { title: site.metadata.title, description: site.metadata.description, siteName: site.name, url: site.url, type: "website" },
  twitter: { card: "summary", title: site.metadata.title, description: site.metadata.description },
};

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
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
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
