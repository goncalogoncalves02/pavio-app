import { describe, expect, it } from "vitest";

import { siteContent } from "@/content/site";

describe("siteContent", () => {
  it("expõe a identidade e os factos locais verificados", () => {
    expect(siteContent.brand.logoPath).toBe("/brand/pavio-logo.png");
    expect(siteContent.brand.logoAlt).toBe(
      "Pavio — Velas que acendem momentos",
    );
    expect(siteContent.business).toEqual({
      locality: "Setúbal",
      countryName: "Portugal",
      shippingArea: "Portugal continental",
      pickupLabel: "Recolha em Setúbal a combinar",
    });
    expect(siteContent.seo.title).toBe(
      "Velas artesanais personalizadas em Setúbal | Pavio",
    );
    expect(siteContent.seo.description).toContain("feitas à mão em Setúbal");
  });

  it("responde de forma explícita sobre a recolha em Setúbal", () => {
    const pickupFaq = siteContent.faqs.find(
      (item) => item.question === "Posso recolher a encomenda em Setúbal?",
    );

    expect(pickupFaq?.answer).toContain("recolha em Setúbal");
    expect(pickupFaq?.answer).toContain("após confirmação da encomenda");
  });

  it("expõe quatro selos com textos completos", () => {
    expect(siteContent.seals).toHaveLength(4);
    for (const seal of siteContent.seals) {
      expect(seal.label).toMatch(/^Selo · 0[1-4]$/);
      expect(seal.title).not.toBe("");
      expect(seal.description).not.toBe("");
    }
  });

  it("inclui a secção da história na navegação", () => {
    const hrefs = siteContent.navigation.map((item) => item.href);
    expect(hrefs).toContain("#historia");
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("expõe a história da artesã com retrato local", () => {
    expect(siteContent.story.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(siteContent.story.portrait.src).toMatch(/^\/gallery\/.+\.svg$/);
    expect(siteContent.story.portrait.alt).not.toBe("");
    expect(siteContent.story.signature).not.toBe("");
  });

  it("expõe três testemunhos com citação e autor", () => {
    expect(siteContent.testimonials).toHaveLength(3);
    for (const testimonial of siteContent.testimonials) {
      expect(testimonial.quote).not.toBe("");
      expect(testimonial.author).toContain("·");
    }
  });
});
