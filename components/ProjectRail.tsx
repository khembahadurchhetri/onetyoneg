"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useState } from "react";

function isLogoCategory(category: string) {
  return /brand|logo|identity/i.test(category);
}

export default function ProjectRail({ projects }: { projects: Project[] }) {
  const [paused, setPaused] = useState(false);
  if (projects.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-label={paused ? "Resume automatic project movement" : "Pause automatic project movement"}
          aria-pressed={paused}
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-medium text-textMuted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="project-marquee overflow-hidden" aria-label="Featured projects" role="region">
        <div className={`project-marquee-track${paused ? " is-paused" : ""}`}>
          <div className="project-marquee-group">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="project-marquee-group project-marquee-copy" aria-hidden="true">
            {projects.map((project) => (
              <ProjectCard key={`copy-${project.id}`} project={project} decorative />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, decorative = false }: { project: Project; decorative?: boolean }) {
  const card = (
    <>
      <div className="relative aspect-[16/8] overflow-hidden bg-bgAlt">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          unoptimized
          sizes="300px"
          className={`${isLogoCategory(project.category) ? "bg-white object-contain p-5" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-text">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-textMuted">{project.description}</p>
        </div>
        {project.projectUrl && (
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-textMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        )}
      </div>
    </>
  );

  if (project.projectUrl) {
    return (
      <Link
        href={project.projectUrl}
        target="_blank"
        rel="noreferrer"
        tabIndex={decorative ? -1 : undefined}
        className="group block w-[min(76vw,18rem)] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {card}
      </Link>
    );
  }

  return (
    <article className="group block w-[min(76vw,18rem)] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface">
      {card}
    </article>
  );
}
