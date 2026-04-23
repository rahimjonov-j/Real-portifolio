"use client";

import { useEffect, useState } from "react";

export function PageAnimation({ children }: { children: React.ReactNode }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check if we've already animated in this session
    const animated = sessionStorage.getItem("has-animated");
    if (animated) {
      setHasAnimated(true);
    } else {
      // Small delay to ensure smooth start
      const timer = setTimeout(() => {
        sessionStorage.setItem("has-animated", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={hasAnimated ? "flex w-full flex-col" : "fade-in-up flex w-full flex-col"}>
      {children}
    </div>
  );
}
