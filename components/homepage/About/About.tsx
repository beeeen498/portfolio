"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.scss";

/* register ScrollTrigger plugin */
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const plusTopRef = useRef<HTMLSpanElement>(null);
  const plusBottomRef = useRef<HTMLSpanElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const { lang } = useLanguage();
  const t = translations[lang].about;

  useEffect(() => {
    /* ========================
       + DECORATIONS — fade in
    ======================== */
    gsap.to([plusTopRef.current, plusBottomRef.current], {
      opacity: 0.45,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        id: "about",
        trigger: plusTopRef.current,
        start: "top 80%",
      },
    });

    /* ========================
       PARAGRAPHS — slide in / out one by one
    ======================== */
    paragraphsRef.current.forEach((p) => {
      if (!p) return;

      gsap.fromTo(
        p,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 0.85,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            id: "about",
            trigger: p,
            start: "top 100%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    /* cleanup — only kill About's scroll triggers */
    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === "about")
        .forEach((t) => t.kill());
    };
  }, [lang]);

  return (
    <section id="about" className={styles.about}>
      {/* ========================
          + DECORATION — top left
      ======================== */}
      <span className={styles.plusTop} ref={plusTopRef}>
        +++
      </span>

      {/* ========================
          CONTENT BLOCK
      ======================== */}
      <div className={styles.content}>
        {/* comment line */}
        <span className={styles.comment}>{t.comment}</span>

        {/* heading */}
        <h2
          className={`${styles.heading} ${lang === "he" ? styles.headingHe : ""}`}
        >
          {t.heading}
        </h2>

        {/* paragraphs */}
        <div className={styles.paragraphs} dir={lang === "he" ? "rtl" : "ltr"}>
          {" "}
          {/* ---- English ---- */}
          {lang === "en" && (
            <>
              <p
                ref={(el) => {
                  paragraphsRef.current[0] = el;
                }}
              >
                I'm a front-end developer who turns ideas into interactive,
                polished web experiences. I work with{" "}
                <span className={styles.neon}>Next.js</span>,{" "}
                <span className={styles.neon}>SCSS</span>,{" "}
                <span className={styles.neon}>Three.js</span>, and{" "}
                <span className={styles.neon}>GSAP</span> - tools that let me
                push pixels and performance as far as they'll go.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[1] = el;
                }}
              >
                I got into development because I've always been drawn to{" "}
                <span className={styles.neon}>creative work</span>. Building
                websites is where{" "}
                <span className={styles.neon}>design meets logic</span> - and
                that's where I thrive.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[2] = el;
                }}
              >
                When I'm not coding, I enjoy reading, gardening, cooking, or
                baking. I bring the same{" "}
                <span className={styles.neon}>attention to detail</span> to
                everything I do.
              </p>
            </>
          )}
          {/* ---- Hebrew ---- */}
          {lang === "he" && (
            <>
              <p
                ref={(el) => {
                  paragraphsRef.current[0] = el;
                }}
              >
                אני מפתח צד לקוח שהופך רעיונות לחוויות אינטרנט אינטראקטיביות
                ומלוטשות. אני עובד עם{" "}
                <span className={styles.neon}>Next.js</span>,{" "}
                <span className={styles.neon}>SCSS</span>,{" "}
                <span className={styles.neon}>Three.js</span> ו-
                <span className={styles.neon}>GSAP</span> - כלים שמאפשרים לי
                להראות את היצירתיות שלי.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[1] = el;
                }}
              >
                נכנסתי לתחום הפיתוח כי תמיד משכה אותי{" "}
                <span className={styles.neon}>עבודה יצירתית</span>. בניית אתרים
                היא המקום שבו{" "}
                <span className={styles.neon}>עיצוב פוגש לוגיקה</span> - ושם אני
                מרגיש בבית.
              </p>

              <p
                ref={(el) => {
                  paragraphsRef.current[2] = el;
                }}
              >
                בזמני הפנוי אני נהנה לקרוא, לעבוד בגינה, לבשל ולאפות. אני מביא
                את אותה{" "}
                <span className={styles.neon}>תשומת לב לפרטים הקטנים</span> לכל
                מה שאני עושה.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ========================
          + DECORATION — bottom right
      ======================== */}
      <span className={styles.plusBottom} ref={plusBottomRef}>
        +++
      </span>
    </section>
  );
}
