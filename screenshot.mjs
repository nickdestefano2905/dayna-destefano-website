import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'temporary screenshots');

// Ensure directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Find next screenshot number
const existing = fs.readdirSync(SCREENSHOTS_DIR)
  .filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
  .map(f => {
    const match = f.match(/^screenshot-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });
const next = existing.length > 0 ? Math.max(...existing) + 1 : 1;

const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`;
const outputPath = path.join(SCREENSHOTS_DIR, filename);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait a moment for fonts/images to load
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Screenshot saved: ${outputPath}`);
  await browser.close();
})();
