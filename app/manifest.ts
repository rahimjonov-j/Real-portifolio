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
        src: "/icon.jpg",
        sizes: "160x160",
        type: "image/jpeg"
      },
      {
        src: "/apple-icon.jpg",
        sizes: "160x160",
        type: "image/jpeg",
        purpose: "any"
      }
    ]
  };
}
