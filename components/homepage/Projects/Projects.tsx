"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjectsSorted, type Project } from "@/lib/projects";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations/translations";
import gsap from "gsap";
import Carousel from "./Carousel";
import styles from "./Projects.module.scss";

/* register ScrollTrigger plugin */
gsap.registerPlugin(ScrollTrigger);

/* get projects sorted by display order */
const projects = getProjectsSorted();

export default function Projects() {
  /* ========================
     STATE
  ======================== */
  const [activeId, setActiveId] = useState(projects[0].id);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  /* active project data */
  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  /* ========================
     SCROLL TRIGGER — set inView when section enters viewport
  ======================== */
  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => setInView(true),
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      {/* hidden heading for SEO + screen readers */}
      <h2 className={styles.srOnly}>My Projects</h2>

      {/* comment line — "// my work" */}
      <span className={styles.comment}>// my work</span>

      {/* ========================
          INFO ROW — name left, details right
      ======================== */}
      <div
        className={`${styles.infoRow} ${lang === "he" ? styles.infoRowHe : ""}`}
        dir={lang === "he" ? "rtl" : "ltr"}
      >
        {" "}
        {/* description + badges — left */}
        <div className={styles.projectDetails}>
          <p
            className={styles.projectSummary}
            dir={lang === "he" ? "rtl" : "ltr"}
          >
            {activeProject.summary[lang]}
          </p>{" "}
          {activeProject.stack.length > 0 && (
            <div className={styles.projectBadges}>
              {activeProject.stack.map((tech) => (
                <span key={tech} className={styles.projectBadge}>
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* project name — right */}
        <h3 className={styles.projectName}>{activeProject.name[lang]}</h3>
      </div>

      {/* ========================
          CAROUSEL
      ======================== */}
      <div className={styles.carouselWrapper}>
        <Carousel
          projects={projects}
          activeId={activeId}
          onActiveChange={setActiveId}
          startDelay={2.5}
          inView={inView}
        />
      </div>

      {/* view project button */}
      {activeProject.wip ? (
        <span
          className={`${styles.detailButton} ${styles.detailButtonDisabled}`}
        >
          {t.viewProject}
        </span>
      ) : (
        <a
          href={activeProject.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.detailButton}
        >
          {t.viewProject}
        </a>
      )}
    </section>
  );
}
