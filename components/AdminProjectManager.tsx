"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { ImagePlus, Pencil, Plus, Trash2, X } from "lucide-react";

type ProjectRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  projectUrl: string | null;
  sortOrder: number;
};

type ProjectForm = {
  title: string;
  description: string;
  category: string;
  imageAlt: string;
  projectUrl: string;
};

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  category: "",
  imageAlt: "",
  projectUrl: "",
};

export default function AdminProjectManager() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load projects.");
      setProjects(data.projects);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (!image) {
      setPreview(editing?.imageUrl ?? "");
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [editing, image]);

  function resetForm() {
    setEditing(null);
    setForm(emptyForm);
    setImage(null);
    setPreview("");
  }

  function startEditing(project: ProjectRecord) {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      imageAlt: project.imageAlt,
      projectUrl: project.projectUrl ?? "",
    });
    setImage(null);
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.currentTarget.files?.[0] ?? null;
    setImage(selected);
    setError("");
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing && !image) {
      setError("Choose a project image before saving.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    try {
      const response = await fetch(
        `/api/admin/projects${editing ? `/${editing.id}` : ""}`,
        { method: editing ? "PATCH" : "POST", body: data }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not save the project.");
      setNotice(result.warning || (editing ? "Project updated." : "Project added."));
      resetForm();
      await loadProjects();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the project.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project: ProjectRecord) {
    if (!window.confirm(`Permanently delete “${project.title}” and its uploaded image?`)) return;
    setDeletingId(project.id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not delete the project.");
      if (editing?.id === project.id) resetForm();
      setNotice(result.warning || "Project deleted.");
      await loadProjects();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete the project.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="admin-page">
      <header>
        <p className="text-sm font-medium text-accent">Admin catalog</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tightest">Manage projects</h1>
        <p className="mt-2 text-sm text-textMuted">
          Add, update, and remove projects shown on the homepage and projects page.
        </p>
      </header>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>}
      {notice && <p role="status" className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent">{notice}</p>}

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
        <form onSubmit={saveProject} className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">{editing ? "Edit project" : "Add a project"}</h2>
            {editing && (
              <button type="button" onClick={resetForm} className="inline-flex items-center gap-1 text-sm text-textMuted hover:text-text">
                <X aria-hidden="true" className="size-4" /> Cancel
              </button>
            )}
          </div>

          <ProjectField label="Project name" name="title" value={form.title} onChange={updateField} required maxLength={120} />
          <ProjectField label="Category" name="category" value={form.category} onChange={updateField} required maxLength={80} placeholder="Website, branding, app…" />
          <ProjectField label="Description" name="description" value={form.description} onChange={updateField} required maxLength={1000} multiline />
          <ProjectField label="Image description (accessibility)" name="imageAlt" value={form.imageAlt} onChange={updateField} required maxLength={200} />
          <ProjectField label="Project URL (optional)" name="projectUrl" value={form.projectUrl} onChange={updateField} maxLength={2048} type="url" placeholder="https://" />

          <div>
            <label htmlFor="project-image" className="mb-1.5 block text-sm font-medium text-textMuted">
              Project image {editing ? "(optional to replace)" : ""}
            </label>
            <label htmlFor="project-image" className="group flex min-h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-bgAlt p-4 text-center transition-colors hover:border-accent">
              {preview ? (
                <span className="relative block h-40 w-full overflow-hidden rounded-lg">
                  <Image src={preview} alt="" fill unoptimized className="object-cover" />
                </span>
              ) : (
                <>
                  <ImagePlus aria-hidden="true" className="size-6 text-accent" />
                  <span className="mt-2 text-sm font-medium text-text">Choose project image</span>
                  <span className="mt-1 text-xs text-textMuted">JPEG, PNG, WebP, or AVIF · up to 4 MB</span>
                </>
              )}
              <input
                id="project-image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                required={!editing}
                onChange={chooseImage}
                className="sr-only"
              />
            </label>
            {image && (
              <p className="mt-2 text-xs text-textMuted">
                {image.name} · {(image.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accentForeground transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait disabled:opacity-60"
          >
            {editing ? <Pencil aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
            {saving ? "Saving…" : editing ? "Save project" : "Add project"}
          </button>
        </form>

        <section>
          <h2 className="text-xl font-semibold">
            Projects <span className="text-sm font-normal text-textMuted">({projects.length})</span>
          </h2>
          {loading ? (
            <p role="status" className="mt-4 text-sm text-textMuted">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-sm text-textMuted">No projects added yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {projects.map((project) => (
                <article key={project.id} className="flex gap-4 rounded-xl border border-border bg-surface p-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-bgAlt sm:size-24">
                    <Image src={project.imageUrl} alt="" fill unoptimized sizes="96px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <p className="truncate font-semibold text-text">{project.title}</p>
                    <p className="mt-1 text-xs text-accent">{project.category}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-textMuted">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <button type="button" onClick={() => startEditing(project)} className="text-xs font-medium text-accent hover:underline">Edit</button>
                      <button
                        type="button"
                        onClick={() => void deleteProject(project)}
                        disabled={deletingId === project.id}
                        className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline disabled:opacity-60"
                      >
                        <Trash2 aria-hidden="true" className="size-3.5" />
                        {deletingId === project.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );

  function updateField(name: keyof ProjectForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }
}

function ProjectField({
  label,
  name,
  value,
  onChange,
  required = false,
  maxLength,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  name: keyof ProjectForm;
  value: string;
  onChange: (name: keyof ProjectForm, value: string) => void;
  required?: boolean;
  maxLength: number;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const id = `project-${name}`;
  const className = "w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-textMuted/70 focus:border-accent";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-textMuted">{label}</label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={3}
          className={className}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}
