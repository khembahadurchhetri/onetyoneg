import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Camera,
  Mail,
  MoveUpRight,
  UsersRound,
} from "lucide-react";

const siteLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Our work" },
  { href: "/courses", label: "Courses" },
  { href: "/careers", label: "Careers" },
];

const socialLinks = [
  { href: "https://instagram.com/onetyoneg", label: "Instagram", Icon: Camera },
  {
    href: "https://www.facebook.com/profile.php?id=61593834707142",
    label: "Facebook",
    Icon: UsersRound,
  },
  {
    href: "https://www.linkedin.com/in/one-tyone-04322a441",
    label: "LinkedIn",
    Icon: BriefcaseBusiness,
  },
];
export default function Footer() {
  return (
    <footer className="site-footer border-t border-border/70 bg-bgAlt">
      <div className="container-narrow py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="1T1G home"
              className="inline-flex overflow-hidden rounded-2xl transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/logo/1t1g-logo.jpg"
                alt="1T1G"
                width={76}
                height={76}
                className="size-[76px] rounded-2xl object-cover"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-textMuted">
              One team, one goal. Thoughtful digital work and practical support
              for businesses building what comes next.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Start a conversation{" "}
              <MoveUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text">Explore</h2>
            <nav
              aria-label="Footer navigation"
              className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-textMuted"
            >
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="transition-colors hover:text-accent"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text">Say hello</h2>
            <a
              href="mailto:onetyoneg@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-textMuted transition-colors hover:text-accent"
            >
              Mail
              <Mail aria-hidden="true" className="size-4" />
              onetyoneg@gmail.com
            </a>

            {/* Updated social links section showing both icons and text */}
            <nav
              aria-label="Social media"
              className="mt-5 flex flex-col gap-2.5"
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-textMuted transition-all hover:-translate-y-0.5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5 text-xs text-textMuted sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 1T1G — One Team One Goal.</p>
          <p className="mt-2 sm:mt-0">Based in Nepal. Working everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
