"use client";

import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* ========================
          HERO TEXT
      ======================== */}
      <div className={styles.textBlock}>
        {/* line 1 — greeting */}
        <span className={styles.greeting}>hello, i&apos;m</span>

        {/* line 2 — name */}
        <h1 className={styles.name}>BEN KEDEM</h1>

        {/* line 3 — role */}
        <span className={styles.role}>front end developer</span>
      </div>
    </section>
  );
}