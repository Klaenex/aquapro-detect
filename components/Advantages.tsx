import styles from "./Advantages.module.scss";


export default function Advantages({advantages}) {
    return(
        <>
        { advantages ?
        <section className={styles.Advantages}>
            <div className={styles.Advantages__card}>
                <div className={styles.Advantages__title}>
                    <div className={styles.Advantages__icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="feather feather-award"
                        >
                            <circle cx={12} cy={8} r={7} />
                            <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
                        </svg>
                    </div>
                    <h3 className="h3">Avantages client</h3>
                </div>
                <ul className={styles.Advantages__ul}>
                    {advantages.map((a) => (
                        <li key={a}>{a}</li>
                    ))}
                </ul>
            </div>
        </section>
        :
        null
        }
        </>
    )
}