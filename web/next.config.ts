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

  /*
   * Development only. The site has no page at "/" — every route lives under a locale —
   * and the real root is out/index.html, which scripts/finalize-export.mjs writes after
   * the build: a tiny page that reads the visitor's language and forwards them. That
   * file exists only in the export, so `next dev` answered 404 at the root.
   *
   * `output: export` ignores redirects (there is no server to run them), so this changes
   * nothing about the built site — it just stops localhost:3000/ being a dead end. Test
   * the actual language detection against the export, not here.
   */
  async redirects() {
    return [{ source: '/', destination: `/${'fr'}`, permanent: false }];
  },
};

export default nextConfig;
