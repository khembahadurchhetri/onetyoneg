import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/lib/insights";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export default function InsightArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const insight = getInsight(params.slug);
  if (!insight) notFound();

  return (
    <main className="section container-narrow">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-textMuted transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All insights
        </Link>

        <header className="mt-10 border-b border-border pb-8 sm:mt-14 sm:pb-10">
          <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {insight.category}
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tightest sm:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-textMuted">{insight.excerpt}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs text-textMuted">
            <Clock3 aria-hidden="true" className="size-3.5" />
            {insight.readingTime} <span aria-hidden="true">·</span> 1T1G team
          </p>
        </header>

        <div className="prose-content mt-8 space-y-8 sm:mt-10">
          {insight.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-8 text-textMuted">
                  {paragraph}
                </p>
              ))}
              {section.points && (
                <ul className="mt-4 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-textMuted">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-border bg-bgAlt p-6 sm:p-8">
          <p className="text-sm font-semibold text-accent">Want a hand with your next step?</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Let’s talk about what you’re building.</h2>
          <p className="mt-3 text-sm leading-relaxed text-textMuted">
            Bring us the idea or the problem you’re trying to solve. We’ll help you think it through.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start a conversation <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </aside>
      </article>
    </main>
  );
}
