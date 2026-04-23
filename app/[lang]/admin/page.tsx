"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [project, setProject] = useState({
    title: "",
    description_uz: "",
    description_en: "",
    image_src: "",
    live_url: "",
    github_url: "",
    tech_stack: "",
    image_position: "center",
    priority: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`
        },
        body: JSON.stringify({
          ...project,
          tech_stack: project.tech_stack.split(",").map((s) => s.trim())
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Loyiha muvaffaqiyatli qo'shildi!");
        setProject({
          title: "",
          description_uz: "",
          description_en: "",
          image_src: "",
          live_url: "",
          github_url: "",
          tech_stack: "",
          image_position: "center",
          priority: false
        });
      } else {
        setMessage("Xato: " + data.error);
      }
    } catch (err: any) {
      setMessage("Xato yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Yangi loyiha qo'shish</h1>
          <Link href="/" className="text-blue-600 hover:underline">Asosiyga qaytish</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Secret Key</label>
            <input
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loyiha nomi</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rasm manzili (URL)</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={project.image_src}
                onChange={(e) => setProject({ ...project, image_src: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tavsif (UZ)</label>
            <textarea
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={project.description_uz}
              onChange={(e) => setProject({ ...project, description_uz: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tavsif (EN)</label>
            <textarea
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={project.description_en}
              onChange={(e) => setProject({ ...project, description_en: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Live URL</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={project.live_url}
                onChange={(e) => setProject({ ...project, live_url: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={project.github_url}
                onChange={(e) => setProject({ ...project, github_url: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Texnologiyalar (vergul bilan ajrating)</label>
            <input
              type="text"
              placeholder="React, Next.js, Tailwind"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={project.tech_stack}
              onChange={(e) => setProject({ ...project, tech_stack: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="priority"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={project.priority}
                onChange={(e) => setProject({ ...project, priority: e.target.checked })}
              />
              <label htmlFor="priority" className="ml-2 block text-sm text-gray-900">Priority (Asosiy)</label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {loading ? "Yuborilmoqda..." : "Loyiha qo'shish"}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-md ${message.includes("Xato") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
