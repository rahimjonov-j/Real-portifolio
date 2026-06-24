"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
}

export function MagicCard({ children, className, gradientSize = 250 }: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ "--gradient-size": `${gradientSize}px` } as React.CSSProperties}
      className={cn(
        "group relative",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:[background:radial-gradient(var(--gradient-size)_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--magic-gradient,rgba(240,245,255,0.6)),transparent_100%)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
