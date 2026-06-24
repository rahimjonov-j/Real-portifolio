"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";

type ProjectListItem = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  accent: string;
  featured: boolean;
};

type ProjectsListProps = {
  projects: ProjectListItem[];
};

function LiveLink({ href, accent }: { href: string; accent: string }) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all hover:-translate-y-px"
      style={{
        border: `1px solid ${accent}50`,
        background: accent + "12",
        color: accent,
      }}
    >
      Live ↗
    </a>
  );
}

function SourceLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="inline-flex items-center rounded-lg border border-[#D4D4D8] px-3 py-1.5 text-[12px] font-medium text-[#52525B] transition-all hover:-translate-y-px hover:border-[#A1A1AA] hover:text-[#18181B] dark:border-[#3F3F46] dark:text-[#71717A] dark:hover:border-[#52525B] dark:hover:text-[#A1A1AA]"
    >
      GitHub ↗
    </a>
  );
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {projects.map((project, i) => {
        const index = String(i + 1).padStart(2, "0");
        const tags = project.techStack.slice(0, 4);

        return (
          <BlurFade key={project.slug} delay={i * 0.07} inView>
            <MagicCard
              gradientSize={300}
              className="rounded-2xl border border-[#E4E4E7] bg-white transition-colors hover:border-[#D4D4D8] dark:border-[#27272A] dark:bg-[#09090B] dark:hover:border-[#3F3F46]"
            >
              <article
                className="group cursor-pointer px-6 py-6"
                style={{ "--accent": project.accent } as React.CSSProperties}
              >
                {/* Mobile layout */}
                <div className="flex flex-col gap-3 sm:hidden">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#D4D4D8] dark:text-[#3F3F46]">
                      {index}
                    </span>
                    <h2 className="text-[17px] font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span
                        className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide"
                        style={{ background: project.accent + "18", color: project.accent }}
                      >
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[#71717A] dark:text-[#52525B]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[#E4E4E7] bg-[#F4F4F5] px-2 py-0.5 font-mono text-[11px] font-medium text-[#71717A] dark:border-[#27272A] dark:bg-[#18181B] dark:text-[#52525B]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl !== "#" && (
                      <LiveLink accent={project.accent} href={project.liveUrl} />
                    )}
                    {project.githubUrl !== "#" && <SourceLink href={project.githubUrl} />}
                  </div>
                </div>

                {/* Desktop layout */}
                <div
                  className="hidden items-start sm:grid"
                  style={{ gridTemplateColumns: "52px 1fr auto", columnGap: "24px" }}
                >
                  {/* Index */}
                  <span className="pt-1 font-mono text-sm font-bold text-[#D4D4D8] transition-colors duration-300 group-hover:text-[var(--accent)] dark:text-[#3F3F46]">
                    {index}
                  </span>

                  {/* Content */}
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-[20px] font-semibold leading-tight text-[#18181B] transition-colors group-hover:text-[var(--accent)] dark:text-[#FAFAFA]">
                        {project.title}
                      </h2>
                      {project.featured && (
                        <span
                          className="rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide"
                          style={{ background: project.accent + "18", color: project.accent }}
                        >
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="mb-3 max-w-[520px] text-sm leading-relaxed text-[#71717A] dark:text-[#52525B]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[#E4E4E7] bg-[#F4F4F5] px-2 py-0.5 font-mono text-[11px] font-medium text-[#71717A] dark:border-[#27272A] dark:bg-[#18181B] dark:text-[#52525B]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-1">
                    {project.liveUrl !== "#" && (
                      <LiveLink accent={project.accent} href={project.liveUrl} />
                    )}
                    {project.githubUrl !== "#" && <SourceLink href={project.githubUrl} />}
                  </div>
                </div>
              </article>
            </MagicCard>
          </BlurFade>
        );
      })}
    </div>
  );
}
