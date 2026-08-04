"use client";

import { useEffect, useRef, useState } from "react";
import { useLoader } from "@/context/LoaderContext";
import { useLanguage } from "@/context/LanguageContext";
import { type Project } from "@/lib/projects";
import gsap from "gsap";
import styles from "./Carousel.module.scss";

// ── Props ────────────────────────────────────────────────
interface CarouselProps {
  projects: Project[];
  activeId: number;
  onActiveChange: (id: number) => void;
  startDelay: number;
  inView: boolean;
}

// ── Get responsive values ─────────────────────────────────
function getResponsiveValues() {
  const w = window.innerWidth;

  if (w < 480) return { radius: 160, cardW: 130, cardH: 80 };
  if (w < 768) return { radius: 200, cardW: 160, cardH: 100 };
  if (w < 1440) return { radius: 280, cardW: 210, cardH: 130 };
  return { radius: 320, cardW: 240, cardH: 150 };
}

// ── Component ────────────────────────────────────────────
export default function Carousel({
  projects,
  activeId,
  onActiveChange,
  startDelay,
  inView,
}: CarouselProps) {
  const CARD_COUNT = projects.length;
  const ANGLE_STEP = 360 / CARD_COUNT;

  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const rotationRef = useRef(0);
  const [ready, setReady] = useState(false);
  const { isLoading } = useLoader();
  const { lang } = useLanguage();

  // ── Get center of track ───────────────────────────────
  function getCenter() {
    const track = trackRef.current;
    if (!track) return { cx: 0, cy: 0 };
    const { radius } = getResponsiveValues();

    return {
      cx: track.offsetWidth / 2,
      // ── Top card centered vertically in container ────
      cy: track.offsetHeight / 2 + radius,
    };
  }

  // ── Position all cards on circle ─────────────────────
  function positionCards(rotation: number, animate = true) {
    const { cx, cy } = getCenter();
    const { radius, cardW, cardH } = getResponsiveValues();

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const angleDeg = i * ANGLE_STEP + rotation;
      const angleRad = (angleDeg - 90) * (Math.PI / 180);
      const x = cx + Math.cos(angleRad) * radius - cardW / 2;
      const y = cy + Math.sin(angleRad) * radius - cardH / 2;

      const normalizedAngle = ((angleDeg % 360) + 360) % 360;
      const isTop =
        normalizedAngle < ANGLE_STEP / 2 ||
        normalizedAngle > 360 - ANGLE_STEP / 2;

      // ── Cards at 12 o'clock = 0 tilt ─────────────────
      // ── Cards to the right = positive tilt ───────────
      // ── Cards to the left = negative tilt ────────────
      const centeredAngle = ((normalizedAngle + 180) % 360) - 180;
      const tilt = isTop ? 0 : centeredAngle * 1;

      gsap.to(card, {
        x,
        y,
        rotation: tilt,
        opacity: isTop ? 1 : 0.5,
        scale: isTop ? 1.07 : 1,
        duration: animate ? 0.35 : 0,
        ease: "back.out(1.5)",
        zIndex: isTop ? 6 : 3,
      });
    });
  }

  // ── Get active index ─────────────────────────────────
  function getActiveIndex(rotation: number) {
    const normalized = ((-rotation % 360) + 360) % 360;
    return Math.round(normalized / ANGLE_STEP) % projects.length;
  }

  // ── Snap to nearest ──────────────────────────────────
  function snapToNearest(currentRotation: number) {
    const index = getActiveIndex(currentRotation);
    const targetRotation = -(index * ANGLE_STEP);
    rotationRef.current = targetRotation;
    positionCards(targetRotation);
    onActiveChange(projects[index].id);
  }

  // ── Rotate by one step ───────────────────────────────
  function rotateBy(direction: 1 | -1) {
    rotationRef.current -= direction * ANGLE_STEP;
    positionCards(rotationRef.current);
    const index = getActiveIndex(rotationRef.current);
    onActiveChange(projects[index].id);
  }

  // ── Force fresh load on back/forward cache restore ───
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) window.location.reload();
      });
    }
  }, []);

  // ── Hide cards on mount — prevents flash on refresh ──
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.set(card, { visibility: "hidden" });
    });
  }, []);

  // ── Entrance + drag setup — fires when section is in view ──
  useEffect(() => {
    if (!inView || isLoading) return;

    const track = trackRef.current;
    if (!track) return;

    const { cardW, cardH } = getResponsiveValues();
    const cx = track.offsetWidth / 2;
    const stackCy = track.offsetHeight * 0.5;
    const tiltMap = [0, 5, 10, 15, -5, 10, -15];

    // ── Kill any existing GSAP animations on cards ────
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.killTweensOf(card);
      card.removeAttribute("style");
    });

    // ── Reposition on resize ──────────────────────────
    function onResize() {
      const { cardW, cardH } = getResponsiveValues();

      // ── Update card dimensions on resize ─────────────────
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { width: cardW, height: cardH });
      });

      positionCards(rotationRef.current);
    }
    window.addEventListener("resize", onResize);

    // ── Reset all cards to clean state ────────────────
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.set(card, {
        width: cardW,
        height: cardH,
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        visibility: "hidden",
        clearProps: "transform",
      });
    });

    // ── Set cards below viewport ──────────────────────
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        width: cardW,
        height: cardH,
        x: cx - cardW / 2,
        y: track.getBoundingClientRect().bottom + 400,
        rotation: tiltMap[i] ?? 0,
        opacity: 1,
        scale: 1,
        zIndex: CARD_COUNT - i,
        visibility: "visible",
      });
    });

    // ── Slide entire stack up into container ──────────
    gsap.to(cardsRef.current, {
      y: stackCy - cardH / 2,
      duration: 0.6,
      ease: "power2.out",
      delay: 1.7,
    });

    // ── Fan out after delay ───────────────────────────
    gsap.delayedCall(startDelay, () => {
      positionCards(0);
      const index = getActiveIndex(0);
      onActiveChange(projects[index].id);
      gsap.delayedCall(0.8, () => setReady(true));
    });

    // ── Pointer drag ──────────────────────────────────
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let hasMoved = false;

    function onPointerDown(e: PointerEvent) {
      if (!trackRef.current) return;
      startX = e.clientX;
      startY = e.clientY;
      isDragging = true;
      hasMoved = false;

      // ── Only capture pointer on desktop ──────────────────
      if (window.innerWidth >= 768) {
        trackRef.current.setPointerCapture(e.pointerId);
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // ── If vertical movement is dominant, don't drag ──
      if (!hasMoved && Math.abs(deltaY) > Math.abs(deltaX)) {
        isDragging = false;
        // ── Release pointer so native scroll can take over ──
        if (trackRef.current) {
          trackRef.current.releasePointerCapture(e.pointerId);
        }
        return;
      }

      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 1 : 2;
      if (Math.abs(deltaX) > threshold) hasMoved = true;
      rotationRef.current += deltaX * (isMobile ? 0.35 : 0.1);
      startX = e.clientX;
      positionCards(rotationRef.current, false);
    }

    function onPointerUp(e: PointerEvent) {
      if (!isDragging) return;
      isDragging = false;
      if (hasMoved) snapToNearest(rotationRef.current);
    }

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);

    // ── Cleanup ───────────────────────────────────────
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
    };
  }, [inView, isLoading]);

  return (
    <div className={styles.carousel}>
      {/* ── Track ──────────────────────────────────── */}
      <div ref={trackRef} className={styles.track}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className={styles.card}
            // style={{ backgroundColor: project.color }}
            onClick={() => {
              const activeIndex = getActiveIndex(rotationRef.current);
              if (i === activeIndex) {
                return;
              } else {
                const diff = i - activeIndex;
                rotationRef.current -= diff * ANGLE_STEP;
                snapToNearest(rotationRef.current);
              }
            }}
          >
            <img
              src={project.image}
              alt={project.name[lang]}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>

      {/* ── Arrows ─────────────────────────────────── */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => rotateBy(-1)}
        disabled={!ready}
        aria-label="Previous"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => rotateBy(1)}
        disabled={!ready}
        aria-label="Next"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
