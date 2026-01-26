import styles from "./SingleServiceLinks.module.scss";
import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/content";
import { getCategory, getServicesByCategory } from "@/lib/utils";

export function generateStaticParams() {
    return CATEGORIES.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
    const { categorie } = await params;

    const category = getCategory(categorie);

    if (!category) {
        return {
        title: "Services | AquaPro-Détect Belgium",
        description:
            "Services AquaPro-Détect : détection, inspection, débouchage 24/7, entretien, réparations, nettoyage et sinistres.",
        };
    }

    const title = `${category.title} | Services | AquaPro-Détect Belgium`;
    const description =
    category.excerpt?.slice(0, 160) ||
    "Découvrez nos services : détection, inspection, débouchage 24/7, entretien, réparations, nettoyage et sinistres.";

    return {
    title,
    description,
    alternates: {
        canonical: `/services/${categorie}/`,
    },
    openGraph: {
        title,
        description,
        type: "website",
        url: `/services/${categorie}/`,
    },
    };
}

export default function SingleServiceLinks() {
    return(
        <section className={styles.SingleServiceLinks}>
            <div className={styles.SingleServiceLinks__card}>
                <h3 className="h3">Autres services</h3>
            </div>
        </section>
    )
}