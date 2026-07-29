"use client";

import styles from "./About.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      {/* ========================
          + DECORATION — top left
      ======================== */}
      <span className={styles.plusTop}>+</span>

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
          <p>First paragraph goes here.</p>
          <p>Second paragraph goes here.</p>
          <p>Third paragraph goes here.</p>
        </div>
      </div>

      {/* ========================
          + DECORATION — bottom right
      ======================== */}
      <span className={styles.plusBottom}>+</span>
    </section>
  );
}
