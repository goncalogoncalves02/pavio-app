import { siteContent } from "@/content/site";

export function Seals() {
  return (
    <section className="seals-section" aria-label="Compromisso natural">
      <div className="seal-grid">
        {siteContent.seals.map((seal) => (
          <div className="seal" data-reveal key={seal.title}>
            <span className="seal-label">{seal.label}</span>
            <span className="seal-title">{seal.title}</span>
            <span className="seal-note">{seal.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
