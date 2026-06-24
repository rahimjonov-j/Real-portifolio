"use client";

import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "@/components/icons";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

const socialLinks = [
  { href: "https://github.com/rahimjonov-j", label: "GitHub", icon: GitHubIcon },
  {
    href: "https://www.linkedin.com/in/javohir-rahimjonov",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  { href: "https://t.me/rahimjonovv_19", label: "Telegram", icon: TelegramIcon },
];

interface HeroContentProps {
  role: string;
  bio: string;
  imageAlt: string;
  aboutButton: string;
  resumeButton: string;
  resumeHref: string;
  aboutHref: string;
}

export function HeroContent({
  role,
  bio,
  imageAlt,
  aboutButton,
  resumeButton,
  resumeHref,
  aboutHref,
}: HeroContentProps) {
  return (
    <div className="relative w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10">
      {/* Background dot pattern */}
      <DotPattern
        className="[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] opacity-60"
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1.2}
      />

      <section className="relative mb-8 flex flex-col items-center gap-8 text-center sm:mb-10 md:flex-row md:items-center md:gap-12 md:text-left">
        {/* Avatar with spinning gradient ring */}
        <BlurFade delay={0} duration={0.5} className="shrink-0">
          <div className="relative mx-auto w-fit">
            {/* Spinning gradient ring */}
            <div
              className="absolute rounded-full animate-spin-slow"
              style={{
                inset: "-3px",
                background:
                  "conic-gradient(from var(--border-angle), #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)",
                animation: "spin-slow 5s linear infinite",
              }}
            />
            {/* Inner white gap */}
            <div
              className="absolute rounded-full bg-white dark:bg-[#090d14]"
              style={{ inset: "-1px" }}
            />
            {/* Photo */}
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-[3px] border-white shadow-[0_8px_32px_rgba(15,23,42,0.12)] dark:border-[#090d14] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:h-44 sm:w-44">
              <Image
                alt={imageAlt}
                className="pointer-events-none select-none"
                draggable={false}
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                src="/img/optimized/me-320.webp"
                style={{ objectFit: "cover", objectPosition: "center 26%" }}
              />
            </div>
          </div>
        </BlurFade>

        <div className="flex-1">
          {/* Name with HyperText scramble */}
          <BlurFade delay={0.1} duration={0.5}>
            <h1 className="mb-3 text-[clamp(2.2rem,9vw,3.4rem)] font-bold leading-[0.95] tracking-[-0.055em] text-[#111827] dark:text-white">
              <TypingAnimation text="Javohir Rahimjonov" duration={55} startDelay={100} />
            </h1>
          </BlurFade>

          {/* Role badge + typing */}
          <BlurFade delay={0.25} duration={0.5}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#eff6ff] px-4 py-1.5 dark:border-[#1d4ed8]/30 dark:bg-[#1e3a5f]/30">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#3b82f6]" />
              <span className="text-sm font-semibold text-[#1d4ed8] dark:text-[#93c5fd]">
                <TypingAnimation text={role} startDelay={700} duration={55} />
              </span>
            </div>
          </BlurFade>

          {/* Social links */}
          <BlurFade delay={0.38} duration={0.5}>
            <div className="flex justify-center gap-3 md:justify-start">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  aria-label={label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#374151] shadow-sm transition hover:-translate-y-[2px] hover:border-[#bfdbfe] hover:text-[#2563eb] hover:shadow-[0_4px_16px_rgba(37,99,235,0.15)] dark:border-[#1f2937] dark:bg-[#111827] dark:text-[#9ca3af] dark:hover:border-[#3b82f6] dark:hover:text-[#60a5fa]"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Bio */}
      <BlurFade delay={0.5} duration={0.5}>
        <section className="relative mx-auto mb-8 max-w-[700px] text-center text-[1.1rem] leading-[1.75] text-[#4b5563] dark:text-[#9ca3af] sm:text-[1.15rem] md:mx-0 md:text-left">
          <p>{bio}</p>
        </section>
      </BlurFade>

      {/* CTA Buttons */}
      <BlurFade delay={0.62} duration={0.5}>
        <section className="flex flex-col items-center gap-3 sm:flex-row md:items-start">
          <ShimmerButton onClick={() => (window.location.href = aboutHref)}>
            {aboutButton} →
          </ShimmerButton>
          <a
            className="inline-flex w-full items-center justify-center rounded-full border border-[#dbe4ef] bg-white/80 px-6 py-3 text-base font-semibold text-[#111827] shadow-[0_4px_14px_rgba(15,23,42,0.06)] backdrop-blur-sm transition hover:-translate-y-px hover:border-[#bfdbfe] hover:bg-[#eff6ff] hover:text-[#2563eb] dark:border-[#243142] dark:bg-[#111827]/80 dark:text-[#e5e7eb] dark:hover:border-[#3b82f6] dark:hover:bg-[#172033] dark:hover:text-[#93c5fd] sm:w-auto"
            download
            href={resumeHref}
          >
            {resumeButton} ↓
          </a>
        </section>
      </BlurFade>
    </div>
  );
}
