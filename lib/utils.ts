import { CATEGORIES, SERVICES, PROBLEMS } from "@/lib/content";

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getService(categorySlug: string, serviceSlug: string) {
  return (
    SERVICES.find(
      (s) => s.categorySlug === categorySlug && s.slug === serviceSlug
    ) || null
  );
}

export function getServicesByCategory(categorySlug: string) {
  return SERVICES.filter((s) => s.categorySlug === categorySlug);
}

export function getProblem(slug: string) {
  return PROBLEMS.find((p) => p.slug === slug) || null;
}

export function getServiceUrl(categorySlug: string, serviceSlug: string) {
  return `/services/${categorySlug}/${serviceSlug}`;
}
