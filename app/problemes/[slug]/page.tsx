import Link from "next/link";
import { PROBLEMS } from "@/lib/content";
import { getProblem, getServiceUrl } from "@/lib/utils";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const problem = getProblem(slug);
  if (!problem) return <div>Problème introuvable.</div>;

  return (
    <div>
      <Link className="pill" href="/problemes">
        ← Tous les problèmes
      </Link>

      <h1 className="h1" style={{ marginTop: 16 }}>
        {problem.title}
      </h1>
      <p className="lead">{problem.excerpt}</p>

      <div className="section card">
        {problem.content.map((line, idx) => (
          <p
            key={idx}
            className="lead"
            style={{ marginTop: idx === 0 ? 0 : 10 }}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="section">
        <h2 className="h2">Services recommandés</h2>
        <div
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}
        >
          {problem.relatedServices.map((r) => (
            <Link
              key={`${r.categorySlug}-${r.serviceSlug}`}
              className="pill"
              href={getServiceUrl(r.categorySlug, r.serviceSlug)}
            >
              Voir le service →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
