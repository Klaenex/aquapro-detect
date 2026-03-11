"use client";

import { motion } from "motion/react";
import styles from "./Advantages.module.scss";

type Props = {
  advantages: string[];
};

export default function Advantages({ advantages }: Props) {
  return advantages ? (
    <motion.section
      className={styles.Advantages}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className={styles.Advantages__card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      >
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
          <p>Avantages client</p>
        </div>

        <motion.ul
          className={styles.Advantages__ul}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
          }}
        >
          {advantages.map((advantage) => (
            <motion.li
              key={advantage}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {advantage}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.section>
  ) : null;
}
