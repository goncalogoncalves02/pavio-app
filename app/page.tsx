import { Contacts } from "@/components/contacts";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Materials } from "@/components/materials";
import { OrderProcess } from "@/components/order-process";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Seals } from "@/components/seals";
import { Story } from "@/components/story";
import { Testimonials } from "@/components/testimonials";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";
import { buildHomeStructuredData } from "@/lib/structured-data";

export default function Home() {
  const jsonLd = buildHomeStructuredData({
    origin: siteConfig.origin,
    name: siteContent.brand.name,
    description: siteContent.seo.description,
    logoPath: siteContent.brand.logoPath,
    instagramUrl: siteConfig.instagramUrl,
    whatsappNumber: siteConfig.whatsappNumber,
    locality: siteContent.business.locality,
    countryName: siteContent.business.countryName,
    shippingArea: siteContent.business.shippingArea,
    faqs: siteContent.faqs,
  });

  return (
    <>
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <Seals />
        <Materials />
        <Gallery />
        <Story />
        <OrderProcess />
        <Testimonials />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
