import styles from "./ServiceCard.module.scss";
import {Category} from "@/lib/content";

type Props = {
    categories: Category[];
}

export default function ServiceCard({categories}:Props) {
    return(
        <section className={`${styles.ServiceCard} container`}>
            { categories ?
            <>
                <div className={styles.ServiceCard__title}>
                    <h2 className="h2">Nos services</h2>
                    <p className="lead">
                    Choisissez une catégorie pour accéder aux services détaillés.
                    </p>
                </div>
                <div className={styles.ServiceCard__body}>
                    {categories.map((c, i)=>(
                        <div key={i} className={styles.ServiceCard__category}>
                            <img src={c.imageURL} alt="" className={styles.ServiceCard__image}/>
                            <div className={styles.ServiceCard__text}>
                                <h3>{c.title}</h3>
                                <p>{c.excerpt}</p>
                                <a href={`/services/${c.slug}`}>voir →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            :
            null
            }
        </section>
    )
}