"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed.");
      router.replace("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">1T1G</p>
          <h1 className="mt-2 text-3xl font-bold text-text">Admin login</h1>
          <p className="mt-2 text-sm text-textMuted">Sign in to manage courses, services, and submissions.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-textMuted">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-text outline-none focus:border-accent"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-textMuted">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-text outline-none focus:border-accent"
              placeholder="Enter password"
            />
          </div>
          {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
