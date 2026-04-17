import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://javohirdev.uz"),
  applicationName: "Javohirdev.uz",
  title: {
    default: "Javohir Rahimjonov's blog",
    template: "%s | Javohirdev.uz"
  },
  description: "Bu sayt men haqimda qisqacha tasvirlab beradi.",
  keywords: [
    "Javohir Rahimjonov",
    "Javohirdev",
    "Frontend developer",
    "Next.js portfolio",
    "Web developer Uzbekistan"
  ],
  authors: [{ name: "Javohir Rahimjonov", url: "https://javohirdev.uz" }],
  creator: "Javohir Rahimjonov",
  publisher: "Javohirdev.uz",
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/apple-icon.jpg", type: "image/jpeg" }]
  },
  openGraph: {
    type: "website",
    siteName: "Javohirdev.uz",
    title: "Javohir Rahimjonov's blog",
    description: "Bu sayt men haqimda qisqacha tasvirlab beradi.",
    url: "https://javohirdev.uz",
    images: [
      {
        url: "/img/optimized/me-320.jpg",
        width: 320,
        height: 320,
        alt: "Javohir Rahimjonov"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Javohir Rahimjonov's blog",
    description: "Bu sayt men haqimda qisqacha tasvirlab beradi.",
    images: ["/img/optimized/me-320.jpg"]
  }
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
