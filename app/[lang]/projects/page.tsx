import type { Metadata } from "next";
import { ProjectsList } from "@/components/projects-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getDictionary,
  isLocale,
  type Locale
} from "@/lib/i18n";
import {
  createProjectsTable,
  getProjects,
  hasDatabaseConnection,
  type ProjectRow
} from "@/lib/db";
import type { ProjectGalleryItem } from "@/components/projects-gallery";

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
};

const PROJECT_META: Record<string, { accent: string; featured: boolean }> = {
  prohome: { accent: "#10B981", featured: false },
  "jahon-bozori": { accent: "#3B82F6", featured: false },
  "kotiba-ai": { accent: "#8B5CF6", featured: false },
  "girgiton-ai": { accent: "#F59E0B", featured: false },
  moshn: { accent: "#EF4444", featured: false },
  "teacher-assistant": { accent: "#0EA5E9", featured: false }
};

const DEFAULT_ACCENT = "#52525B";

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

  let dynamicProjects: ProjectGalleryItem[] = [];

  if (hasDatabaseConnection()) {
    try {
      await createProjectsTable();
      const data = (await getProjects()) as ProjectRow[];
      dynamicProjects = data.map((p) => ({
        slug: `db-${p.id}`,
        title: p.title,
        description: locale === "uz" ? p.description_uz : p.description_en,
        details:
          (locale === "uz" ? p.details_uz : p.details_en) ||
          (locale === "uz" ? p.description_uz : p.description_en),
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

  const staticTitles = new Set(
    dictionary.projects.items.map((p) => p.title.toLowerCase())
  );
  const filteredDynamic = dynamicProjects.filter(
    (p) => !staticTitles.has(p.title.toLowerCase())
  );

  const allProjects = [...dictionary.projects.items, ...filteredDynamic];

  const listProjects = allProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    techStack: p.techStack,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    accent: PROJECT_META[p.slug]?.accent ?? DEFAULT_ACCENT,
    featured: PROJECT_META[p.slug]?.featured ?? false
  }));

  const headingWords = dictionary.projects.heading.split(" ");
  const boldWord = headingWords.pop();
  const lightWords = headingWords.join(" ");

  const count = String(allProjects.length).padStart(2, "0");
  const countLabel = locale === "uz" ? `${count} loyiha` : `${count} projects`;

  return (
    <main className="min-h-screen bg-white px-5 py-7 text-[#18181B] transition-colors dark:bg-[#09090B] dark:text-[#FAFAFA] sm:px-10">
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[900px] flex-col">
        <SiteHeader
          currentLocale={locale}
          homeAriaLabel={dictionary.navigation.homeAriaLabel}
          languageLabel={dictionary.navigation.languageLabel}
          languages={dictionary.languages}
          projectsLabel={dictionary.navigation.projects}
        />

        {/* Page header */}
        <div className="mb-16 flex items-end justify-between border-b border-[#E4E4E7] pb-8 transition-colors dark:border-[#27272A]">
          <h1 className="text-[36px] leading-none tracking-[-1px] text-[#18181B] dark:text-[#FAFAFA]">
            {lightWords && (
              <span className="font-light">{lightWords} </span>
            )}
            <span className="font-bold">{boldWord}</span>
          </h1>
          <p className="text-[14px] text-[#A1A1AA] dark:text-[#52525B]">{countLabel}</p>
        </div>

        {/* Project list */}
        <ProjectsList projects={listProjects} />

        <SiteFooter />
      </div>
    </main>
  );
}
