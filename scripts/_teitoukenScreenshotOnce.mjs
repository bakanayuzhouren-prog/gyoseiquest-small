import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url =
  process.argv[2] ||
  'http://localhost:8081/deepdive?textbookSlug=teitouken&choiceLabel=';
const out =
  process.argv[3] || path.join(__dirname, '..', 'teitouken-textbook-cap.jpg');

const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--disable-dev-shm-usage', '--disable-gpu'],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000,
  });
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return /抵当権|教科書|総則|もっと深掘る/.test(t);
    },
    null,
    { timeout: 45_000 }
  );
  await page.waitForTimeout(4000);
  await page.screenshot({
    path: out,
    timeout: 25_000,
    fullPage: false,
    type: 'jpeg',
    quality: 82,
    animations: 'disabled',
  });
  // eslint-disable-next-line no-console
  console.error('screenshot_written', out);
} finally {
  await browser.close();
}
