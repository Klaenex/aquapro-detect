"use client";
import React, { useEffect, useState } from "react";
import styles from "./ContactForm.module.scss";
import { sendEmail } from "../lib/ContactFormEmail";

// type FormInfo = Record<string, string>;
type FormInfo = {
    name : string,
    surname: string,
    email : string,
    subject: string,
    comment: string
}

export default function ContactForm() {
  const [formInfo, setFormInfo] = useState<FormInfo>({} as FormInfo);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formInfo);
  }, [formInfo]);

  function send() {
    console.log(formInfo);
    sendEmail(formInfo);
  }

  return (
    <section className={`${styles.ContactForm} container`}>
      <h2>Nous Contacter</h2>

      <form action={send} className={styles.form} id="contact" >
        <div>
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" onChange={handleInput} />
        </div>
        <div>
          <label htmlFor="surname">Prénom</label>
          <input
            type="text"
            id="surname"
            name="surname"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={handleInput} />
        </div>
        <div>
          <label htmlFor="subject">Objet</label>
          <input
            type="text"
            id="subject"
            name="subject"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="contact">Message</label>
          <textarea
            name="comment"
            id="contact"
            onChange={handleInput}
          ></textarea>
        </div>
        <button type="submit">SOUMETTRE</button>
      </form>
    </section>
  );
}
