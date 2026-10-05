"use client";

import Image from "next/image";
import { useRef } from "react";
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
      className="hero-section relative isolate flex min-h-[620px] items-center justify-center overflow-hidden px-6 py-28 text-center sm:min-h-[720px]"
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

      {/* These colors follow your existing theme */}
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
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          One team. One goal.
        </p>

        <h1 className="max-w-3xl text-[44px] font-semibold leading-[1.05] tracking-tightest sm:text-[64px] lg:text-[72px]">
          Build a brighter tomorrow
        </h1>

        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-textMuted sm:text-[19px]">
          Development, design, marketing, and support &mdash; one remote team,
          based in Nepal, working with clients anywhere.
        </p>

        <a
          href="/contact"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none"
        >
          Let’s talk about your project
          <span aria-hidden="true">↗</span>
        </a>
      </motion.div>
    </section>
  );
}