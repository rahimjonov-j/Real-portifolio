"use client";

import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: string) {
    if (nextLocale === currentLocale) return;

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    startTransition(() => {
      router.push(`/${segments.join("/")}`);
    });
  }

  return (
    <div
      aria-label={label}
      className={`inline-flex items-center rounded-full border border-[#d9e2ee] bg-[#fbfdff] p-1 shadow-[0_4px_14px_rgba(15,23,42,0.04)] transition-opacity dark:border-[#243142] dark:bg-[#111827] dark:shadow-[0_4px_14px_rgba(0,0,0,0.24)] ${
        isPending ? "opacity-70" : "opacity-100"
      }`}
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
                ? "bg-[#111827] text-white dark:bg-white dark:text-[#111827]"
                : "text-[#64748b] hover:bg-white hover:text-[#111827] dark:text-[#94a3b8] dark:hover:bg-[#172033] dark:hover:text-white"
            } ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={isPending}
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
