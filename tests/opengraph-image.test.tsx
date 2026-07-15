import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import OpenGraphImage from "@/app/opengraph-image";
import { siteContent } from "@/content/site";

const imageResponseMock = vi.hoisted(() => vi.fn());

vi.mock("next/og", () => ({
  ImageResponse: imageResponseMock,
}));

describe("imagem Open Graph", () => {
  it("renderiza a tagline tipada da marca", () => {
    OpenGraphImage();

    expect(imageResponseMock).toHaveBeenCalledOnce();

    const [element] = imageResponseMock.mock.calls[0] as [ReactElement];
    const html = renderToStaticMarkup(element);

    expect(html).toContain(siteContent.brand.tagline);
    expect(html).not.toContain("Velas artísticas, feitas para cada história.");
  });
});
