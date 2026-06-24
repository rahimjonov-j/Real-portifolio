import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
}: DotPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/50 dark:fill-neutral-600/50",
        className,
      )}
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#dot-pattern)" />
    </svg>
  );
}
