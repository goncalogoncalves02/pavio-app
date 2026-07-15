import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { OrderProcess } from "@/components/order-process";
import { Story } from "@/components/story";

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
});
