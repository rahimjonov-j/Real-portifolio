import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale
} from "@/lib/i18n";
import {
  createProjectsTable,
  getProjects,
  hasDatabaseConnection,
  type ProjectRow
} from "@/lib/db";

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
};

type ProjectItem = {
  title: string;
  description: string;
  imageSrc: string;
  liveUrl: string;
  githubUrl: string;
  imageAlt: string;
  imagePosition?: string;
  priority?: boolean;
  techStack: string[];
};

export async function generateMetadata({
  params
}: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "uz";
  const dictionary = getDictionary(locale);
  const canonicalPath = `/${locale}/projects`;
  const description =
    locale === "uz"
      ? "Frontend loyihalarim va ishlatgan texnologiyalarim ro'yxati."
      : "A selection of my frontend projects and the technologies I used.";

  return {
    title: dictionary.metadata.projectsTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        uz: "/uz/projects",
        en: "/en/projects"
      }
    },
    openGraph: {
      title: dictionary.metadata.projectsTitle,
      description,
      url: canonicalPath
    },
    twitter: {
      title: dictionary.metadata.projectsTitle,
      description
    }
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "uz") as Locale;
  const dictionary = getDictionary(locale);

  let dynamicProjects: ProjectItem[] = [];

  if (hasDatabaseConnection()) {
    try {
      await createProjectsTable();
      const data = (await getProjects()) as ProjectRow[];
      dynamicProjects = data.map((p) => ({
        title: p.title,
        description: locale === "uz" ? p.description_uz : p.description_en,
        imageSrc: p.image_src,
        liveUrl: p.live_url || "#",
        githubUrl: p.github_url || "#",
        imageAlt: p.title,
        imagePosition: p.image_position || "center",
        priority: Boolean(p.priority),
        techStack: p.tech_stack
      }));
    } catch (error) {
      console.error("Failed to fetch projects from DB:", error);
    }
  }

  const allProjects = [...dynamicProjects, ...dictionary.projects.items];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%)] px-5 py-7 text-[#111827] transition-colors before:pointer-events-none before:fixed before:top-0 before:left-0 before:h-[320px] before:w-[320px] before:rounded-full before:bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[linear-gradient(180deg,#0f172a_0%,#090d14_34%)] dark:text-[#e5e7eb] dark:before:bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)]">
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1080px] flex-col">
        <SiteHeader
          currentLocale={locale}
          homeAriaLabel={dictionary.navigation.homeAriaLabel}
          languageLabel={dictionary.navigation.languageLabel}
          languages={dictionary.languages}
          projectsLabel={dictionary.navigation.projects}
        />

        <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-[#e5edf7] pb-5 transition-colors dark:border-[#243142] sm:flex-row sm:items-center">
          <h1 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold tracking-[-0.04em]">
            {dictionary.projects.heading}
          </h1>
          <Link
            aria-label={dictionary.about.backHome}
            className="inline-flex w-fit items-center gap-[10px] whitespace-nowrap rounded-[14px] border border-[#dbe4ef] bg-[rgba(255,255,255,0.92)] px-4 py-2.5 text-[0.9rem] font-semibold text-[#334155] shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:border-[#bfd5ff] hover:bg-[#eff6ff] hover:text-[#0f172a] dark:border-[#243142] dark:bg-[#111827]/90 dark:text-[#cbd5e1] dark:hover:border-[#3b82f6] dark:hover:bg-[#172033] dark:hover:text-white sm:text-[0.95rem]"
            href={getLocalizedPath(locale)}
          >
            <ArrowLeftIcon className="size-[18px]" />
            <span>{dictionary.projects.back}</span>
          </Link>
        </div>

        <section className="grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              {...project}
              githubLabel={dictionary.projects.github}
              liveLabel={dictionary.projects.live}
              techLabel={dictionary.projects.techLabel}
            />
          ))}
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
