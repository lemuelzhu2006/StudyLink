/** @type {import('next').NextConfig} */

// GitHub Pages serves the site at https://<user>.github.io/<repo>/ — set at build time via CI.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
}

module.exports = nextConfig
