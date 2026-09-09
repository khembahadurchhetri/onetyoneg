import { ReactNode } from "react";

export default function ServiceSection({
  eyebrow,
  title,
  description,
  points,
  reverse = false,
  icon
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  reverse?: boolean;
  icon: ReactNode;
}) {
  return (
    <section className={`border-t border-border/60 ${reverse ? "bg-bgAlt" : ""}`}>
      <div className="container-narrow grid items-center gap-10 py-20 sm:grid-cols-2 sm:gap-16 sm:py-28">
        <div className={reverse ? "sm:order-2" : ""}>
          <p className="text-[13px] text-accent">{eyebrow}</p>
          <h2 className="mt-3 text-[32px] font-semibold leading-tight tracking-tightest sm:text-[38px]">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-textMuted">
            {description}
          </p>
          <ul className="mt-6 space-y-2 text-[14px] text-textMuted">
            {points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-accent">&middot;</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={reverse ? "sm:order-1" : ""}>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface">
            <div
              className="absolute h-56 w-56 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #1898F0, transparent 70%)" }}
            />
            <div className="relative text-accent">{icon}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
