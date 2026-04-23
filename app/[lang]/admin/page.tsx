"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type ProjectForm = {
  title: string;
  description_uz: string;
  description_en: string;
  details_uz: string;
  details_en: string;
  image_src: string;
  live_url: string;
  github_url: string;
  tech_stack: string;
  image_position: string;
  priority: boolean;
};

type SavedProject = {
  id: number;
  title: string;
  description_uz: string;
  image_src: string;
  tech_stack: string[];
};

const emptyProject: ProjectForm = {
  title: "",
  description_uz: "",
  description_en: "",
  details_uz: "",
  details_en: "",
  image_src: "",
  live_url: "",
  github_url: "",
  tech_stack: "",
  image_position: "center",
  priority: false
};

function toTechStack(value: string) {
  return value
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [project, setProject] = useState<ProjectForm>(emptyProject);

  async function loadProjects() {
    setListLoading(true);

    try {
      const response = await fetch("/api/projects");
      const data = (await response.json()) as SavedProject[];
      setSavedProjects(Array.isArray(data) ? data : []);
    } catch {
      setSavedProjects([]);
    } finally {
      setListLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`
        },
        body: JSON.stringify({
          ...project,
          tech_stack: toTechStack(project.tech_stack)
        })
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || "Loyiha saqlanmadi.");
        return;
      }

      setMessage("Loyiha saqlandi. Projects sahifasi yangilandi.");
      setProject(emptyProject);
      await loadProjects();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? `Xato yuz berdi: ${error.message}`
          : "Noma'lum xato yuz berdi."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateProject<Key extends keyof ProjectForm>(
    key: Key,
    value: ProjectForm[Key]
  ) {
    setProject((current) => ({ ...current, [key]: value }));
  }

  async function handleDelete(id: number, title: string) {
    const confirmed = window.confirm(`"${title}" projectini o'chirasizmi?`);

    if (!confirmed) return;

    setDeletingId(id);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${secret}`
        }
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || "Project o'chirilmadi.");
        return;
      }

      setMessage("Project o'chirildi. Projects sahifasi yangilandi.");
      await loadProjects();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? `Xato yuz berdi: ${error.message}`
          : "Noma'lum xato yuz berdi."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_36%)] px-5 py-8 text-[#111827] transition-colors dark:bg-[linear-gradient(180deg,#0f172a_0%,#090d14_36%)] dark:text-white">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2563eb] dark:text-[#93c5fd]">
              Admin
            </p>
            <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-bold tracking-[-0.05em]">
              Yangi loyiha yaratish
            </h1>
          </div>
          <Link
            className="inline-flex w-fit rounded-full border border-[#dbe4ef] bg-white px-5 py-2.5 font-semibold text-[#111827] transition hover:border-[#bfdbfe] hover:bg-[#eff6ff] dark:border-[#243142] dark:bg-[#111827] dark:text-white dark:hover:border-[#3b82f6] dark:hover:bg-[#172033]"
            href="/uz/projects"
          >
            Projects
          </Link>
        </div>

        <form
          className="space-y-5 rounded-[28px] bg-white/88 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur transition-colors dark:bg-[#111827]/82 dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-7"
          onSubmit={handleSubmit}
        >
          <p className="rounded-2xl bg-[#eff6ff] p-4 text-sm leading-6 text-[#1e3a8a] dark:bg-[#0f172a] dark:text-[#bfdbfe]">
            Bu panel Vercel ichidagi serverless API orqali ishlaydi. Faqat
            Vercel Postgres envlari va ADMIN_SECRET sozlangan bo&apos;lishi kerak.
          </p>

          <label className="block">
            <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
              Admin secret
            </span>
            <input
              className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
              onChange={(event) => setSecret(event.target.value)}
              required
              type="password"
              value={secret}
            />
          </label>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Loyiha nomi
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) => updateProject("title", event.target.value)}
                required
                value={project.title}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Rasm URL
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) =>
                  updateProject("image_src", event.target.value)
                }
                placeholder="https://..."
                required
                value={project.image_src}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
              Tavsif UZ
            </span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
              onChange={(event) =>
                updateProject("description_uz", event.target.value)
              }
              required
              value={project.description_uz}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
              Batafsil UZ
            </span>
            <textarea
              className="mt-2 min-h-36 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
              onChange={(event) =>
                updateProject("details_uz", event.target.value)
              }
              placeholder="Project haqida to'liqroq ma'lumot yozing..."
              required
              value={project.details_uz}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
              Description EN
            </span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
              onChange={(event) =>
                updateProject("description_en", event.target.value)
              }
              required
              value={project.description_en}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
              Details EN
            </span>
            <textarea
              className="mt-2 min-h-36 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
              onChange={(event) =>
                updateProject("details_en", event.target.value)
              }
              placeholder="Write a fuller project description..."
              required
              value={project.details_en}
            />
          </label>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Live URL
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) =>
                  updateProject("live_url", event.target.value)
                }
                placeholder="https://..."
                value={project.live_url}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                GitHub URL
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) =>
                  updateProject("github_url", event.target.value)
                }
                placeholder="https://github.com/..."
                value={project.github_url}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_180px]">
            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Texnologiyalar
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) =>
                  updateProject("tech_stack", event.target.value)
                }
                placeholder="React, Next.js, Tailwind"
                required
                value={project.tech_stack}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Image position
              </span>
              <input
                className="mt-2 w-full rounded-2xl border border-[#dbe4ef] bg-white px-4 py-3 text-[#111827] outline-none transition focus:border-[#2563eb] dark:border-[#243142] dark:bg-[#0f172a] dark:text-white"
                onChange={(event) =>
                  updateProject("image_position", event.target.value)
                }
                value={project.image_position}
              />
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-[#dbe4ef] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#334155] dark:border-[#243142] dark:bg-[#0f172a] dark:text-[#cbd5e1]">
            <input
              checked={project.priority}
              className="size-4 accent-[#2563eb]"
              onChange={(event) =>
                updateProject("priority", event.target.checked)
              }
              type="checkbox"
            />
            Priority qilib yuqoriga chiqarish
          </label>

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-[#007bff] px-6 py-3.5 font-bold text-white shadow-[0_14px_30px_rgba(0,123,255,0.18)] transition hover:-translate-y-px hover:bg-[#006ee6] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Saqlanmoqda..." : "Loyihani saqlash"}
          </button>

          {message ? (
            <p
              className={`rounded-2xl p-4 text-sm font-semibold ${
                isError
                  ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-200"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>

        <section className="mt-8 rounded-[28px] bg-white/88 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur transition-colors dark:bg-[#111827]/82 dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb] dark:text-[#93c5fd]">
                Database
              </p>
              <h2 className="text-2xl font-bold tracking-[-0.04em]">
                Qo&apos;shilgan projectlar
              </h2>
            </div>
            <button
              className="inline-flex w-fit rounded-full border border-[#dbe4ef] px-4 py-2 text-sm font-semibold text-[#334155] transition hover:border-[#bfdbfe] hover:bg-[#eff6ff] dark:border-[#243142] dark:text-[#cbd5e1] dark:hover:border-[#3b82f6] dark:hover:bg-[#172033]"
              onClick={loadProjects}
              type="button"
            >
              Yangilash
            </button>
          </div>

          {!secret ? (
            <p className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800 dark:bg-amber-950/35 dark:text-amber-200">
              O&apos;chirish uchun avval yuqoridagi Admin secret maydoniga
              parolni kiriting.
            </p>
          ) : null}

          {listLoading ? (
            <p className="rounded-2xl bg-[#f8fafc] p-4 text-sm font-semibold text-[#64748b] dark:bg-[#0f172a] dark:text-[#cbd5e1]">
              Projectlar yuklanmoqda...
            </p>
          ) : null}

          {!listLoading && savedProjects.length === 0 ? (
            <p className="rounded-2xl bg-[#f8fafc] p-4 text-sm font-semibold text-[#64748b] dark:bg-[#0f172a] dark:text-[#cbd5e1]">
              Hozircha database orqali qo&apos;shilgan project yo&apos;q.
            </p>
          ) : null}

          <div className="space-y-3">
            {savedProjects.map((item) => (
              <article
                className="flex flex-col gap-4 rounded-2xl border border-[#dbe4ef] bg-[#f8fafc] p-4 transition-colors dark:border-[#243142] dark:bg-[#0f172a] sm:flex-row sm:items-center sm:justify-between"
                key={item.id}
              >
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold">{item.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-[#64748b] dark:text-[#cbd5e1]">
                    {item.description_uz}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2563eb] dark:text-[#93c5fd]">
                    {item.tech_stack.join(", ")}
                  </p>
                </div>

                <button
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={!secret || deletingId === item.id}
                  onClick={() => handleDelete(item.id, item.title)}
                  type="button"
                >
                  {deletingId === item.id ? "O'chirilmoqda..." : "O'chirish"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
