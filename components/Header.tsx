"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo_horizontal from "@/public/img/aquapro_logo_horizontal.svg";
import styles from "./Header.module.scss";
import Nav from "./Nav";

export default function Header() {
  const [nav, setNav] = useState<"inactive" | "active">("inactive");
  const [burger, setBurger] = useState<"" | "cross">("");

  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 800px)").matches;

  function toggleBurger() {
    if (!isMobile()) {
      setBurger("");
      setNav("inactive");
      return;
    }

    setBurger((prev) => (prev === "" ? "cross" : ""));
    setNav((prev) => (prev === "inactive" ? "active" : "inactive"));
  }

  useEffect(() => {
    if (nav === "active") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [nav]);

  useEffect(() => {
    function onResize() {
      if (!isMobile()) {
        setNav("inactive");
        setBurger("");
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={styles.topbar}>
      <div className="container">
        <div className={styles.navWrap}>
          <h1 className={styles.title}>
            <span className={styles["title--hide"]}>AquaPro-Détect</span>

            <Link href="/" className={styles.logo}>
              <Image
                src={logo_horizontal}
                alt="AquaPro-Détect"
                className={styles.icon}
              />
            </Link>
          </h1>

          <button
            className={`${styles.burger} ${burger === "cross" ? styles.cross : ""}`}
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
