import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Javohirdev.uz",
    short_name: "Javohirdev",
    description: "Javohir Rahimjonov portfolio sayti.",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#233455",
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
