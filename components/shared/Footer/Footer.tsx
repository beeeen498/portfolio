"use client";

import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations/translations";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

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
        <a href="#home">{translations[lang].header.home}</a>
        <a href="#projects">{translations[lang].header.projects}</a>
        <a href="#about">{translations[lang].header.about}</a>
        <a href="#contact">{translations[lang].header.contact}</a>
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
          href="https://www.linkedin.com/in/ben-kedem/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credit}
        >
          {t.createdBy} <span className={styles.footerName}>{t.name}</span>
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
        aria-label={t.backToTop}
      >
        {t.backToTop}
      </button>
    </footer>
  );
}