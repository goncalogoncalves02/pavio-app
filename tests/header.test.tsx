import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/header";

describe("Header", () => {
  it("usa o logótipo Pavio acessível como identidade principal", () => {
    const html = renderToStaticMarkup(<Header />);

    expect(html).toContain('class="brand-logo"');
    expect(html).toContain('alt="Pavio — Velas que acendem momentos"');
    expect(html).toMatch(/pavio-logo\.png/);
    expect(html).not.toContain("brand-mark");
  });
});
