'use client';

import dynamic from 'next/dynamic';

const SplashCursor = dynamic(
  () => import('./splash-cursor-canvas').then((mod) => mod.SplashCursor),
  { ssr: false }
);

export function SplashCursorWrapper() {
  return <SplashCursor />;
}
