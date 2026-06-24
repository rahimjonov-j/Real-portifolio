"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  startDelay?: number;
  className?: string;
}

export function TypingAnimation({
  text,
  duration = 60,
  startDelay = 0,
  className,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, duration);
    return () => clearInterval(interval);
  }, [text, duration, started]);

  return (
    <span className={cn("", className)}>
      {displayed || <span className="opacity-0">{text[0]}</span>}
      {displayed.length < text.length && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse rounded-sm bg-current align-middle opacity-70" />
      )}
    </span>
  );
}
