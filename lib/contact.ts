export function normalizeWhatsAppNumber(
  value?: string,
): string | null {
  const candidate = value?.trim();

  if (!candidate || !/^[+\d\s().-]+$/.test(candidate)) {
    return null;
  }

  const digits = candidate.replace(/\D/g, "");

  return /^\d{8,15}$/.test(digits) ? digits : null;
}

export function buildWhatsAppUrl(
  number: string | undefined,
  message: string,
): string | null {
  const normalizedNumber = normalizeWhatsAppNumber(number);

  if (!normalizedNumber) {
    return null;
  }

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
