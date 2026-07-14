import Image from "next/image";

import { siteConfig } from "@/config/site";
import { getGalleryItems } from "@/data/gallery";
import { buildWhatsAppUrl } from "@/lib/contact";

export function Gallery() {
  return (
    <section className="section gallery-section" id="galeria" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="eyebrow">Peças & possibilidades</p><h2 id="gallery-title">Inspirações para imaginar a sua.</h2>
        <p>Estas imagens representam direções criativas do atelier. Cada pedido é afinado consigo e pode ganhar outras cores, formas e detalhes.</p>
      </div>
      <div className="gallery-grid">
        {getGalleryItems().map((item, index) => {
          const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber ?? undefined, item.whatsAppMessage);
          return (
            <article className="gallery-card" key={item.id}>
              <div className="gallery-image">
                <Image src={item.artworkPath} alt={item.alt} width={800} height={980} sizes="(max-width: 680px) 92vw, (max-width: 1100px) 45vw, 23vw" />
                <span className="gallery-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="gallery-copy">
                <h3>{item.title}</h3><p>{item.description}</p>
                {whatsappUrl ? (
                  <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Pedir algo inspirado nesta peça <span aria-hidden="true">↗</span></a>
                ) : (
                  <a className="text-link" href="#contactos">Consultar disponibilidade <span aria-hidden="true">↓</span></a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
