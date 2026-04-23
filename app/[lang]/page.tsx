import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageAnimation } from "@/components/page-animation";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale
} from "@/lib/i18n";

const socialLinks = [
  {
    href: "https://github.com/rahimjonov-j",
    label: "GitHub",
    icon: GitHubIcon
  },
  {
    href: "https://www.linkedin.com/in/javohir-rahimjonov",
    label: "LinkedIn",
    icon: LinkedInIcon
  },
  {
    href: "https://t.me/rahimjonovv_19",
    label: "Telegram",
    icon: TelegramIcon
  }
];

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
            <div className="w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10">
              <section className="mb-8 flex flex-col items-center gap-7 text-center sm:mb-10 md:flex-row md:items-center md:gap-10 md:text-left">
                <div className="shrink-0">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-[0_18px_40px_rgba(15,23,42,0.14)] transition-colors dark:border-[#1f2937] dark:shadow-[0_18px_40px_rgba(0,0,0,0.36)] sm:h-40 sm:w-40">
                    <Image
                      alt={dictionary.home.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 128px, 160px"
                      src="/img/optimized/newpic.png"
                      style={{ objectFit: "cover", objectPosition: "center 26%" }}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="mb-2 text-[clamp(2.15rem,10vw,3.2rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[#151515] transition-colors dark:text-white">
                    Javohir Rahimjonov
                  </h1>
                  <h2 className="mb-5 text-xl font-normal text-[#737373] transition-colors dark:text-[#aab4c3] sm:text-2xl md:text-[1.8rem]">
                    {dictionary.home.role}
                  </h2>
                  <div className="flex justify-center gap-5 md:justify-start">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        aria-label={label}
                        className="inline-flex items-center justify-center text-[#1a1a1a] transition hover:-translate-y-[3px] hover:text-[#007bff] dark:text-[#e5e7eb] dark:hover:text-[#60a5fa]"
                        href={href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Icon className="size-7" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mx-auto mb-8 max-w-[720px] text-center text-[1.1rem] leading-[1.7] text-[#4a4a4a] transition-colors dark:text-[#cbd5e1] sm:text-[1.2rem] md:mx-0 md:text-left">
                <p>{dictionary.home.bio}</p>
              </section>

              <section className="text-center md:text-left">
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#007bff] bg-[#007bff] px-6 py-3 text-base font-semibold text-white shadow-[0_14px_30px_rgba(0,123,255,0.18)] transition hover:-translate-y-px hover:bg-[#006ee6] sm:w-auto"
                  href={getLocalizedPath(locale, "about")}
                >
                  {dictionary.home.aboutButton}
                </Link>
              </section>
            </div>
          </main>

          <SiteFooter />
        </div>
      </PageAnimation>
    </div>
  );
}
