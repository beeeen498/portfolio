"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoader } from "@/context/LoaderContext";
import styles from "./Loader.module.scss";

/* ========================
   LOADING — in different languages
======================== */
const loadingWords = [
  "Loading",
  "טוען",
  "読み込み中",
  "جار التحميل",
  "Chargement",
  "Cargando",
  "Caricamento",
  "Laden",
  "로딩",
  "Carregando",
];

const CYCLE_SPEED = 300;
const MIN_DURATION = 3000;

export default function Loader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoader();
  const [visible, setVisible] = useState(false);

  /* ========================
     SKIP IF ALREADY PLAYED — runs before paint
  ======================== */
  useLayoutEffect(() => {
    const hasPlayed = sessionStorage.getItem("loaderPlayed");
    if (hasPlayed) {
      setIsLoading(false);
      document.getElementById("pre-loader")?.remove();
    } else {
      setVisible(true);
    }
  }, [setIsLoading]);

  /* ========================
     LOADER ANIMATION — only runs if not already played
  ======================== */
  useEffect(() => {
    if (!visible) return;

    /* word cycle — swap word every 300ms */
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % loadingWords.length);
    }, CYCLE_SPEED);

    /* exit logic — wait for both min time + page load */
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

      /* remove curtain before slide — Loader is still on top */
      document.getElementById("pre-loader")?.remove();

      gsap.to(loaderRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setVisible(false);
          setIsLoading(false);
          sessionStorage.setItem("loaderPlayed", "true");
        },
      });
    });

    return () => clearInterval(interval);
  }, [visible, setIsLoading]);

  /* don't render after exit animation */
  if (!visible) return null;

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.textLine}>
        <span>console.log(&quot;</span>
        <span className={styles.word}>{loadingWords[currentIndex]}</span>
        <span>&quot;)</span>
      </div>
    </div>
  );
}
