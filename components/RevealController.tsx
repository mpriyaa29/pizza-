"use client";
import { useEffect } from "react";

export default function RevealController() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const observe = (root: Node) => {
      if (root instanceof Element) {
        if (root.hasAttribute("data-reveal")) io.observe(root);
        root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
      }
    };

    observe(document.body);

    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => observe(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}
