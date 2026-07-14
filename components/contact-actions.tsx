import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/contact";

type ContactActionsProps = {
  message?: string;
  compact?: boolean;
  showWhatsAppFallback?: boolean;
};

export function ContactActions({
  message = siteContent.defaultWhatsAppMessage,
  compact = false,
  showWhatsAppFallback = true,
}: ContactActionsProps) {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber ?? undefined, message);

  return (
    <div className={`contact-actions${compact ? " contact-actions--compact" : ""}`}>
      {whatsappUrl ? (
        <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer">
          Falar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
      ) : showWhatsAppFallback ? (
        <a className="button button--primary" href="#contactos">
          Ver formas de contacto <span aria-hidden="true">↓</span>
        </a>
      ) : null}
      {siteConfig.instagramUrl ? (
        <a className="text-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Acompanhar no Instagram <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
