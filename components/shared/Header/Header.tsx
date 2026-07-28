"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

/* ---- icons ---- */
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setMenuOpen(false);
      else setMenuOpen(true);
    };

    handleResize();
    setHasMounted(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`${styles.header} ${hasMounted ? styles.mounted : ""}`}>
      {" "}
      {/* ========================
          TOP ROW
      ======================== */}
      <div className={styles.topRow}>
        {/* left group — lang, linkedin, contact */}
        <div className={styles.topLeft}>
          <button className={styles.langToggle}>
            <span className={styles.langActive}>EN</span>
            <span>/</span>
            <span>HE</span>
          </button>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
          >
            <FaLinkedinIn />
          </a>

          <a href="#contact" className={styles.iconLink}>
            <FaEnvelope />
          </a>
        </div>
      </div>
      {/* ========================
          BOTTOM ROW
      ======================== */}
      <div className={styles.bottomRow}>
        {/* ---- left column (logo + nav) ---- */}
        <div className={styles.leftCol}>
          {/* logo */}
          <a href="#home" className={styles.logo}>
            BEN KEDEM
          </a>

          {/* vertical divider — desktop only */}
          <div
            className={`${styles.dividerVertical} ${!menuOpen ? styles.hidden : ""}`}
          />

          {/* navigation */}
          <nav className={`${styles.nav} ${!menuOpen ? styles.navClosed : ""}`}>
            <div className={styles.navRow}>
              <a href="#home" onClick={() => isMobile && setMenuOpen(false)}>
                Home
              </a>
              <a
                href="#projects"
                onClick={() => isMobile && setMenuOpen(false)}
              >
                Projects
              </a>
            </div>

            {/* horizontal divider */}
            <div className={styles.dividerHorizontal} />

            <div className={styles.navRow}>
              <a href="#about" onClick={() => isMobile && setMenuOpen(false)}>
                About
              </a>
              <a href="#contact" onClick={() => isMobile && setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </nav>
        </div>

        {/* ---- right column (menu button) ---- */}
        <div className={styles.rightCol}>
          <button
            className={`${styles.menuBtn} ${menuOpen && hasMounted ? styles.open : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {/* ========================
          MOBILE OVERLAY
      ======================== */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen && isMobile && hasMounted ? styles.overlayOpen : ""}`}
      >
        <nav className={styles.mobileNav}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
