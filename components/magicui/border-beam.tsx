import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface BorderBeamProps {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  colorFrom = "#3b82f6",
  colorTo = "#8b5cf6",
  duration = 4,
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "animate-border-beam",
        className,
      )}
      style={
        {
          padding: `${borderWidth}px`,
          background: `conic-gradient(from var(--border-angle, 0deg), transparent 0%, ${colorFrom} 35%, ${colorTo} 50%, ${colorFrom} 65%, transparent 100%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        } as CSSProperties
      }
    />
  );
}
