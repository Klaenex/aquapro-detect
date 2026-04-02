import type { NextConfig } from "next";

const defaultBasePath = "/projets/aquapro-detect";
const rawBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.trim() || defaultBasePath;
const basePath =
  rawBasePath && rawBasePath !== "/"
    ? rawBasePath.replace(/\/+$/, "")
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
