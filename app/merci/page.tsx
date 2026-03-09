import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/content";
import styles from "./MerciPage.module.scss";

export const metadata: Metadata = {
  title: "Merci | AquaPro-Détect Belgium",
  description:
    "Confirmation : votre demande a été envoyée. Nous vous recontactons rapidement.",
  alternates: { canonical: "/merci/" },
  robots: { index: false, follow: true }, // on évite d’indexer la page de confirmation
  openGraph: {
    title: "Merci | AquaPro-Détect Belgium",
    description: "Votre demande a bien été envoyée.",
    url: "/merci/",
    type: "website",
  },
};

export default function MerciPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const { service } = searchParams ?? {};

  return (
    <section className={`${styles.page} container`}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <span className={styles.badge}>Demande envoyée</span>
          <h1 className={styles.title}>Merci, votre demande est bien reçue.</h1>
          <p className={styles.lead}>
            Nous revenons vers vous rapidement
            {service ? (
              <>
                {" "}
                pour <strong>{service}</strong>
              </>
            ) : null}
            .
          </p>
        </header>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Prochaines étapes</h2>
          <ol className={styles.steps}>
            <li>Analyse de votre demande et des détails transmis.</li>
            <li>Prise de contact pour confirmer le créneau.</li>
            <li>Intervention selon l’urgence et vos disponibilités.</li>
          </ol>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Urgence immédiate</h2>
          <div className={styles.phones}>
            <a
              className={`${styles.pill} ${styles.pillPrimary}`}
              href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
            >
              Appeler {CONTACT.phone1}
            </a>
            <a className={styles.pill} href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}>
              Appeler {CONTACT.phone2}
            </a>
          </div>
        </div>

        <div className={styles.actions}>
          <Link className={styles.pill} href="/services">
            Retour aux services
          </Link>
          <Link className={styles.pill} href="/contact">
            Contact
          </Link>
          <Link className={styles.pill} href="/">
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
