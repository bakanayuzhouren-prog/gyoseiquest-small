/** バッチスクリプト用（src/personFlowDiagram.ts と同期） */
import { applyRolePhrases } from './rolePhraseReplacements.mjs';
import { applyDisplayNames } from './displayNameReplacements.mjs';

export const MINPO_FIELDS = ['民法総則', '民法物権', '債権総論', '債権各論', '家族法'];

export const FIELD_SLUG = {
  民法総則: 'sousoku',
  民法物権: 'bukken',
  債権総論: 'saikensouron',
  債権各論: 'saikenkakuronn',
  家族法: 'kazokuhou',
};

export const defaultCharacterMap = {
  緒方: 'A',
  宮田: 'B',
  寺島: 'C',
  富永: 'D',
  門脇: 'E',
  秋元: 'F',
  若山: 'G',
  吉富: 'H',
  ヤンノリ: 'I',
  父: 'J',
  母: 'K',
  兄弟姉妹: '兄弟姉妹',
  祖父母: 'N',
  小原: 'O',
  小田: 'P',
  琴音: 'Q',
  里見: 'R',
  菅原: 'S',
  橘: 'T',
};

export function isPersonFlowEligible(text) {
  const t = (text || '').trim();
  if (!t) return false;
  const ids = [];
  for (const m of t.matchAll(/\b([A-H])\b/g)) {
    if (!ids.includes(m[1])) ids.push(m[1]);
  }
  if (ids.length < 2) return false;
  return (
    /[A-Z][、,]?\s*[A-Z][、,]?\s*[A-Z]/.test(t) ||
    /[A-Z]は.*[A-Z]から/.test(t) ||
    /[A-Z]が.*[A-Z].*を/.test(t) ||
    /(?:緒方|宮田|寺島|富永|門脇|秋元|若山|吉富|ヤンノリ|小原|小田|琴音|里見|菅原|橘|ダイゴ|ひろゆき|連帯債務者|保証人|公庫|ベイベー銀行|カマダ電気)/.test(t) ||
    /保証|譲渡|借り受け|債務|債権|抵当|仮装|相続|遺言|認知|養子/.test(t) ||
    /占有|賃借|地上権|建物|土地|所有者|第三者|引渡|明け渡|時効取得|登記|競売|留置|質権|用益/.test(t)
  );
}

export function applyDefaultCharacterNames(text) {
  return applyDisplayNames(text);
}

export function normalizePersonFlowText(text) {
  const raw = applyRolePhrases((text || '').replace(/\[\[.*?\]\]/g, '').trim());
  return applyDefaultCharacterNames(raw).replace(/\s+/g, ' ').trim();
}

export function getQuestionTextHash(questionText) {
  const normalized = (questionText || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) return '0';
  let h = 0;
  for (let i = 0; i < Math.min(normalized.length, 500); i++) {
    h = (h << 5) - h + normalized.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
