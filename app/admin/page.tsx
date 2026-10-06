"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

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
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredContacts = useMemo(
    () => contacts.filter((item) => matchesInboxFilter(item, query, statusFilter)),
    [contacts, query, statusFilter]
  );
  const filteredApplications = useMemo(
    () => applications.filter((item) => matchesInboxFilter(item, query, statusFilter)),
    [applications, query, statusFilter]
  );
  const needsAttention =
    contacts.filter((item) => item.status !== "resolved").length +
    applications.filter((item) => item.status !== "resolved").length;

  return (
    <main className="admin-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-accent">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tightest">Submission inbox</h1>
          <p className="mt-2 text-sm text-textMuted">Keep track of incoming inquiries and applications.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadInbox()}
          disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw aria-hidden="true" className={`size-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>}
      {loading ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-textMuted" role="status">
          Loading submissions…
        </div>
      ) : (
        <>
          <section aria-label="Inbox overview" className="mt-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="All submissions" value={contacts.length + applications.length} detail="Inquiries and applications" />
            <SummaryCard label="Need attention" value={needsAttention} detail="New or being reviewed" highlight={needsAttention > 0} />
            <SummaryCard label="Resolved" value={contacts.length + applications.length - needsAttention} detail="Marked as resolved" />
          </section>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search submissions</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-textMuted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search names, emails, messages…"
                className="min-h-11 w-full rounded-xl border border-border bg-bg pl-10 pr-4 text-sm text-text outline-none transition-colors placeholder:text-textMuted/70 focus:border-accent"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-textMuted">
              <span className="shrink-0">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="min-h-11 min-w-36 rounded-xl border border-border bg-bg px-3 text-sm text-text outline-none focus:border-accent"
              >
                <option value="all">All statuses</option>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-8 grid gap-10 xl:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold">Contact & course inquiries <span className="text-sm font-normal text-textMuted">({filteredContacts.length}{filteredContacts.length !== contacts.length ? ` of ${contacts.length}` : ""})</span></h2>
            {contacts.length === 0 ? <EmptyState>No inquiries yet.</EmptyState> : filteredContacts.length === 0 ? <EmptyState>No inquiries match these filters.</EmptyState> : (
              <div className="mt-4 space-y-4">
                {filteredContacts.map((item) => (
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
            <h2 className="text-lg font-semibold">Career applications <span className="text-sm font-normal text-textMuted">({filteredApplications.length}{filteredApplications.length !== applications.length ? ` of ${applications.length}` : ""})</span></h2>
            {applications.length === 0 ? <EmptyState>No applications yet.</EmptyState> : filteredApplications.length === 0 ? <EmptyState>No applications match these filters.</EmptyState> : (
              <div className="mt-4 space-y-4">
                {filteredApplications.map((item) => (
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
        </>
      )}
    </main>
  );
}

function matchesInboxFilter(
  item: ContactItem | CareerItem,
  query: string,
  status: string
) {
  const matchesStatus = status === "all" || item.status === status;
  const searchable = "service" in item ? item.service : item.role;
  const text = `${item.name} ${item.email} ${item.message} ${searchable}`.toLowerCase();
  return matchesStatus && text.includes(query.trim().toLowerCase());
}

function SummaryCard({
  label,
  value,
  detail,
  highlight = false,
}: {
  label: string;
  value: number;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm font-medium text-textMuted">{label}</p>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${highlight ? "text-accent" : "text-text"}`}>{value}</p>
      <p className="mt-1 text-xs text-textMuted">{detail}</p>
    </article>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 rounded-xl border border-dashed border-border px-4 py-6 text-sm text-textMuted">{children}</p>;
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
