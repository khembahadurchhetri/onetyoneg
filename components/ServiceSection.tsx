"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  reverse?: boolean;
  imageSrc: string;
  imageAlt: string;
};

export default function ServiceSection({
  id,
  eyebrow,
  title,
  description,
  points,
  reverse = false,
  imageSrc,
  imageAlt,
}: ServiceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      id={id}
      ref={ref}
      style={{ scrollMarginTop: "6rem" }}
      className={`border-t border-border/60 ${
        reverse ? "bg-bgAlt" : "bg-bg"
      }`}
    >
      <div className="container-narrow grid items-center gap-10 py-20 sm:grid-cols-2 sm:gap-16 sm:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={reverse ? "sm:order-2" : ""}
        >
          <p className="text-[13px] font-medium text-accent">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tightest sm:text-[38px]">
            {title}
          </h2>

          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-textMuted">
            {description}
          </p>

          <ul className="mt-6 space-y-3 text-[14px] text-textMuted">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-accent">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Explore related services
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </motion.div>

        <div className={reverse ? "sm:order-1" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            {/* Extra height prevents gaps during parallax */}
            <motion.div
              style={{ y: reduceMotion ? 0 : imageY }}
              className="absolute inset-x-0 -inset-y-8"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}