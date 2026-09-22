"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageSelect } from "@/components/language-select";
import type { Locale } from "@/lib/i18n";

type MenuItem = {
  label: string;
  href: string;
};

type StaggeredMenuProps = {
  items: MenuItem[];
  currentLocale: Locale;
  languageLabel: string;
  languages: Record<Locale, string>;
  extraItems?: MenuItem[];
};

export function StaggeredMenu({
  items,
  currentLocale,
  languageLabel,
  languages,
  extraItems = [],
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
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

  const allItems = [...extraItems, ...items];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Desktop: inline items + language */}
      <nav className="hidden items-center gap-1 lg:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-[#666666] transition hover:bg-[#f4f7fb] hover:text-black dark:text-[#cbd5e1] dark:hover:bg-[#172033] dark:hover:text-white"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
        <div className="mx-1 h-5 w-px bg-[#E4E4E7] dark:bg-[#27272A]" />
        <LanguageSelect
          currentLocale={currentLocale}
          label={languageLabel}
          options={languages}
        />
      </nav>

      {/* Mobile/Tablet: hamburger + dropdown */}
      <div className="relative lg:hidden">
        <button
          ref={buttonRef}
          aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={isOpen}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white transition-all hover:border-[#D4D4D8] hover:shadow-sm dark:border-[#27272A] dark:bg-[#18181B] dark:hover:border-[#3F3F46]"
          onClick={() => setIsOpen((o) => !o)}
          type="button"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-[18px] bg-[#18181B] transition-all duration-300 dark:bg-[#FAFAFA] ${
                isOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-[#18181B] transition-all duration-300 dark:bg-[#FAFAFA] ${
                isOpen ? "scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-[#18181B] transition-all duration-300 dark:bg-[#FAFAFA] ${
                isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={close}
        />

        {/* Menu panel */}
        <div
          ref={menuRef}
          className={`absolute right-0 top-full z-50 mt-2 w-[260px] origin-top-right rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 dark:border-[#27272A] dark:bg-[#09090B] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
            isOpen
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 p-3">
            {allItems.map((item, i) => (
              <Link
                key={item.href}
                className={`rounded-xl px-4 py-3 text-[15px] font-medium text-[#18181B] transition hover:bg-[#F4F4F5] dark:text-[#FAFAFA] dark:hover:bg-[#18181B] ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
                href={item.href}
                onClick={close}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}

            <div
              className={`mx-3 my-1 h-px bg-[#E4E4E7] transition-all duration-300 dark:bg-[#27272A] ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`px-3 py-2 transition-all duration-300 ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${allItems.length * 50}ms` : "0ms",
              }}
            >
              <LanguageSelect
                currentLocale={currentLocale}
                label={languageLabel}
                options={languages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
