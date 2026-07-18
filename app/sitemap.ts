import type { MetadataRoute } from "next";

const siteUrl = "https://javohirdev.uz";
const routes = [
  "/",
  "/en",
  "/about",
  "/en/about",
  "/projects",
  "/en/projects"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" || route === "/en" ? 1 : 0.8
  }));
}
