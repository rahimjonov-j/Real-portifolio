"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  options,
}: LanguageSelectProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  function handleChange(nextLocale: string) {
    if (nextLocale === currentLocale) {
      close();
      return;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const nextPath = `/${segments.join("/")}`;
    router.push(nextPath);
    close();
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label={label}
        aria-expanded={isOpen}
        className="relative flex h-8 items-center gap-1.5 overflow-hidden rounded-full border border-white/30 bg-gradient-to-b from-white/50 to-white/20 px-3 text-[11px] font-semibold tracking-wide text-[#52525B] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all hover:from-white/60 hover:to-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:text-[#A1A1AA] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.2)] dark:hover:from-white/15 dark:hover:to-white/8"
        onClick={() => setIsOpen((o) => !o)}
        type="button"
      >
        <span className="relative z-10 uppercase">{options[currentLocale]}</span>
        <svg
          className={`relative z-10 h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Shine overlay */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent opacity-60 dark:from-white/10" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[160px] origin-top-right overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-b from-white/60 to-white/30 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-2xl dark:border-white/10 dark:from-white/10 dark:to-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* Top shine */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/50 to-transparent dark:from-white/10" />

          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <button
                key={locale}
                className={`relative z-10 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-white/70 text-[#18181B] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.06)] dark:bg-white/10 dark:text-[#FAFAFA] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-[#71717A] hover:bg-white/50 hover:text-[#18181B] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:text-[#52525B] dark:hover:bg-white/8 dark:hover:text-[#FAFAFA]"
                }`}
                onClick={() => handleChange(locale)}
                type="button"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold shadow-sm ${
                    isActive
                      ? "bg-[#18181B] text-white dark:bg-white dark:text-[#18181B]"
                      : "bg-[#F4F4F5] text-[#71717A] dark:bg-[#27272A] dark:text-[#52525B]"
                  }`}
                >
                  {options[locale]}
                </span>
                {locale === "uz" ? "O'zbekcha" : "English"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
