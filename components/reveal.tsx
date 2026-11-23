"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealTag = "div" | "section" | "article" | "header" | "figure" | "li" | "span";

type RevealProps = {
  children: ReactNode;
  as?: RevealTag;
  /** Stagger delay in milliseconds for sequenced reveals. */
  delay?: number;
  className?: string;
  /** Anchor target, used by in-page links to individual services. */
  id?: string;
};

/**
 * Gentle fade-and-rise on scroll. Content stays visible for reduced-motion
 * users, and a <noscript> fallback in the root layout keeps it visible when
 * JavaScript is unavailable.
 */
export function Reveal({ children, as = "div", delay = 0, className, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
