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
    <header className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 sm:py-8 pb-10 sm:pb-16">
      <Link
        aria-label={homeAriaLabel}
        className="inline-block text-2xl font-bold text-[#1a1a1a] no-underline transition hover:opacity-80"
        href={getLocalizedPath(currentLocale)}
      >
        Javohir dev
      </Link>
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
        <nav>
          <Link
            className="text-[0.95rem] sm:text-[1.02rem] font-medium text-[#666666] transition hover:text-black"
            href={getLocalizedPath(currentLocale, "projects")}
          >
            {projectsLabel}
          </Link>
        </nav>
        <LanguageSelect
          currentLocale={currentLocale}
          label={languageLabel}
          options={languages}
        />
      </div>
    </header>
  );
}
