"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo_horizontal from "@/public/img/aquapro_logo_horizontal.svg";
import styles from "./Header.module.scss";

import { CATEGORIES, SERVICES, type Service } from "@/lib/content";

export default function Header() {
  const [nav, setNav] = useState("inactive");
  const [burger, setBurger] = useState("");
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

  function toggleBurger() {
    if (burger === "") {
      setBurger("cross");
      setNav("active");
    } else {
      setBurger("");
      setNav("inactive");
    }
  }
  return (
    <header className={styles.topbar}>
      <div className="container">
        <div className={styles.navWrap}>
          <h1 className={styles.title}>
            <span className={styles["title--hide"]}>AquaPro-Détect</span>
            <Link href="/" className={styles.logo} onClick={toggleBurger}>
              <Image
                src={logo_horizontal}
                alt="AquaPro-Détect"
                className={styles.icon}
              />
            </Link>
          </h1>

          <button
            className={`${styles.burger} ${
              burger === "cross" ? styles.cross : ""
            }`}
            onClick={toggleBurger}
            type="button"
            aria-label="Ouvrir / fermer le menu"
            aria-expanded={nav !== "inactive"}
          >
            <span className={styles.bar1}></span>
            <span className={styles.bar2}></span>
            <span className={styles.bar3}></span>
          </button>

          <nav
            className={`${styles.nav} ${
              nav === "inactive" ? styles.inactive : ""
            }`}
          >
            <Link
              className={styles.link}
              href="/services"
              onClick={toggleBurger}
            >
              Services
            </Link>
            <div className={styles.servicesWrap}>
              <ul className={styles.dropdown}>
                {CATEGORIES.map((cat) => {
                  const categoryServices = servicesByCategory[cat.slug] ?? [];
                  return (
                    <li
                      key={cat.slug}
                      className={`${styles.dropdownItem}, ${styles.titleSubmenu}`}
                    >
                      <Link
                        href={`/services/${cat.slug}`}
                        onClick={toggleBurger}
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
              className={styles.Link}
              href="/problemes"
              onClick={toggleBurger}
            >
              Problèmes
            </Link>

            <Link
              className={styles.link}
              href="/assurances-rapports"
              onClick={toggleBurger}
            >
              Assurances & Rapports
            </Link>

            <Link
              className={styles.link}
              href="/a-propos"
              onClick={toggleBurger}
            >
              À propos
            </Link>

            <Link
              className={styles.link}
              href="/contact"
              onClick={toggleBurger}
            >
              Contact
            </Link>

            <Link
              className={styles.link}
              href="/urgence-24-7"
              onClick={toggleBurger}
            >
              Urgence 24/7
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
