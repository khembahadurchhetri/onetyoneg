import Link from "next/link";

const projects = [
  {
    name: "Hamrobot",
    description: "Live project — replace with a real description.",
    href: "https://hamrobot.vercel.app"
  },
  {
    name: "ShopCo",
    description: "E-commerce catalog build — replace with a real description.",
    href: "https://product-catalog-q88b.vercel.app"
  }
];

export default function Portfolio() {
  return (
    <main className="section container-narrow">
      <h1 className="max-w-2xl text-[36px] font-semibold tracking-tightest sm:text-[46px]">
        Portfolio
      </h1>
      <p className="mt-4 max-w-xl text-[16px] text-textMuted">
        A running record of client and internal projects. Add real
        screenshots here as work ships.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="block rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/60"
          >
            <div className="aspect-video rounded-xl border border-border/60 bg-bgAlt" />
            <p className="mt-5 text-[16px] font-medium">{p.name}</p>
            <p className="mt-1 text-[14px] text-textMuted">{p.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
