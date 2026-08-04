import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/demo"],
      disallow: [
        "/dashboard",
        "/privatkunde",
        "/firmenkunde",
        "/anlagekunde",
        "/banking-operations",
        "/credit-operations",
        "/credit-office",
        "/challenge",
        "/statistiken",
        "/badges",
        "/notizen",
      ],
    },
    sitemap: "https://bankacademy.ch/sitemap.xml",
  };
}
