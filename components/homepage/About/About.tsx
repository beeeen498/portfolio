"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.scss";

/* register ScrollTrigger plugin */
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const plusTopRef = useRef<HTMLSpanElement>(null);
  const plusBottomRef = useRef<HTMLSpanElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    /* ========================
       + DECORATIONS — fade in
    ======================== */
    gsap.to([plusTopRef.current, plusBottomRef.current], {
      opacity: 0.45,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
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
            trigger: p,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    });

    /* cleanup scroll triggers on unmount */
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
        {/* comment line — "// who am i" */}
        <span className={styles.comment}>// who am i</span>

        {/* heading */}
        <h2 className={styles.heading}>ABOUT</h2>

        {/* paragraphs */}
        <div className={styles.paragraphs}>
          <p
            ref={(el) => {
              paragraphsRef.current[0] = el;
            }}
          >
            I'm a front-end developer who turns ideas into interactive, polished
            web experiences. I work with{" "}
            <span className={styles.neon}>Next.js</span>,{" "}
            <span className={styles.neon}>SCSS</span>,{" "}
            <span className={styles.neon}>Three.js</span>, and{" "}
            <span className={styles.neon}>GSAP</span> - tools that let me push
            pixels and performance as far as they'll go.
          </p>

          <p
            ref={(el) => {
              paragraphsRef.current[1] = el;
            }}
          >
            I got into development because I've always been drawn to{" "}
            <span className={styles.neon}>creative work</span>. Building
            websites is where{" "}
            <span className={styles.neon}>design meets logic</span> - and that's
            where I thrive.
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
