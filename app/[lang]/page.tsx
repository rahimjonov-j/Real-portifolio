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
    <div className="flex min-h-screen justify-center bg-white text-[#333333]">
      <PageAnimation>
        <div className="flex w-full max-w-[900px] flex-col px-6 sm:px-8 py-6 sm:py-8">
          <SiteHeader
            currentLocale={locale}
            homeAriaLabel={dictionary.navigation.homeAriaLabel}
            languageLabel={dictionary.navigation.languageLabel}
            languages={dictionary.languages}
            projectsLabel={dictionary.navigation.projects}
          />

          <main className="flex-1">
            <section className="mb-10 flex items-center gap-8 sm:gap-10 flex-col sm:flex-row text-center sm:text-left">
              <div className="shrink-0">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 border-white shadow-[0_18px_40px_rgba(15,23,42,0.14)] mx-auto">
                  <Image
                    alt={dictionary.home.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 640px) 128px, 160px"
                    src="/img/optimized/me-320.webp"
                    unoptimized
                    style={{ objectFit: "cover", objectPosition: "center 26%" }}
                  />
                </div>
              </div>
              <div>
                <h1 className="mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight">
                  Javohir Rahimjonov
                </h1>
                <h2 className="mb-5 text-xl sm:text-2xl md:text-[1.8rem] font-normal text-[#737373]">
                  {dictionary.home.role}
                </h2>
                <div className="flex gap-5 justify-center sm:justify-start">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      aria-label={label}
                      className="inline-flex items-center justify-center text-[#1a1a1a] transition hover:-translate-y-[3px] hover:text-[#007bff]"
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

            <section className="mb-10 text-[1.2rem] leading-[1.6] text-[#4a4a4a]">
              <p>{dictionary.home.bio}</p>
            </section>

            <section className="mb-16">
              <Link
                className="inline-block rounded border border-[#007bff] bg-transparent px-6 py-2.5 text-base font-medium text-[#007bff] transition hover:bg-[#e6f2ff]"
                href={getLocalizedPath(locale, "about")}
              >
                {dictionary.home.aboutButton}
              </Link>
            </section>
          </main>

          <SiteFooter />
        </div>
      </PageAnimation>
    </div>
  );
}
