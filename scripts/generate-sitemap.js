import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.abhimanyuinfosec.com';
const TODAY = new Date().toISOString().split('T')[0];

const routes = [
  // Core pages
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/mission', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/approach', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/why-ais', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/team', priority: '0.7', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/docs', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },

  // Services
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/vulnerability-assessment', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/web-security', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/network-security', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/penetration-testing', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/threat-detection', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/security-hardening', priority: '0.8', changefreq: 'monthly' },

  // Products & Technology
  { path: '/products', priority: '0.8', changefreq: 'weekly' },
  { path: '/technology', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/autored-apt', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/ip-intelligence', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/hybrid-ids', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/sanjay-url-detector', priority: '0.7', changefreq: 'monthly' },

  // Projects & Case Studies
  { path: '/projects', priority: '0.8', changefreq: 'weekly' },
  { path: '/projects/banking-swift-gateway-red-team', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/cloud-devsecops-container-security', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/scada-ics-critical-infrastructure-audit', priority: '0.7', changefreq: 'monthly' },

  // Research
  { path: '/research', priority: '0.8', changefreq: 'weekly' },

  // Insights / Blog
  { path: '/insights', priority: '0.8', changefreq: 'weekly' },
  { path: '/insights/5-web-security-risks-every-business-should-know', priority: '0.7', changefreq: 'monthly' },
  { path: '/insights/why-smes-are-becoming-targets-for-cyber-attacks', priority: '0.7', changefreq: 'monthly' },
  { path: '/insights/what-is-attack-surface-management', priority: '0.7', changefreq: 'monthly' },
  { path: '/insights/vulnerability-assessment-vs-penetration-testing', priority: '0.7', changefreq: 'monthly' },

  // Authentication
  { path: '/login', priority: '0.5', changefreq: 'monthly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf-8');
console.log(`✅ Generated sitemap.xml with ${routes.length} URLs at ${outputPath}`);
