"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="section flex flex-col items-center px-6 pt-24 text-center sm:pt-32">
      <motion.h1
        initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl text-[44px] font-semibold leading-[1.05] tracking-tightest sm:text-[64px]"
      >
        Build a brighter tomorrow
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-xl text-[17px] text-textMuted sm:text-[19px]"
      >
        Development, design, marketing, and support &mdash; one remote team,
        based in Nepal, working with clients anywhere.
      </motion.p>

      <motion.a
        href="/contact"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-9 rounded-full bg-accent px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.03]"
      >
        Get a quote
      </motion.a>
    </section>
  );
}
