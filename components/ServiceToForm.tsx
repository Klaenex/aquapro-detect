import styles from "./ServiceToForm.module.scss";
import Link from "next/link";
import { getRequestUrl } from "@/lib/utils";
import { FadeInSection, StaggerItemDiv } from "./animations";

type ServiceToFormProps = {
  categorySlug: string;
  serviceSlug: string;
};

export default function ServiceToForm({
  categorySlug,
  serviceSlug,
}: ServiceToFormProps) {
  const requestUrl = getRequestUrl(categorySlug, serviceSlug);

  return (
    <FadeInSection className={styles.ServiceToForm}>
      <StaggerItemDiv className={styles.ServiceToForm__card}>
        <p className={styles.ServiceToForm__title}>Besoin de service ?</p>
        <p className={styles.ServiceToForm__text}>
          Remplissez notre formulaire de demande et nous vous recontacterons
          rapidement.
        </p>
        <Link href={requestUrl} className={styles.ServiceToForm__button}>
          Demander une Intervention →
        </Link>
      </StaggerItemDiv>
    </FadeInSection>
  );
}
