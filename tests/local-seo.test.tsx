import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { OrderProcess } from "@/components/order-process";
import { Story } from "@/components/story";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("conteúdo local visível", () => {
  it("explica Setúbal, recolha combinada e área de envio", () => {
    const html = renderToStaticMarkup(
      <>
        <Hero />
        <Story />
        <OrderProcess />
        <Contacts />
      </>,
    );

    expect(html).toContain("Atelier em Setúbal");
    expect(html).toContain("Recolha em Setúbal a combinar");
    expect(html).toContain("Envio para Portugal continental");
    expect(html).toContain("atelier em Setúbal");
    expect(html).not.toContain("morada");
  });

  it("mantém a recolha em Setúbal quando a área de serviço é mais ampla", async () => {
    vi.stubEnv("NEXT_PUBLIC_SERVICE_AREA", "Palmela e Setúbal");
    vi.resetModules();

    const { siteConfig } = await import("@/config/site");
    const { OrderProcess: OrderProcessWithServiceArea } = await import(
      "@/components/order-process"
    );

    expect(siteConfig.serviceArea).toBe("Palmela e Setúbal");

    const html = renderToStaticMarkup(<OrderProcessWithServiceArea />);

    expect(html).toContain("recolha em Setúbal");
    expect(html).not.toContain("recolha em Palmela");
  });
});
