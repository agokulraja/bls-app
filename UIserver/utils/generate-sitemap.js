import { globby } from 'globby';
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
    const pages = await globby(['UIserver/app/**/*.jsx']); // Only include files in UIserver/app
    const baseURL = 'https://blsinternational.ca';

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          // Normalize and clean up the file path
          const relativePath = path.relative('UIserver/app', page); // Get path relative to 'UIserver/app'
          let route = relativePath
            .replace(/\\/g, '/') // Ensure forward slashes
            .replace('.jsx', '') // Remove .jsx extension
            .replace('/page', ''); // Remove '/page'

          // Handle 'index' as the root for directories
          route = route.replace('/index', ''); 

          return `
            <url>
              <loc>${baseURL}/${route}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

    // Write the sitemap to the public directory
    fs.writeFileSync('UIserver/public/sitemap.xml', sitemap.trim());
}

generateSitemap();
