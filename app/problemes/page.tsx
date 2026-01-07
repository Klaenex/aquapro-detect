import { PROBLEMS } from "@/lib/content";
import { Card, CardsGrid } from "@/components/Cards";

export default function ProblemsPage() {
  return (
    <div>
      <h1 className="h1">Problèmes</h1>
      <p className="lead">
        Pages orientées client : on part du symptôme pour vous guider vers le
        bon service.
      </p>

      <div className="section">
        <CardsGrid>
          {PROBLEMS.map((p) => (
            <Card
              key={p.slug}
              title={p.title}
              text={p.excerpt}
              href={`/problemes/${p.slug}`}
              badge="Problème"
            />
          ))}
        </CardsGrid>
      </div>
    </div>
  );
}
