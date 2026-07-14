const DEVELOPMENT_ORIGIN = "http://localhost:3000";

export type ResolvedSiteOrigin = {
  origin: string;
  isPublic: boolean;
};

export function resolveSiteOrigin(_value?: string): ResolvedSiteOrigin {
  const value = _value?.trim();

  if (!value) {
    return { origin: DEVELOPMENT_ORIGIN, isPublic: false };
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return { origin: DEVELOPMENT_ORIGIN, isPublic: false };
    }

    return { origin: url.origin, isPublic: true };
  } catch {
    return { origin: DEVELOPMENT_ORIGIN, isPublic: false };
  }
}

export function normalizeExternalUrl(value?: string): string | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
