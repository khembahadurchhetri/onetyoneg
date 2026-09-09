"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      setError("Fill in your name, email, and message first.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-[16px] text-text">
        Message sent. We&apos;ll reply within a day or two.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-[13px] text-textMuted">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] text-textMuted">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] text-textMuted">Service</label>
        <select
          name="service"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        >
          <option>Website or app</option>
          <option>Design</option>
          <option>Marketing & SEO</option>
          <option>Hospitality</option>
          <option>Govt. forms or share market</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] text-textMuted">Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us what you need"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-[13px] text-red-400">{error}</p>}
      {status === "error" && (
        <p className="text-[13px] text-red-400">
          Couldn&apos;t send that. Try again, or email onetyoneg@gmail.com directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
