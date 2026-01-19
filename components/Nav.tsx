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
      if (!acc[service.categorySlug]) acc[service.categorySlug] = [];
      acc[service.categorySlug].push(service);
      return acc;
    },
    {}
  );

  return (
    <nav
      className={`${styles.nav} ${
        nav === "inactive" ? styles["nav--inactive"] : ""
      }`}
    >
      <Link
        className={styles["nav__link"]}
        href="/services"
        onClick={toggleBurger}
      >
        Services
      </Link>

      <div className={styles["nav__services-wrap"]}>
        <ul className={styles["nav__dropdown"]}>
          {CATEGORIES.map((cat) => {
            const categoryServices = servicesByCategory[cat.slug] ?? [];
            const hasSubmenu = categoryServices.length > 0;

            return (
              <li
                key={cat.slug}
                className={`${styles["nav__item"]} ${
                  hasSubmenu ? styles["nav__item--has-submenu"] : ""
                }`}
              >
                <Link
                  href={`/services/${cat.slug}`}
                  onClick={toggleBurger}
                  className={`${styles["nav__link"]} ${styles["nav__link--category"]}`}
                >
                  {cat.navTitle}
                </Link>

                {hasSubmenu ? (
                  <ul className={styles["nav__submenu"]}>
                    {categoryServices.map((service) => (
                      <li
                        key={service.slug}
                        className={styles["nav__submenu-item"]}
                      >
                        <Link
                          href={`/services/${cat.slug}/${service.slug}`}
                          onClick={toggleBurger}
                          className={`${styles["nav__link"]} ${styles["nav__link--service"]}`}
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

      <Link
        className={styles["nav__link"]}
        href="/problemes"
        onClick={toggleBurger}
      >
        Problèmes
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/assurances-rapports"
        onClick={toggleBurger}
      >
        Assurances & Rapports
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/a-propos"
        onClick={toggleBurger}
      >
        À propos
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/contact"
        onClick={toggleBurger}
      >
        Contact
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/urgence-24-7"
        onClick={toggleBurger}
      >
        Urgence 24/7
      </Link>
    </nav>
  );
}
