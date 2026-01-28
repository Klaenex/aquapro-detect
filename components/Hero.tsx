'use client'
import { HERO } from "@/lib/content";
import styles from "./Hero.module.scss";
import { useEffect } from "react";
import Link from "next/link";

type Props = {
  category : {
  slug: string;
  title: string;
  navTitle: string;
  excerpt: string;
  } | null;
  service: {
    title: string;
    hero: string;
  } | null;
}

export default function Hero({category, service}:Props) {

  return (
    <section className={styles.hero}>
      { service || category ?
        <></>
        :
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.background}
        >
          <path d="m0 120 60-10c60-10 180-30 300-40s240-10 360-5 240 15 360 20 240 5 300 5h60v30z" />
        </svg>
      }
      <div className={styles.container}>
        <div className={styles.textContainer}>
          { service?
          <>
            { category ?
            <Link className={styles.pill} href={`/services/${category.slug}`}>
            ← {category.title}
            </Link>
            :
            null
            }
            <h2 className={styles.title}>
              {service.title}
            </h2>
            <p className={styles.paragraph}>{service.hero}</p>
          </>
          :
          category ?
          <>
            <Link className={styles.pill__category} href={`/`}>
              ← revenir à l'accueil
            </Link>
            <h2 className={styles.title}>
            {category.title}</h2>
            <p className={styles.paragraph}>{category.excerpt}</p>
          </>
          :
          <>
            <h2 className={styles.title}>
            {HERO.title[0]}
            <span className={styles.highlight}>{HERO.title[1]}</span>
            </h2>
            <p className={styles.paragraph}>{HERO.first_paragraph}</p>
            <p className={styles.paragraph}>{HERO.second_paragraph}</p>
          </>
          }
        </div>
      </div>
    </section>
  );
}
