export function getFormsUrl(path: string) {
  const defaultBasePath = "/projets/aquapro-detect";
  const formsBase = process.env.NEXT_PUBLIC_FORMS_BASE_URL?.trim() || "";
  const siteBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.trim() || defaultBasePath;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const cleanSiteBasePath =
    siteBasePath && siteBasePath !== "/"
      ? siteBasePath.replace(/\/+$/, "")
      : "";

  if (formsBase) {
    if (typeof window !== "undefined") {
      try {
        const formsUrl = new URL(formsBase);
        const isLocalFormsHost =
          formsUrl.hostname === "localhost" || formsUrl.hostname === "127.0.0.1";
        const isCurrentHostLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        // Ignore a local dev forms URL when the site is running on a real host.
        if (isLocalFormsHost && !isCurrentHostLocal) {
          return `${cleanSiteBasePath}${cleanPath}`;
        }
      } catch {
        // If the env var is malformed, fall back to the site-relative URL below.
      }
    }

    return `${formsBase}${cleanPath}`;
  }

  return `${cleanSiteBasePath}${cleanPath}`;
}

export function getSiteUrl(path: string) {
  const defaultBasePath = "/projets/aquapro-detect";
  const siteBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH?.trim() || defaultBasePath;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const cleanSiteBasePath =
    siteBasePath && siteBasePath !== "/"
      ? siteBasePath.replace(/\/+$/, "")
      : "";

  return `${cleanSiteBasePath}${cleanPath}`;
}

type FormsResponse = {
  ok?: boolean;
  error?: string;
};

export async function parseFormsResponse(
  response: Response
): Promise<FormsResponse | null> {
  const raw = await response.text();
  const trimmed = raw.trim();

  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed) as FormsResponse;
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    const candidate = trimmed.slice(start, end + 1);

    try {
      return JSON.parse(candidate) as FormsResponse;
    } catch {
      return null;
    }
  }
}
