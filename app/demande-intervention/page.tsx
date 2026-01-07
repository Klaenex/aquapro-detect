import Link from "next/link";
import { CATEGORIES, SERVICES } from "@/lib/content";
import { getServiceUrl } from "@/lib/utils";

export default function RequestPage() {
  return (
    <div>
      <h1 className="h1">Demande d’intervention</h1>
      <p className="lead">
        Choisissez d’abord le service concerné. Ensuite, vous pourrez remplir le
        formulaire dédié (prochaine étape).
      </p>

      {CATEGORIES.map((c) => {
        const items = SERVICES.filter((s) => s.categorySlug === c.slug);
        return (
          <div key={c.slug} className="section">
            <h2 className="h2">{c.title}</h2>
            <p className="lead">{c.excerpt}</p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 12,
              }}
            >
              {items.map((s) => (
                <Link
                  key={s.slug}
                  className="pill"
                  href={getServiceUrl(s.categorySlug, s.slug)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
