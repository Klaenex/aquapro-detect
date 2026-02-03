// components/ServicesCard.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCard.module.scss";
import { Category, Service } from "@/lib/content";

type Props = {
  categories?: Category[] | null;
  services?: Service[] | null;
  categorySlug?: string;
};

export default function ServiceCard({
  categories,
  services,
  categorySlug,
}: Props) {
  const hasServices = Array.isArray(services) && services.length > 0;
  const hasCategories = Array.isArray(categories) && categories.length > 0;

  return (
    <section className={`${styles.ServiceCard} container`}>
      {hasServices ? (
        <div className={styles.ServiceCard__body}>
          {services!.map((s) => (
            <div key={s.slug} className={styles.ServiceCard__category}>
              <Image
                src={s.imageURL}
                alt={s.title ?? ""}
                width={640}
                height={420}
                className={styles.ServiceCard__image}
              />

              <div className={styles.ServiceCard__text}>
                <h3>{s.title}</h3>
                <p>{s.excerptLong}</p>
                <Link
                  href={`/services/${categorySlug}/${s.slug}`}
                  className={styles.link__button}
                >
                  Plus d&apos;informations →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.ServiceCard__title}>
            <h2 className="h2">Nos services</h2>
            <p className="lead">
              Choisissez une catégorie pour accéder aux services détaillés.
            </p>
          </div>

          <div className={styles.ServiceCard__body}>
            {hasCategories
              ? categories!.map((c) => (
                  <div key={c.slug} className={styles.ServiceCard__category}>
                    <Image
                      src={c.imageURL}
                      alt={c.title ?? ""}
                      width={640}
                      height={420}
                      className={styles.ServiceCard__image}
                    />

                    <div className={styles.ServiceCard__text}>
                      <h3>{c.title}</h3>
                      <p>{c.excerptLong}</p>
                      <Link
                        href={`/services/${c.slug}`}
                        className={styles.link__button}
                      >
                        Plus d&apos;informations →
                      </Link>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </>
      )}
    </section>
  );
}
