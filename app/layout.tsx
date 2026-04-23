import type { Metadata, Viewport } from "next";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://javohirdev.uz"),
  applicationName: "Javohirdev.uz",
  title: {
    default: "Javohir Rahimjonov's blog",
    template: "%s | Javohirdev.uz"
  },
  description:
    "Mahsulotni ishlatishni osonlashtiradigan tez va puxta web interfeyslar yarataman.",
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
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }]
  },
  openGraph: {
    type: "website",
    siteName: "Javohirdev.uz",
    title: "Javohir Rahimjonov's blog",
    description:
      "Mahsulotni ishlatishni osonlashtiradigan tez va puxta web interfeyslar yarataman.",
    url: "https://javohirdev.uz",
    images: [
      {
        url: "/img/optimized/newpic.png",
        width: 1254,
        height: 1254,
        alt: "Javohir Rahimjonov"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Javohir Rahimjonov's blog",
    description:
      "Mahsulotni ishlatishni osonlashtiradigan tez va puxta web interfeyslar yarataman.",
    images: ["/img/optimized/newpic.png"]
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
    <html lang="uz" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}"
          }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
