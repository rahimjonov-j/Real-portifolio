"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";

export type BentoProject = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  accent: string;
  span?: 1 | 2;
};

type BentoGridProps = {
  projects: BentoProject[];
  liveLabel: string;
  githubLabel: string;
};

function BentoCard({
  project,
  liveLabel,
  githubLabel,
  index,
}: {
  project: BentoProject;
  liveLabel: string;
  githubLabel: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const span = project.span ?? 1;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
      cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
    },
    [],
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-[#E4E4E7] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-[#27272A] dark:bg-[#09090B] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:[background:radial-gradient(350px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.06),transparent_100%)]",
        span === 2 ? "md:col-span-2" : "md:col-span-1",
      )}
    >
      <BorderBeam
        colorFrom={project.accent}
        colorTo="#8b5cf6"
        duration={5}
        borderWidth={1.5}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {project.liveUrl !== "#" ? (
        <a
          aria-label={`${project.title} live`}
          className="absolute inset-0 z-20"
          href={project.liveUrl}
          rel="noopener noreferrer"
          target="_blank"
        />
      ) : null}

      {/* Image */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[#f4f4f5] dark:bg-[#18181B]",
          span === 2 ? "h-[220px] sm:h-[280px]" : "h-[180px] sm:h-[220px]",
        )}
      >
        <Image
          fill
          alt={project.imageAlt}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            span === 2
              ? "(max-width: 768px) 100vw, 600px"
              : "(max-width: 768px) 100vw, 300px"
          }
          src={project.imageSrc}
          unoptimized
          style={{ objectPosition: project.imagePosition || "center" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-[#09090B]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 p-5 sm:p-6">
        <div>
          <h3 className="mb-1 text-[1.2rem] font-bold tracking-[-0.03em] text-[#18181B] transition-colors group-hover:text-[#2563eb] dark:text-[#FAFAFA] dark:group-hover:text-[#60a5fa] sm:text-[1.35rem]">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-[0.88rem] leading-[1.65] text-[#71717A] dark:text-[#52525B]">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, span === 2 ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-[#E4E4E7] bg-[#F4F4F5] px-2.5 py-1 font-mono text-[11px] font-medium text-[#52525B] transition-colors dark:border-[#27272A] dark:bg-[#18181B] dark:text-[#71717A]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="relative z-30 flex flex-wrap gap-2 pt-1">
          {project.liveUrl !== "#" && (
            <a
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-semibold transition-all hover:-translate-y-px"
              href={project.liveUrl}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
              style={{
                border: `1px solid ${project.accent}40`,
                background: `${project.accent}10`,
                color: project.accent,
              }}
            >
              {liveLabel} ↗
            </a>
          )}
          {project.githubUrl !== "#" && (
            <a
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-[12px] font-medium text-[#52525B] transition-all hover:-translate-y-px hover:border-[#A1A1AA] hover:text-[#18181B] dark:border-[#3F3F46] dark:bg-[#18181B] dark:text-[#71717A] dark:hover:border-[#52525B] dark:hover:text-[#A1A1AA]"
              href={project.githubUrl}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function BentoGrid({ projects, liveLabel, githubLabel }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, i) => (
        <BentoCard
          key={project.slug}
          githubLabel={githubLabel}
          index={i}
          liveLabel={liveLabel}
          project={project}
        />
      ))}
    </div>
  );
}
