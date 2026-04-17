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
    <header className="flex flex-wrap items-center gap-4 py-8 pb-16">
      <Link
        aria-label={homeAriaLabel}
        className="inline-block text-2xl font-bold text-[#1a1a1a] no-underline"
        href={getLocalizedPath(currentLocale)}
      >
        Javohir dev
      </Link>
      <div className="ml-auto flex items-center justify-end gap-2.5">
        <LanguageSelect
          currentLocale={currentLocale}
          label={languageLabel}
          options={languages}
        />
        <nav>
          <Link
            className="text-[1.02rem] text-[#666666] transition hover:text-black"
            href={getLocalizedPath(currentLocale, "projects")}
          >
            {projectsLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
