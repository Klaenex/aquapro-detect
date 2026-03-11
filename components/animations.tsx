"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

export const viewport = { once: true, amount: 0.2 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

type SectionProps = HTMLMotionProps<"section">;
type DivProps = HTMLMotionProps<"div">;
type LiProps = HTMLMotionProps<"li">;

export function FadeInSection({
  children,
  transition = { duration: 0.5, ease: "easeOut" },
  variants = fadeUp,
  initial = "hidden",
  whileInView = "visible",
  viewport: sectionViewport = viewport,
  ...props
}: SectionProps) {
  return (
    <motion.section
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={sectionViewport}
      transition={transition}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function FadeInDiv({
  children,
  transition = { duration: 0.45, ease: "easeOut" },
  variants = fadeUp,
  initial = "hidden",
  whileInView = "visible",
  viewport: divViewport = viewport,
  ...props
}: DivProps) {
  return (
    <motion.div
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={divViewport}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerDiv({
  children,
  variants = staggerContainer,
  initial = "hidden",
  whileInView = "visible",
  viewport: divViewport = viewport,
  ...props
}: DivProps) {
  return (
    <motion.div
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={divViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItemDiv({
  children,
  variants = fadeUp,
  transition = { duration: 0.4, ease: "easeOut" },
  ...props
}: DivProps) {
  return (
    <motion.div variants={variants} transition={transition} {...props}>
      {children}
    </motion.div>
  );
}

export function StaggerItemLi({
  children,
  variants = fadeUp,
  transition = { duration: 0.4, ease: "easeOut" },
  ...props
}: LiProps) {
  return (
    <motion.li variants={variants} transition={transition} {...props}>
      {children}
    </motion.li>
  );
}
