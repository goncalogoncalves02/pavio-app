"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.style.opacity = "1";
          element.style.transform = "none";
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
        continue;
      }
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity .9s ease, transform .9s cubic-bezier(.2,.6,.2,1)";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
