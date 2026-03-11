import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { FadeInSection, StaggerDiv, StaggerItemDiv } from "@/components/animations";
import { PROBLEMS } from "@/lib/content";
import { getService, getServiceUrl } from "@/lib/utils";
import styles from "./ProblemsPage.module.scss";

export const metadata: Metadata = {
  title: "Problèmes | AquaPro-Détect Belgium",
  description:
    "Odeurs d’égout, humidité & moisissures, fissures & stabilité : trouvez le bon service (inspection caméra, test fumigène, recherche de fuite…).",
  alternates: { canonical: "/problemes/" },
  openGraph: {
    title: "Problèmes | AquaPro-Détect Belgium",
    description:
      "Pages orientées client : on part du symptôme pour vous guider vers le bon service.",
    url: "/problemes/",
    type: "website",
  },
};

const problemCategory = {
  title: "Problèmes fréquents",
  excerpt:
    "Vous voyez les symptômes, nous vous aidons à remonter à la cause probable puis au bon service.",
};

export default function ProblemsPage() {
  return (
    <>
      <Hero category={problemCategory} service={null} />

      <div className={`${styles.page} container`}>
        <div className={styles.intro}>
          <FadeInSection className={styles.introCard}>
            <span className={styles.eyebrow}>Orientation rapide</span>
            <h1 className={styles.title}>
              Partez du symptôme pour trouver l’intervention adaptée
            </h1>
            <p className={styles.lead}>
              Odeur persistante, traces d’humidité, moisissures, fissures ou
              suspicion sur le réseau: cette page vous aide à identifier les
              pistes les plus probables avant intervention.
            </p>
            <ul className={styles.checkList}>
              <li>Diagnostic ciblé avant travaux inutiles</li>
              <li>Orientation vers le bon service selon le symptôme</li>
              <li>Possibilité de demande d’intervention immédiate</li>
            </ul>
          </FadeInSection>

          <FadeInSection className={styles.asideCard}>
            <h2 className={styles.asideTitle}>Comment utiliser cette page</h2>
            <div className={styles.statList}>
              <div className={styles.statItem}>
                <p className={styles.statValue}>1</p>
                <p className={styles.statLabel}>
                  Choisissez le symptôme qui correspond le mieux à votre
                  situation.
                </p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statValue}>2</p>
                <p className={styles.statLabel}>
                  Consultez les services recommandés pour confirmer l’origine du
                  problème.
                </p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statValue}>3</p>
                <p className={styles.statLabel}>
                  Si besoin, envoyez une demande d’intervention avec le bon
                  contexte.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <StaggerDiv className={styles.grid}>
          {PROBLEMS.map((problem) => (
            <StaggerItemDiv key={problem.slug} className={styles.problemCard}>
              <div className={styles.problemTop}>
                <h2 className={styles.problemTitle}>{problem.title}</h2>
                <p className={styles.problemExcerpt}>{problem.excerpt}</p>
              </div>

              <ul className={styles.problemContent}>
                {problem.content.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <div className={styles.servicesBlock}>
                <p className={styles.servicesTitle}>Services recommandés</p>
                <div className={styles.tagList}>
                  {problem.relatedServices.map((related) => {
                    const service = getService(
                      related.categorySlug,
                      related.serviceSlug
                    );

                    if (!service) return null;

                    return (
                      <Link
                        key={`${related.categorySlug}-${related.serviceSlug}`}
                        className={styles.tag}
                        href={getServiceUrl(
                          related.categorySlug,
                          related.serviceSlug
                        )}
                      >
                        {service.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className={styles.actions}>
                <Link className={styles.buttonPrimary} href={`/problemes/${problem.slug}`}>
                  Voir le détail
                </Link>
                <Link className={styles.button} href="/demande-intervention">
                  Demander une intervention
                </Link>
              </div>
            </StaggerItemDiv>
          ))}
        </StaggerDiv>

        <FadeInSection className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Un doute sur le bon service ?</h2>
          <p className={styles.ctaText}>
            Décrivez simplement votre symptôme dans la demande d’intervention.
            Nous orienterons le diagnostic vers la méthode la plus pertinente
            pour éviter les recherches inutiles.
          </p>
          <div className={styles.ctaActions}>
            <Link className={styles.buttonPrimary} href="/demande-intervention">
              Faire une demande
            </Link>
            <Link className={styles.button} href="/contact">
              Nous contacter
            </Link>
          </div>
        </FadeInSection>
      </div>
    </>
  );
}
