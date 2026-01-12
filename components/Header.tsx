"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo_horizontal from "@/public/img/aquapro_logo_horizontal.svg";

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
    <header className="topbar">
      <div className="container">
        <div className="navWrap">
          <Link href="/" className="logo">
            <Image
              src={logo_horizontal}
              alt="AquaPro-Détect"
              className="icon"
            />
          </Link>

          <button className={"burger " + burger} onClick={toggleBurger}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>

          <nav className={"nav " + nav}>
            <Link className="pill" href="/services" onClick={toggleBurger}>
              Services
            </Link>
            <Link className="pill" href="/problemes" onClick={toggleBurger}>
              Problèmes
            </Link>
            <Link
              className="pill"
              href="/assurances-rapports"
              onClick={toggleBurger}
            >
              Assurances & Rapports
            </Link>
            <Link className="pill" href="/a-propos" onClick={toggleBurger}>
              À propos
            </Link>
            <Link className="pill" href="/contact" onClick={toggleBurger}>
              Contact
            </Link>
            <Link
              className="pill pillPrimary"
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
