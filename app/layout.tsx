import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

import "./globals.css";

const description =
  "Velas artísticas e personalizadas em ceras naturais sem parafina, criadas à mão para presentes, celebrações e decoração.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: "Pavio Atelier Natural | Velas artísticas personalizadas",
    template: "%s | Pavio Atelier Natural",
  },
  description,
  applicationName: siteContent.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: siteContent.brand.name,
    title: "Pavio Atelier Natural | Velas artísticas personalizadas",
    description,
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
    title: "Pavio Atelier Natural | Velas artísticas personalizadas",
    description,
    images: ["/opengraph-image"],
  },
  robots: siteConfig.isPublicOriginConfigured
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
