import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain =
    process.env.NEXT_PUBLIC_URL ||
    (`https://scholar-sync.soorya-u.dev` as const);
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: "/link",
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
