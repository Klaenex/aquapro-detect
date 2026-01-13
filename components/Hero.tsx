import "@/styles/components/_hero.scss"
import {HERO} from "@/lib/content";

export default function Hero() {
    return (
        <section className="Hero">
            <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="background">
                <path d="m0 120 60-10c60-10 180-30 300-40s240-10 360-5 240 15 360 20 240 5 300 5h60v30z"/>
            </svg>
            <div className="container">
                <div className="textContainer">
                    <h1>
                        {HERO.title[0]}
                        <span>{HERO.title[1]}</span>
                    </h1>
                    <p>{HERO.first_paragraph}</p>
                    <p>{HERO.second_paragraph}</p>
                </div>
            </div>
        </section>
    )
}