"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <section
      ref={ref}
      className="hero-section relative isolate flex min-h-[620px] items-center justify-center overflow-hidden px-5 py-24 text-center sm:min-h-[720px] sm:px-6 sm:py-28"
    >
      {/* One background image for both themes */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduceMotion ? 0 : backgroundY }}
        className="hero-image pointer-events-none absolute inset-x-0 -inset-y-24 z-0"
      >
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay + fade follow the theme (see globals.css) */}
      <div
        aria-hidden="true"
        className="hero-overlay pointer-events-none absolute inset-0 z-10"
      />

      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute inset-0 z-10"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex max-w-4xl flex-col items-center"
      >
        <p className="hero-eyebrow mb-5 text-xs font-semibold tracking-wide text-accent sm:text-sm">
          A small team in Nepal, ready to help
        </p>

        <h1 className="hero-title max-w-3xl text-[clamp(2.75rem,10vw,5rem)] font-semibold leading-[1.02] tracking-tightest">
          Got an idea? <span className="hero-highlight text-accent">Let’s build it.</span>
        </h1>

        <p className="hero-lead mt-6 max-w-xl text-[17px] leading-relaxed text-textMuted sm:text-[19px]">
          Tell us what you’re working on. We’ll help with the design, the tech,
          and everything it takes to get it out into the world.
        </p>

        <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accentForeground shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none"
          >
            Let’s talk about your project
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <a
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore what we do
          </a>
        </div>
      </motion.div>
    </section>
  );
}