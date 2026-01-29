
import styles from "./SingleServiceLinks.module.scss";
import {getServicesByCategory, getServiceUrl} from "@/lib/utils";

type Props = {
    category : {
        slug: string;
        title: string;
        navTitle: string;
        excerpt: string;
    };
    service: string;
}

export default function SingleServiceLinks({category, service}:Props) {
    const services = getServicesByCategory(category.slug)

    return(
        <section className={styles.SingleServiceLinks}>
            <div className={styles.SingleServiceLinks__card}>
                <p className={styles.SingleServiceLinks__title}>Autres services</p>
                <div className={styles.SingleServiceLinks__lead}>
                    { services ?
                    services.map((s)=>(
                        s.slug !== service ?
                            <a 
                            key={s.slug} 
                            href={getServiceUrl(s.categorySlug, s.slug)}
                            >
                                {s.title}
                            </a>
                        :
                        null
                        
                    ))
                    :
                    null
                    }
                </div>
            </div>
        </section>
    )
}