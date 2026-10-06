import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projects — 1T1G",
  description: "Selected digital products and brand work by the 1T1G team.",
};

export const dynamic = "force-dynamic";

export default async function Portfolio() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="section container-narrow">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">Selected work</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tightest sm:text-5xl">
          Projects made with purpose.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-textMuted">
          A selection of digital products and brand work from our team.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-textMuted">
          New projects are on the way. Get in touch to talk about what you are building.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const content = (
              <>
                <div className="relative aspect-[16/9] overflow-hidden bg-bgAlt">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className={`${/brand|logo|identity/i.test(project.category) ? "bg-white object-contain p-6" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex min-h-24 items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-text">{project.title}</h2>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-textMuted">{project.description}</p>
                  </div>
                  {project.projectUrl && (
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-textMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  )}
                </div>
              </>
            );
            const cardClass = "group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

            return project.projectUrl ? (
              <Link
                key={project.id}
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className={cardClass}
              >
                {content}
              </Link>
            ) : (
              <article key={project.id} className={cardClass}>{content}</article>
            );
          })}
        </div>
      )}
    </main>
  );
}
