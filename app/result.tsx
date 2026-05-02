import Constants from 'expo-constants';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getChunkImageSource } from '@/src/chunkImages';
import { useTheme } from '@/src/context/ThemeContext';
import { getDeepdiveImageSource } from '@/src/deepdiveImages';
import { setDeepdiveParams } from '@/src/deepdiveState';
import { getDescriptiveImageSource } from '@/src/descriptiveImages';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';
import { PIN_CASES, type PinCase } from '@/src/pinData';
import { RESOURCES, STATUTES } from '@/src/questions';
import { formatNumberedClauses, getChoicePrefix, hasNumberPrefix, splitNumberPrefix } from '@/utils/choiceNumber';
import { addPoints } from '@/utils/points';
import { incrementLoopCount } from '@/utils/progress';
import { getHiddenHashes, peekHiddenHashesSync } from '@/utils/question-hidden';
import { getQuestionTextHash, updateQuestionStats } from '@/utils/question-stats';
import {
    filterHiddenFromQuestions,
    filterQuizQuestionsByMode,
    getMergedSubjectData,
    pickQuestionsForField,
} from '@/utils/quiz-question-pipeline';
import { formatStatuteReferenceForMarkdown, looksLikeMergedStatuteBlock } from '@/utils/statute-reference-format';
import { normalizeSlotAnswerForCompare, splitComboChoiceLineToSlots } from '@/utils/slotNormalize';
import { gradeDescriptiveAnswer, type GradeDescriptiveResult } from '../src/utils/geminiService';
import { USER_KEY } from './login';

/** 民法物権：結果画面「次の問題へ」直前に出す bukken 解説図（M列等の [[image:…]] と同期） */
const RESULT_FOOTER_BUKKEN_IMAGE_RE = /\[\[image:(bukken\/(?:5-21|(?:15|18)-21-\d+))\]\]/g;

function getResultFooterBukkenDeepdiveKeys(question: unknown): string[] {
  if (!question || typeof question !== 'object') return [];
  const parts: string[] = [];
  const memo = (question as { memo?: unknown }).memo;
  if (typeof memo === 'string') parts.push(memo);
  const choices = (question as { choices?: unknown }).choices;
  if (Array.isArray(choices)) {
    for (const c of choices) {
      const dd = c && typeof c === 'object' ? (c as { choiceDeepDive?: unknown }).choiceDeepDive : undefined;
      if (typeof dd === 'string') parts.push(dd);
    }
  }
  const text = parts.join('\n');
  const keys: string[] = [];
  const seen = new Set<string>();
  const re = new RegExp(RESULT_FOOTER_BUKKEN_IMAGE_RE.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const k = match[1];
    if (!seen.has(k)) {
      seen.add(k);
      keys.push(k);
    }
  }
  return keys;
}

/** シンプルなチャンク画像か（sousoku7 など -1.2.3.4 のような表記がない） */
function isSimpleChunkImage(path: string): boolean {
  return !!(path && path.trim() && !/-\d/.test(path.trim()));
}

/**
 * 「誤っている／妥当でない…を選べ」型の設問。answer に入る肢は試験上の正解だが、記述自体は法上は誤りになりがち。
 * 深掘りの〇×は記述の法上の正誤で出すため、この型のときは answer との関係を反転する。
 */
function isSelectLegallyIncorrectStem(stem: string): boolean {
  const t = stem.replace(/\s+/g, '');
  return (
    /誤っているもの/.test(t) ||
    /誤りであるもの/.test(t) ||
    /妥当でないもの/.test(t) ||
    /正しくないもの/.test(t) ||
    /不適当なもの/.test(t) ||
    /適当でないもの/.test(t)
  );
}

/** もっと深掘るの〇×用: その肢の記述が法上妥当か（並べ替え・解答未設定は null） */
function deepdiveChoiceLegallyCorrect(
  questionStem: string,
  choiceIdx: number,
  effectiveCorrectIndices: number[],
  answerPending: boolean,
  isReorder: boolean
): boolean | null {
  if (answerPending || isReorder) return null;
  const inAnswer = effectiveCorrectIndices.includes(choiceIdx);
  if (isSelectLegallyIncorrectStem(questionStem)) {
    return !inAnswer;
  }
  return inAnswer;
}

/** 民法総則・結果画面: スプレッドシート I 列を別ページで表示（根拠条文） */
function openMinpoSosokuStatuteRefPage(
  router: { push: (href: object) => void },
  statuteRefText: string,
  choiceLabel: string,
  quizSubject: string,
  quizField: string
) {
  const body = statuteRefText.trim();
  if (!body) return;
  setDeepdiveParams(body, choiceLabel, {
    choiceCorrect: null,
    quizSubject,
    quizField,
    screenTitle: '根拠条文',
  });
  router.push({
    pathname: '/deepdive',
    params: { choiceLabel },
  });
}

/** [[image:xxx]] を解決。問題を解くモード専用: descriptive → deepdive → chunk → imageMap の順で検索 */
function resolveImageSource(key: string): number | undefined {
  const descriptive = getDescriptiveImageSource(key);
  if (descriptive) return descriptive;
  const deepdive = getDeepdiveImageSource(key);
  if (deepdive) return deepdive;
  const chunk = getChunkImageSource(key);
  if (chunk) return chunk;
  const mapped = (IMAGE_RESOURCES_MAP as Record<string, number>)[key];
  return mapped;
}

/** 行政法の分野 → 条文モード(STATUTES)のキー。もっと深掘るで根拠条文を表示 */
const FIELD_TO_STATUTES_KEY: Record<string, string> = {
  '行政手続法': 'gyote',
  '行政不服審査法': 'gyoshin',
  '行政事件訴訟法': 'gyoso',
  '国家賠償法・損失訴訟': 'kokubai',
  '地方自治法': 'jichi',
};

/** 民法の分野 → 条文モード(STATUTES)のキー。もっと深掘るで全肢の根拠条文を表示 */
const CIVIL_FIELD_TO_STATUTES_KEY: Record<string, string> = {
  '民法総則': 'minpo_sosoku',
  '民法物権': 'minpo_bukken',
  '債権総論': 'minpo_saiken_soron',
  '債権各論': 'minpo_saiken_kakuron',
  '家族法': 'minpo_kazoku',
  '民法総合': 'minpo_sosoku',
};

/** 多肢選択の分野 → 条文モード(STATUTES)のキー（結果画面の根拠条文・解説用） */
const TASHI_FIELD_TO_STATUTES_KEY: Record<string, string> = {
  憲法: 'kenpo',
};

