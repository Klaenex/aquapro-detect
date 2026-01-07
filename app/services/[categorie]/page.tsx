import { Card, CardsGrid } from "@/components/Cards";
import { CATEGORIES } from "@/lib/content";
import { getCategory, getServicesByCategory, getServiceUrl } from "@/lib/utils";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;

  const category = getCategory(categorie);
  if (!category) return <div>Catégorie introuvable.</div>;

  const services = getServicesByCategory(category.slug);

  return (
    <div>
      <h1 className="h1">{category.title}</h1>
      <p className="lead">{category.excerpt}</p>

      <div className="section">
        <CardsGrid>
          {services.map((s) => (
            <Card
              key={s.slug}
              title={s.title}
              text={s.excerpt}
              href={getServiceUrl(s.categorySlug, s.slug)}
              badge="Service"
            />
          ))}
        </CardsGrid>
      </div>
    </div>
  );
}
