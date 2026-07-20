import Link from "next/link";
import { StaggeredMenu } from "@/components/staggered-menu";
import { getLocalizedPath, type Locale } from "@/lib/i18n";
type SiteHeaderProps = {
  currentLocale: Locale;
  homeAriaLabel: string;
  languageLabel: string;
  languages: Record<Locale, string>;
  projectsLabel: string;
  aboutLabel: string;
  resumeLabel: string;
  resumeHref: string;
};

export function SiteHeader({
  currentLocale,
  homeAriaLabel,
  languageLabel,
  languages,
  projectsLabel,
  aboutLabel,
  resumeLabel,
  resumeHref,
}: SiteHeaderProps) {
  const mainItems = [
    { label: projectsLabel, href: getLocalizedPath(currentLocale, "projects") },
  ];

  const extraItems = [
    { label: aboutLabel, href: getLocalizedPath(currentLocale, "about") },
    { label: resumeLabel, href: resumeHref },
  ];

  return (
    <header className="flex items-center justify-between py-5 sm:py-8 pb-8 sm:pb-14">
      <Link
        aria-label={homeAriaLabel}
        className="inline-block text-[1.35rem] font-bold text-[#1a1a1a] no-underline transition hover:opacity-80 dark:text-white sm:text-2xl"
        href={getLocalizedPath(currentLocale)}
      >
        Javohir dev
      </Link>

      <div className="flex items-center gap-3">
        <StaggeredMenu
          currentLocale={currentLocale}
          items={mainItems}
          extraItems={extraItems}
          languageLabel={languageLabel}
          languages={languages}
        />
      </div>
    </header>
  );
}
