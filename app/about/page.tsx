import Link from "next/link";
import { ArrowRight, Compass, Handshake, Lightbulb } from "lucide-react";

const values = [
  {
    title: "Start with listening",
    description: "We take time to understand your people, your priorities, and the problem behind the project.",
    Icon: Handshake,
  },
  {
    title: "Make it useful",
    description: "We focus on clear, practical outcomes—not features or polish that do not serve your goals.",
    Icon: Compass,
  },
  {
    title: "Build together",
    description: "You stay involved as ideas take shape, so the result feels right for the people who will use it.",
    Icon: Lightbulb,
  },
];

export default function AboutPage() {
  return (
    <main className="section container-narrow">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">About 1T1G</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tightest sm:text-5xl">
          One team, here to help good ideas go further.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-textMuted">
          1T1G is a Nepal-based team working with people and businesses near and
          far. We bring design, development, digital marketing, and practical
          support together to help turn a next step into something real.
        </p>
      </header>

      <section className="mt-12 grid gap-4 md:grid-cols-3" aria-label="How we work">
        {values.map(({ title, description, Icon }) => (
          <article key={title} className="rounded-2xl border border-border bg-surface p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h2 className="mt-5 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-textMuted">{description}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-3xl bg-bgAlt p-6 sm:p-10">
        <p className="text-sm font-semibold text-accent">A practical mix of skills</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tightest sm:text-3xl">
          Thoughtful work, with the support to keep moving.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-textMuted sm:text-base">
          Some projects need a new website. Others need a better way to reach
          customers, a clear visual identity, or a little expert guidance. We
          bring the right skills together around the work you actually need.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg">
            Explore services <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent">
            Say hello
          </Link>
        </div>
      </section>
    </main>
  );
}
