"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface HyperTextProps {
  text: string;
  className?: string;
  duration?: number;
  startDelay?: number;
}

export function HyperText({
  text,
  className,
  duration = 900,
  startDelay = 0,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(
    () => text.split("").map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)])).join(""),
  );
  const hasStarted = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const totalFrames = Math.ceil(duration / 40);
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        const revealed = Math.floor((frame / totalFrames) * text.length);

        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealed) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 40);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, duration, startDelay]);

  return <span className={cn("", className)}>{displayText}</span>;
}
