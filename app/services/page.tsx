import { CATEGORIES } from "@/lib/content";
import { Card, CardsGrid } from "@/components/Cards";

export default function ServicesPage() {
  return (
    <div>
      <h1 className="h1">Services</h1>
      <p className="lead">
        Accédez à chaque catégorie de services AquaPro-Détect.
      </p>

      <div className="section">
        <CardsGrid>
          {CATEGORIES.map((c) => (
            <Card
              key={c.slug}
              title={c.title}
              text={c.excerpt}
              href={`/services/${c.slug}`}
              badge="Catégorie"
            />
          ))}
        </CardsGrid>
      </div>
    </div>
  );
}
