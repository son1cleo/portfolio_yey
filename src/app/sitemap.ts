import type { MetadataRoute } from "next";
import { SITE_URL } from "../data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about", "projects", "contact"].map((path) => ({ url: new URL(path, SITE_URL).toString(), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.7 : 1 }));
}
