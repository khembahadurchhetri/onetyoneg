import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    name: "Hamrobot",
    description: "A chat-based AI assistant interface.",
    category: "AI assistant",
    image: "/projects/chatbot.jpeg",
    imageAlt: "Hamrobot AI assistant chat interface",
    href: "https://hamrobot.vercel.app",
  },
  {
    name: "ShopCo",
    description: "A browsable product catalog and shopping experience.",
    category: "E-commerce",
    image: "/projects/ecommerce.jpeg",
    imageAlt: "ShopCo product catalog website",
    href: "https://product-catalog-q88b.vercel.app",
  },
  {
    name: "Nexus Secure",
    description: "A cybersecurity brand and visual identity concept.",
    category: "Cybersecurity",
    image: "/projects/cyber.jpg",
    imageAlt: "Nexus Secure cybersecurity brand artwork",
  },
  {
    name: "Byas Saving & Credit Co-operative",
    description: "A logo created for Byas Saving & Credit Co-operative Ltd.",
    category: "Brand identity",
    image: "/projects/byas%20logo.png",
    imageAlt: "Byas Saving & Credit Co-operative Ltd. logo",
    contain: true,
  },
];

export default function Portfolio() {
  return (
    <main className="section container-narrow">
      <h1 className="max-w-2xl text-[36px] font-semibold tracking-tightest sm:text-[46px]">
        Portfolio
      </h1>
      <p className="mt-4 max-w-xl text-[16px] text-textMuted">
        A selection of digital products and brand work from our team.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const content = (
            <>
              <div className={`relative aspect-[16/9] overflow-hidden bg-bgAlt ${project.contain ? "bg-white p-6 sm:p-10" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className={`${project.contain ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
                {!project.contain && (
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                )}
                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                <div>
                  <h2 className="text-lg font-semibold text-text">{project.name}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-textMuted">{project.description}</p>
                </div>
                {project.href && (
                  <span aria-hidden="true" className="shrink-0 text-lg text-textMuted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                )}
              </div>
            </>
          );

          const className = "group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

          return project.href ? (
            <Link
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {content}
            </Link>
          ) : (
            <article key={project.name} className={className}>
              {content}
            </article>
          );
        })}
      </div>
    </main>
  );
}
