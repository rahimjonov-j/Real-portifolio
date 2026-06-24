"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden",
        "rounded-full border border-[#007bff] bg-[#007bff] px-6 py-3 text-base font-semibold text-white",
        "shadow-[0_14px_30px_rgba(0,123,255,0.2)] transition-all",
        "hover:-translate-y-px hover:shadow-[0_14px_40px_rgba(0,123,255,0.45)]",
        className,
      )}
      {...props}
    >
      <span className="animate-shimmer-slide absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <span className="relative">{children}</span>
    </button>
  );
}
