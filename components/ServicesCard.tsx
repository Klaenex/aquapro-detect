import styles from "./ServiceCard.module.scss";
import {Category, Service} from "@/lib/content";

type Props = {
    categories: Category[] | null;
    services: Service[] | null;
}

export default function ServiceCard({categories, services}:Props) {
    return(
        <section className={`${styles.ServiceCard} container`}>
            { services ?
            <>
                <div className={styles.ServiceCard__body}>
                    {services.map((s, i)=>(
                        <div key={i} className={styles.ServiceCard__category}>
                            <img src={s.imageURL} alt="" className={styles.ServiceCard__image}/>
                            <div className={styles.ServiceCard__text}>
                                <h3>{s.title}</h3>
                                <p>{s.excerpt}</p>
                                <a href={`/services/${s.slug}`}>voir →</a>
                            </div>
                        </div>
                    ))}
                </div>
            </>
            :
            <>
                <div className={styles.ServiceCard__title}>
                    <h2 className="h2">Nos services</h2>
                    <p className="lead">
                    Choisissez une catégorie pour accéder aux services détaillés.
                    </p>
                </div>
                <div className={styles.ServiceCard__body}>
                    { categories ?
                    categories.map((c, i)=>(
                        <div key={i} className={styles.ServiceCard__category}>
                            <img src={c.imageURL} alt="" className={styles.ServiceCard__image}/>
                            <div className={styles.ServiceCard__text}>
                                <h3>{c.title}</h3>
                                <p>{c.excerpt}</p>
                                <a href={`/services/${c.slug}`}>voir →</a>
                            </div>
                        </div>
                    ))
                    :
                    null
                    }
                </div>
            </>
            }
        </section>
    )
}