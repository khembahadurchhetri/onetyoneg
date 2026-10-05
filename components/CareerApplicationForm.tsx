"use client";

import { FormEvent, useState } from "react";

export default function CareerApplicationForm({ roles }: { roles: string[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Could not submit your application.");
      }
      setMessage(
        result.emailSent
          ? "Application received. We’ll be in touch if there’s a match."
          : result.message || "Application saved. We’ll follow up from our admin inbox."
      );
      form.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Could not submit your application."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-xl space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div>
        <label htmlFor="career-name" className="mb-1.5 block text-[13px] text-textMuted">Name</label>
        <input id="career-name" name="name" required maxLength={120} autoComplete="name" className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="career-email" className="mb-1.5 block text-[13px] text-textMuted">Email</label>
        <input id="career-email" name="email" type="email" required maxLength={254} autoComplete="email" className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="career-role" className="mb-1.5 block text-[13px] text-textMuted">Role</label>
        <select id="career-role" name="role" required defaultValue="" className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] outline-none focus:border-accent">
          <option value="" disabled>Select a role</option>
          {roles.map((role) => <option key={role}>{role}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="career-resume" className="mb-1.5 block text-[13px] text-textMuted">CV or portfolio link (optional)</label>
        <input id="career-resume" name="resumeUrl" type="url" maxLength={2000} placeholder="https://" className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="career-message" className="mb-1.5 block text-[13px] text-textMuted">A short note</label>
        <textarea id="career-message" name="message" required maxLength={5000} rows={5} placeholder="Tell us about your experience and what you want to work on." className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-[15px] outline-none focus:border-accent" />
      </div>
      <div className="hidden" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      {message && <p role="status" className="text-sm text-accent">{message}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-full bg-accent py-3 text-sm font-medium text-white disabled:opacity-60">
        {loading ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
