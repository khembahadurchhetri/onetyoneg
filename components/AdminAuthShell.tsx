"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSideBar from "@/components/AdminSideBar";

export default function AdminAuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    let active = true;
    async function checkAdmin() {
      try {
        const response = await fetch("/api/admin/session", {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.message || "Could not verify admin access.");
        }
        if (active) {
          setError("");
          setChecking(false);
        }
      } catch (checkError) {
        if (active) {
          setError(
            checkError instanceof Error
              ? checkError.message
              : "Could not verify admin access."
          );
          setChecking(false);
        }
      }
    }

    setChecking(true);
    checkAdmin();
    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-textMuted">
        Checking admin access…
      </div>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
        <p role="alert" className="text-sm text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full border border-border px-4 py-2 text-sm text-text"
        >
          Try again
        </button>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminSideBar />
      <div className="lg:pl-72">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
