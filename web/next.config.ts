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
   * Development only, and guarded so it stays that way. The site has no page at "/" —
   * every route lives under a locale — and the real root is out/index.html, which
   * scripts/finalize-export.mjs writes after the build: a tiny page that reads the
   * visitor's language and forwards them. That file exists only in the export, so
   * `next dev` answered 404 at the root.
   *
   * This used to be unguarded, on the reasoning that `output: export` has no server to
   * run a redirect. That holds for a plain file host, and it is wrong on a platform that
   * reads next.config itself: Vercel turned this into an edge redirect, so "/" answered
   * 307 to /fr and nobody ever reached the language chooser — a Dutch or Spanish visitor
   * landed on French. NODE_ENV is `development` under `next dev` and `production` under
   * `next build`, so the convenience stays and no build emits the rule.
   */
  async redirects() {
    if (process.env.NODE_ENV !== 'development') return [];
    return [{ source: '/', destination: `/${'fr'}`, permanent: false }];
  },
};

export default nextConfig;
