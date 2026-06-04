import { applyDisplayNames } from '@/src/displayNameReplacements';
import { extractPersonFlowNodeIds, hasEnoughCastForDiagram } from '@/src/castRegistry';
import {
  BY_LEARN_KEY,
  BY_QUESTION_TEXT_HASH,
  BY_QUIZ_KEY,
  type PersonFlowDiagramItem,
} from '@/src/personFlowImages';
import { getQuestionTextHash } from '@/utils/question-stats';

/** 民法5分野（登場人物関係図の対象） */
export const MINPO_PERSON_FLOW_FIELDS = [
  '民法総則',
  '民法物権',
  '債権総論',
  '債権各論',
  '家族法',
] as const;

export type MinpoPersonFlowField = (typeof MINPO_PERSON_FLOW_FIELDS)[number];

export function isMinpoPersonFlowField(field: string): field is MinpoPersonFlowField {
  return (MINPO_PERSON_FLOW_FIELDS as readonly string[]).includes(field);
}

/** 問題文中の登場人物 ID（A〜H・役割名・機関）を出現順に抽出 */
export function extractPersonFlowCharIds(text: string): string[] {
  return extractPersonFlowNodeIds(text);
}

/** 関係図を描ける登場人物が2人以上いるか */
export function hasPersonFlowCharacters(text: string): boolean {
  return hasEnoughCastForDiagram(normalizePersonFlowText(text));
}

/** 人の流れ・関係が読み取れる問題文か */
export function isPersonFlowEligible(text: string): boolean {
  const t = (text || '').trim();
  if (!t) return false;
  if (!hasPersonFlowCharacters(t)) return false;
  return (
    /[A-Z][、,]?\s*[A-Z][、,]?\s*[A-Z]/.test(t) ||
    /[A-Z]は.*[A-Z]から/.test(t) ||
    /[A-Z]が.*[A-Z].*を/.test(t) ||
    /(?:緒方|宮田|寺島|富永|門脇|秋元|若山|吉富|ヤンノリ|小原|小田|琴音|里見|菅原|橘|ダイゴ|ひろゆき|連帯債務者|保証人|公庫|ベイベー銀行|カマダ電気|メーカー|譲渡担保設定者|譲渡担保)/.test(t) ||
    /保証|譲渡|借り受け|債務|債権|抵当|仮装|相続|遺言|認知|養子/.test(t) ||
    /占有|賃借|地上権|建物|土地|所有者|第三者|引渡|明け渡|時効取得|登記|競売|留置|質権|用益/.test(t)
  );
}

/** バッチ生成・ハッシュ用: 役割置換＋defaultCharacterMap */
export function applyDefaultCharacterNames(text: string): string {
  return applyDisplayNames(text);
}

import { applyRolePhrases } from '@/src/rolePhraseReplacements';

export function normalizePersonFlowText(text: string, applyNames?: (t: string) => string): string {
  const raw = applyRolePhrases((text || '').replace(/\[\[.*?\]\]/g, '').trim());
  const named = applyNames ? applyNames(raw) : applyDefaultCharacterNames(raw);
  return named.replace(/\s+/g, ' ').trim();
}

function flattenItem(
  v: PersonFlowDiagramItem | PersonFlowDiagramItem[] | undefined
): PersonFlowDiagramItem[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function resolvePersonFlowDiagram(params: {
  mode: 'learn' | 'quiz';
  subject: string;
  field: string;
  text: string;
  index: number;
  applyNames?: (t: string) => string;
}): PersonFlowDiagramItem | null {
  const { mode, subject, field, text, index, applyNames } = params;
  if (subject !== '民法' || !isMinpoPersonFlowField(field)) return null;

  const normalized = normalizePersonFlowText(text, applyNames);
  if (!normalized || !hasPersonFlowCharacters(normalized)) return null;

  const hash = getQuestionTextHash(normalized);
  const fromHash = flattenItem(BY_QUESTION_TEXT_HASH[hash]);
  if (fromHash.length > 0) return fromHash[0];

  if (mode === 'learn') {
    const learnKey = `learn|${field}|${index + 1}`;
    const fromLearn = flattenItem(BY_LEARN_KEY[learnKey]);
    if (fromLearn.length > 0) return fromLearn[0];
  }

  if (mode === 'quiz') {
    const quizKey = `quiz|${field}|${index + 1}`;
    const fromQuiz = flattenItem(BY_QUIZ_KEY[quizKey]);
    if (fromQuiz.length > 0) return fromQuiz[0];
  }

  return null;
}

export function hasPersonFlowDiagram(params: {
  mode: 'learn' | 'quiz';
  subject: string;
  field: string;
  text: string;
  index: number;
  applyNames?: (t: string) => string;
}): boolean {
  return resolvePersonFlowDiagram(params) != null;
}
