"use client";

import { useEffect, useState } from "react";

export function PageAnimation({ children }: { children: React.ReactNode }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem("has-animated");

    const timer = setTimeout(() => {
      if (animated) {
        setHasAnimated(true);
      } else {
        sessionStorage.setItem("has-animated", "true");
      }
    }, animated ? 0 : 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={hasAnimated ? "flex w-full flex-col" : "fade-in-up flex w-full flex-col"}>
      {children}
    </div>
  );
}
