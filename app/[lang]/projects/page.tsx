import type { Metadata } from "next";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Marquee } from "@/components/magicui/marquee";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import {
  createProjectsTable,
  getProjects,
  hasDatabaseConnection,
  type ProjectRow,
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
  "teacher-assistant": { accent: "#0EA5E9", featured: false },
};

const DEFAULT_ACCENT = "#52525B";

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "uz";
  const dictionary = getDictionary(locale);
  const canonicalPath = getLocalizedPath(locale, "projects");
  const description =
    locale === "uz"
      ? "Frontend loyihalarim va ishlatgan texnologiyalarim ro'yxati."
      : "A selection of my frontend projects and the technologies I used.";

  return {
    title: dictionary.metadata.projectsTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { uz: "/uz/projects", en: "/en/projects" },
    },
    openGraph: { title: dictionary.metadata.projectsTitle, description, url: canonicalPath },
    twitter: { title: dictionary.metadata.projectsTitle, description },
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
        techStack: p.tech_stack,
      }));
    } catch (error) {
      console.error("Failed to fetch projects from DB:", error);
    }
  }

  const staticTitles = new Set(
    dictionary.projects.items.map((p) => p.title.toLowerCase()),
  );
  const filteredDynamic = dynamicProjects.filter(
    (p) => !staticTitles.has(p.title.toLowerCase()),
  );

  const allProjects = [...dictionary.projects.items, ...filteredDynamic];

  const bentoProjects = allProjects.map((p, i) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    techStack: p.techStack,
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    imageSrc: p.imageSrc,
    imageAlt: p.imageAlt,
    imagePosition: p.imagePosition,
    accent: PROJECT_META[p.slug]?.accent ?? DEFAULT_ACCENT,
    span: (i === 0 || i === 3 ? 2 : 1) as 1 | 2,
  }));

  // All unique tech stacks for the marquee
  const allTechs = [...new Set(allProjects.flatMap((p) => p.techStack))];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-7 text-[#18181B] transition-colors dark:bg-[#09090B] dark:text-[#FAFAFA] sm:px-10">
      {/* Background dot pattern */}
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,black_20%,transparent_100%)] opacity-40"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[900px] flex-col">
        <SiteHeader
          aboutLabel={dictionary.navigation.about}
          currentLocale={locale}
          homeAriaLabel={dictionary.navigation.homeAriaLabel}
          languageLabel={dictionary.navigation.languageLabel}
          languages={dictionary.languages}
          projectsLabel={dictionary.navigation.projects}
          resumeHref={dictionary.home.resumeHref}
          resumeLabel={dictionary.navigation.resume}
        />

        {/* ── Tech stack marquee ───────────────────────────────── */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] py-3 dark:border-[#27272A] dark:bg-[#111111]">
          <Marquee pauseOnHover className="[--duration:25s] [--gap:0.75rem]">
            {allTechs.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 font-mono text-[12px] font-medium text-[#52525B] dark:border-[#27272A] dark:bg-[#18181B] dark:text-[#71717A]"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>

        {/* ── Bento grid ─────────────────────────────────────── */}
        <BentoGrid
          projects={bentoProjects}
          liveLabel={locale === "uz" ? "Live" : "Live"}
          githubLabel="GitHub"
        />

        <SiteFooter />
      </div>
    </main>
  );
}
