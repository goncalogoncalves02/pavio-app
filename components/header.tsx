import { siteContent } from "@/content/site";

export function Header() {
  const lastIndex = siteContent.navigation.length - 1;

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Pavio Atelier Natural — início">
          <span className="brand-mark" aria-hidden="true"><span className="brand-halo" /><span className="brand-flame" /></span>
          <span><strong>{siteContent.brand.shortName}</strong><small>Atelier Natural</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <ul className="site-nav">
            {siteContent.navigation.map((item, index) => (
              <li key={item.href}>
                <a className={index === lastIndex ? "nav-cta" : undefined} href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
