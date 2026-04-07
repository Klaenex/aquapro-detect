"use client";

// components/ServicesCard.tsx
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ServiceCard.module.scss";
import { Category, Service } from "@/lib/content";
import { FadeInSection, StaggerDiv, StaggerItemDiv } from "./animations";
import { MOBILE_QUERY } from "@/lib/breakpoints";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const sectionViewport = { once: true, amount: isMobile ? 0.08 : 0.2 };

  return (
    <FadeInSection
      className={`${styles.ServiceCard} container`}
      viewport={sectionViewport}
    >
      {hasServices ? (
        <StaggerDiv className={styles.ServiceCard__body} viewport={sectionViewport}>
          {services!.map((s) => (
            <StaggerItemDiv key={s.slug} className={styles.ServiceCard__category}>
              <div className={styles.ServiceCard__divImage}>
                <img
                  src={s.imageURL}
                  alt={s.title ?? ""}
                  className={styles.ServiceCard__image}
                  loading="lazy"
                />
              </div>

              <div className={styles.ServiceCard__text}>
                <h3>{s.title}</h3>
                <p>{s.excerptLong}</p>
                <Link href={`/services/${categorySlug}/${s.slug}`}>voir →</Link>
              </div>
            </StaggerItemDiv>
          ))}
        </StaggerDiv>
      ) : (
        <>
          <StaggerItemDiv className={styles.ServiceCard__title}>
            <h2 className="h2">Nos services</h2>
            <p className="lead">
              Choisissez une catégorie pour accéder aux services détaillés.
            </p>
          </StaggerItemDiv>

          <StaggerDiv className={styles.ServiceCard__body} viewport={sectionViewport}>
            {hasCategories
              ? categories!.map((c) => (
                  <StaggerItemDiv key={c.slug} className={styles.ServiceCard__category}>
                    <div className={styles.ServiceCard__divImage}>
                      <img
                        src={c.imageURL}
                        alt={c.title ?? ""}
                        className={styles.ServiceCard__image}
                        loading="lazy"
                      />
                    </div>

                    <div className={styles.ServiceCard__text}>
                      <h3>{c.title}</h3>
                      <p>{c.excerptLong}</p>
                      <Link href={`/services/${c.slug}`}>voir →</Link>
                    </div>
                  </StaggerItemDiv>
                ))
              : null}
          </StaggerDiv>
        </>
      )}
    </FadeInSection>
  );
}
