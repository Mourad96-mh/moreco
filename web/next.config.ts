import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hostinger serves plain files: no Node server, so no middleware, rewrites or
  // redirects. The 301s from the old moreco.ma live in the generated .htaccess.
  output: 'export',
  turbopack: {
    // Without this Turbopack walks up to C:\Users\MOURAD, finds a stray package-lock.json
    // there and warns that the workspace root would be the home directory.
    root: process.cwd(),
  },
  trailingSlash: true,
  images: {
    // The export has no image optimizer; pack shots are pre-sized by scripts/import-media.mjs.
    unoptimized: true,
  },
};

export default nextConfig;
