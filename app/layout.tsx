import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";

import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: siteContent.seo.title,
    template: "%s | Pavio Atelier Natural",
  },
  description: siteContent.seo.description,
  applicationName: siteContent.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: siteContent.brand.name,
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pavio Atelier Natural — velas artísticas e personalizadas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: ["/opengraph-image"],
  },
  robots: siteConfig.isPublicOriginConfigured
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
