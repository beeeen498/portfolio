"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoader } from "@/context/LoaderContext";
import styles from "./Loader.module.scss";

/* ========================
   LOADING — in different languages
======================== */
const loadingWords = [
  "Loading", // English
  "טוען", // Hebrew
  "読み込み中", // Japanese
  "جار التحميل", // Arabic
  "Chargement", // French
  "Cargando", // Spanish
  "Caricamento", // Italian
  "Laden", // German
  "로딩", // Korean
  "Carregando", // Portuguese
];

const CYCLE_SPEED = 400; // ms between each word
const MIN_DURATION = 3000; // minimum 3 seconds on screen

export default function Loader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    /* ========================
       WORD CYCLE — swap word every 300ms
    ======================== */
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingWords.length);
    }, CYCLE_SPEED);

    /* ========================
       EXIT LOGIC — wait for both:
       1. minimum 3 seconds
       2. page fully loaded
    ======================== */
    const minTimer = new Promise((resolve) =>
      setTimeout(resolve, MIN_DURATION),
    );

    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true);
      } else {
        window.addEventListener("load", () => resolve(true), { once: true });
      }
    });

    /* when both conditions are met — slide up and remove */
    Promise.all([minTimer, pageLoad]).then(() => {
      clearInterval(interval);

      /* GSAP slide up exit */
      gsap.to(loaderRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setVisible(false);
          setIsLoading(false);
        },
      });
    });

    return () => clearInterval(interval);
  }, [setIsLoading]);

  /* don't render after exit animation */
  if (!visible) return null;

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.textLine}>
        {/* static part — console.log(" */}
        <span>console.log(&quot;</span>

        {/* loading word — swaps between languages */}
        <span className={styles.word}>{loadingWords[currentIndex]}</span>

        {/* static part — ") */}
        <span>&quot;)</span>
      </div>
    </div>
  );
}
