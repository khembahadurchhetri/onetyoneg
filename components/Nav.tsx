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

const services = [
  { href: "/#web-development", label: "Websites & apps", description: "Design and development", Icon: Code2 },
  { href: "/#marketing-growth", label: "Marketing & growth", description: "SEO, content, and social media", Icon: Palette },
  { href: "/#hospitality", label: "Hospitality", description: "Digital support for stays and dining", Icon: BriefcaseBusiness },
  { href: "/#nepal-assistance", label: "Forms & share guidance", description: "Practical help with Nepal services", Icon: BookOpen },
];

const moreLinks = [
  { href: "/portfolio", label: "Projects", Icon: BriefcaseBusiness },
  { href: "/careers", label: "Careers", Icon: GraduationCap },
];

type DropdownName = "services" | "more";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownName | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [homeSection, setHomeSection] = useState<"home" | "services">("home");
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
    setMobileOpen(false);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setHomeSection("home");
      return;
    }

    const sections = ["web-development", "marketing-growth", "hospitality", "nepal-assistance"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.add(entry.target.id);
          else visibleSections.delete(entry.target.id);
        }
        setHomeSection(visibleSections.size > 0 ? "services" : "home");
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setDropdown(null);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeNav() {
    setMobileOpen(false);
    setDropdown(null);
  }

  function toggleDropdown(name: DropdownName) {
    setDropdown((current) => current === name ? null : name);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
  }

  const homeActive = pathname === "/" && homeSection === "home";
  const servicesActive = pathname === "/services" || (pathname === "/" && homeSection === "services");

  return (
    <header ref={headerRef} className="site-nav sticky top-0 z-50 border-b border-border/60 bg-bg/90 shadow-sm backdrop-blur-xl">
      <div className="container-narrow flex h-[4.5rem] items-center justify-between gap-3">
        <Link href="/" aria-label="1T1G home" onClick={closeNav} className="shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-[1.03]">
          <Image src="/logo/1t1g-logo.jpg" alt="1T1G" width={44} height={44} priority className="size-10 rounded-xl object-cover" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          <Link
            href="/"
            aria-current={homeActive ? "page" : undefined}
            onClick={closeNav}
            className={navItemClass(homeActive)}
          >
            Home
          </Link>

          <div className="relative">
            <button
              type="button"
              aria-expanded={dropdown === "services"}
              aria-controls="desktop-services-menu"
              onClick={() => toggleDropdown("services")}
              className={navItemClass(servicesActive || dropdown === "services")}
            >
              Services <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${dropdown === "services" ? "rotate-180" : ""}`} />
            </button>
            {dropdown === "services" && (
              <div id="desktop-services-menu" className="absolute left-0 top-full mt-3 w-[min(42rem,calc(100vw-2rem))] rounded-2xl border border-border bg-bg p-5 shadow-2xl shadow-black/20 sm:p-6">
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Ways we can help</p>
                    <h2 className="mt-1 text-lg font-semibold text-text">Services for your next step</h2>
                  </div>
                  <Link href="/services" onClick={closeNav} className="hidden items-center gap-1 text-xs font-semibold text-textMuted transition-colors hover:text-accent sm:inline-flex">
                    All services <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
                <div className="mt-3 grid gap-1 sm:grid-cols-2">
                  {services.map(({ href, label, description, Icon }) => (
                    <Link key={href} href={href} onClick={closeNav} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
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
                <Link href="/services" onClick={closeNav} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent sm:hidden">
                  Browse all services <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/courses" pathname={pathname} onClick={closeNav}>Courses</NavLink>
          <NavLink href="/about" pathname={pathname} onClick={closeNav}>About us</NavLink>
          <NavLink href="/blog" pathname={pathname} onClick={closeNav}>Blogs</NavLink>

          <div className="relative">
            <button type="button" aria-expanded={dropdown === "more"} aria-controls="desktop-more-menu" onClick={() => toggleDropdown("more")} className={navItemClass(dropdown === "more")}>
              More <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${dropdown === "more" ? "rotate-180" : ""}`} />
            </button>
            {dropdown === "more" && (
              <div id="desktop-more-menu" className="absolute right-0 top-full mt-3 w-52 rounded-2xl border border-border bg-bg p-2 shadow-2xl shadow-black/20">
                {moreLinks.map(({ href, label, Icon }) => (
                  <Link key={href} href={href} onClick={closeNav} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-text transition-colors hover:bg-surface hover:text-accent">
                    <Icon aria-hidden="true" className="size-4 text-accent" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={toggleTheme} className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "light"}>
            {theme === "dark" ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
          </button>
          <Link href="/contact" onClick={closeNav} className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-xs font-semibold text-accentForeground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm">
            Contact us <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
          <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)} className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden">
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-border/60 bg-bg px-5 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1.5">
            <Link href="/" onClick={closeNav} className={mobileLinkClass(homeActive)}>Home</Link>
            <MobileGroup label="Services" open={dropdown === "services"} active={servicesActive} onToggle={() => toggleDropdown("services")}>
              {services.map(({ href, label, description }) => (
                <Link key={href} href={href} onClick={closeNav} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-bgAlt">
                  <span className="block text-sm font-medium text-text">{label}</span>
                  <span className="mt-0.5 block text-xs text-textMuted">{description}</span>
                </Link>
              ))}
              <Link href="/services" onClick={closeNav} className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-accent">
                All services <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </MobileGroup>
            <Link href="/courses" onClick={closeNav} className={mobileLinkClass(pathname === "/courses")}>Courses</Link>
            <Link href="/about" onClick={closeNav} className={mobileLinkClass(pathname === "/about")}>About us</Link>
            <Link href="/blog" onClick={closeNav} className={mobileLinkClass(pathname === "/blog" || pathname.startsWith("/blog/"))}>Blogs</Link>
            <MobileGroup label="More" open={dropdown === "more"} active={pathname === "/portfolio" || pathname === "/careers"} onToggle={() => toggleDropdown("more")}>
              {moreLinks.map(({ href, label, Icon }) => (
                <Link key={href} href={href} onClick={closeNav} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-text transition-colors hover:bg-bgAlt">
                  <Icon aria-hidden="true" className="size-4 text-accent" /> {label}
                </Link>
              ))}
            </MobileGroup>
          </div>
        </nav>
      )}
    </header>
  );
}

function navItemClass(active: boolean) {
  return `relative inline-flex min-h-10 items-center gap-1 rounded-full px-2.5 text-[13px] font-medium transition-colors hover:bg-surface hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent xl:px-3 ${
    active ? "bg-accent/10 text-accent after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-accent" : "text-textMuted"
  }`;
}

function mobileLinkClass(active: boolean) {
  return `rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-surface hover:text-accent ${active ? "bg-accent/10 text-accent" : "text-text"}`;
}

function NavLink({
  href,
  pathname,
  onClick,
  children,
}: {
  href: string;
  pathname: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const active = pathname === href || (href === "/blog" && pathname.startsWith("/blog/"));
  return (
    <Link href={href} aria-current={active ? "page" : undefined} onClick={onClick} className={navItemClass(active)}>
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  open,
  active = false,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  active?: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const id = `mobile-${label.toLowerCase()}-submenu`;
  return (
    <div className="rounded-xl border border-border bg-surface">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className={`flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-left text-sm font-medium ${active ? "text-accent" : "text-text"}`}>
        {label}
        <ChevronDown aria-hidden="true" className={`size-4 text-textMuted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div id={id} className="border-t border-border p-2">{children}</div>}
    </div>
  );
}
