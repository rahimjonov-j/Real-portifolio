"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 12, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<
    { id: number; left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 100)}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 4}s`,
      })),
    );
  }, [number]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute top-0 h-px w-[80px] rotate-[215deg] animate-meteor rounded-full bg-gradient-to-r from-[#3b82f6] to-transparent opacity-0 shadow-[0_0_0_1px_#ffffff08]"
          style={{
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
