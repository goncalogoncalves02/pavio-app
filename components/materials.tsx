import { siteContent } from "@/content/site";

export function Materials() {
  return (
    <section className="section materials" id="atelier" aria-labelledby="atelier-title">
      <div className="section-heading section-heading--split" data-reveal>
        <div><p className="eyebrow">O nosso atelier</p><h2 id="atelier-title">Matéria natural.<br /><em className="accent">Gesto artístico.</em></h2></div>
        <p>Acreditamos em objetos com intenção: peças que guardam a marca das mãos, respeitam o ritmo do processo e encontram lugar nas histórias de quem as recebe.</p>
      </div>
      <div className="benefit-grid">
        {siteContent.benefits.map((benefit, index) => (
          <article className="benefit-card" data-reveal key={benefit.title}>
            <div className="benefit-topline"><span>{benefit.eyebrow}</span><span aria-hidden="true">0{index + 1}</span></div>
            <h3>{benefit.title}</h3><p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
