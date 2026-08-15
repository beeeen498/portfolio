"use client";

import { useEffect, useRef, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations/translations";
import gsap from "gsap";
import styles from "./Hero.module.scss";

/* ========================
   TYPING SPEED — ms per letter
======================== */
const TYPING_SPEED = 120;

/* ========================
   CODE SNIPPETS — your own source code
   shown as faded background layers
======================== */
const codeLayers = [
  `const [menuOpen, setMenuOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);`,

  `export const metadata: Metadata = {
  title: "Ben Kedem | Front End Developer",
  description: "Portfolio showcasing projects",
  keywords: ["React", "Next.js", "Portfolio"],
  authors: [{ name: "Ben Kedem" }],
  openGraph: {
    title: "Ben Kedem | Front End Developer",
    type: "website",
    locale: "en_US",
  },
};`,

  `* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  overflow-x: hidden;
  background-color: $grey;
  color: $black;
  font-family: $font-abel;
}
h1, h2, h3 {
  font-family: $font-teko;
  text-transform: uppercase;
}`,
  `function positionCards(rotation: number) {
  const { cx, cy } = getCenter();
  const { radius, cardW, cardH } = getResponsive();
  cardsRef.current.forEach((card, i) => {
    const angleDeg = i * ANGLE_STEP + rotation;
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const x = cx + Math.cos(angleRad) * radius;
    const y = cy + Math.sin(angleRad) * radius;
    const isTop = normalizedAngle < ANGLE_STEP / 2;
    gsap.to(card, { x, y, scale: isTop ? 1.07 : 1 });
  });
}`,
];

export default function Hero() {
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const codeLayersRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const { isLoading } = useLoader();
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  /* ========================
     GSAP — slide-in on page load
     + typing effect on the greeting
     (only runs once on first load)
  ======================== */
  useEffect(() => {
    /* don't start until loader is done */
    if (isLoading) return;

    /* skip if already animated */
    if (hasAnimated) return;

    /* fade in code layers over 1.5s */
    gsap.to(codeLayersRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    let interval: NodeJS.Timeout;
    const greeting = t.greeting;

    /* start typing after 0.4s */
    const delay = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      interval = setInterval(() => {
        i++;
        setDisplayedGreeting(greeting.slice(0, i));

        /* done typing — hide cursor, slide in name + role + scroll */
        if (i >= greeting.length) {
          clearInterval(interval);
          setShowCursor(false);
          setHasAnimated(true);

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: 0.4,
          });

          tl.to(nameRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
          })
            .to(
              roleRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
              },
              "-=0.3",
            )
            .to(
              scrollRef.current,
              {
                opacity: 1,
                duration: 0.5,
              },
              "-=0.2",
            );
        }
      }, TYPING_SPEED);
    }, 500);

    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [isLoading]);

  /* ========================
     LANGUAGE SWITCH — update text instantly
     (only after initial animation has played)
  ======================== */
  useEffect(() => {
    if (!hasAnimated) return;
    setDisplayedGreeting(t.greeting);
  }, [lang, hasAnimated, t.greeting]);

  /* ========================
     PARALLAX — scroll + mouse
  ======================== */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    /* depth multipliers — higher = moves more */
    const depths = [0.03, 0.06, 0.09, 0.05];

    /* --- mouse movement --- */
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      /* center the origin so movement goes both ways */
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;

      layersRef.current.forEach((layer, i) => {
        if (!layer) return;
        const depth = depths[i];
        const moveX = x * depth * 500;
        const moveY = y * depth * 500;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    /* --- scroll movement --- */
    const handleScroll = () => {
      const scrollY = window.scrollY;

      layersRef.current.forEach((layer, i) => {
        if (!layer) return;
        const depth = depths[i];
        const moveY = scrollY * depth * 2;
        layer.style.transform = `translateY(${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      {/* ========================
          PARALLAX CODE LAYERS
      ======================== */}
      <div className={styles.codeLayers} ref={codeLayersRef}>
        {codeLayers.map((code, i) => (
          <div
            key={i}
            ref={(el) => {
              layersRef.current[i] = el;
            }}
            className={`${styles.codeLayer} ${styles[`layer${i}`]}`}
          >
            <pre>{code}</pre>
          </div>
        ))}
      </div>

      {/* ========================
          HERO TEXT
      ======================== */}
      <div
        className={`${styles.textBlock} ${lang === "he" ? styles.textBlockHe : ""}`}
      >
        {" "}
        {/* line 1 — greeting (typing effect) */}
        <span
          className={styles.greeting}
          ref={greetingRef}
          dir={lang === "he" ? "rtl" : "ltr"}
        >
          {displayedGreeting}
          {showCursor && <span className={styles.cursor}>|</span>}
        </span>
        {/* line 2 — name */}
        <h1 className={styles.name} ref={nameRef}>
          {t.name}
        </h1>
        {/* line 3 — role */}
        <span className={styles.role} ref={roleRef}>
          {t.role}
        </span>
      </div>

      {/* ========================
          SCROLL DOWN INDICATOR
      ======================== */}
      <a
        href="#about"
        className={styles.scrollIndicator}
        aria-label="Scroll down"
        ref={scrollRef}
      >
        <span className={styles.arrow} />
      </a>
    </section>
  );
}
