import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Code2,
  FileCheck2,
  Layers3,
  Megaphone,
  Palette,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services — 1T1G",
  description: "Development, design, digital marketing, and technology services from 1T1G.",
};

export const dynamic = "force-dynamic";

export default async function Services() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main className="section container-narrow">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">A team for what comes next</p>
        <h1 className="mt-3 text-[36px] font-semibold leading-tight tracking-tightest sm:text-[48px]">
          The right help to move your idea forward.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-textMuted">
          From your first website to reaching more customers, we bring design,
          technology, and practical support together around your goals.
        </p>
      </header>

      {services.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-textMuted">
          Our services are being updated. Contact us and we’ll help with your project.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((service) => {
            const name = service.name.toLowerCase();
            const Icon = name.includes("web") || name.includes("app")
              ? Code2
              : name.includes("design")
                ? Palette
                : name.includes("marketing") || name.includes("seo")
                  ? Megaphone
                  : name.includes("hospitality")
                    ? Building2
                    : name.includes("form") || name.includes("demat")
                      ? FileCheck2
                      : name.includes("cloud") || name.includes("domain")
                        ? Cloud
                        : BriefcaseBusiness;
            return (
              <article
                key={service.id}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/10 sm:p-7"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accentForeground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">{service.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-textMuted">{service.detail}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-accent">{service.price}</p>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Talk about this <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-bgAlt p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">Not sure where to start?</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-textMuted">
            Tell us what you are trying to achieve. We can help you find the right next step.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent sm:mt-0"
        >
          Get in touch <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </main>
  );
}
