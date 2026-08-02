"use client";

import styles from "./Footer.module.scss";

/* ---- icons ---- */
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  /* smooth scroll to top */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      {/* ========================
          NAV LINKS
      ======================== */}
      <nav className={styles.nav}>
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* ========================
          DIVIDER LINE
      ======================== */}
      <div className={styles.divider} />

      {/* ========================
          BOTTOM — credit + copyright
      ======================== */}
      <div className={styles.bottom}>
        {/* created by — links to LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credit}
        >
          Created by <span className={styles.footerName}>Ben Kedem</span>
        </a>

        {/* copyright */}
        <span className={styles.copyright}>© 2026</span>
      </div>

      {/* ========================
          BACK TO TOP BUTTON
      ======================== */}
      <button
        className={styles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>
    </footer>
  );
}
