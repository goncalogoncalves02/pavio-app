import { ContactActions } from "@/components/contact-actions";
import { siteConfig } from "@/config/site";

export function Contacts() {
  return (
    <section className="contact-section" id="contactos" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="contact-inner">
        <p className="eyebrow">Comecemos por uma ideia</p><h2 id="contact-title">Que luz gostaria de criar?</h2>
        <p>Conte-nos a ocasião, o ambiente ou a pessoa que tem em mente. Respondemos com disponibilidade e um orçamento à medida.</p>
        <ContactActions showWhatsAppFallback={false} />
        {!siteConfig.whatsappNumber ? (
          <p className="contact-fallback" role="status">O contacto de WhatsApp ainda não está disponível. Não apresentamos números provisórios; volte em breve{siteConfig.instagramUrl ? " ou acompanhe as novidades no Instagram" : " para conhecer os canais oficiais"}.</p>
        ) : null}
      </div>
    </section>
  );
}
