import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/content";

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
  // searchParams est fourni comme un objet (pas une Promise) dans App Router
  const { service } = searchParams ?? {};

  return (
    <div>
      <h1 className="h1">Merci !</h1>
      <p className="lead">
        Votre demande a bien été envoyée
        {service ? (
          <>
            {" "}
            pour <strong>{service}</strong>
          </>
        ) : null}
        . Nous vous recontactons rapidement.
      </p>

      <div className="section card" style={{ display: "grid", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 750 }}>
            En cas d’urgence, appelez directement :
          </div>
          <div className="lead" style={{ marginTop: 6 }}>
            <a
              className="pill pillPrimary"
              href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
            >
              Appeler {CONTACT.phone1}
            </a>{" "}
            <a
              className="pill"
              href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
            >
              Appeler {CONTACT.phone2}
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="pill" href="/services">
            Retour aux services
          </Link>
          <Link className="pill" href="/contact">
            Contact
          </Link>
          <Link className="pill" href="/">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
