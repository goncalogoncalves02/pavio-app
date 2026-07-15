import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/contact";

type SecondaryAction = {
  href: string;
  label: string;
  symbol: string;
  external?: boolean;
};

type ContactActionsProps = {
  message?: string;
  showWhatsAppFallback?: boolean;
  variant?: "default" | "gold";
  secondary?: SecondaryAction;
};

export function ContactActions({
  message = siteContent.defaultWhatsAppMessage,
  showWhatsAppFallback = true,
  variant = "default",
  secondary,
}: ContactActionsProps) {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber ?? undefined, message);
  const buttonClass = `button ${variant === "gold" ? "button--gold" : "button--primary"}`;
  const linkClass = `text-link${variant === "gold" ? " text-link--light" : ""}`;

  return (
    <div className="contact-actions">
      {whatsappUrl ? (
        <a className={buttonClass} href={whatsappUrl} target="_blank" rel="noreferrer">
          Falar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
      ) : showWhatsAppFallback ? (
        <a className={buttonClass} href="#contactos">
          Ver formas de contacto <span aria-hidden="true">↓</span>
        </a>
      ) : null}
      {secondary ? (
        <a
          className={linkClass}
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {secondary.label} <span aria-hidden="true">{secondary.symbol}</span>
        </a>
      ) : siteConfig.instagramUrl ? (
        <a className={linkClass} href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Acompanhar no Instagram <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
