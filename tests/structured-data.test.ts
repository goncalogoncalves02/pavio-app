import { describe, expect, it } from "vitest";

import { buildHomeStructuredData } from "@/lib/structured-data";
import type { HomeStructuredDataInput } from "@/lib/structured-data";

const baseInput = {
  origin: "https://pavio.example",
  name: "Pavio Atelier Natural",
  description: "Velas feitas à mão em Setúbal.",
  logoPath: "/brand/pavio-logo.png",
  instagramUrl: null,
  whatsappNumber: null,
  locality: "Setúbal",
  countryName: "Portugal",
  shippingArea: "Portugal continental",
  faqs: [
    {
      question: "Posso recolher a encomenda em Setúbal?",
      answer: "Sim. A recolha é combinada após confirmação.",
    },
  ],
} satisfies HomeStructuredDataInput;

describe("buildHomeStructuredData", () => {
  it("descreve a organização e as áreas servidas sem morada física", () => {
    const data = buildHomeStructuredData(baseInput);
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const organization = graph.find(
      (node) => node["@type"] === "Organization",
    );
    const serialized = JSON.stringify(data);

    expect(organization?.logo).toBe(
      "https://pavio.example/brand/pavio-logo.png",
    );
    expect(organization?.areaServed).toEqual([
      {
        "@type": "City",
        name: "Setúbal",
        containedInPlace: { "@type": "Country", name: "Portugal" },
      },
      { "@type": "AdministrativeArea", name: "Portugal continental" },
    ]);
    expect(serialized).not.toContain("LocalBusiness");
    expect(serialized).not.toContain("PostalAddress");
    expect(serialized).not.toContain("streetAddress");
    expect(serialized).not.toContain('"address"');
    expect(serialized).not.toContain("postalCode");
    expect(serialized).not.toContain("openingHours");
    expect(serialized).not.toContain("geo");
    expect(serialized).not.toContain("latitude");
    expect(serialized).not.toContain("longitude");
    expect(serialized).not.toContain('"map"');
  });

  it("inclui contactos apenas quando foram validados", () => {
    const withoutContacts = buildHomeStructuredData(baseInput);
    const withContacts = buildHomeStructuredData({
      ...baseInput,
      instagramUrl: "https://instagram.com/pavio/",
      whatsappNumber: "351912345678",
    });
    const withoutOrganization = withoutContacts["@graph"].find(
      (node) => node["@type"] === "Organization",
    );
    const withOrganization = withContacts["@graph"].find(
      (node) => node["@type"] === "Organization",
    );

    expect(withoutOrganization).not.toHaveProperty("sameAs");
    expect(withoutOrganization).not.toHaveProperty("telephone");
    expect(withOrganization).toMatchObject({
      sameAs: ["https://instagram.com/pavio/"],
      telephone: "+351912345678",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+351912345678",
        contactType: "customer service",
        availableLanguage: "pt-PT",
      },
    });
  });

  it("espelha as perguntas frequentes visíveis", () => {
    const data = buildHomeStructuredData(baseInput);
    const faqPage = data["@graph"].find(
      (node) => node["@type"] === "FAQPage",
    );

    expect(faqPage?.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Posso recolher a encomenda em Setúbal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. A recolha é combinada após confirmação.",
        },
      },
    ]);
  });
});
