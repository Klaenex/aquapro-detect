import styles from "./ServiceToForm.module.scss";


export default function ServiceToForm() {
    return(
        <section className={styles.ServiceToForm}>
            <div className={styles.ServiceToForm__card}>
                <p className={styles.ServiceToForm__title}>Besoin de service ?</p>
                <p className={styles.ServiceToForm__text}>Remplissez notre formulaire de demande et nous vous recontacterons rapidement.</p>
                <a href="" className={styles.ServiceToForm__button}>Demander une Intervention</a>
            </div>
        </section>
    )
}