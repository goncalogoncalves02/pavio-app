import { Contacts } from "@/components/contacts";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Materials } from "@/components/materials";
import { OrderProcess } from "@/components/order-process";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

export default function Home() {
  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.origin}/#organization`,
    name: siteContent.brand.name,
    url: siteConfig.origin,
    ...(siteConfig.instagramUrl ? { sameAs: [siteConfig.instagramUrl] } : {}),
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.origin}/#website`,
        name: siteContent.brand.name,
        url: siteConfig.origin,
        inLanguage: "pt-PT",
        publisher: { "@id": `${siteConfig.origin}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <Materials />
        <Gallery />
        <OrderProcess />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
