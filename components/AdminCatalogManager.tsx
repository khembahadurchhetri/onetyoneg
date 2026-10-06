"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type CourseRecord = {
  id: string;
  isActive: boolean;
  category: string;
  title: string;
  level: string;
  price: string;
  description: string;
  topics: string[];
};

type ServiceRecord = {
  id: string;
  isActive: boolean;
  name: string;
  detail: string;
  price: string;
};

type FormState = {
  category: string;
  title: string;
  level: string;
  price: string;
  description: string;
  topics: string;
  name: string;
  detail: string;
};

const emptyForm: FormState = {
  category: "",
  title: "",
  level: "",
  price: "",
  description: "",
  topics: "",
  name: "",
  detail: "",
};

export default function AdminCatalogManager({
  kind,
}: {
  kind: "courses" | "services";
}) {
  const isCourses = kind === "courses";
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visibilityUpdatingId, setVisibilityUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/${kind}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load this catalog.");
      if (isCourses) setCourses(data.courses);
      else setServices(data.services);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load this catalog.");
    } finally {
      setLoading(false);
    }
  }, [isCourses, kind]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  function editCourse(course: CourseRecord) {
    setEditingId(course.id);
    setForm({
      ...emptyForm,
      category: course.category,
      title: course.title,
      level: course.level,
      price: course.price,
      description: course.description,
      topics: course.topics.join(", "),
    });
    setNotice("");
  }

  function editService(service: ServiceRecord) {
    setEditingId(service.id);
    setForm({
      ...emptyForm,
      name: service.name,
      detail: service.detail,
      price: service.price,
    });
    setNotice("");
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    const payload = isCourses
      ? {
          category: form.category,
          title: form.title,
          level: form.level,
          price: form.price,
          description: form.description,
          topics: form.topics.split(",").map((topic) => topic.trim()).filter(Boolean),
        }
      : { name: form.name, detail: form.detail, price: form.price };

    try {
      const response = await fetch(
        `/api/admin/${kind}${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not save changes.");
      resetForm();
      setNotice(editingId ? "Changes saved." : "Item added.");
      await loadItems();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Permanently delete this item?")) return;
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not delete this item.");
      if (editingId === id) resetForm();
      setNotice("Item deleted.");
      await loadItems();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete this item.");
    }
  }

  async function toggleVisibility(id: string, isActive: boolean) {
    setVisibilityUpdatingId(id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/${kind}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update visibility.");
      setNotice(isActive ? "Item unpublished." : "Item published.");
      await loadItems();
    } catch (visibilityError) {
      setError(visibilityError instanceof Error ? visibilityError.message : "Could not update visibility.");
    } finally {
      setVisibilityUpdatingId(null);
    }
  }

  function changeField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="admin-page">
      <header>
        <p className="text-sm font-medium text-accent">Admin catalog</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tightest">
          Manage {isCourses ? "courses" : "services"}
        </h1>
        <p className="mt-2 text-sm text-textMuted">
          Changes here appear on the public {isCourses ? "courses" : "services"} page.
        </p>
      </header>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>}
      {notice && <p role="status" className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent">{notice}</p>}

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-start">
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-border bg-surface p-5 sm:p-7">
          <h2 className="text-lg font-semibold">{editingId ? "Edit item" : `Add ${isCourses ? "a course" : "a service"}`}</h2>
          {isCourses ? (
            <>
              <Field label="Course title" value={form.title} onChange={(value) => changeField("title", value)} required maxLength={160} />
              <Field label="Category" value={form.category} onChange={(value) => changeField("category", value)} required maxLength={100} />
              <Field label="Level" value={form.level} onChange={(value) => changeField("level", value)} required maxLength={100} placeholder="Beginner to intermediate" />
              <Field label="Price" value={form.price} onChange={(value) => changeField("price", value)} required maxLength={100} placeholder="NPR 5,000" />
              <TextArea label="Description" value={form.description} onChange={(value) => changeField("description", value)} required maxLength={2000} />
              <Field label="Topics (comma-separated)" value={form.topics} onChange={(value) => changeField("topics", value)} required maxLength={2000} placeholder="Figma, Wireframes, Design systems" />
            </>
          ) : (
            <>
              <Field label="Service name" value={form.name} onChange={(value) => changeField("name", value)} required maxLength={160} />
              <TextArea label="Description" value={form.detail} onChange={(value) => changeField("detail", value)} required maxLength={2000} />
              <Field label="Price" value={form.price} onChange={(value) => changeField("price", value)} required maxLength={100} placeholder="Quoted per project" />
            </>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={saving} className="min-h-11 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Saving…" : editingId ? "Save changes" : `Add ${isCourses ? "course" : "service"}`}
            </button>
            {editingId && <button type="button" onClick={resetForm} className="min-h-11 rounded-full border border-border px-5 py-2.5 text-sm text-text">Cancel</button>}
          </div>
        </form>

        <section className="xl:sticky xl:top-8">
          <h2 className="text-xl font-semibold">
            Manage listings <span className="text-sm font-normal text-textMuted">({isCourses ? courses.length : services.length})</span>
          </h2>
          {loading ? <p className="mt-4 text-sm text-textMuted">Loading…</p> : (
            <div className="mt-4 space-y-3">
              {isCourses ? courses.map((course) => (
                <article key={course.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{course.title}</h3>
                          <VisibilityBadge isActive={course.isActive} />
                        </div>
                        <p className="mt-1 text-xs text-textMuted">{course.category} · {course.level} · {course.price}</p>
                      </div>
                      <ItemActions
                        onEdit={() => editCourse(course)}
                        onDelete={() => void remove(course.id)}
                        onToggleVisibility={() => void toggleVisibility(course.id, course.isActive)}
                        isActive={course.isActive}
                        updating={visibilityUpdatingId === course.id}
                      />
                      </article>
                    )) : services.map((service) => (
                      <article key={service.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{service.name}</h3>
                          <VisibilityBadge isActive={service.isActive} />
                        </div>
                        <p className="mt-1 text-xs text-textMuted">{service.price}</p>
                      </div>
                      <ItemActions
                        onEdit={() => editService(service)}
                        onDelete={() => void remove(service.id)}
                        onToggleVisibility={() => void toggleVisibility(service.id, service.isActive)}
                        isActive={service.isActive}
                        updating={visibilityUpdatingId === service.id}
                      />
                      </article>
                    ))}
                    {isCourses && courses.length === 0 && <p className="text-sm text-textMuted">No courses yet.</p>}
                    {!isCourses && services.length === 0 && <p className="text-sm text-textMuted">No services yet.</p>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength: number;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-textMuted">{label}</label>
      <input id={id} value={value} required={required} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-accent" />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  maxLength: number;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-textMuted">{label}</label>
      <textarea id={id} value={value} required={required} maxLength={maxLength} rows={4} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none focus:border-accent" />
    </div>
  );
}

function VisibilityBadge({ isActive }: { isActive: boolean }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${isActive ? "bg-accent/10 text-accent" : "bg-bgAlt text-textMuted"}`}>
      {isActive ? "Published" : "Unpublished"}
    </span>
  );
}

function ItemActions({
  onEdit,
  onDelete,
  onToggleVisibility,
  isActive,
  updating,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  isActive: boolean;
  updating: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={onEdit} className="text-sm font-medium text-accent hover:underline">Edit</button>
      <button type="button" onClick={onToggleVisibility} disabled={updating} className="text-sm text-textMuted hover:text-text disabled:opacity-60">
        {updating ? "Updating…" : isActive ? "Unpublish" : "Publish"}
      </button>
      <button type="button" onClick={onDelete} className="text-sm text-red-500 hover:underline">Delete</button>
    </div>
  );
}
