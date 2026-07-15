import type { FaqItem } from "@/types/content";

export type HomeStructuredDataInput = {
  origin: string;
  name: string;
  description: string;
  logoPath: `/${string}`;
  instagramUrl: string | null;
  whatsappNumber: string | null;
  locality: string;
  countryName: string;
  shippingArea: string;
  faqs: FaqItem[];
};

type StructuredDataNode = Record<string, unknown>;

export function buildHomeStructuredData(input: HomeStructuredDataInput) {
  const telephone = input.whatsappNumber
    ? `+${input.whatsappNumber}`
    : null;
  const organization: StructuredDataNode = {
    "@type": "Organization",
    "@id": `${input.origin}/#organization`,
    name: input.name,
    url: input.origin,
    description: input.description,
    logo: `${input.origin}${input.logoPath}`,
    areaServed: [
      {
        "@type": "City",
        name: input.locality,
        containedInPlace: {
          "@type": "Country",
          name: input.countryName,
        },
      },
      {
        "@type": "AdministrativeArea",
        name: input.shippingArea,
      },
    ],
  };

  if (input.instagramUrl) {
    organization.sameAs = [input.instagramUrl];
  }

  if (telephone) {
    organization.telephone = telephone;
    organization.contactPoint = {
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      availableLanguage: "pt-PT",
    };
  }

  const website: StructuredDataNode = {
    "@type": "WebSite",
    "@id": `${input.origin}/#website`,
    name: input.name,
    url: input.origin,
    inLanguage: "pt-PT",
    publisher: { "@id": `${input.origin}/#organization` },
  };

  const faqPage: StructuredDataNode = {
    "@type": "FAQPage",
    "@id": `${input.origin}/#faq`,
    mainEntity: input.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, faqPage],
  };
}
