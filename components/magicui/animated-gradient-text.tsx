import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient-x bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] bg-[length:200%_auto] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}
