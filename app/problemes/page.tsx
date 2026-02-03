import type { Metadata } from "next";
import { PROBLEMS } from "@/lib/content";

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

export default function ProblemsPage() {
  return (
    <div>
      <h1 className="h1">Problèmes</h1>
      <p className="lead">
        Pages orientées client : on part du symptôme pour vous guider vers le
        bon service.
      </p>

      <div className="section"></div>
    </div>
  );
}
