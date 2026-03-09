export function getFormsUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_FORMS_BASE_URL?.trim() || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
