"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  className?: string;
  decimalPlaces?: number;
  startValue?: number;
}

export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
  startValue = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(startValue);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = String(
          Math.round(latest * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces),
        ).padStart(2, "0");
      }
    });
  }, [springValue, decimalPlaces]);

  return <span ref={ref} className={cn("inline-block tabular-nums", className)} />;
}
