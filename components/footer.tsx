import Link from "next/link";

import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><strong>{siteContent.brand.name}</strong><p>{siteContent.brand.tagline}</p></div>
      <nav aria-label="Navegação de rodapé">
        <a href="#atelier">Atelier</a><a href="#galeria">Galeria</a><a href="#encomendas">Encomendas</a>
        <Link href="/politica-de-privacidade">Política de privacidade</Link>
        {siteConfig.instagramUrl ? <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a> : null}
      </nav>
      <p className="footer-meta">© {new Date().getFullYear()} Pavio Atelier Natural · Ceras naturais, sem parafina</p>
    </footer>
  );
}
