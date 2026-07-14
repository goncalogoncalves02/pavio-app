import { describe, expect, it } from "vitest";

import { getGalleryItems } from "@/data/gallery";

describe("getGalleryItems", () => {
  it("expõe peças locais com dados estáveis e acessíveis", () => {
    const items = getGalleryItems();

    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);

    for (const item of items) {
      expect(item.artworkPath).toMatch(/^\/gallery\/.+\.svg$/);
      expect(item.alt).not.toBe("");
      expect(item.title).not.toBe("");
      expect(item.description).not.toBe("");
      expect(item.whatsAppMessage).toContain(item.title);
    }
  });
});
