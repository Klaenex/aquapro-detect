import Link from "next/link";

type CardProps = {
  title: string;
  text: string;
  href: string;
  badge?: string;
};

export function Card({ title, text, href, badge }: CardProps) {
  return (
    <Link href={href} className="card">
      {badge ? <div className="badge">{badge}</div> : null}
      <h3 className="cardTitle" style={{ marginTop: badge ? 10 : 0 }}>
        {title}
      </h3>
      <p className="cardText">{text}</p>
      <div style={{ marginTop: 12, fontWeight: 700 }}>Voir →</div>
    </Link>
  );
}

export function CardsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid">{children}</div>;
}
