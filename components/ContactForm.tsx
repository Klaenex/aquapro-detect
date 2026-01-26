'use client'
import { useEffect, useState } from "react";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
    const [formInfo, setFormInfo] = useState({})

    const handleInput = (e) => {
        const {name, value} = e.target
        setFormInfo({...formInfo, [name]:value})
    }

    useEffect(()=>{
        console.log(formInfo)
    },[formInfo])

    return(
        <section className={`${styles.ContactForm} container`}>
            <h2>Nous Contacter</h2>

            <form action="" className={styles.form} id="contact">
                <div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" name="name" onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="surname">Prénom</label>
                    <input type="text" id="surname" name="surname" onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="subject">Objet</label>
                    <input type="text" id="subject" name="subject" onChange={handleInput}/>
                </div>
                <div>
                    <label htmlFor="contact">Message</label>
                    <textarea name="comment" id="contact" onChange={handleInput}></textarea>
                </div>
                <button type="submit">
                    SOUMETTRE
                </button>
            </form>
        </section>
    )
}