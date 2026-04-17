import type { Metadata } from "next";
import Link from "next/link";
import { TelegramIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale
} from "@/lib/i18n";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "uz";
  const dictionary = getDictionary(locale);
  const canonicalPath = `/${locale}/about`;

  return {
    title: dictionary.metadata.aboutTitle,
    description: dictionary.about.body,
    alternates: {
      canonical: canonicalPath,
      languages: {
        uz: "/uz/about",
        en: "/en/about"
      }
    },
    openGraph: {
      title: dictionary.metadata.aboutTitle,
      description: dictionary.about.body,
      url: canonicalPath
    },
    twitter: {
      title: dictionary.metadata.aboutTitle,
      description: dictionary.about.body
    }
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "uz") as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="flex min-h-screen justify-center bg-white px-6 py-6 text-[#1f2937]">
      <div className="flex w-full max-w-[900px] flex-col">
        <SiteHeader
          currentLocale={locale}
          homeAriaLabel={dictionary.navigation.homeAriaLabel}
          languageLabel={dictionary.navigation.languageLabel}
          languages={dictionary.languages}
          projectsLabel={dictionary.navigation.projects}
        />

        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[720px] text-center">
            <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-[#111827]">
              {dictionary.about.heading}
            </h1>
            <p className="text-[1.08rem] leading-[1.9] text-[#4b5563] max-sm:text-base">
              {dictionary.about.body}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-[0.85rem]">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dbe3ef] bg-[#f8fafc] px-5 py-[0.85rem] font-medium text-[#111827] transition hover:-translate-y-px hover:border-[#bfd3ff] hover:bg-[#eef4ff]"
                href="https://t.me/rahimjonovv_19"
                rel="noreferrer"
                target="_blank"
              >
                <TelegramIcon className="size-[18px]" />
                <span>{dictionary.about.telegram}</span>
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-[#dbe3ef] bg-[#f8fafc] px-5 py-[0.85rem] font-medium text-[#111827] transition hover:-translate-y-px hover:border-[#bfd3ff] hover:bg-[#eef4ff]"
                href={getLocalizedPath(locale)}
              >
                {dictionary.about.backHome}
              </Link>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
