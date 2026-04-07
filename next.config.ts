import type { NextConfig } from "next";
import { getBasePath } from "./lib/site";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
