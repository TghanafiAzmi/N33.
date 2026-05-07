"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollCue() {
  const [downProgress, setDownProgress] = useState(0);
  const [upProgress, setUpProgress] = useState(0);
  const [activeCue, setActiveCue] = useState<"down" | "up" | null>(null);

  const downProgressRef = useRef(0);
  const upProgressRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Smaller value = user needs to scroll longer.
   * Bigger value = faster fill.
   *
   * Good values:
   * 0.03 = very long
   * 0.045 = smooth medium-long
   * 0.06 = normal
   * 0.12 = fast
   */
  const scrollSpeed = 0.045;

  const transitionDuration = 1000;
  const autoHideDelay = 850;

  const resetDownProgress = () => {
    downProgressRef.current = 0;
    setDownProgress(0);
  };

  const resetUpProgress = () => {
    upProgressRef.current = 0;
    setUpProgress(0);
  };

  const resetAllProgress = () => {
    resetDownProgress();
    resetUpProgress();
  };

  const showCue = (direction: "down" | "up") => {
    setActiveCue(direction);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      if (!isTransitioningRef.current) {
        setActiveCue(null);
        resetAllProgress();
      }
    }, autoHideDelay);
  };

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    const footer = document.getElementById("footer-section");

    if (!hero || !footer) return;

    const goToSection = (section: HTMLElement, direction: "down" | "up") => {
      isTransitioningRef.current = true;
      setActiveCue(direction);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        resetAllProgress();
        setActiveCue(null);
        isTransitioningRef.current = false;
      }, transitionDuration);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      const isAtHero =
        heroRect.top <= 5 && heroRect.bottom >= window.innerHeight - 5;

      const isAtFooter =
        footerRect.top <= 5 && footerRect.bottom >= window.innerHeight - 5;

      /**
       * HERO -> FOOTER
       * User must keep scrolling down until the circle is fully filled.
       */
      if (isAtHero && e.deltaY > 0) {
        e.preventDefault();

        showCue("down");

        // Lock page at hero while charging progress.
        window.scrollTo({
          top: hero.offsetTop,
          behavior: "auto",
        });

        const nextProgress = Math.min(
          downProgressRef.current + scrollSpeed,
          1
        );

        downProgressRef.current = nextProgress;
        setDownProgress(nextProgress);

        if (nextProgress >= 1) {
          goToSection(footer, "down");
        }

        return;
      }

      /**
       * FOOTER -> HERO
       * User must keep scrolling up until the circle is fully filled.
       */
      if (isAtFooter && e.deltaY < 0) {
        e.preventDefault();

        showCue("up");

        // Lock page at footer while charging progress.
        window.scrollTo({
          top: footer.offsetTop,
          behavior: "auto",
        });

        const nextProgress = Math.min(upProgressRef.current + scrollSpeed, 1);

        upProgressRef.current = nextProgress;
        setUpProgress(nextProgress);

        if (nextProgress >= 1) {
          goToSection(hero, "up");
        }

        return;
      }

      /**
       * Opposite direction resets progress.
       */
      if (isAtHero && e.deltaY < 0) {
        resetDownProgress();
        setActiveCue(null);
      }

      if (isAtFooter && e.deltaY > 0) {
        resetUpProgress();
        setActiveCue(null);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const radius = 25;
  const circleLength = 2 * Math.PI * radius;

  const downDashOffset = circleLength - circleLength * downProgress;
  const upDashOffset = circleLength - circleLength * upProgress;

  return (
    <>
      {/* Down cue: Hero to footer */}
      <button
        type="button"
        aria-label="Scroll to next section"
        onClick={() => {
          const footer = document.getElementById("footer-section");

          if (!footer) return;

          resetAllProgress();
          setActiveCue(null);

          footer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        className={`absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 transition-all duration-300 md:block ${
          activeCue === "down"
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="group relative flex h-14 w-14 items-center justify-center rounded-full">
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circleLength}
              strokeDashoffset={downDashOffset}
              className="transition-[stroke-dashoffset] duration-200 ease-out"
            />
          </svg>

          <span
            className="relative text-lg text-white/80 transition duration-300 group-hover:text-white"
            style={{
              transform: `translateY(${downProgress * 5}px)`,
            }}
          >
            ↓
          </span>
        </div>
      </button>

      {/* Up cue: Footer to hero */}
      <button
        type="button"
        aria-label="Scroll to previous section"
        onClick={() => {
          const hero = document.getElementById("hero-section");

          if (!hero) return;

          resetAllProgress();
          setActiveCue(null);

          hero.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        className={`fixed top-10 left-1/2 z-20 hidden -translate-x-1/2 transition-all duration-300 md:block ${
          activeCue === "up"
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="group relative flex h-14 w-14 items-center justify-center rounded-full">
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circleLength}
              strokeDashoffset={upDashOffset}
              className="transition-[stroke-dashoffset] duration-200 ease-out"
            />
          </svg>

          <span
            className="relative text-lg text-white/80 transition duration-300 group-hover:text-white"
            style={{
              transform: `translateY(-${upProgress * 5}px)`,
            }}
          >
            ↑
          </span>
        </div>
      </button>
    </>
  );
}