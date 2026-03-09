import type { Metadata } from "next";
import Link from "next/link";
import styles from "./AboutPage.module.scss";

export const metadata: Metadata = {
  title: "À propos | AquaPro-Détect Belgium",
  description:
    "AquaPro-Détect Belgium : expérience, sérieux, transparence. Interventions soignées et recommandations concrètes.",
  alternates: { canonical: "/a-propos/" },
  openGraph: {
    title: "À propos | AquaPro-Détect Belgium",
    description:
      "Expérience, sérieux, tarifs annoncés à l’avance et interventions soignées.",
    url: "/a-propos/",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className={`${styles.page} container`}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <span className={styles.kicker}>AquaPro-Détect Belgium</span>
          <h1 className={styles.title}>À propos</h1>
          <p className={styles.lead}>
            Avec plus de 15 ans d’expérience, nous intervenons avec sérieux,
            transparence et professionnalisme pour des diagnostics fiables et
            des actions concrètes.
          </p>
        </header>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2 className={styles.h2}>Nos engagements</h2>
            <ul className={styles.list}>
              <li>Interventions réalisées avec soin et respect des lieux</li>
              <li>Diagnostic fiable et recommandations concrètes</li>
              <li>Tarifs annoncés à l’avance, sans surprises</li>
              <li>Possibilité de rapport pour assurance (sur demande)</li>
              <li>Communication claire avant, pendant et après intervention</li>
            </ul>
          </article>

          <aside className={styles.card}>
            <h2 className={styles.h2}>En quelques chiffres</h2>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <p className={styles.statValue}>15+ ans</p>
                <p className={styles.statLabel}>d’expérience terrain</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statValue}>24/7</p>
                <p className={styles.statLabel}>prise en charge des urgences</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statValue}>Belgique</p>
                <p className={styles.statLabel}>
                  interventions localisées et rapides
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.actions}>
          <Link className={`${styles.pill} ${styles.pillPrimary}`} href="/demande-intervention">
            Demander une intervention
          </Link>
          <Link className={styles.pill} href="/contact">
            Nous contacter
          </Link>
          <Link className={styles.pill} href="/services">
            Voir les services
          </Link>
        </div>
      </div>
    </section>
  );
}
