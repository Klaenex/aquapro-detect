import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import { CATEGORIES, SERVICES } from "@/lib/content";
import {
  getCategory,
  getRequestUrl,
  getService,
  getServicesByCategory,
} from "@/lib/utils";
import styles from "../../RequestPage.module.scss";

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    categorie: s.categorySlug,
    service: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; service: string }>;
}): Promise<Metadata> {
  const { categorie, service: serviceSlug } = await params;

  const category = getCategory(categorie);
  const service = getService(categorie, serviceSlug);

  if (!category || !service) {
    return {
      title: "Demande d’intervention | AquaPro-Détect Belgium",
      description:
        "Envoyez une demande d’intervention pour être recontacté rapidement.",
    };
  }

  const title = `Demande d’intervention | ${service.title} | AquaPro-Détect Belgium`;
  const description = `Formulaire dédié pour ${service.title} (${category.title}).`;

  return {
    title,
    description,
    alternates: {
      canonical: `/demande-intervention/${categorie}/${serviceSlug}/`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/demande-intervention/${categorie}/${serviceSlug}/`,
    },
  };
}

export default async function RequestServicePage({
  params,
}: {
  params: Promise<{ categorie: string; service: string }>;
}) {
  const { categorie, service: serviceSlug } = await params;

  const category = getCategory(categorie);
  const service = getService(categorie, serviceSlug);

  if (!category || !service) return <div>Service introuvable.</div>;

  const menuGroups = CATEGORIES.map((cat) => ({
    category: cat,
    services: getServicesByCategory(cat.slug),
  }));

  return (
    <div>
      <div style={{ display: "grid", gap: 8 }}>
        <h1 className="h1">Demande d’intervention</h1>
        <p className="lead">
          Sélectionnez un service dans le menu pour changer de formulaire.
        </p>
      </div>

      <div className={styles.layout} style={{ marginTop: 20 }}>
        <aside className={styles.menu} aria-label="Menu des services">
          <div className={styles.menuTitle}>Changer de service</div>
          {menuGroups.map((group) => (
            <div key={group.category.slug} className={styles.menuGroup}>
              <div className={styles.menuCategory}>{group.category.title}</div>
              <div className={styles.menuList}>
                {group.services.map((item) => {
                  const href = getRequestUrl(
                    group.category.slug,
                    item.slug
                  );
                  const isActive =
                    group.category.slug === category.slug &&
                    item.slug === service.slug;

                  return (
                    <Link
                      key={item.slug}
                      className={`${styles.menuLink} ${
                        isActive ? styles.menuLinkActive : ""
                      }`}
                      href={href}
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
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="lead" style={{ marginTop: 0 }}>
              Service choisi : <strong>{service.title}</strong>
            </span>
            <Link
              className="pill"
              href={`/services/${category.slug}/${service.slug}`}
            >
              Voir la page du service
            </Link>
          </div>

          <div className="section" style={{ marginTop: 16 }}>
            <RequestForm
              serviceTitle={service.title}
              serviceCategory={category.title}
              formType={service.formType}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
