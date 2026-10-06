import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { insights } from "@/lib/insights";

export default function BlogPage() {
  return (
    <main className="section container-narrow">
      <header className="mx-auto max-w-3xl text-center">
        <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <BookOpen aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-5 text-sm font-semibold text-accent">Ideas from the 1T1G team</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tightest sm:text-5xl">
          Notes for building what’s next.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-textMuted">
          Straightforward guides on websites, digital projects, and growing your
          business online—written to help you take a useful next step.
        </p>
      </header>

      <section aria-label="Latest insights" className="mt-12 grid gap-5 md:grid-cols-2">
        {insights.map((insight, index) => (
          <article
            key={insight.slug}
            className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/10 ${
              index === 0 ? "md:col-span-2 md:grid md:grid-cols-[0.85fr_1.15fr]" : ""
            }`}
          >
            <div className="relative flex min-h-40 items-end overflow-hidden bg-bgAlt p-6 sm:min-h-48">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--color-accent)/0.28),transparent_60%)]" />
              <div aria-hidden="true" className="absolute -right-8 -top-16 size-48 rounded-full border border-accent/20" />
              <div aria-hidden="true" className="absolute -right-1 -top-9 size-32 rounded-full border border-accent/20" />
              <span className="relative rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
                {insight.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs text-textMuted">
                <Clock3 aria-hidden="true" className="size-3.5" />
                {insight.readingTime}
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                {insight.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-textMuted">
                {insight.excerpt}
              </p>
              <Link
                href={`/blog/${insight.slug}`}
                className="mt-6 inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-accent transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Read the guide <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <aside className="mt-12 rounded-2xl border border-border bg-bgAlt p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">Have a project question?</h2>
          <p className="mt-2 text-sm leading-relaxed text-textMuted">
            We’re happy to talk through your idea and help you work out what makes sense.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg sm:mt-0"
        >
          Talk with our team <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </aside>
    </main>
  );
}
