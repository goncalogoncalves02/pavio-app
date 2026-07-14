import { normalizeWhatsAppNumber } from "@/lib/contact";
import { normalizeExternalUrl, resolveSiteOrigin } from "@/lib/site-config";

const resolvedOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || null;

export const siteConfig = {
  origin: resolvedOrigin.origin,
  isPublicOriginConfigured: resolvedOrigin.isPublic,
  whatsappNumber: normalizeWhatsAppNumber(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  ),
  instagramUrl: normalizeExternalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  serviceArea,
} as const;
