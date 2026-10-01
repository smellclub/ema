import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacidad"].map((path) => ({
    url: `${site.siteUrl}${path}`,
    changeFrequency: path ? "yearly" : "monthly",
    priority: path ? 0.3 : 1,
  }));
}
