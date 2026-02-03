// Hero.tsx
"use client";
import { HERO } from "@/lib/content";
import styles from "./Hero.module.scss";

import Link from "next/link";

type Props = {
  category: {
    slug?: string; // rendu optionnel
    title: string;
    navTitle?: string; // rendu optionnel (tu n'en as pas l'utilité ici)
    excerpt: string;
  } | null;
  service: {
    title: string;
    hero: string;
  } | null;
};

export default function Hero({ category, service }: Props) {
  return (
    <section className={styles.hero}>
      {service || category ? (
        <></>
      ) : (
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.background}
        >
          <path d="m0 120 60-10c60-10 180-30 300-40s240-10 360-5 240 15 360 20 240 5 300 5h60v30z" />
        </svg>
      )}
      <div className={styles.container}>
        <div className={styles.textContainer}>
          {service ? (
            <>
              {/* On ne rend le Link que si category.slug est présent */}
              {category && category.slug ? (
                <Link
                  className={styles.pill}
                  href={`/services/${category.slug}`}
                >
                  ← {category.title}
                </Link>
              ) : category ? (
                // Si pas de slug mais il y a une category, on affiche une "pill" non cliquable
                <span className={styles.pill}>← {category.title}</span>
              ) : null}
              <h2 className={styles.title}>{service.title}</h2>
              <p className={styles.paragraph}>{service.hero}</p>
            </>
          ) : category ? (
            <>
              <Link className={styles.pill__category} href={`/`}>
                ← revenir à l&apos;accueil
              </Link>
              <h2 className={styles.title}>{category.title}</h2>
              <p className={styles.paragraph}>{category.excerpt}</p>
            </>
          ) : (
            <>
              <h2 className={styles.title}>
                {HERO.title[0]}
                <span className={styles.highlight}>{HERO.title[1]}</span>
              </h2>
              <p className={styles.paragraph}>{HERO.first_paragraph}</p>
              <p className={styles.paragraph}>{HERO.second_paragraph}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
