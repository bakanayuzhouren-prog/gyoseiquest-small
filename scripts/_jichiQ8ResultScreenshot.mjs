import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = process.env.APP_URL || 'http://localhost:8081';
const OUT = path.join(ROOT, 'jichi-q8-result-cap.png');

const QUIZ_INDEX = 14;

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--disable-dev-shm-usage', '--disable-gpu'],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 180_000 });
  await page.evaluate(() => localStorage.setItem('gq_user', 'screenshot-bot'));
  await page.reload({ waitUntil: 'networkidle', timeout: 180_000 });

  const resultUrl =
    `${BASE}/result?subject=${encodeURIComponent('行政法')}` +
    `&field=${encodeURIComponent('地方自治法')}` +
    `&questionIndex=${QUIZ_INDEX}` +
    `&userAnswer=${encodeURIComponent(JSON.stringify([3]))}` +
    `&correctCountSession=1`;

  await page.goto(resultUrl, { waitUntil: 'networkidle', timeout: 180_000 });
  await page.waitForFunction(
    () => /直接請求/.test(document.body?.innerText || ''),
    null,
    { timeout: 90_000 },
  );
  await page.waitForTimeout(2500);
  await page.screenshot({ path: OUT, fullPage: true, type: 'png', animations: 'disabled' });
  console.log('screenshot_written', OUT);
} finally {
  await browser.close();
}
