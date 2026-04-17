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

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
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

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_34%)] px-5 py-7 text-[#111827] before:pointer-events-none before:fixed before:top-0 before:left-0 before:h-[320px] before:w-[320px] before:rounded-full before:bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_70%)]">
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1080px] flex-col">
        <SiteHeader
          currentLocale={locale}
          homeAriaLabel={dictionary.navigation.homeAriaLabel}
          languageLabel={dictionary.navigation.languageLabel}
          languages={dictionary.languages}
          projectsLabel={dictionary.navigation.projects}
        />

        <div className="mb-7 flex items-start justify-between gap-5 border-b border-[#e5edf7] pb-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em]">
            {dictionary.projects.heading}
          </h1>
          <Link
            aria-label={dictionary.about.backHome}
            className="inline-flex w-fit items-center gap-[10px] whitespace-nowrap rounded-[14px] border border-[#dbe4ef] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[0.95rem] font-semibold text-[#334155] shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:border-[#bfd5ff] hover:bg-[#eff6ff] hover:text-[#0f172a]"
            href={getLocalizedPath(locale)}
          >
            <ArrowLeftIcon className="size-[18px]" />
            <span>{dictionary.projects.back}</span>
          </Link>
        </div>

        <section className="grid grid-cols-3 gap-[22px] max-[900px]:grid-cols-1">
          {dictionary.projects.items.map((project) => (
            <ProjectCard
              key={project.title}
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
