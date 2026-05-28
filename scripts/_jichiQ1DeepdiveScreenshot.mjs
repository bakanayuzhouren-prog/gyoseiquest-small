import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = process.env.APP_URL || 'http://localhost:8082';
const OUT = path.join(ROOT, 'jichi-q1-deepdive-cap.png');

/** 地方自治法 第1問: questions.js index 0, 肢1 (境界・5条) */
const QUIZ_INDEX = 0;
const CHOICE_INDEX = 0;
const CHOICE_LABEL = '1.';

const q = require(path.join(ROOT, 'src', 'questions.js'));
const DEEP_BODY = q.SUBJECTS['行政法']['地方自治法'][QUIZ_INDEX].choiceDeepDive[CHOICE_INDEX];

const QUIZ_META = {
  quizSubject: '行政法',
  quizField: '地方自治法',
  quizMode: '',
  quizQuestionIndex: String(QUIZ_INDEX),
  quizChoiceIndex: CHOICE_INDEX,
  quizDeepdiveSource: 'deepDive',
  screenTitle: '',
  choiceLabel: CHOICE_LABEL,
  quizReturnTo: {
    pathname: '/result',
    params: {
      subject: '行政法',
      field: '地方自治法',
      questionIndex: String(QUIZ_INDEX),
    },
  },
};

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
  await page.evaluate(() => {
    localStorage.setItem('gq_user', 'screenshot-bot');
  });
  await page.reload({ waitUntil: 'networkidle', timeout: 180_000 });
  await page.waitForTimeout(2000);

  await page.evaluate(
    ({ meta, label, content }) => {
      sessionStorage.setItem('gq_deepdive_quiz_meta_v1', JSON.stringify(meta));
      sessionStorage.setItem(
        'gq_deepdive_restore_v1',
        JSON.stringify({
          content,
          choiceLabel: label,
          fromLearn: false,
          choiceCorrect: true,
          beginnerContent: '',
          peripheralContent: '',
          fExplain: '',
          learnRelatedStatutesContent: '',
          learnSubject: '',
          learnReturnIndex: null,
          learnReturnPath: '',
          quizSubject: meta.quizSubject,
          quizField: meta.quizField,
          quizMode: '',
          quizShuffle: '',
          quizQuestionIndex: meta.quizQuestionIndex,
          quizReturnTo: meta.quizReturnTo,
          quizChoiceIndex: meta.quizChoiceIndex,
          quizDeepdiveSource: meta.quizDeepdiveSource,
          screenTitle: '',
        }),
      );
    },
    { meta: QUIZ_META, label: CHOICE_LABEL, content: DEEP_BODY },
  );

  const deepUrl = `${BASE}/deepdive?choiceLabel=${encodeURIComponent(CHOICE_LABEL)}`;
  await page.goto(deepUrl, { waitUntil: 'networkidle', timeout: 180_000 });
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return /紛らわしい論点/.test(t) && /従来の区域/.test(t) && /もっと深掘/.test(t);
    },
    null,
    { timeout: 90_000 },
  );
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: OUT,
    fullPage: true,
    type: 'png',
    animations: 'disabled',
  });
  console.log('screenshot_written', OUT);
} finally {
  await browser.close();
}
