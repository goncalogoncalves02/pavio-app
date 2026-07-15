import Image from "next/image";

import { siteContent } from "@/content/site";

export function Header() {
  const lastIndex = siteContent.navigation.length - 1;

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio">
          <span className="brand-logo">
            <Image
              src={siteContent.brand.logoPath}
              alt={siteContent.brand.logoAlt}
              width={1254}
              height={1254}
              sizes="(max-width: 760px) 150px, 190px"
              loading="eager"
            />
          </span>
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
