"use client";

import { motion } from "motion/react";
import styles from "./SingleServiceLinks.module.scss";
import { getServicesByCategory, getServiceUrl } from "@/lib/utils";

type Props = {
  category: {
    slug: string;
    title: string;
    navTitle: string;
    excerpt: string;
  };
  service: string;
};

export default function SingleServiceLinks({ category, service }: Props) {
  const services = getServicesByCategory(category.slug);

  return (
    <motion.section
      className={styles.SingleServiceLinks}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className={styles.SingleServiceLinks__card}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
        }}
      >
        <p className={styles.SingleServiceLinks__title}>Autres services</p>
        <div className={styles.SingleServiceLinks__lead}>
          {services
            ? services.map((item) =>
                item.slug !== service ? (
                  <a key={item.slug} href={getServiceUrl(item.categorySlug, item.slug)}>
                    {item.title}
                  </a>
                ) : null
              )
            : null}
        </div>
      </motion.div>
    </motion.section>
  );
}
