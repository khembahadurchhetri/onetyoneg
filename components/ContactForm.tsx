"use client";

import { useState } from "react";

export default function ContactForm({
  initialCourse = "",
  initialService = "",
}: {
  initialCourse?: string;
  initialService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [sentNotice, setSentNotice] = useState("");

  const services = [
    "Website or app",
    "Design",
    "Marketing & SEO",
    "Hospitality",
    "Govt. forms or share market",
    "Course inquiry",
    "Something else",
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
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
      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Could not send your message.");
      setSentNotice(
        response.emailSent
          ? "Message sent. We’ll reply within a day or two."
          : response.message || "Message saved. We’ll follow up from our admin inbox."
      );
      setStatus("sent");
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not send your message.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-[16px] text-text">
        {sentNotice}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-[13px] text-textMuted">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={120}
          placeholder="Your name"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-[13px] text-textMuted">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-1.5 block text-[13px] text-textMuted">Service</label>
        <select
          id="contact-service"
          name="service"
          defaultValue={
            initialCourse
              ? "Course inquiry"
              : initialService
                ? initialService
                : services[0]
          }
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        >
          {initialService && !services.includes(initialService) && (
            <option value={initialService}>{initialService}</option>
          )}
          {services.map((service) => <option key={service}>{service}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[13px] text-textMuted">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          maxLength={5000}
          placeholder="Tell us what you need"
          defaultValue={
            initialCourse
              ? `I’m interested in the ${initialCourse} course. Please send me more information.`
              : undefined
          }
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-[13px] text-red-400">{error}</p>}
      {status === "error" && (
        <p className="text-[13px] text-red-400">
          {error || "Couldn’t send that. Try again, or email onetyoneg@gmail.com directly."}
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
