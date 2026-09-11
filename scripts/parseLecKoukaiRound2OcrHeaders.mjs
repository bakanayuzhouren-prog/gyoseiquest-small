/**
 * Collapse spaced OCR and extract LEC公開2 answer-header candidates.
 * Does not confirm answers. Visual review still required.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'tmp/moshi-ocr/lec-koukai-2026-round2/winocr');
const files = fs.readdirSync(dir).filter((n) => n.endsWith('.txt') && n !== 'manifest.json').sort();

function compact(s) {
  return String(s || '')
    .replace(/[\s\u3000]+/g, '')
    .replace(/[ー‐–—]/g, '-')
    .replace(/妥当ある/g, '妥当である')
    .replace(/妥当でない/g, '妥当でない');
}

const pages = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const text = compact(raw);
  const qMatches = [...text.matchAll(/(?:問題)?(\d{1,2})(?:日)?(?:普通|やや難|易しい|難|基礎)/g)].map((m) => Number(m[1]));
  const qAlt = [...text.matchAll(/問題(\d{1,2})/g)].map((m) => Number(m[1]));
  const theme = text.match(/([\u4E00-\u9FFF・（）()]+)(?:\(会社法\)|（会社法）|\(民法\)|（民法）|\(憲法\)|（憲法）)/);
  const ans = text.match(/普通(\d)|やや難(\d)|易しい(\d)|難(\d)|正解(\d)/);
  const choiceMarks = [...text.matchAll(/([1-5])妥当(である|でない)/g)].map((m) => ({
    choice: Number(m[1]),
    ok: m[2] === 'である',
  }));
  pages.push({
    file,
    length: text.length,
    qFromHeader: qMatches,
    qFromMondai: qAlt,
    answerGuess: ans ? Number(ans[1] || ans[2] || ans[3] || ans[4] || ans[5]) : null,
    choiceMarks,
    snippet: text.slice(0, 80),
  });
}

const out = path.join(process.cwd(), 'tmp/moshi-ocr/lec-koukai-2026-round2/header-candidates.json');
fs.writeFileSync(out, JSON.stringify(pages, null, 2), 'utf8');
console.log('pages', pages.length);
console.log(pages.map((p) => `${p.file} q=${p.qFromHeader.join('/')||'-'} ans=${p.answerGuess ?? '-'} len=${p.length} marks=${p.choiceMarks.map((c)=>c.choice+(c.ok?'o':'x')).join(',')}`).join('\n'));
