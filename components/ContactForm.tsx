// import { useEffect } from "react";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {



    return(
        <section className={`${styles.ContactForm} container`}>
            <h2>Nous Contacter</h2>

            <form action="" className={styles.form} id="contact">
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name"/>
                </div>
                <div>
                    <label htmlFor="surname">Prénom</label>
                    <input type="text" id="surname"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"/>
                </div>
                <div>
                    <label htmlFor="subject">Objet</label>
                    <input type="text" id="subject"/>
                </div>
                <div>
                    <label htmlFor="contact">Message</label>
                    <textarea rows="4" name="comment" id="contact"></textarea>
                </div>
                <button type="submit">
                    SOUMETTRE
                </button>
            </form>
        </section>
    )
}