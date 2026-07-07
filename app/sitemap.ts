import type { MetadataRoute } from "next";
import { posts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/gallery", "/fleet", "/testimonials", "/faq", "/booking", "/contact", "/blog", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
