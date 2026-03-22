import Constants from 'expo-constants';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { getChunkImageSource } from '@/src/chunkImages';
import { getDescriptiveImageSource } from '@/src/descriptiveImages';
import { setDeepdiveParams } from '@/src/deepdiveState';
import { getDeepdiveImageSource } from '@/src/deepdiveImages';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';
import { PIN_CASES } from '@/src/pinData';
import { RESOURCES, STATUTES, SUBJECTS } from '@/src/questions';

/** シンプルなチャンク画像か（sousoku7 など -1.2.3.4 のような表記がない） */
function isSimpleChunkImage(path: string): boolean {
  return !!(path && path.trim() && !/-\d/.test(path.trim()));
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

/** 単一の条文参照（例: 166条1項、724条の2）から該当条文を検索 */
function findStatuteByRef(
  statutes: Array<{ title: string; content: string }>,
  ref: string
): { title: string; content: string } | null {
  if (!ref || !statutes.length) return null;
  const r = ref.trim()
    .replace(/^民法\s*/, '')
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    .trim();
  if (!r) return null;
  const norm = (s: string) => (s || '').replace(/\s/g, '');
  const rn = norm(r);
  for (const st of statutes) {
    const t = norm(st.title || '');
    if (t.includes(rn) || (rn.length >= 4 && t.includes(rn.slice(0, -1)))) return st;
  }
  const artMatch = r.match(/(\d+)条/);
  if (artMatch) {
    const artNum = parseInt(artMatch[1], 10);
    const no2Match = r.match(/条の(\d+)$/);
    const no2Suffix = no2Match ? 'の' + (parseInt(no2Match[1], 10) < 10 ? toKanjiArticle(parseInt(no2Match[1], 10)) : no2Match[1]) : '';
    const artKanji = '第' + toKanjiArticle(artNum) + '条' + no2Suffix;
    const artKanjiAlt = artNum >= 100 && artNum < 200 ? '第百' + toKanjiArticle(artNum % 100) + '条' + no2Suffix : null;
    const kouMatch = r.match(/(\d+)項/);
    const kouKanji = kouMatch ? '第' + (parseInt(kouMatch[1], 10) < 10 ? toKanjiArticle(parseInt(kouMatch[1], 10)) : kouMatch[1]) + '項' : '';
    const kouAlt = kouMatch ? '第' + kouMatch[1] + '項' : '';
    const kouAltFull = kouMatch && parseInt(kouMatch[1], 10) < 10
      ? '第' + String.fromCharCode(0xFF10 + parseInt(kouMatch[1], 10)) + '項' : ''; // 全角: 第２項
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

function pickRelatedStatutes(
  statutes: Array<{ title: string; content: string }>,
  questionText: string,
  limit: number = 5
) {
  const norm = (s: string) =>
    (s || '')
      .trim()
      .replace(/[\s。、．，,.「」『』【】［］()（）]/g, '');
  const q = norm(questionText);
  if (!q) return [];
  // 重要フレーズ一致ボーナス（選択肢と条文の文言が一致する場合に優先）
  const phraseBonuses = ['管理権を有しない', '親権を行う者が管理権'];
  const scored = statutes
    .map((st, idx) => {
      const t = norm(`${st.title || ''}${st.content || ''}`);
      if (!t) return { idx, score: 0 };
      let hit = 0;
      for (const ch of new Set(q.split(''))) {
        if (t.includes(ch)) hit++;
      }
      let score = hit / q.length;
      for (const phrase of phraseBonuses) {
        if (q.includes(phrase) && t.includes(phrase)) score += 0.4;
      }
      return { idx, score };
    })
    .filter((s) => s.score > 0.15)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => statutes[s.idx]);
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
import { gradeDescriptiveAnswer, type GradeDescriptiveResult } from '../src/utils/geminiService';
import { formatNumberedClauses, getChoicePrefix, hasNumberPrefix, splitNumberPrefix } from '@/utils/choiceNumber';
import { addPoints } from '@/utils/points';
import { updateQuestionStats } from '@/utils/question-stats';
import { incrementLoopCount } from '@/utils/progress';
import { USER_KEY } from './login';

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

  // Calculate next index
  const questionIndex = params.questionIndex ? parseInt(Array.isArray(params.questionIndex) ? params.questionIndex[0] : params.questionIndex, 10) : 0;
  const nextIndex = questionIndex + 1;

  // LOOKUP DATA FROM SUBJECTS
  const subjectData = subject ? (SUBJECTS as any)[subject] : {};
  const questions = field && subjectData[field] ? subjectData[field] : [];
  const question = questions[questionIndex] || null;
  const isReorder = params.isReorder === '1' || (question as any)?.isReorder;

  // Fallback or loading state if question not found (shouldn't happen with correct nav)
  if (!question) {
    // Handle error case below
  }

  const text = question?.text || '';
  const explain = question?.explain || '';
  const memo = question?.memo || '';
  const choices = question?.choices || [];
  const rawAnswer = Array.isArray(question?.answer) ? (question.answer as any[]) : [];
  const correctIndices: number[] = rawAnswer.length > 0 && typeof rawAnswer[0] === 'number' ? (rawAnswer as number[]) : [];
  const correctSlots: string[] = rawAnswer.length > 0 && typeof rawAnswer[0] === 'string' ? (rawAnswer as string[]) : [];
  const hasUsableSlots = Array.isArray((question as any)?.slots) && (question as any).slots.some((s: any) => s?.options);
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
  const statutesKey =
    subject === '行政法' && field ? FIELD_TO_STATUTES_KEY[field]
    : subject === '民法' && field ? CIVIL_FIELD_TO_STATUTES_KEY[field]
    : subject === '多肢選択' && field ? TASHI_FIELD_TO_STATUTES_KEY[field]
    : null;
  let statuteItemsRaw: Array<{ title: string; content: string }> = [];
  if (statutesKey && (STATUTES as any)[statutesKey]) {
    statuteItemsRaw = [...((STATUTES as any)[statutesKey] as Array<{ title: string; content: string }>)];
    // 民法総則: 制限行為能力者・後見で minpo_kazoku（838条一号等）も参照
    if (subject === '民法' && field === '民法総則' && (STATUTES as any)['minpo_kazoku']) {
      statuteItemsRaw = [...statuteItemsRaw, ...((STATUTES as any)['minpo_kazoku'] as Array<{ title: string; content: string }>)];
    }
    // 民法総則: 162条・187条（取得時効・占有承継）等が minpo_bukken にあるため、併せて参照
    if (subject === '民法' && field === '民法総則' && (STATUTES as any)['minpo_bukken']) {
      statuteItemsRaw = [...statuteItemsRaw, ...((STATUTES as any)['minpo_bukken'] as Array<{ title: string; content: string }>)];
    }
    // 民法総則: 消滅時効（166条・167条・724条・724条の2）等が minpo_saiken にあるため、併せて参照
    if (subject === '民法' && field === '民法総則') {
      if ((STATUTES as any)['minpo_saiken_soron']) {
        statuteItemsRaw = [...statuteItemsRaw, ...((STATUTES as any)['minpo_saiken_soron'] as Array<{ title: string; content: string }>)];
      }
      if ((STATUTES as any)['minpo_saiken_kakuron']) {
        statuteItemsRaw = [...statuteItemsRaw, ...((STATUTES as any)['minpo_saiken_kakuron'] as Array<{ title: string; content: string }>)];
      }
    }
  }
  const statuteItems = statuteItemsRaw.length > 0 ? pickRelatedStatutes(statuteItemsRaw, text) : [];

  // 肢ごとの関連条文。I列（choiceStatuteRefs）に指定があれば優先、なければ自動照合
  const choiceStatuteRefs = (question as any)?.choiceStatuteRefs as string[] | undefined;
  const choiceDeepDive = (question as any)?.choiceDeepDive as string[] | undefined;
  const choiceStatutes: Array<Array<{ title: string; content: string }>> = [];
  if (statuteItemsRaw.length > 0 && Array.isArray(choices) && choices.length > 0 && (subject === '行政法' || subject === '民法' || subject === '多肢選択')) {
    for (let i = 0; i < choices.length; i++) {
      const ref = choiceStatuteRefs?.[i]?.trim();
      if (ref) {
        const found = findStatutesByRef(statuteItemsRaw, ref);
        choiceStatutes.push(found.length > 0 ? found : []);
        continue;
      }
      const c = choices[i];
      if (!c) {
        choiceStatutes.push([]);
        continue;
      }
      choiceStatutes.push(pickRelatedStatutes(statuteItemsRaw, `${text}\n${c}`, 1));
    }
  }

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
  const isCorrectSlots = !answerPending && correctSlots.length === pickedSlots.length && correctSlots.every((v, i) => v === pickedSlots[i]);
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

  // 正答率を永続化（回答設定中はスキップ）
  useEffect(() => {
    if (!answerPending && subject && field && text) {
      updateQuestionStats(subject, field, text, isCorrect);
    }
  }, [answerPending, subject, field, text, isCorrect]);

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

  // Update count（回答設定中の問題はカウント対象外）
  const newCorrectCount = (isCorrect && (!answerPending || (isDescriptive && hasDescriptiveModel))) ? correctCountSessionCurrent + 1 : correctCountSessionCurrent;

  // 間違えた場合、wrongCounts を更新（1回=黄、2回以上=赤でサイドバー表示）
  const updatedWrongCounts: Record<number, number> = { ...wrongCounts };
  if (!isCorrect && !answerPending) {
    updatedWrongCounts[questionIndex] = (wrongCounts[questionIndex] || 0) + 1;
  }

  const handleNext = () => {
    // Check if we are looping (Index + 1 >= Total)
    if (totalQuestions > 0 && nextIndex >= totalQuestions) {
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
        ) : isDescriptive && hasDescriptiveModel ? (
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
        ) : isSlotStyle ? (
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
        ) : isCorrect ? (
          <ThemedView style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginBottom: 16, borderWidth: 2, borderColor: '#4CAF50', alignItems: 'center' }}>
            <ThemedText type="title" style={{ color: '#2E7D32', fontSize: 24 }}>🎉 正解！お見事！</ThemedText>
            <ThemedText style={{ color: '#1B5E20', marginTop: 4, fontWeight: 'bold' }}>その調子だ！この知識を確実に定着させろ！</ThemedText>
          </ThemedView>
        ) : (
          <ThemedText type="subtitle" style={{ color: '#D32F2F', marginBottom: 8 }}>不正解... 復習が必要だ！</ThemedText>
        )}
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

        {/* 行政法・民法・多肢選択: 根拠条文。穴埋めは1本のみ表示、それ以外は肢ごと（通常時は※肢を省く、ボーナス時は全肢） */}
        {(subject === '行政法' || subject === '民法' || subject === '多肢選択') && statuteItemsRaw.length > 0 && choices.length > 0 && (() => {
          // 穴埋め問題: 同じ条文が繰り返すので1つだけ表示
          if (isSlotStyle) {
            return (
              <ThemedView style={[styles.choiceStatuteBlock, styles.choiceStatuteCard]}>
                <ThemedText style={[styles.choiceStatuteTitle, { color: colors.text, marginBottom: 10 }]}>解説</ThemedText>
                {statuteItems.length > 0 ? (
                  statuteItems.map((item, idx) => (
                    <ThemedView key={idx} style={styles.choiceStatuteArticle}>
                      {(item.title || item.content) ? (
                        <ThemedText style={[styles.choiceStatuteArticleTitle, { color: colors.text }]}>
                          {getStatuteDisplayTitle(item, statuteItemsRaw)}
                        </ThemedText>
                      ) : null}
                      {item.content ? (
                        <MarkdownText
                          text={item.content}
                          style={{ fontSize: 17, lineHeight: 26, fontWeight: '500' }}
                        />
                      ) : null}
                    </ThemedView>
                  ))
                ) : null}
                {memo.trim() ? (
                  <View style={{ marginTop: 12 }}>
                    <Pressable
                      onPress={() => {
                        setDeepdiveParams(memo.trim(), '');
                        router.push({
                          pathname: '/deepdive',
                          params: { content: memo.trim(), choiceLabel: '' },
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
                      <MarkdownText text={explText} style={{ fontSize: 15, lineHeight: 22 }} />
                    </View>
                  ) : null}
                  <ThemedText style={[styles.choiceStatuteLabel, { color: colors.subText }]}>
                    根拠条文
                  </ThemedText>
                  {statutes.length > 0 ? (
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
                              text={statute.content}
                              style={{ fontSize: 17, lineHeight: 26, fontWeight: '500' }}
                            />
                          ) : null}
                        </View>
                      ))}
                      <View style={styles.keywordRow}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
                            <Pressable
                              onPress={() => {
                                const choiceLabel = `${label}${choiceText}`;
                                setDeepdiveParams(deepContent || '', choiceLabel);
                                router.push({
                                  pathname: '/deepdive',
                                  params: { content: deepContent || '', choiceLabel },
                                });
                              }}
                              style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                            >
                              <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                                📖 もっと深掘る
                              </ThemedText>
                            </Pressable>
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
                  ) : (
                    <View>
                      {choiceStatuteRefs?.[choiceIdx]?.trim() ? (
                        <ThemedText style={[styles.choiceStatuteNote, { color: colors.subText }]}>
                          指定: {choiceStatuteRefs[choiceIdx]}
                        </ThemedText>
                      ) : null}
                      <View style={[styles.keywordRow, { marginTop: 8 }]}>
                        <View style={{ flex: 1 }} />
                        <Pressable
                          onPress={() => {
                            const choiceLabel = `${label}${choiceText}`;
                            setDeepdiveParams(deepContent || '', choiceLabel);
                            router.push({
                              pathname: '/deepdive',
                              params: { content: deepContent || '', choiceLabel },
                            });
                          }}
                          style={[styles.deepDiveButton, { borderColor: colors.primary }]}
                        >
                          <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                            📖 もっと深掘る
                          </ThemedText>
                        </Pressable>
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
                  )}
                </View>
              );
            })}
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
                setDeepdiveParams(memo.trim(), '');
                router.push({
                  pathname: '/deepdive',
                  params: { content: memo.trim(), choiceLabel: '' },
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
                  setDeepdiveParams(explain, '');
                  router.push({
                    pathname: '/deepdive',
                    params: { content: explain, choiceLabel: '' },
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
        {!(subject === '行政法' && field === '行政手続法') ? (
          <>
            {expandedChoiceIndex !== null ? (
              <View>
        <ThemedText type="subtitle" style={styles.explainTitle}>
          もっと深掘る！
        </ThemedText>
                {(() => {
                  const deepDiveContent = choiceDeepDive?.[expandedChoiceIndex]?.trim();
                  if (deepDiveContent) {
                    const choiceLabel = expandedChoiceIndex != null && choices[expandedChoiceIndex]
                      ? `${(expandedChoiceIndex + 1)}. ${(choices[expandedChoiceIndex] || '').replace(/※/g, '')}`
                      : '';
                    return (
        <Pressable
                        onPress={() => {
                          setDeepdiveParams(deepDiveContent, choiceLabel);
                          router.push({
                            pathname: '/deepdive',
                            params: { content: deepDiveContent, choiceLabel },
                          });
                        }}
                        style={[styles.deepDiveButton, { borderColor: colors.primary, alignSelf: 'flex-start' }]}
                      >
                        <ThemedText style={[styles.deepDiveButtonText, { color: colors.primary }]}>
                          📖 もっと深掘る（別ページで表示）
          </ThemedText>
        </Pressable>
                    );
                  }
                  return (
                    <>
                      {statuteItems.length > 0 ? (
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
                <Pressable style={StyleSheet.flatten([styles.retryButton, { backgroundColor: colors.accent, borderColor: colors.accent }])}>
                  <ThemedText type="defaultSemiBold" style={{ color: '#fff', fontSize: 14 }}>もう一度この問題を解く</ThemedText>
                </Pressable>
              </Link>
            </View>
          </>
        ) : null}

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

        <ThemedText type="subtitle" style={{ marginTop: 20 }}>My Memo (余白)</ThemedText>
        <TextInput
          style={styles.userMemoInput}
          multiline
          placeholder="ここに自分用のメモを残せます（他ユーザーには見えません）"
          value={userMemo}
          onChangeText={saveUserMemo}
        />

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
            style={StyleSheet.flatten([styles.nextButton, { backgroundColor: colors.accent, borderColor: colors.accent }])}
            onPress={handleNext}
          >
            <ThemedText type="defaultSemiBold" style={{ color: '#fff', textAlign: 'center' }}>次の問題へ</ThemedText>
          </Pressable>
        </Link>

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
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});
