import styles from "./Process.module.scss";


export default function Process({process}) {
    return(
        <section className={styles.Process}>
            <div className={styles["Process__title"]}>
                <div className={styles["Process__icon"]}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="feather feather-list"
                    >
                        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                </div>
                <h3 className="h3">Processus d’intervention</h3>
            </div>
            {process ?
                <div className={styles.Process__lead}>
                    {process.map((p,i) => (
                        <div className={styles.Process__li}>
                            <p key={p} className={styles.Process__numbers}>{i+1}</p>
                            <p key={p}>{p}</p>
                        </div>
                    ))}
                </div>
            :
                null
            }
        </section>
    )
}