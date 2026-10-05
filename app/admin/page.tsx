"use client";

import { useCallback, useEffect, useState } from "react";

type ContactItem = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
};

type CareerItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  resumeUrl: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const statuses = ["new", "reviewing", "resolved"];

export default function AdminInboxPage() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [applications, setApplications] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInbox = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/inbox", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load inbox.");
      setContacts(data.contacts);
      setApplications(data.applications);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load inbox.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInbox();
  }, [loadInbox]);

  async function updateStatus(type: "contacts" | "careers", id: string, status: string) {
    setError("");
    try {
      const response = await fetch(`/api/admin/inbox/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update status.");
      await loadInbox();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update status.");
    }
  }

  return (
    <main className="section container-narrow">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest">Submission inbox</h1>
          <p className="mt-2 text-sm text-textMuted">Contact inquiries and career applications.</p>
        </div>
        <button type="button" onClick={() => void loadInbox()} className="rounded-full border border-border px-4 py-2 text-sm text-text hover:border-accent">
          Refresh
        </button>
      </div>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>}
      {loading ? (
        <p className="mt-10 text-sm text-textMuted">Loading submissions…</p>
      ) : (
        <div className="mt-10 space-y-12">
          <section>
            <h2 className="text-xl font-semibold">Contact & course inquiries <span className="text-sm font-normal text-textMuted">({contacts.length})</span></h2>
            {contacts.length === 0 ? <p className="mt-4 text-sm text-textMuted">No inquiries yet.</p> : (
              <div className="mt-4 space-y-4">
                {contacts.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <a href={`mailto:${item.email}`} className="mt-1 block text-sm text-accent hover:underline">{item.email}</a>
                        <p className="mt-2 text-xs text-textMuted">{item.service} · {new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                      <StatusSelect value={item.status} onChange={(status) => updateStatus("contacts", item.id, status)} />
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-textMuted">{item.message}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold">Career applications <span className="text-sm font-normal text-textMuted">({applications.length})</span></h2>
            {applications.length === 0 ? <p className="mt-4 text-sm text-textMuted">No applications yet.</p> : (
              <div className="mt-4 space-y-4">
                {applications.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-border bg-surface p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{item.name} <span className="font-normal text-textMuted">— {item.role}</span></h3>
                        <a href={`mailto:${item.email}`} className="mt-1 block text-sm text-accent hover:underline">{item.email}</a>
                        {item.resumeUrl && <a href={item.resumeUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-accent hover:underline">CV / portfolio link</a>}
                        <p className="mt-2 text-xs text-textMuted">{new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                      <StatusSelect value={item.status} onChange={(status) => updateStatus("careers", item.id, status)} />
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-textMuted">{item.message}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function StatusSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-textMuted">
      Status
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-border bg-bg px-2 py-1.5 text-text">
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </label>
  );
}
