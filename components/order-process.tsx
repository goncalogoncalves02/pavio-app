import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

export function OrderProcess() {
  return (
    <section className="section process-section" id="encomendas" aria-labelledby="process-title">
      <div className="section-heading section-heading--split">
        <div><p className="eyebrow">Como encomendar</p><h2 id="process-title">Da primeira ideia à luz acesa.</h2></div>
        <p>Um processo próximo e simples, pensado para chegar a uma peça que faça sentido para si.</p>
      </div>
      <ol className="process-list">
        {siteContent.orderSteps.map((step) => (
          <li key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
        ))}
      </ol>
      <div className="shipping-note">
        <span className="shipping-icon" aria-hidden="true">⌁</span>
        <div><h3>Do atelier até si</h3><p>Fazemos envios para Portugal continental. A entrega local ou recolha é combinada consoante a zona{siteConfig.serviceArea ? ` — atualmente, ${siteConfig.serviceArea}` : " e a disponibilidade do atelier"}.</p></div>
      </div>
    </section>
  );
}
