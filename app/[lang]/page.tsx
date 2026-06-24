import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageAnimation } from "@/components/page-animation";
import { HeroContent } from "@/components/hero-content";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale
} from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "uz";
  const dictionary = getDictionary(locale);
  const canonicalPath = `/${locale}`;

  return {
    title: dictionary.metadata.homeTitle,
    description: dictionary.home.bio,
    alternates: {
      canonical: canonicalPath,
      languages: {
        uz: "/uz",
        en: "/en"
      }
    },
    openGraph: {
      title: dictionary.metadata.homeTitle,
      description: dictionary.home.bio,
      url: canonicalPath
    },
    twitter: {
      title: dictionary.metadata.homeTitle,
      description: dictionary.home.bio
    }
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "uz") as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="flex min-h-screen justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_34%),#ffffff] text-[#333333] transition-colors dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_34%),#090d14] dark:text-[#e5e7eb]">
      <PageAnimation>
        <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col px-5 py-5 sm:px-8 sm:py-8">
          <SiteHeader
            currentLocale={locale}
            homeAriaLabel={dictionary.navigation.homeAriaLabel}
            languageLabel={dictionary.navigation.languageLabel}
            languages={dictionary.languages}
            projectsLabel={dictionary.navigation.projects}
          />

          <main className="flex flex-1 items-center">
            <HeroContent
              role={dictionary.home.role}
              bio={dictionary.home.bio}
              imageAlt={dictionary.home.imageAlt}
              aboutButton={dictionary.home.aboutButton}
              resumeButton={dictionary.home.resumeButton}
              resumeHref={dictionary.home.resumeHref}
              aboutHref={getLocalizedPath(locale, "about")}
            />
          </main>

          <SiteFooter />
        </div>
      </PageAnimation>
    </div>
  );
}
