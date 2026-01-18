import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to a repo subdirectory (e.g. username.github.io/repo), uncomment below:
  // basePath: '/repo-name',
};

export default nextConfig;
