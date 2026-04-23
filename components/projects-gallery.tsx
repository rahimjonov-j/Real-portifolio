"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";

export type ProjectGalleryItem = {
  slug: string;
  title: string;
  description: string;
  details: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  priority?: boolean;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
};

type ProjectsGalleryProps = {
  projects: ProjectGalleryItem[];
  liveLabel: string;
  githubLabel: string;
  techLabel: string;
};

export function ProjectsGallery({
  projects,
  liveLabel,
  githubLabel,
  techLabel
}: ProjectsGalleryProps) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectGalleryItem | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <section className="grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            {...project}
            githubLabel={githubLabel}
            liveLabel={liveLabel}
            onDetailsClick={() => setSelectedProject(project)}
            techLabel={techLabel}
          />
        ))}
      </section>

      {selectedProject ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/55 px-4 py-6 backdrop-blur-md"
          role="dialog"
        >
          <button
            aria-label="Modalni yopish"
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedProject(null)}
            type="button"
          />

          <article className="relative z-10 h-[90vh] w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/55 bg-white shadow-[0_30px_90px_rgba(2,6,23,0.35)] transition-colors dark:border-[#243142] dark:bg-[#0f172a]">
            <button
              aria-label="Yopish"
              className="absolute top-4 right-4 z-20 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[#111827] shadow-[0_10px_24px_rgba(15,23,42,0.14)] transition hover:bg-[#f1f5f9] dark:bg-[#111827]/90 dark:text-white dark:hover:bg-[#172033]"
              onClick={() => setSelectedProject(null)}
              type="button"
            >
              ×
            </button>

            <div className="grid h-full gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative h-[32vh] bg-[#f3f4f6] dark:bg-[#172033] sm:h-[40vh] lg:h-full">
                <Image
                  fill
                  alt={selectedProject.imageAlt}
                  className="object-cover"
                  sizes="(max-width: 1024px) calc(100vw - 32px), 520px"
                  src={selectedProject.imageSrc}
                  unoptimized
                  style={{
                    objectPosition: selectedProject.imagePosition || "center"
                  }}
                />
              </div>

              <div className="scrollbar-hidden overflow-y-auto p-5 sm:p-7 lg:p-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#2563eb] dark:text-[#93c5fd]">
                  Project
                </p>
                <h2 className="mb-4 text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.06em] text-[#111827] dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="mb-6 text-[1.02rem] leading-8 text-[#475569] dark:text-[#cbd5e1]">
                  {selectedProject.description}
                </p>

                <div aria-label={techLabel} className="mb-7 flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      className="inline-flex rounded-full border border-[#d6e6ff] bg-[#f8fbff] px-3 py-2 text-[0.82rem] font-semibold text-[#1d4ed8] transition-colors dark:border-[#1d4ed8]/40 dark:bg-[#111827] dark:text-[#93c5fd]"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="mb-3 text-2xl font-bold tracking-[-0.04em] text-[#111827] dark:text-white">
                  Batafsil
                </h3>
                <p className="whitespace-pre-line text-[1rem] leading-8 text-[#475569] dark:text-[#cbd5e1]">
                  {selectedProject.details}
                </p>

              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
