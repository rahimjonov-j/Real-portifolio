import type { MetadataRoute } from "next";

const siteUrl = "https://javohirdev.uz";
const routes = [
  "/uz",
  "/en",
  "/uz/about",
  "/en/about",
  "/uz/projects",
  "/en/projects"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/uz" || route === "/en" ? 1 : 0.8
  }));
}
