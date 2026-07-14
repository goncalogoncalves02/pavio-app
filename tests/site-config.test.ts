import { describe, expect, it } from "vitest";

import {
  normalizeExternalUrl,
  resolveSiteOrigin,
} from "@/lib/site-config";

describe("resolveSiteOrigin", () => {
  it("usa localhost e desativa indexação sem URL pública", () => {
    expect(resolveSiteOrigin(undefined)).toEqual({
      origin: "http://localhost:3000",
      isPublic: false,
    });
  });

  it("normaliza uma origem pública configurada", () => {
    expect(resolveSiteOrigin("https://atelier.example/colecao/")).toEqual({
      origin: "https://atelier.example",
      isPublic: true,
    });
  });

  it("trata uma configuração inválida como desenvolvimento", () => {
    expect(resolveSiteOrigin("atelier.example")).toEqual({
      origin: "http://localhost:3000",
      isPublic: false,
    });
  });
});

describe("normalizeExternalUrl", () => {
  it("aceita apenas ligações externas em HTTPS", () => {
    expect(normalizeExternalUrl(" https://instagram.com/atelier/ ")).toBe(
      "https://instagram.com/atelier/",
    );
    expect(normalizeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeExternalUrl("http://instagram.com/atelier/")).toBeNull();
    expect(normalizeExternalUrl()).toBeNull();
  });
});
