"use client";
import React, { useState } from "react";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const fd = new FormData(e.currentTarget);
    const hp = String(fd.get("website") || "");
    if (hp.trim().length > 0) {
      setStatus("ok");
      setFeedback("Merci, votre message a bien été envoyé.");
      return;
    }

    const payload = {
      nom: String(fd.get("name") || ""),
      prenom: String(fd.get("surname") || ""),
      email: String(fd.get("email") || ""),
      objet: String(fd.get("subject") || ""),
      message: String(fd.get("comment") || ""),
      page: typeof window !== "undefined" ? window.location.pathname : "",
      submittedAt: new Date().toISOString(),
      website: hp,
    };

    if (
      !payload.nom.trim() ||
      !payload.prenom.trim() ||
      !payload.email.trim() ||
      !payload.objet.trim() ||
      !payload.message.trim()
    ) {
      setStatus("error");
      setFeedback("Merci de compléter tous les champs obligatoires.");
      return;
    }

    try {
      const res = await fetch("/forms/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Erreur serveur");
      }

      setStatus("ok");
      setFeedback("Merci, votre message a bien été envoyé.");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setFeedback(
        "Désolé, l’envoi a échoué. Veuillez réessayer ou nous appeler."
      );
    }
  }

  return (
    <section className={`${styles.ContactForm} container`}>
      <h2>Nous Contacter</h2>

      <form onSubmit={onSubmit} className={styles.form} id="contact">
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="surname">Prénom</label>
          <input type="text" id="surname" name="surname" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="subject">Objet</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div>
          <label htmlFor="contact">Message</label>
          <textarea name="comment" id="contact" required></textarea>
        </div>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "ENVOI..." : "SOUMETTRE"}
        </button>
        <p
          className={`${styles.feedback} ${
            status === "error" ? styles.feedbackError : styles.feedbackOk
          }`}
          aria-live="polite"
        >
          {feedback}
        </p>
      </form>
    </section>
  );
}
