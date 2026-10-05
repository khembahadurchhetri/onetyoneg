"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <div className="container-narrow flex h-14 items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-text">
          1T1G
        </Link>

        <nav className="hidden gap-8 text-[13px] text-textMuted sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-text">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}
            aria-pressed={theme === "light"}
            onClick={toggleTheme}
            className="text-[13px] text-textMuted transition-colors hover:text-text"
          >
            {theme === "dark" ? "Day mode" : "Night mode"}
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="text-[13px] text-textMuted sm:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 px-6 pb-4 pt-2 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[14px] text-textMuted hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
