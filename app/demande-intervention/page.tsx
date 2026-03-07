import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import Hero from "@/components/Hero";
import { CATEGORIES, SERVICES } from "@/lib/content";
import {
  getCategory,
  getRequestUrl,
  getService,
  getServicesByCategory,
} from "@/lib/utils";
import styles from "./RequestPage.module.scss";

export const metadata: Metadata = {
  title: "Demande d’intervention | AquaPro-Détect Belgium",
  description:
    "Formulaire de demande d’intervention avec sélection du service adapté.",
  alternates: { canonical: "/demande-intervention/" },
  openGraph: {
    title: "Demande d’intervention | AquaPro-Détect Belgium",
    description:
      "Choisissez un service dans le menu et remplissez le formulaire dédié.",
    url: "/demande-intervention/",
    type: "website",
  },
};

export default function RequestPage() {
  const defaultService = SERVICES[0];
  const defaultCategory = defaultService
    ? getCategory(defaultService.categorySlug)
    : null;

  if (!defaultService || !defaultCategory) {
    return <div>Service introuvable.</div>;
  }

  const service = getService(defaultCategory.slug, defaultService.slug);
  if (!service) return <div>Service introuvable.</div>;

  const menuGroups = CATEGORIES.map((cat) => ({
    category: cat,
    services: getServicesByCategory(cat.slug),
  }));

  return (
    <div className={styles.container}>
      <Hero
        category={null}
        service={{
          title: "Demande d'intervention",
          hero: "Choisissez un service dans le menu pour changer de formulaire.",
          ctaHref: `/services/${defaultCategory.slug}/${service.slug}`,
          ctaLabel: "← Voir la page du service",
        }}
      />

      <div className={`${styles.layout} ${styles.layoutWrapper}`}>
        <aside className={styles.menu} aria-label="Menu des services">
          <div className={styles.menuTitle}>Changer de service</div>
          {menuGroups.map((group) => (
            <div key={group.category.slug} className={styles.menuGroup}>
              <div className={styles.menuCategory}>{group.category.title}</div>
              <div className={styles.menuList}>
                {group.services.map((item) => {
                  const href = getRequestUrl(group.category.slug, item.slug);
                  const isActive =
                    group.category.slug === defaultCategory.slug &&
                    item.slug === service.slug;

                  return (
                    <Link
                      key={item.slug}
                      className={`${styles.menuLink} ${
                        isActive ? styles.menuLinkActive : ""
                      }`}
                      href={href}
                      scroll={false}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <section>
          <div className={`section ${styles.formPane}`}>
            <RequestForm
              serviceTitle={service.title}
              serviceCategory={defaultCategory.title}
              formType={service.formType}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
