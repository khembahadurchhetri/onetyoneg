"use client";

import { FormEvent, useState } from "react";

export default function AdminAccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 12) {
      setError("Use a new password with at least 12 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not change password.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated. Use the new password next time you sign in.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not change password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-page">
      <p className="text-sm font-medium text-accent">Security</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tightest">Admin account</h1>
      <p className="mt-2 text-sm text-textMuted">Change the password for the admin account.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,36rem)_minmax(16rem,1fr)] lg:items-start">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7">
        <PasswordField label="Current password" value={currentPassword} onChange={setCurrentPassword} autoComplete="current-password" />
        <PasswordField label="New password" value={newPassword} onChange={setNewPassword} autoComplete="new-password" />
        <PasswordField label="Confirm new password" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />
        <p className="text-xs text-textMuted">Use at least 12 characters. Passwords are stored as scrypt hashes.</p>
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        {success && <p role="status" className="text-sm text-accent">{success}</p>}
        <button type="submit" disabled={loading} className="min-h-11 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
      <aside className="rounded-2xl border border-border bg-bgAlt p-5 sm:p-6">
        <h2 className="font-semibold text-text">Keep your account secure</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-textMuted">
          <li>Use a unique password you do not use on other sites.</li>
          <li>A passphrase of four or more unrelated words is easier to remember and hard to guess.</li>
          <li>Sign out when you finish using the admin area on a shared device.</li>
        </ul>
      </aside>
      </div>
    </main>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-textMuted">{label}</label>
      <input id={id} type="password" required maxLength={1024} autoComplete={autoComplete} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-accent" />
    </div>
  );
}
