import {WHYAQUA} from "@/lib/content";
import styles from "./WhyAqua.module.scss"

export default function WhyAqua() {
    return(
        <section className={`${styles.WhyAqua} container`}>
            <h2>{WHYAQUA.title}</h2>
            <p>{WHYAQUA.paragraph[0]}</p>
            <p>{WHYAQUA.paragraph[1]}</p>
            <p>{WHYAQUA.paragraph[2]}</p>
            <p>{WHYAQUA.paragraph[3]}</p>
        </section>
    )
}