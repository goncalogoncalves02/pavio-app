import { describe, expect, it } from "vitest";

import {
  buildWhatsAppUrl,
  normalizeWhatsAppNumber,
} from "@/lib/contact";

describe("normalizeWhatsAppNumber", () => {
  it("normaliza um número internacional com separadores", () => {
    expect(normalizeWhatsAppNumber("+351 912-345-678")).toBe("351912345678");
  });

  it("recusa valores em falta ou inválidos", () => {
    expect(normalizeWhatsAppNumber()).toBeNull();
    expect(normalizeWhatsAppNumber("")).toBeNull();
    expect(normalizeWhatsAppNumber("contacto-em-breve")).toBeNull();
    expect(normalizeWhatsAppNumber("1234")).toBeNull();
  });
});

describe("buildWhatsAppUrl", () => {
  it("codifica a mensagem contextual numa ligação wa.me", () => {
    expect(
      buildWhatsAppUrl(
        "+351 912 345 678",
        "Olá! Gostava de saber mais sobre a vela Jardim & Luz.",
      ),
    ).toBe(
      "https://wa.me/351912345678?text=Ol%C3%A1!%20Gostava%20de%20saber%20mais%20sobre%20a%20vela%20Jardim%20%26%20Luz.",
    );
  });

  it("não cria uma ligação quando o número não está configurado", () => {
    expect(buildWhatsAppUrl(undefined, "Olá!")).toBeNull();
  });
});