/** 第〇条・号・号内（イロハ）を遡り、「第二条（定義） 三」「第二条（定義） 四 イ」のように表示 */
function getStatuteDisplayTitle(
  statute: { title: string; content: string },
  fullStatutes: Array<{ title: string; content: string }>,
  groupStatutes?: Array<{ title: string; content: string }>
): string {
  const t = statute.title?.trim() || '';
  if (!t) return t;
  // 親条文（第X条 第X項）が同グループにある場合、号（一・二・三…）は号のみ表示
  if (groupStatutes && groupStatutes.length > 1) {
    const gouMatch = t.match(/^(第[十百千〇一二三四五六七八九十\d]+条\s*第[1１2２3３4４5５6６7７8８9９]項)\s+([一二三四五六七八九十])(?:\s|$|[（(])/);
    if (gouMatch) {
      const base = gouMatch[1];
      const gou = gouMatch[2];
      const parentRe = /^\s+[（(]/;
      const hasParent = groupStatutes.some((s) => {
        const pt = (s.title ?? '').trim();
        return pt === base || (pt.startsWith(base) && parentRe.test(pt.slice(base.length)));
      });
      if (hasParent) return gou;
    }
  }
  // 第八百三十八条 第1項 一 等 → 第八百三十八条 第1項 と表示（号は省略）
  const article1GouMatch = t.match(/^(第[十百千〇一二三四五六七八九十\d]+条\s*第[1１]項)\s+[一二三四五六七八九十]$/);
  if (article1GouMatch) return article1GouMatch[1];
  if (/^第.*条/.test(t)) return t;
  const idx = fullStatutes.findIndex(
    (s) => (s.title === statute.title && s.content === statute.content)
  );
  if (idx <= 0) return t;
  const isGouLevel = (s: string) => /^[一二三四五六七八九十]$|^[１２３４５６７８９１０]$/.test(s);
  const isSubGou = (s: string) => /^[ァ-ン]$/.test(s);
  let articleTitle = '';
  let gouTitle = '';
  for (let i = idx - 1; i >= 0; i--) {
    const pt = fullStatutes[i]?.title?.trim() || '';
    if (!pt) continue;
    if (/^第.*条/.test(pt)) {
      articleTitle = pt;
      break;
    }
  }
  if (!articleTitle) return t;
  if (isSubGou(t)) {
    for (let i = idx - 1; i >= 0; i--) {
      const pt = fullStatutes[i]?.title?.trim() || '';
      if (pt === articleTitle) break;
      if (isGouLevel(pt)) {
        gouTitle = pt;
        break;
      }
    }
    return gouTitle ? `${articleTitle} ${gouTitle} ${t}` : `${articleTitle} ${t}`;
  }
  return `${articleTitle} ${t}`;
}

/** アラビア数字を漢数字（条番号用）に変換。例: 838 → 八百三十八 */
function toKanjiArticle(n: number): string {
  if (n <= 0 || n >= 10000) return '';
  const d = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (n < 10) return d[n];
  if (n < 100) return (n >= 20 ? d[Math.floor(n / 10)] : '') + (n >= 10 ? '十' : '') + (n % 10 ? d[n % 10] : '');
  if (n < 1000) return d[Math.floor(n / 100)] + '百' + toKanjiArticle(n % 100);
  return d[Math.floor(n / 1000)] + '千' + toKanjiArticle(n % 1000);
}

/** 条文タイトル照合の共通処理（項の表記ゆれ対応） */
function matchStatuteTitle(
  statutes: Array<{ title: string; content: string }>,
  artKanji: string,
  artKanjiAlt: string | null,
  kouMatch: RegExpMatchArray | null
): { title: string; content: string } | null {
  const kouKanji = kouMatch ? '第' + (parseInt(kouMatch[1], 10) < 10 ? toKanjiArticle(parseInt(kouMatch[1], 10)) : kouMatch[1]) + '項' : '';
  const kouAlt = kouMatch ? '第' + kouMatch[1] + '項' : '';
  const kouAltFull = kouMatch && parseInt(kouMatch[1], 10) < 10
    ? '第' + String.fromCharCode(0xFF10 + parseInt(kouMatch[1], 10)) + '項' : '';
  const tryMatch = (t: string, kanji: string) =>
    t.includes(kanji) && (!kouKanji || t.includes(kouKanji) || t.includes(kouAlt) || t.includes(kouAltFull) || (kouMatch && t.includes('第' + kouMatch[1] + '項')));
  for (const st of statutes) {
    const t = st.title || '';
    if (tryMatch(t, artKanji)) return st;
    if (artKanjiAlt && tryMatch(t, artKanjiAlt)) return st;
  }
  for (const st of statutes) {
    const t = st.title || '';
    if (t.includes(artKanji)) return st;
    if (artKanjiAlt && t.includes(artKanjiAlt)) return st;
  }
  return null;
}

/** 単一の条文参照（例: 166条1項、724条の2、269条の2第1項、２８３条）から該当条文を検索 */
function findStatuteByRef(
  statutes: Array<{ title: string; content: string }>,
  ref: string
): { title: string; content: string } | null {
  if (!ref || !statutes.length) return null;
  let r = ref.trim()
    .replace(/^民法\s*/, '')
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    .trim();
  if (!r) return null;
  // シートで「269条の第2項第1項」「269条の第2項1項」のように誤結合した場合 → 269条の2第1項
  r = r.replace(/(\d+)条の第(\d+)[项項]\s*第(\d+)[项項]/g, '$1条の$2第$3項');
  r = r.replace(/(\d+)条の第(\d+)[项項]\s*(\d+)[项項]/g, '$1条の$2第$3項');
  const norm = (s: string) => (s || '').replace(/\s/g, '');
  const rn = norm(r);
  for (const st of statutes) {
    const t = norm(st.title || '');
    if (t.includes(rn) || (rn.length >= 4 && t.includes(rn.slice(0, -1)))) return st;
  }
  // 269条の2 / 第369条の2 など「条のN」（の二・の三…）
  const no2Article = r.match(/(\d+)条の(\d+)/);
  if (no2Article) {
    const artNum = parseInt(no2Article[1], 10);
    const subNum = parseInt(no2Article[2], 10);
    if (subNum >= 1 && subNum < 100) {
      const subKanji = toKanjiArticle(subNum);
      const artKanji = '第' + toKanjiArticle(artNum) + '条の' + subKanji;
      const artKanjiAlt = artNum >= 100 && artNum < 200 ? '第百' + toKanjiArticle(artNum % 100) + '条の' + subKanji : null;
      const kouMatch = r.match(/第(\d+)項/);
      const hit = matchStatuteTitle(statutes, artKanji, artKanjiAlt, kouMatch);
      if (hit) return hit;
    }
  }
  const artMatch = r.match(/(\d+)条/);
  if (artMatch) {
    const artNum = parseInt(artMatch[1], 10);
    const no2Match = r.match(/条の(\d+)$/);
    const no2Suffix = no2Match ? 'の' + (parseInt(no2Match[1], 10) < 10 ? toKanjiArticle(parseInt(no2Match[1], 10)) : no2Match[1]) : '';
    const artKanji = '第' + toKanjiArticle(artNum) + '条' + no2Suffix;
    const artKanjiAlt = artNum >= 100 && artNum < 200 ? '第百' + toKanjiArticle(artNum % 100) + '条' + no2Suffix : null;
    const kouMatch = r.match(/(\d+)項/);
    const hit = matchStatuteTitle(statutes, artKanji, artKanjiAlt, kouMatch);
    if (hit) return hit;
  }
  return null;
}

/** 第X条 第X項のみ指定時（号なし）、一・二・三…の号まで含めて展開 */
function expandStatutesWithGou(
  statutes: Array<{ title: string; content: string }>,
  found: { title: string; content: string }
): Array<{ title: string; content: string }> {
  const t = found.title?.trim() || '';
  const match = t.match(/^(第[十百千〇一二三四五六七八九十\d]+条\s*第[1１2２3３4４5５6６7７8８9９]項)(?:\s*[（(]|$)/);
  if (!match) return [found];
  const base = match[1];
  const gouOrder = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const expanded: Array<{ title: string; content: string }> = [found];
  const seen = new Set<string>([`${found.title}::${found.content}`]);
  for (const g of gouOrder) {
    const prefix = `${base} ${g} `;
    for (const st of statutes) {
      const stTitle = st.title?.trim() || '';
      if (stTitle.startsWith(prefix) || stTitle === `${base} ${g}`) {
        const key = `${st.title}::${st.content}`;
        if (!seen.has(key)) {
          seen.add(key);
          expanded.push(st);
        }
        break;
      }
    }
  }
  return expanded;
}

/** I列の根拠条文指定（167条、166条1項 等カンマ区切り可）から該当条文をすべて検索。第X条第X項のみの場合は一・二まで展開 */
function findStatutesByRef(
  statutes: Array<{ title: string; content: string }>,
  ref: string
): Array<{ title: string; content: string }> {
  if (!ref || !statutes.length) return [];
  const parts = ref.split(/[,、]/).map((p) => p.trim()).filter(Boolean);
  const seen = new Set<string>();
  const result: Array<{ title: string; content: string }> = [];
  for (const part of parts) {
    const found = findStatuteByRef(statutes, part);
    if (found) {
      const expanded = expandStatutesWithGou(statutes, found);
      for (const st of expanded) {
        const key = `${st.title}::${st.content}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push(st);
        }
      }
    }
  }
  return result;
}

/** 問題文・肢・解説・深掘りから「298条1項」「269条の2」など条文参照らしき文字列を拾う（I列未入力時の自動根拠用） */
function extractStatuteRefsFromText(raw: string): string[] {
  if (!raw || !raw.trim()) return [];
  const s = String(raw).replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
  const refs: string[] = [];
  const seen = new Set<string>();
  const add = (r: string) => {
    const k = r.replace(/\s/g, '');
    if (!k || seen.has(k)) return;
    seen.add(k);
    refs.push(k);
  };
  let m: RegExpExecArray | null;
  const reSubKou = /(\d{1,4})条の(\d{1,2})\s*第(\d{1,3})項/g;
  while ((m = reSubKou.exec(s)) !== null) {
    add(`${m[1]}条の${m[2]}第${m[3]}項`);
  }
  const reSub = /(\d{1,4})条の(\d{1,2})(?!\d)/g;
  while ((m = reSub.exec(s)) !== null) {
    add(`${m[1]}条の${m[2]}`);
  }
  const reMain = /(?:第\s*)?(\d{1,4})\s*条(?!の)(?:\s*第?\s*(\d{1,3})\s*項)?/g;
  while ((m = reMain.exec(s)) !== null) {
    if (m[2]) add(`${m[1]}条${m[2]}項`);
    else add(`${m[1]}条`);
  }
  return refs;
}

const GENERIC_STATUTE_OVERLAP = [
  '善良な管理者の注意',
  '善良な管理者をもって',
  '善良な管理者',
  '注意をもって',
  'その権限を行使',
  'することができる',
  'することができない',
  '場合において',
  '必要があると認める',
];

function hasNonGenericStatuteOverlap(qNorm: string, statuteNorm: string): boolean {
  const maxLen = Math.min(qNorm.length, 14);
  for (let len = maxLen; len >= 5; len--) {
    for (let i = 0; i + len <= qNorm.length; i++) {
      const sub = qNorm.slice(i, i + len);
      if (!statuteNorm.includes(sub)) continue;
      if (!GENERIC_STATUTE_OVERLAP.some((g) => g.includes(sub))) return true;
    }
  }
  for (let len = 4; len <= maxLen; len++) {
    for (let i = 0; i + len <= qNorm.length; i++) {
      const sub = qNorm.slice(i, i + len);
      if (!statuteNorm.includes(sub)) continue;
      if (!GENERIC_STATUTE_OVERLAP.some((g) => g.includes(sub))) return true;
    }
  }
  return false;
}

function titleKeywordMatchesStatute(qNorm: string, titleNorm: string): boolean {
  const pairs: [string, string][] = [
    ['留置', '留置'],
    ['質権', '質権'],
    ['抵当', '抵当'],
    ['先取', '先取'],
    ['地役', '地役'],
    ['地上', '地上'],
    ['共有', '共有'],
    ['隣地', '隣地'],
    ['登記', '登記'],
    ['占有', '占有'],
    ['時効', '時効'],
    ['代理', '代理'],
    ['取消', '取消'],
    ['無効', '無効'],
    ['意思表示', '意思表示'],
    ['不当利得', '不当利得'],
    ['不法行為', '不法行為'],
    ['債務不履行', '債務不履行'],
  ];
  return pairs.some(([a, b]) => qNorm.includes(a) && titleNorm.includes(b));
}

/** 文字レベル照合のフォールバック（I列なし）。条文タイトル・典型フレーズで誤一致を落とす */
function pickRelatedStatutesFiltered(
  statutes: Array<{ title: string; content: string }>,
  questionText: string,
  limit: number
): Array<{ title: string; content: string }> {
  const norm = (s: string) =>
    (s || '')
      .trim()
      .replace(/[\s。、．，,.「」『』【】［］()（）]/g, '');
  const q = norm(questionText);
  if (!q) return [];
  const phraseBonuses = ['管理権を有しない', '親権を行う者が管理権'];
  const scored = statutes
    .map((st, idx) => {
      const titleN = norm(st.title || '');
      const t = norm(`${st.title || ''}${st.content || ''}`);
      if (!t) return { idx, score: 0, pass: false };
      let hit = 0;
      for (const ch of new Set(q.split(''))) {
        if (t.includes(ch)) hit++;
      }
      let score = hit / q.length;
      for (const phrase of phraseBonuses) {
        if (q.includes(phrase) && t.includes(phrase)) score += 0.4;
      }
      const pass =
        score >= 0.32 ||
        titleKeywordMatchesStatute(q, titleN) ||
        hasNonGenericStatuteOverlap(q, t) ||
        phraseBonuses.some((p) => q.includes(p) && t.includes(p));
      return { idx, score, pass };
    })
    .filter((s) => s.score > 0.18 && s.pass)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => statutes[s.idx]);
}

/** I列なし時: 条文番号の明示 → findStatutesByRef、なければフィルタ付き自動照合 */
function pickAutoRelatedStatutes(
  statutes: Array<{ title: string; content: string }>,
  questionText: string,
  limit: number
): Array<{ title: string; content: string }> {
  if (!statutes.length || !questionText.trim()) return [];
  const refs = extractStatuteRefsFromText(questionText);
  const seen = new Set<string>();
  const out: Array<{ title: string; content: string }> = [];
  for (const ref of refs) {
    for (const st of findStatutesByRef(statutes, ref)) {
      const key = `${st.title}::${st.content}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(st);
      if (out.length >= limit) return out;
    }
  }
  if (out.length > 0) return out;
  return pickRelatedStatutesFiltered(statutes, questionText, limit);
}

/** I列なし時: 判例図解（PIN_CASES）をタグ・事件名で当てる */
function pickRelatedPinCases(questionText: string, limit: number): PinCase[] {
  const q = (questionText || '').replace(/\s/g, '');
  if (q.length < 4) return [];
  const scored = PIN_CASES.map((c) => {
    let s = 0;
    const title = (c.title || '').replace(/\s/g, '');
    if (title.length >= 4) {
      for (let n = Math.min(title.length, 10); n >= 4; n--) {
        if (q.includes(title.slice(0, n))) {
          s = Math.max(s, n);
          break;
        }
      }
    }
    for (const tag of c.tags || []) {
      const t = String(tag).replace(/\s/g, '');
      if (t.length >= 3 && q.includes(t)) s += 3;
    }
    return { c, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, limit).map((x) => x.c);
}

/** 第1項が選ばれた場合、同条の第2項を取得（チャンク用の周辺知識） */
function getParagraph2ForChunk(
  firstStatute: { title: string; content: string } | null,
  all: Array<{ title: string; content: string }>
): { title: string; content: string } | null {
  if (!firstStatute) return null;
  const title = firstStatute.title || '';
  if (!/第1項|第１項/.test(title)) return null;
  const articleMatch = title.match(/^(第[十百千〇一二三四五六七八九十\d]+条)/);
  if (!articleMatch) return null;
  const article = articleMatch[1];
  return all.find(
    (st) =>
      (st.title || '').startsWith(article) &&
      /第[2２]項/.test(st.title || '') &&
      !/第[2２]項\s*[一二三四五六七八九十]/.test(st.title || '')
  ) || null;
}

const GEMINI_API_KEY = (typeof Constants?.expoConfig?.extra !== 'undefined' && (Constants.expoConfig.extra as any)?.geminiApiKey) || (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_GEMINI_API_KEY) || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';

/** 記述式: 模範解答とユーザー解答が「近い」か（正解とするか） */
function isDescriptiveAnswerSimilar(modelAnswer: string, userAnswer: string): boolean {
  const norm = (s: string) =>
    (s || '')
      .trim()
      // 空白・句読点・かっこ類を除去して、文字レベルで比較しやすくする
      .replace(/[\s。、．，,.「」『』【】［］()（）]/g, '');

  const m = norm(modelAnswer);
  const u = norm(userAnswer);
  if (!m || !u) return false;
  if (m === u) return true;
  if (u.includes(m) || m.includes(u)) return true;

  // 文字単位の重なり度合いで判定（短いフレーズに対して少し甘め）
  const shorter = m.length <= u.length ? m : u;
  const longer = m.length <= u.length ? u : m;
  let hit = 0;
  for (const ch of new Set(shorter.split(''))) {
    if (longer.includes(ch)) hit++;
  }
  const ratio = hit / shorter.length;
  return ratio >= 0.7;
}

export default function ResultScreen() {
  const params = useLocalSearchParams<{
    subject?: string;
    pickedIndex?: string;
    pickedIndices?: string; // NEW: JSON string of selected indices
    pickedText?: string; // 記述式の解答文
    pickedSlots?: string; // 多肢選択の穴埋め解答 JSON ["アの解答","イの解答",...]
    isReorder?: string; // 並べ替え問題: 1
    isDescriptiveScope?: string; // 記述スコープで回答した: 1
    modelAnswer?: string; // 記述スコープ時の模範解答（択一の正解肢など）
    field?: string;
    questionIndex?: string; // Current question index
    totalQuestions?: string; // NEW
    correctCountSession?: string; // NEW
    wrongCounts?: string; // JSON: { "0": 1, "2": 2 } 問題インデックス→間違えた回数
    mode?: string; // 'bonus' など
    shuffle?: string;
  }>();
  const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const paramField = Array.isArray(params.field) ? params.field[0] : params.field;
  const pickedIndexParam = Array.isArray(params.pickedIndex) ? params.pickedIndex[0] : params.pickedIndex;
  const pickedIndicesParam = Array.isArray(params.pickedIndices) ? params.pickedIndices[0] : params.pickedIndices;
  const pickedTextParam = Array.isArray(params.pickedText) ? params.pickedText[0] : params.pickedText;
  const pickedSlotsParam = Array.isArray(params.pickedSlots) ? params.pickedSlots[0] : params.pickedSlots;
  const isDescriptiveScopeParam = Array.isArray(params.isDescriptiveScope) ? params.isDescriptiveScope[0] : params.isDescriptiveScope;
  const modelAnswerParam = Array.isArray(params.modelAnswer) ? params.modelAnswer[0] : params.modelAnswer;
  const field = Array.isArray(params.field) ? params.field[0] : params.field;
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  const isShishoMode = mode === 'shisho';
  const shuffleParam = Array.isArray(params.shuffle) ? params.shuffle[0] : params.shuffle;

  let wrongCounts: Record<number, number> = {};
  try {
    const s = Array.isArray(params.wrongCounts) ? params.wrongCounts[0] : params.wrongCounts;
    if (s) wrongCounts = JSON.parse(s) || {};
  } catch (_) {}

  const isDescriptiveScope = isDescriptiveScopeParam === '1';
  const isDescriptive = subject === '記述' || isDescriptiveScope;
  const isTashi = subject === '多肢選択';
  const pickedText = pickedTextParam || '';
  let pickedSlots: string[] = [];
  try {
    pickedSlots = pickedSlotsParam ? JSON.parse(pickedSlotsParam) : [];
  } catch (_) {}

  const { colors, theme } = useTheme();
  const router = useRouter();
  const isMinpoSosokuQuizResult = subject === '民法' && field === '民法総則';

  // Calculate next index
  const questionIndex = params.questionIndex ? parseInt(Array.isArray(params.questionIndex) ? params.questionIndex[0] : params.questionIndex, 10) : 0;
  const nextIndex = questionIndex + 1;

  const [hiddenHashes, setHiddenHashes] = useState<Set<string>>(() => {
    if (subject && field) {
      const p = peekHiddenHashesSync(subject, field);
      if (p) return new Set(p);
    }
    return new Set();
  });

  useEffect(() => {
    if (!subject || !field) return;
    getHiddenHashes(subject, field).then(setHiddenHashes);
  }, [subject, field]);

  const questions = useMemo(() => {
    const subjectData = getMergedSubjectData(subject);
    const { targetQuestions } = pickQuestionsForField(subjectData, field);
    const filtered = filterQuizQuestionsByMode(targetQuestions, subject, mode);
    return filterHiddenFromQuestions(filtered, hiddenHashes, getQuestionTextHash);
  }, [subject, field, mode, hiddenHashes]);

  const question = questions[questionIndex] || null;
  const minpoBukkenResultFooterKeys = useMemo(() => {
    if (subject !== '民法' || field !== '民法物権') return [];
    return getResultFooterBukkenDeepdiveKeys(question);
  }, [subject, field, question]);
  const isReorder = params.isReorder === '1' || (question as any)?.isReorder;

  // Fallback or loading state if question not found (shouldn't happen with correct nav)
  if (!question) {
    // Handle error case below
  }

  const text = question?.text || '';
  const explain = question?.explain || '';
  const memo = question?.memo || '';
  const choices = question?.choices || [];
  const choiceStatuteRefs = (question as any)?.choiceStatuteRefs as string[] | undefined;
  const choiceDeepDive = (question as any)?.choiceDeepDive as string[] | undefined;
  const choiceDeepDiveBeginner = (question as any)?.choiceDeepDiveBeginner as string[] | undefined;
  const choiceDeepDivePeripheral = (question as any)?.choiceDeepDivePeripheral as string[] | undefined;
  /** 行政法総合など条文バンドル未設定の分野でも、M列・memo があれば解説・もっと深掘るを出す */
  const hasImportedQuizDeepDive =
    (!!memo && memo.trim().length > 0) ||
    (Array.isArray(choiceDeepDive) && choiceDeepDive.some((s) => (s || '').trim())) ||
    (Array.isArray(choiceDeepDiveBeginner) && choiceDeepDiveBeginner.some((s) => (s || '').trim()));
  const rawAnswer = Array.isArray(question?.answer) ? (question.answer as any[]) : [];
  const correctIndices: number[] = rawAnswer.length > 0 && typeof rawAnswer[0] === 'number' ? (rawAnswer as number[]) : [];
  const correctSlotsFromAnswer: string[] = rawAnswer.length > 0 && typeof rawAnswer[0] === 'string' ? (rawAnswer as string[]) : [];
  const hasUsableSlots = Array.isArray((question as any)?.slots) && (question as any).slots.some((s: any) => s?.options);
  const slotCountForCombo = Array.isArray((question as any)?.slots) ? (question as any).slots.length : 0;
  const correctSlotsFromChoice =
    correctSlotsFromAnswer.length === 0 &&
    hasUsableSlots &&
    correctIndices.length > 0 &&
    slotCountForCombo > 0 &&
    Array.isArray(choices)
      ? (() => {
          const idx = correctIndices[0];
          const line = typeof choices[idx] === 'string' ? choices[idx] : (choices[idx] as any)?.text ?? '';
          return splitComboChoiceLineToSlots(String(line), slotCountForCombo) ?? [];
        })()
      : [];
  const correctSlots = correctSlotsFromAnswer.length > 0 ? correctSlotsFromAnswer : correctSlotsFromChoice;
  const isSlotQuestion = !isDescriptive && (hasUsableSlots || pickedSlots.length > 0 || correctSlots.length > 0);
  const isSlotStyle = isTashi || isSlotQuestion;
  const refId = question?.refId || '';
  const choiceIsBonusArr = (question as any)?.choiceIsBonus as boolean[] | undefined;
  const isBonusChoice = (i: number) => (choiceIsBonusArr && i < choiceIsBonusArr.length ? choiceIsBonusArr[i] : !!(question as any).isBonus);
  const hasBonusChoices = choiceIsBonusArr ? choiceIsBonusArr.some((b: boolean) => b) : !!(question as any).isBonus;
  const hasNormalChoices = choiceIsBonusArr ? choiceIsBonusArr.some((b: boolean) => !b) : !(question as any).isBonus;
  const isMixedBonus = hasBonusChoices && hasNormalChoices;

  let effectiveCorrectIndices = correctIndices;
  if (!isSlotStyle && correctIndices.length > 0) {
    if (mode !== 'bonus') {
      // 通常モード: ※付き肢は出題から除外 → 正解判定からも除外
      effectiveCorrectIndices = correctIndices.filter((i) => !isBonusChoice(i));
    } else if (!isReorder && !isMixedBonus) {
      // ボーナス専用問題（並べ替え以外）: ※付き肢だけを正解として扱う
      effectiveCorrectIndices = correctIndices.filter((i) => isBonusChoice(i));
    } else if (isReorder && mode === 'bonus') {
      effectiveCorrectIndices = correctIndices.filter((i) => isBonusChoice(i));
    }
  }

  const modelAnswerFromQuestion = (question as any)?.modelAnswer as string | undefined;
  const modelAnswerFromCorrectChoice =
    isDescriptiveScope && question && Array.isArray(question.choices) && Array.isArray(question.answer)
      ? (question.answer as number[]).map((i: number) => question.choices[i]).filter(Boolean).join(' / ')
      : '';
  const modelAnswer = isDescriptiveScope ? (modelAnswerParam || modelAnswerFromCorrectChoice) : modelAnswerFromQuestion;
  const hasDescriptiveModel = isDescriptive && !!modelAnswer;
  const isCorrectDescriptive = hasDescriptiveModel && isDescriptiveAnswerSimilar(modelAnswer, pickedText);

  // 条文バンドル＋肢ごとの自動照合は O(条文数×肢数) が重い。メモ入力等の再レンダーで毎回走らせない
  const statuteItemsRaw = useMemo(() => {
    const statutesKey =
      subject === '行政法' && field ? FIELD_TO_STATUTES_KEY[field]
      : subject === '民法' && field ? CIVIL_FIELD_TO_STATUTES_KEY[field]
      : subject === '多肢選択' && field ? TASHI_FIELD_TO_STATUTES_KEY[field]
      : subject === '商法・会社法' ? 'sho_kai'
      : null;
    let raw: Array<{ title: string; content: string }> = [];
    if (statutesKey && (STATUTES as any)[statutesKey]) {
      raw = [...((STATUTES as any)[statutesKey] as Array<{ title: string; content: string }>)];
      if (subject === '民法' && field === '民法総則' && (STATUTES as any)['minpo_kazoku']) {
        raw = [...raw, ...((STATUTES as any)['minpo_kazoku'] as Array<{ title: string; content: string }>)];
      }
      if (subject === '民法' && field === '民法総則' && (STATUTES as any)['minpo_bukken']) {
        raw = [...raw, ...((STATUTES as any)['minpo_bukken'] as Array<{ title: string; content: string }>)];
      }
      if (subject === '民法' && field === '民法物権' && (STATUTES as any)['minpo_sosoku']) {
        raw = [...raw, ...((STATUTES as any)['minpo_sosoku'] as Array<{ title: string; content: string }>)];
      }
      if (subject === '民法' && field === '民法総則') {
        if ((STATUTES as any)['minpo_saiken_soron']) {
          raw = [...raw, ...((STATUTES as any)['minpo_saiken_soron'] as Array<{ title: string; content: string }>)];
        }
        if ((STATUTES as any)['minpo_saiken_kakuron']) {
          raw = [...raw, ...((STATUTES as any)['minpo_saiken_kakuron'] as Array<{ title: string; content: string }>)];
        }
      }
    }
    return raw;
  }, [subject, field]);

  const statuteItems = useMemo(
    () =>
      statuteItemsRaw.length > 0 ? pickAutoRelatedStatutes(statuteItemsRaw, text, 5) : [],
    [statuteItemsRaw, text]
  );

  const { choiceStatutes, choicePinCasesAuto } = useMemo(() => {
    const emptyS: Array<Array<{ title: string; content: string }>> = [];
    const emptyP: PinCase[][] = [];
    const ch = question && Array.isArray((question as any).choices) ? ((question as any).choices as string[]) : [];
    if (
      !question ||
      statuteItemsRaw.length === 0 ||
      ch.length === 0 ||
      !(subject === '行政法' || subject === '民法' || subject === '多肢選択' || subject === '商法・会社法')
    ) {
      return { choiceStatutes: emptyS, choicePinCasesAuto: emptyP };
    }
    const choiceStatuteRefs = (question as any)?.choiceStatuteRefs as string[] | undefined;
    const choiceDeepDive = (question as any)?.choiceDeepDive as string[] | undefined;
    const choiceDeepDiveBeginner = (question as any)?.choiceDeepDiveBeginner as string[] | undefined;
    const choiceExplanationsEarly = (question as any)?.choiceExplanations as string[] | undefined;
    const outS: Array<Array<{ title: string; content: string }>> = [];
    const outP: PinCase[][] = [];
    for (let i = 0; i < ch.length; i++) {
      const ref = choiceStatuteRefs?.[i]?.trim();
      const c = ch[i] || '';
      const expl = choiceExplanationsEarly?.[i] ?? '';
      const deep = choiceDeepDive?.[i] ?? '';
      const deepBeg = choiceDeepDiveBeginner?.[i] ?? '';
      const bundle = `${text}\n${c}\n${expl}\n${deep}\n${deepBeg}`;
      if (ref) {
        const found = findStatutesByRef(statuteItemsRaw, ref);
        outS.push(found.length > 0 ? found : []);
        outP.push([]);
        continue;
      }
      outS.push(pickAutoRelatedStatutes(statuteItemsRaw, bundle, 1));
      outP.push(pickRelatedPinCases(bundle, 2));
    }
    return { choiceStatutes: outS, choicePinCasesAuto: outP };
  }, [statuteItemsRaw, question, subject, text]);

  /** 問題を解くモード結果画面: 根拠条文はM列（深掘り）に寄せるため一旦非表示 */
  const hideStatutesOnResult = true;
  /** 行政手続法・地方自治法: 結果画面の関連判例（自動）を非表示 */
  const hideGyotePinCasesAuto =
    subject === '行政法' && (field === '行政手続法' || field === '地方自治法');

  // [NEW] Resolve User Selection & Validation
  const pickedIndex = pickedIndexParam ? parseInt(pickedIndexParam, 10) : -1;
  let userSelection: number[] = [];

  if (pickedIndicesParam) {
    try {
      userSelection = JSON.parse(pickedIndicesParam);
    } catch (e) {
      userSelection = (pickedIndex !== -1) ? [pickedIndex] : [];
    }
  } else {
    userSelection = (pickedIndex !== -1) ? [pickedIndex] : [];
  }

  const answerPending = isSlotStyle ? correctSlots.length === 0 : effectiveCorrectIndices.length === 0;

  // Exact Match Validation
  const sortedCorrect = [...effectiveCorrectIndices].sort((a, b) => a - b);
  const sortedUser = [...userSelection].sort((a, b) => a - b);
  const isCorrectSlots =
    !answerPending &&
    correctSlots.length === pickedSlots.length &&
    correctSlots.every((v, i) => normalizeSlotAnswerForCompare(v) === normalizeSlotAnswerForCompare(pickedSlots[i] || ''));
  const isCorrectReorder = isReorder && !answerPending && effectiveCorrectIndices.length === userSelection.length && effectiveCorrectIndices.every((v, i) => v === userSelection[i]);
  const isCorrect = isDescriptive && hasDescriptiveModel
    ? isCorrectDescriptive
    : isSlotStyle
      ? isCorrectSlots
      : isReorder
        ? isCorrectReorder
        : !answerPending && sortedCorrect.length === sortedUser.length && sortedCorrect.every((val, index) => val === sortedUser[index]);

  const stripR = (s: string) => (s || '').replace(/[\(（]\s*[rｒ]\s*[\)）]/gi, '').trim();
  type AnswerItem = { prefix: string; text: string };
  const correctAnswersItems: AnswerItem[] = isSlotStyle
    ? correctSlots.map((s, i) => ({ prefix: `${i + 1}. `, text: s }))
    : isReorder
      ? effectiveCorrectIndices.map((i: number, pos: number) => ({ prefix: `${pos + 1}. `, text: (choices[i] || '').replace(/※/g, '') }))
      : effectiveCorrectIndices.map((i: number) => ({ prefix: `${i + 1}. `, text: stripR((choices[i] || '').replace(/※/g, '')) }));
  // Memo State
  const [userMemo, setUserMemo] = useState('');
  const [expandedChoiceIndex, setExpandedChoiceIndex] = useState<number | null>(null);

  // 記述式: AI部分点・分析
  const [aiGradeLoading, setAiGradeLoading] = useState(false);
  const [aiGradeResult, setAiGradeResult] = useState<GradeDescriptiveResult | null>(null);
  const [aiGradeError, setAiGradeError] = useState<string | null>(null);
  const requestAiGrade = useCallback(async () => {
    if (!modelAnswer || !pickedText || !GEMINI_API_KEY) {
      setAiGradeError(GEMINI_API_KEY ? '' : 'APIキー未設定。.env に EXPO_PUBLIC_GEMINI_API_KEY または app.config の extra.geminiApiKey を設定してください。');
      return;
    }
    setAiGradeError(null);
    setAiGradeResult(null);
    setAiGradeLoading(true);
    try {
      const result = await gradeDescriptiveAnswer(GEMINI_API_KEY, {
        problemText: text,
        modelAnswer,
        userAnswer: pickedText,
      });
      setAiGradeResult(result);
    } catch (e: any) {
      setAiGradeError(e?.message || 'AI採点に失敗しました。');
    } finally {
      setAiGradeLoading(false);
    }
  }, [text, modelAnswer, pickedText]);

  // Resources State
  // GUARD: RESOURCES might be undefined
  const resourcesData = (RESOURCES as any) || {};
  const resourcePages = (refId && resourcesData[refId] ? resourcesData[refId] : []) as any[];

  // Check for Pinned Case
  const linkedCase = refId ? PIN_CASES.find(c => c.id === refId) : null;

  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [resourcePage, setResourcePage] = useState(0);
  const currentResource = resourcePages.length > 0 && resourcePage < resourcePages.length ? resourcePages[resourcePage] : null;

  // Reset page on open
  useEffect(() => {
    if (resourceModalVisible) setResourcePage(0);
  }, [resourceModalVisible]);

  // 正答率を永続化（回答設定中はスキップ。師匠モードは試験用統計に含めない）
  useEffect(() => {
    if (!answerPending && subject && field && text && !isShishoMode) {
      updateQuestionStats(subject, field, text, isCorrect);
    }
  }, [answerPending, subject, field, text, isCorrect, isShishoMode]);

  // unique key for user memo: user + simple hash of question text
  useEffect(() => {
    if (Platform.OS === 'web' && text) {
      const user = localStorage.getItem(USER_KEY) || 'guest';
      // Simple hash for text to avoid massive keys
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
      }
      const key = `memo_${user}_${hash}`;

      const saved = localStorage.getItem(key);
      if (saved) setUserMemo(saved);
    }
  }, [text]);

  const saveUserMemo = (val: string) => {
    setUserMemo(val);
    if (Platform.OS === 'web' && text) {
      const user = localStorage.getItem(USER_KEY) || 'guest';
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
      }
      const key = `memo_${user}_${hash}`;
      localStorage.setItem(key, val);
    }
  };

  if (!subject || !field || !question) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">結果を表示できません</ThemedText>
        <ThemedText>科目一覧から選択し直してください。</ThemedText>
        <Link href="/" asChild>
          <Pressable style={styles.nextButton}>
            <ThemedText type="defaultSemiBold">科目一覧へ</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    );
  }

  // Calculate Points & Session Progress
  const totalQuestions = parseInt(Array.isArray(params.totalQuestions) ? params.totalQuestions[0] : params.totalQuestions || '0', 10);
  const correctCountSessionCurrent = parseInt(Array.isArray(params.correctCountSession) ? params.correctCountSession[0] : params.correctCountSession || '0', 10);

  // Update count（回答設定中の問題はカウント対象外。師匠モードはセッション正解数も進めない）
  const newCorrectCount =
    isShishoMode
      ? correctCountSessionCurrent
      : (isCorrect && (!answerPending || (isDescriptive && hasDescriptiveModel)))
        ? correctCountSessionCurrent + 1
        : correctCountSessionCurrent;

  // 間違えた場合、wrongCounts を更新（1回=黄、2回以上=赤でサイドバー表示）
  const updatedWrongCounts: Record<number, number> = { ...wrongCounts };
  if (!isCorrect && !answerPending && !isShishoMode) {
    updatedWrongCounts[questionIndex] = (wrongCounts[questionIndex] || 0) + 1;
  }

  const handleNext = () => {
    // Check if we are looping (Index + 1 >= Total)
    if (totalQuestions > 0 && nextIndex >= totalQuestions) {
      if (isShishoMode) {
        alert('このラウンドおつかれさまでした。論点を口に出して整理できていれば十分です。');
        return;
      }
      // Session Complete
      let added = 1; // +1 Base
      let message = '1科目完了！ +1ポイント';

      if (newCorrectCount === totalQuestions) {
        added += 10;
        message = '全問正解！！ +11ポイント (完了1 + ボーナス10)';
      }

      // [NEW] Increment Loop Count
      incrementLoopCount(subject, field || '');

      addPoints(added);
      alert(message);
    }
  };

  const getResourceTitle = () => {
    if (!currentResource) return '資料';
    if (currentResource.type === 'article') {
      return '関連条文';
    }
    if (currentResource.targetChoice) {
      return `${currentResource.targetChoice}の資料`;
    }
    return currentResource.title || '資料';
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={{ color: colors.text, fontFamily: theme === 'paper' ? 'serif' : undefined }}>{subject} - {field}</ThemedText>

        {((isDescriptive && !hasDescriptiveModel) || !(isDescriptive && hasDescriptiveModel ? isCorrectDescriptive : isCorrect)) && (
        <ThemedView style={{ marginBottom: 16 }}>
          <ThemedText style={{ marginBottom: 8, color: colors.subText }}>あなたの回答:</ThemedText>
            {isSlotStyle && pickedSlots.length > 0 ? (
              <ThemedView style={[styles.descriptiveAnswerBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                {pickedSlots.map((s, i) => (
                  <ThemedText key={i} style={{ fontSize: 16, color: colors.text, lineHeight: 24, marginBottom: 4 }}>
                    {i + 1}: {s}
                  </ThemedText>
                ))}
              </ThemedView>
            ) : isDescriptive && pickedText ? (
              <ThemedView style={[styles.descriptiveAnswerBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                <ThemedText style={{ fontSize: 16, color: colors.text, lineHeight: 24 }}>{pickedText}</ThemedText>
              </ThemedView>
            ) : (
              userSelection.map((idx) => (
            <Pressable key={idx} style={[
              styles.choiceButton,
              styles.choiceButtonDisabled,
              { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder, marginBottom: 8 }
            ]}>
                  <ThemedText style={{ fontSize: 16, color: colors.text, textAlign: 'left', alignSelf: 'stretch' }}>
                {choices[idx] ? choices[idx].replace(/※/g, '') : ''}
              </ThemedText>
            </Pressable>
              ))
            )}
        </ThemedView>
        )}
        {isDescriptive && !hasDescriptiveModel ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#E3F2FD', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#2196F3', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#1565C0', fontSize: 20 }}>📝 記述式{isDescriptiveScope ? '（記述スコープ）' : ''}</ThemedText>
            <ThemedText style={{ color: '#0D47A1', marginTop: 4 }}>解説を読んで自分の解答と照らし合わせてください。</ThemedText>
          </ThemedView>
        ) : isShishoMode && !answerPending ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#EDE7F6', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#7E57C2', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#4527A0', fontSize: 20 }}>🎓 師匠モード（参考）</ThemedText>
            <ThemedText style={{ color: colors.text, marginTop: 10, textAlign: 'center', lineHeight: 22 }}>
              {isCorrect
                ? '試験の正解肢と一致しました。弟子にどう説明するか、解説・もっと深掘りで抜けを確認しましょう。'
                : '試験の正解肢とは異なります。論点を言語化してから、解説で整理しましょう。'}
            </ThemedText>
          </ThemedView>
        ) : !isShishoMode && isDescriptive && hasDescriptiveModel ? (
          isCorrectDescriptive ? (
            <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！{isDescriptiveScope ? '（記述スコープ）' : ''}</ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={{ padding: 16, backgroundColor: '#FFEBEE', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#D32F2F', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#D32F2F', fontSize: 20 }}>不正解... 復習が必要だ！{isDescriptiveScope ? '（記述スコープ）' : ''}</ThemedText>
            </ThemedView>
          )
        ) : isSlotStyle && answerPending ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#FFF8E1', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#FFC107', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#F57F17', fontSize: 20 }}>⏳ 回答設定中</ThemedText>
            <ThemedText style={{ color: '#E65100', marginTop: 4 }}>正解はスプレッドシートで設定してください。</ThemedText>
          </ThemedView>
        ) : !isShishoMode && isSlotStyle ? (
          isCorrect ? (
            <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！</ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={{ padding: 16, backgroundColor: '#FFEBEE', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#D32F2F', alignItems: 'center' }}>
              <ThemedText type="title" style={{ color: '#D32F2F', fontSize: 20 }}>不正解... 復習が必要だ！</ThemedText>
            </ThemedView>
          )
        ) : answerPending ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#FFF8E1', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#FFC107', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#F57F17', fontSize: 20 }}>⏳ 回答設定中</ThemedText>
            <ThemedText style={{ color: '#E65100', marginTop: 4 }}>この問題の正解はまだ設定されていません。後日更新されます。</ThemedText>
          </ThemedView>
        ) : !isShishoMode && isCorrect ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！</ThemedText>
            <ThemedText style={{ color: '#1B5E20', marginTop: 4, fontWeight: 'bold' }}>その調子だ！この知識を確実に定着させろ！</ThemedText>
          </ThemedView>
        ) : !isShishoMode ? (
          <ThemedText type="subtitle" style={{ color: '#D32F2F', marginBottom: 8 }}>不正解... 復習が必要だ！</ThemedText>
        ) : null}
        <View style={styles.questionAnswerOuterCard}>
          <ThemedText style={[styles.questionLabel, { color: colors.text }]}>問題文</ThemedText>
          <View style={styles.questionCard}>
            {(() => {
              const { prefix: numPrefix, body: questionBody } = splitNumberPrefix(text);
              const displayNum = hasNumberPrefix(text) ? numPrefix : getChoicePrefix(questionIndex);
              const displayBody = hasNumberPrefix(text) ? questionBody : text;
              return (
                <>
                  {displayNum ? (
                    <View style={[styles.questionNumBadge, { backgroundColor: '#E0E0E0', marginBottom: 8, borderWidth: 2, borderColor: colors.choiceBorder }]}>
                      <ThemedText style={styles.questionNumBadgeText}>{displayNum}</ThemedText>
                    </View>
                  ) : null}
                  {displayBody ? (
                    (/^\*\*|\[\[red:/.test(displayBody)
                      ? <MarkdownText text={displayBody} style={[styles.questionText, { color: '#212121', fontFamily: theme === 'paper' ? 'serif' : undefined, marginTop: 6 }]} />
                      : <ThemedText style={[styles.questionText, { color: '#212121', fontFamily: theme === 'paper' ? 'serif' : undefined, fontWeight: 'bold', marginTop: 6 }]}>{displayBody.split(/\n/).map(ln => formatNumberedClauses(ln)).join('\n')}</ThemedText>
                    )
                  ) : null}
                </>
              );
            })()}
          </View>
          {!isDescriptive && !answerPending && correctAnswersItems.length > 0 && (
            <View style={styles.correctAnswersBlock}>
              <ThemedText style={[styles.answerText, { color: '#C62828', fontWeight: 'bold' }]}>正解肢</ThemedText>
              {correctAnswersItems.map((item, idx) => (
                <ThemedView key={idx} style={[styles.correctAnswerCard, { borderColor: '#E57373', backgroundColor: theme === 'dark' ? 'rgba(198,40,40,0.2)' : '#FFEBEE' }]}>
                  <View style={styles.correctAnswerRow}>
                    <ThemedText style={[styles.correctAnswerPrefix, { color: colors.text }]}>{item.prefix}</ThemedText>
                    <ThemedText style={[styles.answerText, styles.correctAnswerBody, { color: colors.text }]}>{formatNumberedClauses(item.text)}</ThemedText>
                  </View>
                </ThemedView>
              ))}
            </View>
          )}
        </View>

        {subject === '行政法' && field === '行政事件訴訟法' && !isDescriptive
          ? (() => {
              const kousokuFigure = getDeepdiveImageSource('gyouseihou/gyouso/karinosasitome-jyunnyou');
              return kousokuFigure ? (
                <ThemedView style={{ marginBottom: 16 }}>
                  <ThemedText style={[styles.choiceStatuteTitle, { color: colors.text, marginBottom: 10 }]}>
                    参考図（行訴法25条〜33条ほか・仮の差止め関連）
                  </ThemedText>
                  <Image
                    source={kousokuFigure}
                    style={{ width: '100%', maxHeight: 520, borderRadius: 12 }}
                    resizeMode="contain"
                  />
                </ThemedView>
              ) : null;
            })()
          : null}

        {/* 行政法・民法・多肢選択・商法・会社法: 根拠条文・もっと深掘る（M列）。条文データが無くても M列/memo があれば表示（行政法総合など） */}
        {(subject === '行政法' || subject === '民法' || subject === '多肢選択' || subject === '商法・会社法') &&
          (statuteItemsRaw.length > 0 || hasImportedQuizDeepDive) &&
          choices.length > 0 &&
          (() => {
          // 穴埋め問題: 同じ条文が繰り返すので1つだけ表示
          if (isSlotStyle) {
            return (
              <ThemedView style={[styles.choiceStatuteBlock, styles.choiceStatuteCard]}>
                <ThemedText style={[styles.choiceStatuteTitle, { color: colors.text, marginBottom: 10 }]}>解説</ThemedText>
                {statuteItems.length > 0 && !hideStatutesOnResult ? (
                  statuteItems.map((item, idx) => (
                    <ThemedView key={idx} style={styles.choiceStatuteArticle}>
                      {(item.title || item.content) ? (
                        <ThemedText style={[styles.choiceStatuteArticleTitle, { color: colors.text }]}>
                          {getStatuteDisplayTitle(item, statuteItemsRaw)}
                        </ThemedText>
                      ) : null}
                      {item.content ? (
                        <MarkdownText
                          text={subject === '民法' ? formatStatuteReferenceForMarkdown(item.content) : item.content}
                          style={{ fontSize: 17, lineHeight: 26, fontWeight: '500' }}
                          uniformWeight={subject !== '民法'}
                        />
                      ) : null}
                    </ThemedView>
                  ))
                ) : null}
                {memo.trim() ? (
                  <View style={{ marginTop: 12 }}>
                    <Pressable
                      onPress={() => {
                        setDeepdiveParams(memo.trim(), '', {
                          choiceCorrect: null,
                          quizSubject: subject,
                          quizField: field,
                        });
                        router.push({
                          pathname: '/deepdive',
                          params: { choiceLabel: '' },
                        });
                      }}
                      style={[styles.deepDiveButton, { borderColor: colors.primary, alignSelf: 'flex-start' }]}
                    >
                      <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                        📖 もっと深掘る
                      </ThemedText>
                    </Pressable>
                  </View>
                ) : null}
              </ThemedView>
            );
          }
          const visibleIndices = mode === 'bonus'
            ? choices.map((_, i) => i)
            : choices.map((_, i) => i).filter((i) => !isBonusChoice(i));
          if (visibleIndices.length === 0) return null;
          const choiceChunkImgs = (question as any)?.choiceChunkImages as string[] | undefined;
          const simpleChunkImages = [...new Set(
            (choiceChunkImgs || [])
              .map((p, i) => (visibleIndices.includes(i) && isSimpleChunkImage(p) ? p.trim() : ''))
              .filter(Boolean)
          )].map((p) => ({ path: p, source: getChunkImageSource(p) })).filter((x) => x.source);
          const qIdx = parseInt(String(questionIndex), 10);
          const fallbackSousoku78 = simpleChunkImages.length === 0 && subject === '民法' && field === '民法総則' && (qIdx === 6 || qIdx === 7)
            ? getChunkImageSource('sousoku7,8') || getChunkImageSource('minnpou/sousoku/sousoku7,8')
            : null;
          const footerImages = fallbackSousoku78
            ? [{ path: 'sousoku7,8', source: fallbackSousoku78 }]
            : simpleChunkImages;
          const deepByVisible = visibleIndices.map((i) => (choiceDeepDive?.[i] ?? '').trim());
          const begByVisible = visibleIndices.map((i) => (choiceDeepDiveBeginner?.[i] ?? '').trim());
          const perByVisible = visibleIndices.map((i) => (choiceDeepDivePeripheral?.[i] ?? '').trim());
          const consolidateDeepDive =
            visibleIndices.length >= 2 &&
            (deepByVisible[0] ?? '').length > 0 &&
            deepByVisible.every((d) => d === deepByVisible[0]) &&
            begByVisible.every((b) => b === begByVisible[0]);
          const consolidatePeripheral =
            consolidateDeepDive &&
            (perByVisible[0] ?? '').length > 0 &&
            perByVisible.every((p) => p === perByVisible[0]);
          const consolidatedDeepContent = consolidateDeepDive ? deepByVisible[0] : '';
          const consolidatedDeepBeginner = consolidateDeepDive ? begByVisible[0] : '';
          const consolidatedPeripheral = consolidatePeripheral ? perByVisible[0] : '';
          return (
          <>
          <ThemedView style={[styles.choiceStatuteBlock, { borderColor: colors.choiceBorder }]}>
            <ThemedText style={[styles.choiceStatuteTitle, { color: colors.text, marginBottom: 10 }]}>
              解説{mode === 'bonus' ? '（ボーナス肢含む）' : ''}
            </ThemedText>
            {visibleIndices.map((choiceIdx, gi) => {
              const label = `${choiceIdx + 1}. `;
              const choiceText = (choices[choiceIdx] || '').replace(/※/g, '');
              const formattedBody = formatNumberedClauses(choiceText);
              const choiceExpls = (question as any)?.choiceExplanations as string[] | undefined;
              const explText = choiceExpls?.[choiceIdx] ?? '';
              const statutes = choiceStatutes[choiceIdx] || [];
              const deepContent = choiceDeepDive?.[choiceIdx]?.trim();
              const deepBeginner = choiceDeepDiveBeginner?.[choiceIdx]?.trim();
              const deepPeripheral = choiceDeepDivePeripheral?.[choiceIdx]?.trim();
              return (
                <View key={gi} style={[styles.choiceStatuteItem, styles.choiceStatuteCard]}>
                  <View style={styles.choiceStatuteNumRow}>
                    <ThemedText style={[styles.choiceStatuteChoice, { color: colors.text }]}>
                      {label}
                    </ThemedText>
                    <ThemedText style={[styles.choiceStatuteChoiceBody, { color: colors.text }]} numberOfLines={3}>
                      {choiceText ? formattedBody : '—'}
                    </ThemedText>
                  </View>
                  {explText ? (
                    <View style={{ marginBottom: 8 }}>
                      <MarkdownText
                        text={
                          subject === '民法' && looksLikeMergedStatuteBlock(explText)
                            ? formatStatuteReferenceForMarkdown(explText)
                            : explText
                        }
                        style={{ fontSize: 15, lineHeight: 22 }}
                        uniformWeight={!(subject === '民法' && looksLikeMergedStatuteBlock(explText))}
                      />
                    </View>
                  ) : null}
                  {!hideStatutesOnResult ? (
                    <ThemedText style={[styles.choiceStatuteLabel, { color: colors.subText }]}>
                      根拠条文
                    </ThemedText>
                  ) : null}
                  {!hideStatutesOnResult && statutes.length > 0 ? (
                    <>
                      {statutes.map((statute, si) => (
                        <View key={si} style={styles.choiceStatuteArticle}>
                          {(statute.title || statute.content) ? (
                            <ThemedText style={[styles.choiceStatuteArticleTitle, { color: colors.text }]}>
                              {getStatuteDisplayTitle(statute, statuteItemsRaw, statutes)}
                            </ThemedText>
                          ) : null}
                          {statute.content ? (
                            <MarkdownText
                              text={
                                subject === '民法'
                                  ? formatStatuteReferenceForMarkdown(statute.content)
                                  : statute.content
                              }
                              style={{ fontSize: 17, lineHeight: 26, fontWeight: '500' }}
                              uniformWeight={subject !== '民法'}
                            />
                          ) : null}
                        </View>
                      ))}
                      <View style={styles.keywordRow}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
                            {isMinpoSosokuQuizResult && (choiceStatuteRefs?.[choiceIdx] ?? '').trim() ? (
                              <Pressable
                                onPress={() => {
                                  const cl = `${label}${choiceText}`;
                                  openMinpoSosokuStatuteRefPage(
                                    router,
                                    choiceStatuteRefs![choiceIdx],
                                    cl,
                                    subject || '',
                                    field || ''
                                  );
                                }}
                                style={[styles.deepDiveButton, { borderColor: colors.subText }]}
                              >
                                <ThemedText style={[styles.deepDiveButtonText, { color: colors.text }]}>
                                  根拠条文
                                </ThemedText>
                              </Pressable>
                            ) : null}
                            {!consolidateDeepDive ? (
                            <Pressable
                              onPress={() => {
                                const choiceLabel = `${label}${choiceText}`;
                                setDeepdiveParams(deepContent || '', choiceLabel, {
                                  choiceCorrect: deepdiveChoiceLegallyCorrect(
                                    text,
                                    choiceIdx,
                                    effectiveCorrectIndices,
                                    answerPending,
                                    !!isReorder
                                  ),
                                  beginnerContent: deepBeginner || undefined,
                                  peripheralContent: deepPeripheral || undefined,
                                  quizSubject: subject,
                                  quizField: field,
                                });
                                router.push({
                                  pathname: '/deepdive',
                                  params: { choiceLabel },
                                });
                              }}
                              style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                            >
                              <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                                📖 もっと深掘る
                              </ThemedText>
                            </Pressable>
                            ) : null}
                            {(() => {
                              let chunkImg = (question as any)?.choiceChunkImages?.[choiceIdx] || '';
                              if (!chunkImg && subject === '民法' && field === '民法総則' && qIdx === 10 && /114条|催告/.test((statutes[0]?.title || '') + (statutes[0]?.content || '') + (choices[choiceIdx] || ''))) {
                                chunkImg = 'minnpou/sousoku/sousoku11-2';
                              }
                              if (!getChunkImageSource(chunkImg)) return null;
                              return (
                            <Pressable
                            onPress={() => {
                              const p2 = getParagraph2ForChunk(statutes[0], statuteItemsRaw);
                              const statuteContent = p2
                                ? `**${getStatuteDisplayTitle(p2, statuteItemsRaw)}**\n\n${p2.content || ''}`
                                : '';
                              router.push({
                                pathname: '/chunk',
                                params: {
                                  subject: subject || '',
                                  field: field || '',
                                  questionIndex: String(questionIndex),
                                  choiceIndex: String(choiceIdx),
                                  statuteTitle: getStatuteDisplayTitle(statutes[0], statuteItemsRaw),
                                  statuteContent,
                                  chunkImage: chunkImg,
                                  correctCountSession: String(correctCountSessionCurrent),
                                  wrongCounts: JSON.stringify(updatedWrongCounts),
                                  ...(mode ? { mode } : {}),
                                  ...(shuffleParam ? { shuffle: shuffleParam } : {}),
                                },
                              });
                            }}
                            hitSlop={12}
                            style={[styles.infinityPressable, { backgroundColor: '#D6EAF8' }]}
                          >
                            <View style={styles.chainMarkContainer}>
                              <Image
                                source={require('@/assets/images/chain-mark.png')}
                                style={styles.chainMarkImage}
                                resizeMode="contain"
                              />
                              <ThemedText style={[styles.chainMarkLabel, { color: colors.text }]}>チャンク</ThemedText>
                            </View>
                          </Pressable>
                              );
                            })()}
                          </View>
                      </View>
                    </>
                  ) : !hideStatutesOnResult ? (
                    <View>
                      {choiceStatuteRefs?.[choiceIdx]?.trim() ? (
                        <ThemedText style={[styles.choiceStatuteNote, { color: colors.subText }]}>
                          指定: {choiceStatuteRefs[choiceIdx]}
                        </ThemedText>
                      ) : null}
                      <View style={[styles.keywordRow, { marginTop: 8 }]}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        {isMinpoSosokuQuizResult && (choiceStatuteRefs?.[choiceIdx] ?? '').trim() ? (
                          <Pressable
                            onPress={() => {
                              const cl = `${label}${choiceText}`;
                              openMinpoSosokuStatuteRefPage(
                                router,
                                choiceStatuteRefs![choiceIdx],
                                cl,
                                subject || '',
                                field || ''
                              );
                            }}
                            style={[styles.deepDiveButton, { borderColor: colors.subText }]}
                          >
                            <ThemedText style={[styles.deepDiveButtonText, { color: colors.text }]}>
                              根拠条文
                            </ThemedText>
                          </Pressable>
                        ) : null}
                        {!consolidateDeepDive ? (
                        <Pressable
                          onPress={() => {
                            const choiceLabel = `${label}${choiceText}`;
                            setDeepdiveParams(deepContent || '', choiceLabel, {
                              choiceCorrect: deepdiveChoiceLegallyCorrect(
                                text,
                                choiceIdx,
                                effectiveCorrectIndices,
                                answerPending,
                                !!isReorder
                              ),
                              beginnerContent: deepBeginner || undefined,
                              peripheralContent: deepPeripheral || undefined,
                              quizSubject: subject,
                              quizField: field,
                            });
                            router.push({
                              pathname: '/deepdive',
                              params: { choiceLabel },
                            });
                          }}
                          style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                        >
                          <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                            📖 もっと深掘る
                          </ThemedText>
                        </Pressable>
                        ) : null}
                        {(() => {
                          let chunkImg = (question as any)?.choiceChunkImages?.[choiceIdx] || '';
                          const choiceTxt = (choices[choiceIdx] || '') + (explText || '');
                          if (!chunkImg && subject === '民法' && field === '民法総則' && /114条|催告/.test(choiceTxt)) {
                            chunkImg = 'minnpou/sousoku/sousoku11-2';
                          }
                          if (!getChunkImageSource(chunkImg)) return null;
                          return (
                            <Pressable
                              onPress={() => {
                                let chunkImg2 = (question as any)?.choiceChunkImages?.[choiceIdx] || '';
                                const choiceTxt2 = (choices[choiceIdx] || '') + (explText || '');
                                if (!chunkImg2 && subject === '民法' && field === '民法総則' && /114条|催告/.test(choiceTxt2)) {
                                  chunkImg2 = 'minnpou/sousoku/sousoku11-2';
                                }
                                const statuteTitleForChunk = /114条|催告/.test(choiceTxt2) ? '無権代理（114条）・催告に対する沈黙の効果' : '関連知識';
                                router.push({
                                  pathname: '/chunk',
                                  params: {
                                    subject: subject || '',
                                    field: field || '',
                                    questionIndex: String(questionIndex),
                                    choiceIndex: String(choiceIdx),
                                    statuteTitle: statuteTitleForChunk,
                                    statuteContent: '',
                                    chunkImage: chunkImg2,
                                    correctCountSession: String(correctCountSessionCurrent),
                                    wrongCounts: JSON.stringify(updatedWrongCounts),
                                    ...(mode ? { mode } : {}),
                                    ...(shuffleParam ? { shuffle: shuffleParam } : {}),
                                  },
                                });
                              }}
                              hitSlop={12}
                              style={[styles.infinityPressable, { backgroundColor: '#D6EAF8' }]}
                            >
                              <View style={styles.chainMarkContainer}>
                                <Image
                                  source={require('@/assets/images/chain-mark.png')}
                                  style={styles.chainMarkImage}
                                  resizeMode="contain"
                                />
                                <ThemedText style={[styles.chainMarkLabel, { color: colors.text }]}>チャンク</ThemedText>
                              </View>
                            </Pressable>
                          );
                        })()}
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.keywordRow, { marginTop: explText ? 8 : 0 }]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
                        {isMinpoSosokuQuizResult && (choiceStatuteRefs?.[choiceIdx] ?? '').trim() ? (
                          <Pressable
                            onPress={() => {
                              const cl = `${label}${choiceText}`;
                              openMinpoSosokuStatuteRefPage(
                                router,
                                choiceStatuteRefs![choiceIdx],
                                cl,
                                subject || '',
                                field || ''
                              );
                            }}
                            style={[styles.deepDiveButton, { borderColor: colors.subText }]}
                          >
                            <ThemedText style={[styles.deepDiveButtonText, { color: colors.text }]}>
                              根拠条文
                            </ThemedText>
                          </Pressable>
                        ) : null}
                        {!consolidateDeepDive ? (
                        <Pressable
                          onPress={() => {
                            const choiceLabel = `${label}${choiceText}`;
                            setDeepdiveParams(deepContent || '', choiceLabel, {
                              choiceCorrect: deepdiveChoiceLegallyCorrect(
                                text,
                                choiceIdx,
                                effectiveCorrectIndices,
                                answerPending,
                                !!isReorder
                              ),
                              beginnerContent: deepBeginner || undefined,
                              peripheralContent: deepPeripheral || undefined,
                              quizSubject: subject,
                              quizField: field,
                            });
                            router.push({
                              pathname: '/deepdive',
                              params: { choiceLabel },
                            });
                          }}
                          style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                        >
                          <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                            📖 もっと深掘る
                          </ThemedText>
                        </Pressable>
                        ) : null}
                        {(() => {
                          let chunkImg = (question as any)?.choiceChunkImages?.[choiceIdx] || '';
                          if (!chunkImg && subject === '民法' && field === '民法総則' && qIdx === 10 && /114条|催告/.test((statutes[0]?.title || '') + (statutes[0]?.content || '') + (choices[choiceIdx] || ''))) {
                            chunkImg = 'minnpou/sousoku/sousoku11-2';
                          }
                          if (!getChunkImageSource(chunkImg)) return null;
                          return (
                            <Pressable
                              onPress={() => {
                                const p2 = getParagraph2ForChunk(statutes[0], statuteItemsRaw);
                                const statuteContent = p2
                                  ? `**${getStatuteDisplayTitle(p2, statuteItemsRaw)}**\n\n${p2.content || ''}`
                                  : '';
                                router.push({
                                  pathname: '/chunk',
                                  params: {
                                    subject: subject || '',
                                    field: field || '',
                                    questionIndex: String(questionIndex),
                                    choiceIndex: String(choiceIdx),
                                    statuteTitle: getStatuteDisplayTitle(statutes[0], statuteItemsRaw),
                                    statuteContent,
                                    chunkImage: chunkImg,
                                    correctCountSession: String(correctCountSessionCurrent),
                                    wrongCounts: JSON.stringify(updatedWrongCounts),
                                    ...(mode ? { mode } : {}),
                                    ...(shuffleParam ? { shuffle: shuffleParam } : {}),
                                  },
                                });
                              }}
                              hitSlop={12}
                              style={[styles.infinityPressable, { backgroundColor: '#D6EAF8' }]}
                            >
                              <View style={styles.chainMarkContainer}>
                                <Image
                                  source={require('@/assets/images/chain-mark.png')}
                                  style={styles.chainMarkImage}
                                  resizeMode="contain"
                                />
                                <ThemedText style={[styles.chainMarkLabel, { color: colors.text }]}>チャンク</ThemedText>
                              </View>
                            </Pressable>
                          );
                        })()}
                      </View>
                    </View>
                  )}
                  {!hideGyotePinCasesAuto && (choicePinCasesAuto[choiceIdx] || []).length > 0 ? (
                    <View style={{ marginTop: 10 }}>
                      <ThemedText style={[styles.choiceStatuteLabel, { color: colors.subText }]}>
                        関連判例（自動）
                      </ThemedText>
                      {(choicePinCasesAuto[choiceIdx] || []).map((pc) => (
                        <Link key={pc.id} href={`/pin/${pc.category}/${pc.id}`} asChild>
                          <Pressable style={{ marginTop: 6, alignSelf: 'flex-start' }}>
                            <ThemedText style={{ color: colors.primary, fontSize: 15 }}>📌 {pc.title}</ThemedText>
                          </Pressable>
                        </Link>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
            {consolidateDeepDive ? (
              <View style={{ marginTop: 12, alignItems: 'flex-end' }}>
                <Pressable
                  onPress={() => {
                    setDeepdiveParams(consolidatedDeepContent, '', {
                      choiceCorrect: null,
                      beginnerContent: consolidatedDeepBeginner || undefined,
                      peripheralContent: consolidatedPeripheral || undefined,
                      quizSubject: subject,
                      quizField: field,
                    });
                    router.push({
                      pathname: '/deepdive',
                      params: { choiceLabel: '' },
                    });
                  }}
                  style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                >
                  <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                    📖 もっと深掘る
                  </ThemedText>
                </Pressable>
              </View>
            ) : null}
          </ThemedView>
            {footerImages.length > 0 ? (
              <View style={{ marginTop: 16, marginBottom: 16, paddingVertical: 12 }}>
                {footerImages.map(({ path, source }, fi) => (
                  <Image
                    key={path}
                    source={source}
                    style={{ width: '100%', maxHeight: 600, marginBottom: fi < footerImages.length - 1 ? 12 : 0 }}
                    resizeMode="contain"
                  />
                ))}
              </View>
            ) : null}
          </>
          );
        })()}
        {/* 多肢選択・穴埋め: 分野に条文マッピングが無い場合は memo から深掘りのみ */}
        {isTashi && isSlotStyle && !isDescriptive && statuteItemsRaw.length === 0 && memo.trim().length > 0 && (
          <ThemedView style={[styles.choiceStatuteBlock, styles.choiceStatuteCard]}>
            <ThemedText style={[styles.choiceStatuteTitle, { color: colors.text, marginBottom: 10 }]}>解説</ThemedText>
            <Pressable
              onPress={() => {
                setDeepdiveParams(memo.trim(), '', {
                  choiceCorrect: null,
                  quizSubject: subject,
                  quizField: field,
                });
                router.push({
                  pathname: '/deepdive',
                  params: { choiceLabel: '' },
                });
              }}
              style={[styles.deepDiveButton, { borderColor: colors.primary, alignSelf: 'flex-start' }]}
            >
              <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                📖 もっと深掘る
              </ThemedText>
            </Pressable>
          </ThemedView>
        )}
        {isDescriptive && hasDescriptiveModel && (
          <ThemedText style={[styles.answerText, { color: colors.text, marginTop: 8 }]}>模範解答: {modelAnswer}</ThemedText>
        )}

        {isDescriptive && hasDescriptiveModel && pickedText ? (
          <ThemedView style={{ marginTop: 16, marginBottom: 16 }}>
            {GEMINI_API_KEY ? (
              <>
                <Pressable
                  style={[styles.aiGradeButton, { backgroundColor: colors.primary, opacity: aiGradeLoading ? 0.7 : 1 }]}
                  onPress={requestAiGrade}
                  disabled={aiGradeLoading}
                >
                  {aiGradeLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.aiGradeButtonText}>🤖 AIで部分点・分析</ThemedText>
                  )}
                </Pressable>
                {aiGradeError ? (
                  <ThemedText style={{ color: '#D32F2F', marginTop: 8, fontSize: 14 }}>{aiGradeError}</ThemedText>
                ) : null}
                {aiGradeResult ? (
                  <ThemedView style={[styles.aiGradeBox, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                    <ThemedText style={[styles.aiGradeScore, { color: colors.text }]}>部分点: {aiGradeResult.score} 点</ThemedText>
                    <ThemedText style={[styles.aiGradeAnalysis, { color: colors.text }]}>分析:</ThemedText>
                    <MarkdownText text={aiGradeResult.analysis} />
                  </ThemedView>
                ) : null}
              </>
            ) : (
              <ThemedText style={{ color: colors.subText, fontSize: 14 }}>APIキーを設定すると「AIで部分点・分析」が使えます。</ThemedText>
            )}
          </ThemedView>
        ) : null}

        {isDescriptive ? (
          <ThemedView style={{ marginTop: 16, marginBottom: 8 }}>
            {(() => {
              const qNum = questionIndex + 1;
              const toFullWidth = (n: number) => String(n).replace(/\d/g, (c) => String.fromCharCode(0xFF10 + parseInt(c, 10)));
              const imgKey = field === '民法' ? `minnpou/ｋｊｍ${toFullWidth(qNum)}` : `gyouseihou/ｋｊ${toFullWidth(qNum)}`;
              const descImg = getDescriptiveImageSource(imgKey);
              return descImg ? (
                <Image
                  source={descImg}
                  style={{ width: '100%', maxHeight: 500, borderRadius: 12, marginBottom: 12 }}
                  resizeMode="contain"
                />
              ) : null;
            })()}
            {explain ? (
              <Pressable
                onPress={() => {
                  setDeepdiveParams(explain, '', {
                    choiceCorrect: answerPending ? null : isCorrectDescriptive,
                    quizSubject: subject,
                    quizField: field,
                  });
                  router.push({
                    pathname: '/deepdive',
                    params: { choiceLabel: '' },
                  });
                }}
                style={[styles.deepDiveButton, { borderColor: colors.primary, alignSelf: 'flex-start' }]}
              >
                <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                  📖 解説を見る
                </ThemedText>
              </Pressable>
            ) : null}
          </ThemedView>
        ) : null}
        <>
            {expandedChoiceIndex !== null ? (
              <View>
        <ThemedText type="subtitle" style={styles.explainTitle}>
          もっと深掘る！
        </ThemedText>
                {(() => {
                  const deepDiveContent = choiceDeepDive?.[expandedChoiceIndex]?.trim();
                  const deepDiveBeginner = choiceDeepDiveBeginner?.[expandedChoiceIndex]?.trim();
                  const deepDivePeripheral = choiceDeepDivePeripheral?.[expandedChoiceIndex]?.trim();
                  if (deepDiveContent || deepDiveBeginner) {
                    const choiceLabel = expandedChoiceIndex != null && choices[expandedChoiceIndex]
                      ? `${(expandedChoiceIndex + 1)}. ${(choices[expandedChoiceIndex] || '').replace(/※/g, '')}`
                      : '';
                    const expRef = expandedChoiceIndex != null ? (choiceStatuteRefs?.[expandedChoiceIndex] ?? '').trim() : '';
                    return (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', alignSelf: 'flex-start' }}>
                      {isMinpoSosokuQuizResult && expRef ? (
                        <Pressable
                          onPress={() => {
                            openMinpoSosokuStatuteRefPage(router, expRef, choiceLabel, subject || '', field || '');
                          }}
                          style={[styles.deepDiveButton, { borderColor: colors.subText }]}
                        >
                          <ThemedText style={[styles.deepDiveButtonText, { color: colors.text }]}>根拠条文</ThemedText>
                        </Pressable>
                      ) : null}
        <Pressable
                        onPress={() => {
                          setDeepdiveParams(deepDiveContent || '', choiceLabel, {
                            choiceCorrect:
                              expandedChoiceIndex == null || answerPending
                                ? null
                                : deepdiveChoiceLegallyCorrect(
                                    text,
                                    expandedChoiceIndex,
                                    effectiveCorrectIndices,
                                    answerPending,
                                    !!isReorder
                                  ),
                            beginnerContent: deepDiveBeginner || undefined,
                            peripheralContent: deepDivePeripheral || undefined,
                            quizSubject: subject,
                            quizField: field,
                          });
                          router.push({
                            pathname: '/deepdive',
                            params: { choiceLabel },
                          });
                        }}
                        style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                      >
                        <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                          📖 もっと深掘る（別ページで表示）
          </ThemedText>
        </Pressable>
                    </View>
                    );
                  }
                  return (
                    <>
                      {!hideStatutesOnResult && statuteItems.length > 0 ? (
                        <ThemedView style={[styles.statutesBlock, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                          <View style={styles.statutesBlockHeaderRow}>
                            <ThemedText style={[styles.statutesBlockLabelLeft, { color: colors.text }]}>根拠条文</ThemedText>
                            <ThemedText type="subtitle" style={[styles.statutesBlockTitle, { color: colors.text }]}>
                              📜 根拠条文
                            </ThemedText>
                          </View>
                          {statuteItems.map((item, idx) => (
                            <ThemedView key={idx} style={styles.statutesItem}>
                              {(item.title || item.content) ? (
                                <ThemedText style={[styles.statutesItemTitle, { color: colors.text }]}>
                                  {getStatuteDisplayTitle(item, statuteItemsRaw, statuteItems)}
                                </ThemedText>
                              ) : null}
                              {item.content ? <MarkdownText text={item.content} /> : null}
                            </ThemedView>
                          ))}
                        </ThemedView>
                      ) : null}
                      <MarkdownText text={explain || ''} />
                    </>
                  );
                })()}
              </View>
            ) : null}
            <View style={styles.retryExpandRow}>
              <Link
                href={{
                  pathname: '/question',
                  params: {
                    subject,
                    field,
                    index: questionIndex,
                    correctCountSession: String(correctCountSessionCurrent),
                    wrongCounts: JSON.stringify(updatedWrongCounts),
                    ...(mode ? { mode } : {}),
                    ...(shuffleParam ? { shuffle: shuffleParam } : {}),
                  },
                }}
                asChild
              >
                <Pressable
                  style={StyleSheet.flatten([
                    styles.retryButton,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.subText,
                      borderWidth: 1.5,
                    },
                  ])}
                >
                  <ThemedText type="defaultSemiBold" style={{ color: colors.subText, fontSize: 12 }}>
                    もう一度この問題を解く
                  </ThemedText>
                </Pressable>
              </Link>
            </View>
          </>

        {/* Resources Button */}
        {resourcePages.length > 0 && (
          <Pressable style={styles.resourceButton} onPress={() => setResourceModalVisible(true)}>
            <ThemedText style={styles.resourceButtonText}>
              {resourcePages[0]?.type === 'article' ? '関連条文を見る' : '資料を見る'} ({resourcePages.length})
            </ThemedText>
            <ThemedText style={styles.resourceButtonSubText}>
              {resourcePages[0]?.type === 'article' ? '※条文参照' : '※補足資料あり'}
            </ThemedText>
          </Pressable>
        )}

        {/* Case Diagram Button */}
        {linkedCase && (
          <Link href={`/pin/${linkedCase.category}/${linkedCase.id}`} asChild>
            <Pressable style={styles.caseButton}>
              <ThemedText style={styles.caseButtonText}>
                {linkedCase.category === 'kenpo' ? '📌 判例図解を見る' : '📌 詳細解説を見る'}
              </ThemedText>
              <ThemedText style={styles.resourceButtonSubText}>
                {linkedCase.category === 'kenpo' ? '※図解でわかりやすく解説' : '※表や図で整理して解説'}
              </ThemedText>
            </Pressable>
          </Link>
        )}

        {minpoBukkenResultFooterKeys.length > 0 ? (
          <View style={{ marginTop: 16, marginBottom: 4, width: '100%' }}>
            {minpoBukkenResultFooterKeys.map((key) => {
              const src = getDeepdiveImageSource(key);
              if (!src) return null;
              return (
                <Image
                  key={key}
                  source={src}
                  style={{ width: '100%', maxHeight: 560, marginBottom: 12 }}
                  resizeMode="contain"
                />
              );
            })}
          </View>
        ) : null}

        <Link href={{
          pathname: '/question',
          params: {
            subject,
            field,
            index: nextIndex,
            correctCountSession: String(newCorrectCount),
            wrongCounts: JSON.stringify(updatedWrongCounts),
            ...(mode ? { mode } : {}),
            ...(shuffleParam ? { shuffle: shuffleParam } : {}),
          }
        }} asChild>
          <Pressable
            style={StyleSheet.flatten([
              styles.nextButton,
              styles.nextButtonPrimary,
              { backgroundColor: colors.primary, borderColor: colors.primary, marginTop: 20 },
            ])}
            onPress={handleNext}
          >
            <ThemedText type="defaultSemiBold" style={{ color: '#fff', textAlign: 'center' }}>次の問題へ</ThemedText>
          </Pressable>
        </Link>

        <ThemedText type="subtitle" style={{ marginTop: 20 }}>My Memo (余白)</ThemedText>
        <TextInput
          style={styles.userMemoInput}
          multiline
          placeholder="ここに自分用のメモを残せます（他ユーザーには見えません）"
          value={userMemo}
          onChangeText={saveUserMemo}
        />

        <Link href="/subjects" replace asChild>
          <Pressable style={StyleSheet.flatten([styles.nextButton, { backgroundColor: '#fff', borderColor: '#5A9BD5', borderWidth: 2 }])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#5A9BD5', textAlign: 'center' }}>科目選択</ThemedText>
          </Pressable>
        </Link>
        <Link href="/" replace asChild>
          <Pressable style={StyleSheet.flatten([styles.nextButton, { backgroundColor: '#fff', borderColor: '#757575', borderWidth: 2 }])}>
            <ThemedText type="defaultSemiBold" style={{ color: '#757575', textAlign: 'center' }}>メインメニューへ</ThemedText>
          </Pressable>
        </Link>
        <View style={{ height: 40 }} />

        {/* Resource Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={resourceModalVisible}
          onRequestClose={() => setResourceModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ThemedText type="subtitle" style={[styles.modalTitle, currentResource?.type === 'article' && { textAlign: 'left' }]}>
                {getResourceTitle()}
                {resourcePages.length > 1 ? ` (${resourcePage + 1}/${resourcePages.length})` : ''}
              </ThemedText>

              {/* Question Context Header */}
              <ThemedText style={styles.modalContextText}>
                対象問題: {text ? (text.length > 30 ? text.substring(0, 30) + '...' : text) : ''}
              </ThemedText>

              <ScrollView style={{ maxHeight: '60%' }}>
                {currentResource?.imageUrl ? (
                  <Image
                    source={{ uri: currentResource.imageUrl }}
                    style={styles.resourceImage}
                    resizeMode="contain"
                  />
                ) : null}
                <ThemedText style={styles.modalBodyText}>{currentResource?.content}</ThemedText>
              </ScrollView>

              {/* Paging Controls */}
              {resourcePages.length > 1 && (
                <View style={styles.pagingContainer}>
                  <Pressable
                    style={[styles.pagingButton, resourcePage === 0 && styles.pagingButtonDisabled]}
                    onPress={() => setResourcePage(prev => Math.max(0, prev - 1))}
                    disabled={resourcePage === 0}
                  >
                    <ThemedText style={styles.pagingButtonText}>前へ</ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.pagingButton, resourcePage === resourcePages.length - 1 && styles.pagingButtonDisabled]}
                    onPress={() => setResourcePage(prev => Math.min(resourcePages.length - 1, prev + 1))}
                    disabled={resourcePage === resourcePages.length - 1}
                  >
                    <ThemedText style={styles.pagingButtonText}>次へ</ThemedText>
                  </Pressable>
                </View>
              )}

              <Pressable style={styles.modalCloseButton} onPress={() => setResourceModalVisible(false)}>
                <ThemedText style={{ color: '#fff' }}>閉じる</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 16,
  },
  questionNumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  questionNumBadgeText: {
    color: '#2D3748',
    fontSize: 24,
    fontWeight: '600',
  },
  questionText: {
    lineHeight: 28,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionAnswerOuterCard: {
    borderColor: '#424242',
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  questionCard: {
    backgroundColor: '#E0E0E0',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  answerText: {
    fontSize: 16,
  },
  correctAnswersBlock: {
    marginTop: 4,
  },
  correctAnswerCard: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1.5,
    borderRadius: 12,
  },
  correctAnswerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  correctAnswerPrefix: {
    fontSize: 16,
    minWidth: 36,
    flexShrink: 0,
  },
  correctAnswerBody: {
    flex: 1,
    marginTop: 0,
  },
  explainTitle: {
    marginTop: 8,
  },
  explainText: {
    lineHeight: 24,
  },
  statutesBlock: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  statutesBlockHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statutesBlockLabelLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 72,
  },
  statutesBlockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statutesItem: {
    marginBottom: 12,
  },
  statutesItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  choiceStatuteBlock: {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  choiceStatuteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  choiceStatuteLabelLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 72,
  },
  choiceStatuteTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  choiceStatuteItem: {
    marginBottom: 12,
  },
  choiceStatuteCard: {
    backgroundColor: '#D6EAF8',
    borderColor: '#85C1E9',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
  },
  choiceStatuteNumRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 10,
  },
  choiceStatuteChoice: {
    fontSize: 17,
    fontWeight: '700',
    minWidth: 32,
  },
  choiceStatuteChoiceBody: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  choiceStatuteLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  choiceStatuteArticle: {
    paddingLeft: 4,
  },
  choiceStatuteArticleTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 22,
  },
  keywordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  infinityPressable: {
    padding: 4,
  },
  deepDiveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  deepDiveButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chainMarkContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chainMarkImage: {
    position: 'absolute',
    width: 180,
    height: 180,
  },
  chainMarkLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: -82,
    zIndex: 1,
  },
  choiceStatuteNote: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  nextButton: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#5A9BD5',
    backgroundColor: '#E9F2FB',
  },
  /** 結果画面「次の問題へ」：メイン導線としてやや大きめのタップ領域 */
  nextButtonPrimary: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  descriptiveAnswerBox: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    minHeight: 60,
  },
  aiGradeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  aiGradeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiGradeBox: {
    marginTop: 12,
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  aiGradeScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aiGradeAnalysis: {
    fontSize: 14,
    marginBottom: 4,
  },
  choiceButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30, // Pill shape
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  choiceButtonDisabled: {
    backgroundColor: '#fff', // Keep white for result to show clearly
    borderColor: '#ddd',
    opacity: 1, // Don't dim result choice
  },
  userMemoInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  resourceButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50', // Green
    borderRadius: 8,
    alignItems: 'center',
  },
  resourceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resourceButtonSubText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContextText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  modalBodyText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  resourceImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#666',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  pagingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  pagingButton: {
    flex: 1,
    backgroundColor: '#8FB3D9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  pagingButtonDisabled: {
    backgroundColor: '#ccc',
  },
  pagingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  caseButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#9C27B0', // Purple for Pins
    borderRadius: 8,
    alignItems: 'center',
  },
  caseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  retryExpandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  retryButton: {
    alignSelf: 'flex-start',
    maxWidth: '88%',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});
