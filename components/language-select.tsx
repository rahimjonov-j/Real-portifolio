"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

type LanguageSelectProps = {
  currentLocale: Locale;
  label: string;
  options: Record<Locale, string>;
};

export function LanguageSelect({
  currentLocale,
  label,
  options
}: LanguageSelectProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(nextLocale: string) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    router.push(`/${segments.join("/")}`);
  }

  return (
    <div
      aria-label={label}
      className="inline-flex items-center rounded-full border border-[#d9e2ee] bg-[#fbfdff] p-1 shadow-[0_4px_14px_rgba(15,23,42,0.04)]"
      role="group"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <button
            key={locale}
            aria-pressed={isActive}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-[0.02em] transition ${
              isActive
                ? "bg-[#111827] text-white"
                : "text-[#64748b] hover:bg-white hover:text-[#111827]"
            }`}
            onClick={() => handleChange(locale)}
            type="button"
          >
            {options[locale]}
          </button>
        );
      })}
    </div>
  );
}
