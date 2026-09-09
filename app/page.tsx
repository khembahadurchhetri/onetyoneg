import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import {
  CodeIcon,
  MegaphoneIcon,
  StorefrontIcon,
  DocumentIcon
} from "@/components/icons";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />

      <ServiceSection
        eyebrow="Development & design"
        title="Websites and apps that feel considered"
        description="Custom builds on modern frameworks, with UI/UX and graphic design handled in-house — deployed and cared for after launch."
        points={["Websites & web apps", "UI/UX and brand design", "Deployment, hosting & PWA"]}
        icon={<CodeIcon />}
      />

      <ServiceSection
        eyebrow="Marketing & growth"
        title="Get found, and get chosen"
        description="SEO and digital marketing built around what a business actually sells, not generic campaign templates."
        points={["SEO & content strategy", "Social media management", "Video & graphic content"]}
        icon={<MegaphoneIcon />}
        reverse
      />

      <ServiceSection
        eyebrow="Hospitality"
        title="More guests, less guesswork"
        description="Digital marketing and booking-focused websites built specifically for hotels and restaurants."
        points={["Booking-ready websites", "Social & listings management", "Photography-ready page design"]}
        icon={<StorefrontIcon />}
      />

      <ServiceSection
        eyebrow="Forms & shares"
        title="Nepal paperwork, handled"
        description="Help with government form filling — licenses, passports, and related applications — plus guidance on DEMAT accounts and the share market."
        points={["Govt. form filling & submission", "License & passport assistance", "DEMAT & share market guidance"]}
        icon={<DocumentIcon />}
        reverse
      />

      <section className="section border-t border-border/60">
        <div className="container-narrow">
          <h2 className="text-[28px] font-semibold tracking-tightest">Recent work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link
              href="https://hamrobot.vercel.app"
              className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
            >
              <p className="text-[15px] font-medium">Hamrobot</p>
              <p className="mt-1 text-[13px] text-textMuted">View project</p>
            </Link>
            <Link
              href="https://product-catalog-q88b.vercel.app"
              className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
            >
              <p className="text-[15px] font-medium">ShopCo</p>
              <p className="mt-1 text-[13px] text-textMuted">View project</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
