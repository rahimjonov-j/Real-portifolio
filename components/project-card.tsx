import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  liveLabel: string;
  githubLabel: string;
  techLabel: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  priority?: boolean;
  techStack: string[];
};

export function ProjectCard({
  title,
  description,
  liveUrl,
  githubUrl,
  liveLabel,
  githubLabel,
  techLabel,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  priority = false,
  techStack
}: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e7eef6] bg-[rgba(255,255,255,0.94)] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="relative h-[214px] w-full bg-[#f3f4f6]">
        <Image
          fill
          alt={imageAlt}
          className="object-cover"
          priority={priority}
          sizes="(max-width: 900px) calc(100vw - 40px), 320px"
          src={imageSrc}
          unoptimized
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div className="flex flex-1 flex-col p-[22px]">
        <h2 className="mb-[2px] text-[1.35rem] leading-[1.3] font-bold tracking-[-0.03em] text-[#111827]">
          {title}
        </h2>
        <div aria-label={techLabel} className="my-[14px] flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-[#d6e6ff] bg-[#f8fbff] px-3 py-2 text-[0.82rem] font-semibold text-[#1d4ed8]"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mb-5 text-[0.95rem] leading-[1.75] text-[#6b7280]">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap gap-[10px]">
          <a
            className="inline-flex min-w-24 items-center justify-center rounded-xl border border-[#111827] bg-[#111827] px-4 py-[10px] font-semibold text-white transition hover:border-[#2563eb] hover:bg-[#2563eb]"
            href={liveUrl}
            rel={liveUrl === "#" ? undefined : "noreferrer"}
            target={liveUrl === "#" ? undefined : "_blank"}
          >
            {liveLabel}
          </a>
          <a
            className="inline-flex min-w-24 items-center justify-center rounded-xl border border-[#dbe2ea] bg-white px-4 py-[10px] font-semibold text-[#111827] transition hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-[#2563eb]"
            href={githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            {githubLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
