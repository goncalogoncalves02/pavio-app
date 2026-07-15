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

  it("aplica a área de serviço aos contactos sem alterar a recolha em Setúbal", async () => {
    vi.stubEnv("NEXT_PUBLIC_SERVICE_AREA", "Palmela e Setúbal");
    vi.resetModules();

    const { siteConfig } = await import("@/config/site");
    const { Contacts: ContactsWithServiceArea } = await import(
      "@/components/contacts"
    );
    const { OrderProcess: OrderProcessWithServiceArea } = await import(
      "@/components/order-process"
    );

    expect(siteConfig.serviceArea).toBe("Palmela e Setúbal");

    const contactsHtml = renderToStaticMarkup(<ContactsWithServiceArea />);
    const orderProcessHtml = renderToStaticMarkup(
      <OrderProcessWithServiceArea />,
    );

    expect(contactsHtml).toContain("Esteja em Palmela e Setúbal");
    expect(orderProcessHtml).toContain("recolha em Setúbal");
    expect(orderProcessHtml).not.toContain("recolha em Palmela");
  });
});
