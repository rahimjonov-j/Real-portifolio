import Link from "next/link";
import { LanguageSelect } from "@/components/language-select";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  currentLocale: Locale;
  homeAriaLabel: string;
  languageLabel: string;
  languages: Record<Locale, string>;
  projectsLabel: string;
};

export function SiteHeader({
  currentLocale,
  homeAriaLabel,
  languageLabel,
  languages,
  projectsLabel
}: SiteHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-5 sm:py-8 pb-8 sm:pb-14">
      <Link
        aria-label={homeAriaLabel}
        className="inline-block text-[1.35rem] font-bold text-[#1a1a1a] no-underline transition hover:opacity-80 dark:text-white sm:text-2xl"
        href={getLocalizedPath(currentLocale)}
      >
        Javohir dev
      </Link>
      <div className="flex items-center gap-3 sm:gap-6">
        <LanguageSelect
          currentLocale={currentLocale}
          label={languageLabel}
          options={languages}
        />
        <nav>
          <Link
            className="inline-flex rounded-full px-2 py-1 text-[0.95rem] font-medium text-[#666666] transition hover:bg-[#f4f7fb] hover:text-black dark:text-[#cbd5e1] dark:hover:bg-[#172033] dark:hover:text-white sm:text-[1.02rem]"
            href={getLocalizedPath(currentLocale, "projects")}
          >
            {projectsLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
