"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "/admin", label: "Inbox" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/account", label: "Account" },
];

export default function AdminSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [error, setError] = useState("");

  async function signOut() {
    setError("");
    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!response.ok) {
        throw new Error("Could not sign out. Please try again.");
      }
      router.replace("/admin/login");
      router.refresh();
    } catch (logoutError) {
      setError(
        logoutError instanceof Error ? logoutError.message : "Could not sign out."
      );
    }
  }

  return (
    <aside className="border-b border-border bg-surface px-5 py-5 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-6">
      <div className="flex items-center justify-between lg:block">
        <div>
          <Link href="/" aria-label="1T1G home" className="inline-flex items-center gap-3">
            <Image src="/logo/1t1g-logo.jpg" alt="" width={40} height={40} className="size-10 rounded-xl object-cover" />
            <span className="text-sm font-semibold text-text">Admin workspace</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="text-sm text-textMuted hover:text-text"
        >
          Sign out
        </button>
      </div>
      <nav aria-label="Admin navigation" className="mt-6 flex gap-2 overflow-x-auto lg:flex-col">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${
              pathname === link.href
                ? "bg-bgAlt font-medium text-accent"
                : "text-textMuted hover:bg-bgAlt hover:text-text"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {error && <p role="alert" className="mt-4 text-xs text-red-500">{error}</p>}
    </aside>
  );
}
