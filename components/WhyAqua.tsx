import Link from "next/link";
import { WHYAQUA } from "@/lib/content";
import styles from "./WhyAqua.module.scss";
import { FadeInSection, StaggerDiv, StaggerItemDiv } from "./animations";

export default function WhyAqua() {
  return (
    <FadeInSection className={`${styles.WhyAqua} container`}>
      <StaggerDiv className={styles.card}>
        <StaggerItemDiv className={styles.eyebrow}>
          Pourquoi nous choisir
        </StaggerItemDiv>

        <StaggerItemDiv>
          <h2 className={styles.title}>{WHYAQUA.title}</h2>
        </StaggerItemDiv>

        <StaggerItemDiv>
          <p className={styles.lead}>{WHYAQUA.paragraph[0]}</p>
        </StaggerItemDiv>

        <StaggerItemDiv>
          <ul className={styles.list}>
            {WHYAQUA.paragraph.slice(1).map((paragraph) => (
              <li key={paragraph}>{paragraph}</li>
            ))}
          </ul>
        </StaggerItemDiv>

        <StaggerItemDiv className={styles.actions}>
          <Link className={styles.buttonPrimary} href="/demande-intervention">
            Faire une demande
          </Link>
          <Link className={styles.button} href="/contact">
            Nous contacter
          </Link>
        </StaggerItemDiv>
      </StaggerDiv>
    </FadeInSection>
  );
}
