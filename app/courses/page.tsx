import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Courses — 1T1G",
  description:
    "Explore 1T1G learning tracks in design, web development, databases, cloud, DevOps, and project management.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: [{ createdAt: "asc" }],
  });

  return (
    <main className="section container-narrow">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Learn with 1T1G</p>
        <h1 className="mt-3 text-[36px] font-semibold leading-tight tracking-tightest sm:text-[48px]">
          Practical skills for your next step
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-textMuted">
          Explore learning tracks in design, web development, data, cloud, and
          digital project delivery. Course levels and topics are updated as
          batches are prepared.
        </p>
        <p className="mt-4 text-sm text-textMuted">
          Ask us about upcoming batches. Enrollment and online payment are coming soon.
        </p>
      </header>

      {courses.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-textMuted">
          New courses are being prepared. Contact us to ask about upcoming classes.
        </p>
      ) : (
        <section
          aria-label="Courses"
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-bgAlt px-3 py-1 text-xs font-medium text-accent">
                  {course.category}
                </span>
                <span className="text-xs text-textMuted">{course.level}</span>
              </div>

              <h2 className="mt-5 text-xl font-semibold leading-snug tracking-tight">
                {course.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-textMuted">
                {course.description}
              </p>

              <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-textMuted">
                Topics
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {course.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-textMuted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="text-sm font-semibold text-text">From {course.price}</p>
                <Link
                  href={`/contact?course=${encodeURIComponent(course.title)}`}
                  className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-bgAlt px-4 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accentForeground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Ask about this course
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      <p className="mt-8 text-sm text-textMuted">
        Topics, levels, and fees are starting points and may be refined before
        enrollment opens.
      </p>
    </main>
  );
}
