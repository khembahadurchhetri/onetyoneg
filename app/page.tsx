import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Rocket, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="border-b border-border/60 bg-bgAlt">
        <div className="container-narrow grid gap-8 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Your ideas, brought to life
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight tracking-tightest sm:text-3xl">
              A hands-on digital partner, from the first sketch to launch day.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border border-border bg-surface px-5 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:self-center"
          >
            See our services <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <ServiceSection
        id="web-development"
        eyebrow="Development & design"
        title="Websites and apps that feel considered"
        description="Custom builds on modern frameworks, with UI/UX and graphic design handled in-house — deployed and cared for after launch."
        points={[
          "Websites & web apps",
          "UI/UX and brand design",
          "Deployment, hosting & PWA",
        ]}
        imageSrc="/1.png"
        imageAlt="A modern website shown across laptop and mobile screens"
      />

      <ServiceSection
        id="marketing-growth"
        eyebrow="Marketing & growth"
        title="Get found, and get chosen"
        description="SEO and digital marketing built around what a business actually sells, not generic campaign templates."
        points={[
          "SEO & content strategy",
          "Social media management",
          "Video & graphic content",
        ]}
        imageSrc="/2.png"
        imageAlt="Marketing tools, social content cards, and growth analytics"
        reverse
      />

      <ServiceSection
        id="hospitality"
        eyebrow="Hospitality"
        title="More guests, less guesswork"
        description="Digital marketing and booking-focused websites built specifically for hotels and restaurants."
        points={[
          "Booking-ready websites",
          "Social & listings management",
          "Photography-ready page design",
        ]}
        imageSrc="/3.png"
        imageAlt="A mountain-view restaurant terrace in warm afternoon light"
      />

      <ServiceSection
        id="nepal-assistance"
        eyebrow="Forms & shares"
        title="Nepal paperwork, handled"
        description="Help with government form filling — licenses, passports, and related applications — plus guidance on DEMAT accounts and the share market."
        points={[
          "Govt. form filling & submission",
          "License & passport assistance",
          "DEMAT & share market guidance",
        ]}
        imageSrc="/4.png"
        imageAlt="Application forms, a document booklet, and a laptop on a tidy desk"
        reverse
      />

      <section className="section border-t border-border/60 bg-bgAlt">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-accent">A clear path forward</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tightest sm:text-4xl">
              Good work starts with a good conversation.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-textMuted">
              No jargon or one-size-fits-all packages. We listen first, shape a
              practical plan together, then make it happen.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Tell us the idea",
                description: "Share the challenge, the audience, and what success looks like for you.",
                Icon: MessageCircle,
              },
              {
                number: "02",
                title: "Shape the plan",
                description: "We map the right design, technology, and next steps around your goals.",
                Icon: Sparkles,
              },
              {
                number: "03",
                title: "Make it real",
                description: "Our team builds, refines, and supports your project through launch.",
                Icon: Rocket,
              },
            ].map(({ number, title, description, Icon }) => (
              <article
                key={number}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/10 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.15em] text-accent">{number}</span>
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accentForeground">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-semibold text-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-textMuted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-border/60">
        <div className="container-narrow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">Made with intent</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">
                A glimpse of what we build.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-text transition-colors hover:text-accent sm:self-auto"
            >
              Explore the portfolio <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                name: "Hamrobot",
                description: "A live project by the 1T1G team.",
                category: "Live project",
                href: "https://hamrobot.vercel.app",
                image: "/projects/chatbot.jpeg",
                imageAlt: "Hamrobot AI assistant chat interface",
              },
              {
                name: "ShopCo",
                description: "A product catalog experience.",
                category: "E-commerce",
                href: "https://product-catalog-q88b.vercel.app",
                image: "/projects/ecommerce.jpeg",
                imageAlt: "ShopCo product catalog website",
              },
            ].map((project) => (
              <Link
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative flex aspect-[16/8] items-end overflow-hidden bg-bgAlt p-6 sm:p-8">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 639px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="relative rounded-full border border-border/70 bg-bg/75 px-3 py-1 text-xs font-medium text-text backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-6 sm:p-7">
                  <div>
                    <h3 className="text-lg font-semibold text-text">{project.name}</h3>
                    <p className="mt-1 text-sm text-textMuted">{project.description}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-textMuted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="container-narrow relative overflow-hidden rounded-3xl bg-accent px-6 py-12 text-accentForeground sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -right-16 -top-24 size-64 rounded-full border-[36px] border-current opacity-[0.06] sm:size-80" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-70">Your next move starts here</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tightest sm:text-4xl">
                Let’s make something you’re proud to put your name on.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-80 sm:text-base">
                Have a project in mind, or still figuring it out? We’d love to hear about it.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-bg px-6 text-sm font-semibold text-text transition-all hover:-translate-y-0.5 hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg sm:self-center"
            >
              Start a conversation <Check aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}