"use client";

import Link from "next/link";
import styles from "./Nav.module.scss";
import { CATEGORIES, SERVICES, type Service } from "@/lib/content";

type Props = {
  nav: string;
  toggleBurger: () => void;
};

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

function buildServicesChildren() {
  const servicesByCategory = SERVICES.reduce<Record<string, Service[]>>(
    (acc, service) => {
      (acc[service.categorySlug] ??= []).push(service);
      return acc;
    },
    {},
  );

  return CATEGORIES.map((cat) => {
    const categoryServices = servicesByCategory[cat.slug] ?? [];
    const children: NavChild[] = categoryServices.map((service) => ({
      label: service.navTitle,
      href: `/services/${cat.slug}/${service.slug}`,
    }));

    return {
      label: cat.navTitle,
      href: `/services/${cat.slug}`,
      children: children.length ? children : undefined,
    };
  });
}

export default function Nav({ nav, toggleBurger }: Props) {
  const servicesCategories = buildServicesChildren();

  return (
    <nav
      className={`${styles.nav} ${
        nav === "inactive" ? styles["nav--inactive"] : ""
      }`}
    >
      <div className={styles["nav__services-wrap"]}>
        <Link
          className={styles["nav__link"]}
          href="/services"
          onClick={toggleBurger}
          aria-haspopup="menu"
          aria-expanded="false"
        >
          Services
        </Link>

        <ul className={styles["nav__dropdown"]} role="menu">
          {servicesCategories.map((cat) => {
            const hasSubmenu = !!cat.children?.length;

            return (
              <li
                key={cat.href}
                className={`${styles["nav__item"]} ${
                  hasSubmenu ? styles["nav__item--has-submenu"] : ""
                }`}
                role="none"
              >
                <Link
                  href={cat.href}
                  onClick={toggleBurger}
                  className={`${styles["nav__link"]} ${styles["nav__link--category"]}`}
                  role="menuitem"
                >
                  {cat.label}
                </Link>

                {hasSubmenu ? (
                  <ul className={styles["nav__submenu"]} role="menu">
                    {cat.children!.map((child) => (
                      <li
                        key={child.href}
                        className={styles["nav__submenu-item"]}
                        role="none"
                      >
                        <Link
                          href={child.href}
                          onClick={toggleBurger}
                          className={`${styles["nav__link"]} ${styles["nav__link--service"]}`}
                          role="menuitem"
                        >
                          {child.label}
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
