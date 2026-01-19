"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo_horizontal from "@/public/img/aquapro_logo_horizontal.svg";
import styles from "./Header.module.scss";
import Nav from "./Nav";

export default function Header() {
  const [nav, setNav] = useState("inactive");
  const [burger, setBurger] = useState("");

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

          <Nav nav={nav} toggleBurger={toggleBurger} />
        </div>
      </div>
    </header>
  );
}
