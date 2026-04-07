const defaultBasePath = "";
const defaultSiteUrl = "https://aquapro-detect.be";

export function normalizeBasePath(value?: string) {
  const rawBasePath = value?.trim() || defaultBasePath;

  if (!rawBasePath || rawBasePath === "/") {
    return "";
  }

  return rawBasePath.replace(/\/+$/, "");
}

export function getBasePath() {
  return normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
}

export function withBasePath(path: string) {
  const basePath = getBasePath();

  if (!basePath || !path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}

export function getPublicSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl).replace(
    /\/+$/,
    "",
  );
}
