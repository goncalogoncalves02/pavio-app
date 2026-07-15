import Image from "next/image";

import { ContactActions } from "@/components/contact-actions";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Feitas à mão · Ceras 100% naturais</p>
        <h1 id="hero-title">A luz de uma peça única, <em className="accent">criada</em> para a sua história.</h1>
        <p className="hero-intro">
          Velas artísticas e personalizadas, moldadas em ceras naturais sem parafina e perfumadas com óleos naturais — para oferecer, celebrar ou transformar um espaço.
        </p>
        <ContactActions secondary={{ href: "#galeria", label: "Ver a galeria", symbol: "↓" }} />
        <p className="hero-note">Orçamento personalizado · Envio para Portugal continental</p>
      </div>
      <div className="hero-artwork" data-reveal>
        <div className="hero-image-frame">
          <Image src="/gallery/hero-atelier.svg" alt="Composição artística de velas artesanais em tons naturais num atelier luminoso" width={960} height={1120} priority sizes="(max-width: 760px) 92vw, 42vw" />
        </div>
        <p className="artwork-caption"><span>Nº 01</span> Cada encomenda começa numa conversa.</p>
      </div>
    </section>
  );
}
