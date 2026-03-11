import {WHYAQUA} from "@/lib/content";
import styles from "./WhyAqua.module.scss"
import { FadeInSection, StaggerDiv, StaggerItemDiv } from "./animations";

export default function WhyAqua() {
    return(
        <FadeInSection className={`${styles.WhyAqua} container`}>
            <StaggerDiv>
                <StaggerItemDiv>
                    <h2>{WHYAQUA.title}</h2>
                </StaggerItemDiv>
                <StaggerItemDiv>
                    <p>{WHYAQUA.paragraph[0]}</p>
                </StaggerItemDiv>
                <StaggerItemDiv>
                    <p>{WHYAQUA.paragraph[1]}</p>
                </StaggerItemDiv>
                <StaggerItemDiv>
                    <p>{WHYAQUA.paragraph[2]}</p>
                </StaggerItemDiv>
                <StaggerItemDiv>
                    <p>{WHYAQUA.paragraph[3]}</p>
                </StaggerItemDiv>
            </StaggerDiv>
        </FadeInSection>
    )
}
