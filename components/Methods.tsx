import styles from "./Methods.module.scss";


export default function Methods({methods}) {
    return(
        <>
        { methods ?
            <section className={`${styles.Methods} container`}>
                <div className={styles["Methods__title"]}>
                    <div className={styles["Methods__icon"]}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="feather feather-tool"
                        >
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    </div>
                    <h3 className="h3">Méthodes & équipements</h3>
                </div>
                <ul className={styles["Methods__lead"]}>
                    {methods.map((m) => (
                    <li key={m}>{m}</li>
                    ))}
                </ul>
            </section>
        :
            ""
        }
        </>
    )
}