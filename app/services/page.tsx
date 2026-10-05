import type { Metadata } from "next";
import Link from "next/link";
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
      <h1 className="max-w-2xl text-[36px] font-semibold tracking-tightest sm:text-[46px]">
        Services
      </h1>
      <p className="mt-4 max-w-xl text-[16px] text-textMuted">
        Every project starts with a short call to scope the work. Prices are
        starting points, not final quotes.
      </p>

      {services.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-border bg-surface p-6 text-sm text-textMuted">
          Our services are being updated. Contact us and we’ll help with your project.
        </p>
      ) : (
        <div className="mt-12 divide-y divide-border border-t border-border">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col justify-between gap-3 py-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-[16px] font-medium">{service.name}</p>
                <p className="mt-1 max-w-md text-[14px] text-textMuted">{service.detail}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-[14px] text-accent">{service.price}</p>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="text-[14px] font-medium text-text hover:text-accent"
                >
                  Ask us
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
