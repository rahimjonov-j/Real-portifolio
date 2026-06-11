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
      className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors"
      style={{
        border: `1px solid ${accent}55`,
        background: accent + "15",
        color: accent
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
      className="inline-flex items-center rounded-md border border-[#D4D4D8] px-3 py-1.5 text-[12px] font-medium text-[#52525B] transition-colors hover:border-[#A1A1AA] hover:text-[#18181B] dark:border-[#3F3F46] dark:text-[#71717A] dark:hover:border-[#52525B] dark:hover:text-[#A1A1AA]"
    >
      Source
    </a>
  );
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div>
      {projects.map((project, i) => {
        const index = String(i + 1).padStart(2, "0");
        const tags = project.techStack.slice(0, 4);

        return (
          <article
            key={project.slug}
            className="group cursor-pointer border-b border-[#E4E4E7] transition-colors dark:border-[#18181B]"
            style={{ "--accent": project.accent } as React.CSSProperties}
          >
            {/* ── Mobile layout (< sm) ─────────────────────────────── */}
            <div className="flex flex-col gap-4 py-8 sm:hidden">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-semibold text-[#D4D4D8] dark:text-[#27272A]">
                  {index}
                </span>
                <h2 className="text-[18px] font-semibold leading-tight text-[#18181B] dark:text-[#FAFAFA]">
                  {project.title}
                </h2>
                {project.featured && (
                  <span
                    className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold tracking-[0.5px]"
                    style={{
                      background: project.accent + "18",
                      color: project.accent
                    }}
                  >
                    FEATURED
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-[#71717A]">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
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
                {project.githubUrl !== "#" && (
                  <SourceLink href={project.githubUrl} />
                )}
              </div>
            </div>

            {/* ── Desktop layout (≥ sm) ─────────────────────────────── */}
            <div
              className="hidden items-start py-8 sm:grid"
              style={{ gridTemplateColumns: "48px 1fr auto", columnGap: "28px" }}
            >
              {/* Column 1 — index */}
              <span className="pt-1 font-mono text-sm font-semibold text-[#D4D4D8] transition-colors duration-300 group-hover:text-[var(--accent)] dark:text-[#27272A]">
                {index}
              </span>

              {/* Column 2 — content */}
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-[22px] font-semibold leading-tight text-[#18181B] dark:text-[#FAFAFA]">
                    {project.title}
                  </h2>
                  {project.featured && (
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-bold tracking-[0.5px]"
                      style={{
                        background: project.accent + "18",
                        color: project.accent
                      }}
                    >
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="mb-3.5 max-w-[500px] text-sm leading-relaxed text-[#71717A]">
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

              {/* Column 3 — action buttons */}
              <div className="flex flex-col gap-2 pt-1">
                {project.liveUrl !== "#" && (
                  <LiveLink accent={project.accent} href={project.liveUrl} />
                )}
                {project.githubUrl !== "#" && (
                  <SourceLink href={project.githubUrl} />
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
