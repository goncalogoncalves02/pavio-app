import { siteContent } from "@/content/site";
import { normalizeWhatsAppNumber } from "@/lib/contact";
import {
  normalizeExternalUrl,
  resolveServiceArea,
  resolveSiteOrigin,
} from "@/lib/site-config";

const resolvedOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
const serviceArea = resolveServiceArea(
  process.env.NEXT_PUBLIC_SERVICE_AREA,
  siteContent.business.locality,
);

export const siteConfig = {
  origin: resolvedOrigin.origin,
  isPublicOriginConfigured: resolvedOrigin.isPublic,
  whatsappNumber: normalizeWhatsAppNumber(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  ),
  instagramUrl: normalizeExternalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  serviceArea,
} as const;
