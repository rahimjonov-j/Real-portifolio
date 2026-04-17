import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "uz";
  const dictionary = getDictionary(locale);

  return {
    description: dictionary.metadata.description
  };
}

export default async function LangLayout({
  children,
  params
}: LangLayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <>
      <HtmlLangSync locale={lang} />
      {children}
    </>
  );
}
