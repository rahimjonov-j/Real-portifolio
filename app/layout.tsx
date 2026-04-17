import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Javohir Rahimjonov's blog",
    template: "%s | Javohir dev"
  },
  description: "Bu sayt men haqimda qisqacha tasvirlab beradi."
};

export const viewport: Viewport = {
  themeColor: "#233455",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
