import type { NextConfig } from "next";

// GitHub Pages serves this app from https://sudirkrishnaars.github.io/still-worth-it/
// (a project page, not a user/org root page), so every asset URL and route needs the
// "/still-worth-it" prefix baked in at build time via basePath/assetPrefix.
const repoName = "still-worth-it";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: {
    // GitHub Pages has no image-optimization server, so next/image must skip it.
    unoptimized: true,
  },
};

export default nextConfig;
