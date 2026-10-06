"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  GraduationCap,
  Menu,
  Moon,
  Palette,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const serviceLinks = [
  {
    href: "/#web-development",
    label: "Websites & apps",
    description: "Web design, apps, and digital products",
    Icon: Code2,
  },
  {
    href: "/#marketing-growth",
    label: "Marketing & growth",
    description: "SEO, content, and social media",
    Icon: Palette,
  },
  {
    href: "/#hospitality",
    label: "Hospitality",
    description: "Digital support for hotels and restaurants",
    Icon: BriefcaseBusiness,
  },
  {
    href: "/#nepal-assistance",
    label: "Forms & share guidance",
    description: "Practical help with Nepal services",
    Icon: BookOpen,
  },
];

const companyLinks = [
  { href: "/portfolio", label: "Our work", Icon: BriefcaseBusiness },
  { href: "/careers", label: "Careers", Icon: GraduationCap },
  { href: "/blog", label: "Insights", Icon: BookOpen },
  { href: "/courses", label: "Courses", Icon: Palette },
];

type MenuName = "services" | "company";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  function toggleMenu(menu: MenuName) {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function closeNavigation() {
    setOpen(false);
    setOpenMenu(null);
  }

  return (
    <header
      ref={headerRef}
      className="site-nav sticky top-0 z-50 border-b border-border/60 bg-bg/90 shadow-sm backdrop-blur-xl"
    >
      <div className="container-narrow relative flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="1T1G home"
          onClick={closeNavigation}
          className="shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-[1.03]"
        >
          <Image
            src="/logo/1t1g-logo.jpg"
            alt="1T1G"
            width={48}
            height={48}
            priority
            className="size-11 rounded-xl object-cover"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "services"}
              aria-controls="services-menu"
              onClick={() => toggleMenu("services")}
              className={`inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm transition-colors hover:bg-surface hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                openMenu === "services" || pathname === "/services" ? "bg-surface font-medium text-accent" : "text-textMuted"
              }`}
            >
              Services
              <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} />
            </button>
            {openMenu === "services" && (
              <div
                id="services-menu"
                className="absolute right-[-15rem] top-[calc(100%+1rem)] w-[min(44rem,calc(100vw-2rem))] rounded-2xl border border-border bg-bg p-5 shadow-2xl shadow-black/20 sm:right-[-19rem] sm:p-6"
              >
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">What we can help with</p>
                    <h2 className="mt-1 text-lg font-semibold text-text">Services for your next step</h2>
                  </div>
                  <Link
                    href="/services"
                    onClick={closeNavigation}
                    className="hidden items-center gap-1 text-xs font-semibold text-textMuted transition-colors hover:text-accent sm:inline-flex"
                  >
                    All services <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
                <div className="mt-3 grid gap-1 sm:grid-cols-2">
                  {serviceLinks.map(({ href, label, description, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeNavigation}
                      className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accentForeground">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-text">{label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-textMuted">{description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/services"
                  onClick={closeNavigation}
                  className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent sm:hidden"
                >
                  Browse all services <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            aria-current={pathname === "/portfolio" ? "page" : undefined}
            className={`rounded-full px-3 py-2 text-sm transition-colors hover:bg-surface hover:text-text ${
              pathname === "/portfolio" ? "bg-surface font-medium text-text" : "text-textMuted"
            }`}
          >
            Our work
          </Link>

          <div className="relative">
            <button
              type="button"
              aria-expanded={openMenu === "company"}
              aria-controls="company-menu"
              onClick={() => toggleMenu("company")}
              className={`inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm transition-colors hover:bg-surface hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                openMenu === "company" ? "bg-surface font-medium text-accent" : "text-textMuted"
              }`}
            >
              Explore <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${openMenu === "company" ? "rotate-180" : ""}`} />
            </button>
            {openMenu === "company" && (
              <div
                id="company-menu"
                className="absolute right-0 top-[calc(100%+1rem)] w-64 rounded-2xl border border-border bg-bg p-2 shadow-2xl shadow-black/20"
              >
                <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-[0.15em] text-textMuted">Explore 1T1G</p>
                {companyLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeNavigation}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-text transition-colors hover:bg-surface hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Icon aria-hidden="true" className="size-4 text-accent" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
          </button>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-xs font-semibold text-accentForeground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-2 sm:px-5 sm:text-sm"
          >
            Contact us <ArrowRight aria-hidden="true" className="size-3.5 sm:size-4" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border/60 bg-bg px-5 pb-5 pt-3 shadow-lg md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-2">
            <MobileMenuGroup
              label="Services"
              open={openMenu === "services"}
              onToggle={() => toggleMenu("services")}
            >
              {serviceLinks.map(({ href, label, description }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeNavigation}
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-bgAlt"
                >
                  <span className="block text-sm font-medium text-text">{label}</span>
                  <span className="mt-0.5 block text-xs text-textMuted">{description}</span>
                </Link>
              ))}
              <Link href="/services" onClick={closeNavigation} className="mt-1 flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-accent">
                All services <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </MobileMenuGroup>

            <Link href="/portfolio" onClick={closeNavigation} className="rounded-xl px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-surface">
              Our work
            </Link>

            <MobileMenuGroup
              label="Explore"
              open={openMenu === "company"}
              onToggle={() => toggleMenu("company")}
            >
              {companyLinks.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeNavigation}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-text transition-colors hover:bg-bgAlt"
                >
                  <Icon aria-hidden="true" className="size-4 text-accent" />
                  {label}
                </Link>
              ))}
            </MobileMenuGroup>

          </div>
        </nav>
      )}
    </header>
  );
}

function MobileMenuGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const id = `mobile-${label.toLowerCase()}-submenu`;
  return (
    <div className="rounded-xl border border-border bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-11 w-full items-center justify-between px-4 text-left text-sm font-medium text-text"
      >
        {label}
        <ChevronDown aria-hidden="true" className={`size-4 text-textMuted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div id={id} className="border-t border-border p-2">{children}</div>}
    </div>
  );
}
