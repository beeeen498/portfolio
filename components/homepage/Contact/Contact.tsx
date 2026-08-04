"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations/translations";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.scss";

/* register ScrollTrigger plugin */
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  /* ========================
     FORM STATE
  ======================== */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"default" | "sending" | "sent">(
    "default",
  );

  /* ========================
     REFS — for GSAP animations
  ======================== */
  const inputGroupsRef = useRef<(HTMLDivElement | null)[]>([]);
  const submitRef = useRef<HTMLButtonElement>(null);
  const plusTopRef = useRef<HTMLSpanElement>(null);
  const plusBottomRef = useRef<HTMLSpanElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  /* ========================
     GSAP — fade/slide inputs in on scroll
  ======================== */
  useEffect(() => {
    /* +++ decorations — fade in */
    gsap.to([plusTopRef.current, plusBottomRef.current], {
      opacity: 0.45,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: plusTopRef.current,
        start: "top 80%",
      },
    });

    /* animate each input group */
    inputGroupsRef.current.forEach((group, i) => {
      if (!group) return;

      gsap.fromTo(
        group,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
          },
        },
      );
    });

    /* animate submit button */
    if (submitRef.current) {
      gsap.fromTo(
        submitRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: submitRef.current,
            start: "top 90%",
          },
        },
      );
    }

    /* cleanup scroll triggers on unmount */
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ========================
     VALIDATION
  ======================== */
  const validate = (): boolean => {
    const newErrors = { fullName: "", email: "", message: "" };
    let isValid = true;

    /* full name — required */
    if (!formData.fullName.trim()) {
      newErrors.fullName = t.errors.fullName;
      isValid = false;
    }

    /* email — required + valid format */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t.errors.email;
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.errors.email;
      isValid = false;
    }

    /* message — required */
    if (!formData.message.trim()) {
      newErrors.message = t.errors.message;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /* ========================
     HANDLE INPUT CHANGE
  ======================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    /* clear error for this field when user types */
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* ========================
   INIT EMAILJS
  ======================== */
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  /* ========================
   HANDLE SUBMIT
  ======================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* validate first */
    if (!validate()) return;

    /* set sending state */
    setStatus("sending");

    /* send email via EmailJS */
    try {
      await emailjs.send(
        "beeeen498",
        "template_w6x4i4b",
        {
          to_name: "Ben",
          from_name: formData.fullName,
          message: formData.message,
          user_email: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      setStatus("sent");
    } catch {
      setStatus("default");
    }
  };

  /* ========================
     RENDER — SUCCESS STATE
  ======================== */
  if (status === "sent") {
    return (
      <section id="contact" className={styles.contact}>
        {/* +++ decoration — top left */}
        <span className={styles.plusTop} ref={plusTopRef}>
          +++
        </span>

        <div className={styles.content}>
          <span className={styles.comment}>// get in touch</span>
          <h2
            className={`${styles.heading} ${lang === "he" ? styles.headingHe : ""}`}
          >
            {t.heading}
          </h2>
          <p className={styles.success}>{t.success}</p>
        </div>

        {/* +++ decoration — bottom right */}
        <span className={styles.plusBottom} ref={plusBottomRef}>
          +++
        </span>
      </section>
    );
  }

  /* ========================
   CLEAR ERRORS ON LANGUAGE CHANGE
  ======================== */
  useEffect(() => {
    setErrors({ fullName: "", email: "", message: "" });
  }, [lang]);

  /* ========================
     RENDER — FORM (default + sending)
  ======================== */
  return (
    <section id="contact" className={styles.contact}>
      {/* ========================
          +++ DECORATION — top left
      ======================== */}
      <span className={styles.plusTop} ref={plusTopRef}>
        +++
      </span>

      <div className={styles.content}>
        {/* comment line — "// get in touch" */}
        <span className={styles.comment}>// get in touch</span>

        {/* heading */}
        <h2
          className={`${styles.heading} ${lang === "he" ? styles.headingHe : ""}`}
        >
          {t.heading}
        </h2>

        {/* form */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          dir={lang === "he" ? "rtl" : "ltr"}
        >
          {/* ---- full name ---- */}
          <div
            className={`${styles.inputGroup} ${errors.fullName ? styles.hasError : ""} ${lang === "he" ? styles.rtl : ""}`}
            ref={(el) => {
              inputGroupsRef.current[0] = el;
            }}
          >
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`${styles.input} ${formData.fullName ? styles.filled : ""}`}
            />
            <label className={styles.label}>{t.fullName}</label>
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName}</span>
            )}
          </div>

          {/* ---- email ---- */}
          <div
            className={`${styles.inputGroup} ${errors.fullName ? styles.hasError : ""} ${lang === "he" ? styles.rtl : ""}`}
            ref={(el) => {
              inputGroupsRef.current[1] = el;
            }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${formData.email ? styles.filled : ""}`}
            />
            <label className={styles.label}>{t.email}</label>
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          {/* ---- message ---- */}
          <div
            className={`${styles.inputGroup} ${errors.fullName ? styles.hasError : ""} ${lang === "he" ? styles.rtl : ""}`}
            ref={(el) => {
              inputGroupsRef.current[2] = el;
            }}
          >
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${formData.message ? styles.filled : ""}`}
            />
            <label className={styles.label}>{t.message}</label>
            {errors.message && (
              <span className={styles.error}>{errors.message}</span>
            )}
          </div>

          {/* ---- submit button ---- */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "sending"}
            ref={submitRef}
          >
            {status === "sending" ? t.sending : t.send}
          </button>
        </form>
      </div>

      {/* ========================
          +++ DECORATION — bottom right
      ======================== */}
      <span className={styles.plusBottom} ref={plusBottomRef}>
        +++
      </span>
    </section>
  );
}
