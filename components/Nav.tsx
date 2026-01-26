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
    {}
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

// Helper identique au header pour garder le breakpoint synchrone
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 1023px)").matches;

export default function Nav({ nav, toggleBurger }: Props) {
  const servicesCategories = buildServicesChildren();

  // Wrapper qui n'appelle toggleBurger que sur mobile (pratique pour tous les links)
  const maybeToggle = () => {
    if (isMobile()) toggleBurger();
  };

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
          onClick={maybeToggle}
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
                  onClick={maybeToggle}
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
                          onClick={maybeToggle}
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
        onClick={maybeToggle}
      >
        Problèmes
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/assurances-rapports"
        onClick={maybeToggle}
      >
        Assurances & Rapports
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/a-propos"
        onClick={maybeToggle}
      >
        À propos
      </Link>

      <Link
        className={styles["nav__link"]}
        href="/contact"
        onClick={maybeToggle}
      >
        Contact
      </Link>

      <Link
        href="/demande-intervention"
        onClick={maybeToggle}
        className={`${styles["nav__link"]} ${styles["nav__link--button"]}`}
      >
        Demander une intervention
      </Link>
    </nav>
  );
}
