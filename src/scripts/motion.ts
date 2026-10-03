import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Parallax + drifting notes ---------- */
const mm = gsap.matchMedia();

mm.add(
  {
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 761px)",
  },
  (context) => {
    const { motion, desktop } = context.conditions as {
      motion: boolean;
      desktop: boolean;
    };
    if (!motion) return; // people who asked for less motion get none

    // Handwritten notes drift upward a little as you scroll past
    document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
      const amount = Number(el.dataset.drift) || 20;
      gsap.to(el, {
        y: -amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // tied to the scrollbar
        },
      });
    });

    // Images move slightly slower than the page (desktop only)
    if (desktop) {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7, scale: 1.2 },
          {
            yPercent: 7,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }
  }
);

/* ---------- Custom cursor (mouse devices only) ---------- */
const cursor = document.querySelector<HTMLElement>(".cursor");
const label = document.querySelector<HTMLElement>(".cursor-label");
const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (cursor && label && hasMouse) {
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

  window.addEventListener("mousemove", (e) => {
    cursor.classList.add("ready");
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Anything with data-cursor="..." changes the cursor's label
  document.addEventListener("mouseover", (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
    if (target) {
      label.textContent = target.dataset.cursor ?? "";
      cursor.classList.add("active");
    } else {
      cursor.classList.remove("active");
    }
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursor.classList.remove("ready");
  });
}