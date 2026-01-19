"use client";
import Link from "next/link";
import styles from "./Nav.module.scss";
import { CATEGORIES, SERVICES, type Service } from "@/lib/content";

type Props = {
  nav: string;
  toggleBurger: () => void;
};

export default function Nav({ nav, toggleBurger }: Props) {
  const servicesByCategory = SERVICES.reduce<Record<string, Service[]>>(
    (acc, service) => {
      if (!acc[service.categorySlug]) {
        acc[service.categorySlug] = [];
      }
      acc[service.categorySlug].push(service);
      return acc;
    },
    {}
  );

  return (
    <nav
      className={`${styles.nav} ${nav === "inactive" ? styles.inactive : ""}`}
    >
      <Link className={styles.link} href="/services" onClick={toggleBurger}>
        Services
      </Link>

      <div className={styles.servicesWrap}>
        <ul className={styles.dropdown}>
          {CATEGORIES.map((cat) => {
            const categoryServices = servicesByCategory[cat.slug] ?? [];
            return (
              <li
                key={cat.slug}
                className={`${styles.dropdownItem} ${styles.titleSubmenu}`}
              >
                <Link
                  href={`/services/${cat.slug}`}
                  onClick={toggleBurger}
                  className={`${styles.link} ${styles.linkCategory}`}
                >
                  {cat.navTitle}
                </Link>
                {categoryServices.length ? (
                  <ul className={styles.submenu}>
                    {categoryServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${cat.slug}/${service.slug}`}
                          onClick={toggleBurger}
                          className={`${styles.link} ${styles.linkService}`}
                        >
                          {service.navTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <Link className={styles.link} href="/problemes" onClick={toggleBurger}>
        Problèmes
      </Link>

      <Link
        className={styles.link}
        href="/assurances-rapports"
        onClick={toggleBurger}
      >
        Assurances & Rapports
      </Link>

      <Link className={styles.link} href="/a-propos" onClick={toggleBurger}>
        À propos
      </Link>

      <Link className={styles.link} href="/contact" onClick={toggleBurger}>
        Contact
      </Link>

      <Link className={styles.link} href="/urgence-24-7" onClick={toggleBurger}>
        Urgence 24/7
      </Link>
    </nav>
  );
}
