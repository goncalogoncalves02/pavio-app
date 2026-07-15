import { ContactActions } from "@/components/contact-actions";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

export function Contacts() {
  return (
    <section className="contact-section" id="contactos" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="contact-inner" data-reveal>
        <span className="contact-flame" aria-hidden="true"><span className="contact-flame-halo" /><span className="contact-flame-fire" /></span>
        <p className="eyebrow eyebrow--plain">Comecemos por uma ideia</p>
        <h2 id="contact-title">Que luz gostaria de <em className="accent">criar</em>?</h2>
        <p>Esteja em {siteContent.business.locality} ou noutra zona de {siteContent.business.shippingArea}, conte-nos a ocasião, o ambiente ou a pessoa que tem em mente. Respondemos com disponibilidade e um orçamento à medida.</p>
        <ContactActions variant="gold" showWhatsAppFallback={false} secondary={{ href: "#galeria", label: "Rever a galeria", symbol: "↑" }} />
        {!siteConfig.whatsappNumber ? (
          <p className="contact-fallback" role="status">O contacto de WhatsApp ainda não está disponível. Não apresentamos números provisórios; volte em breve{siteConfig.instagramUrl ? " ou acompanhe as novidades no Instagram" : " para conhecer os canais oficiais"}.</p>
        ) : null}
      </div>
    </section>
  );
}
