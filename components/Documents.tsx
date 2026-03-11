import styles from "./Documents.module.scss";
import { FadeInSection, StaggerItemDiv, StaggerItemLi } from "./animations";

type Props = {
  documents: string[];
};

export default function Documents({ documents }: Props) {
  return documents ? (
    <FadeInSection className={styles.Documents}>
      <StaggerItemDiv className={styles.Documents__title}>
        <div className={styles.Documents__icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="feather feather-file-text"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        </div>
        <h3 className="h3">Documents fournis sur demande</h3>
      </StaggerItemDiv>

      <div className={styles.Documents__lead}>
        <ul className={styles.Documents__ul}>
          {documents.map((document) => (
            <StaggerItemLi key={document}>{document}</StaggerItemLi>
          ))}
        </ul>
      </div>
    </FadeInSection>
  ) : null;
}
