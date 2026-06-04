import {
  resolveKenpouProblemImageKey,
  resolveKokubaiLearnImageKey,
  resolveMinpoBukkenLearnImageKey,
  resolveMinpoLearnFolderByQuestionNumber,
  resolveSaikensouronLearnImageKey,
} from '@/src/deepdiveImages';
import { resolveDeepdiveImageTagInner, resolveImageAsset } from '@/src/resolveImageAsset';

function getLearnDeepdiveTables(): {
  dd: Record<string, string[] | undefined>;
  lc: Record<string, string[] | undefined>;
} {
  const { LEARN_DEEPDIVE, LEARN_CONTENT } = require('@/src/learn') as {
    LEARN_DEEPDIVE: Record<string, string[] | undefined>;
    LEARN_CONTENT: Record<string, string[] | undefined>;
  };
  return { dd: LEARN_DEEPDIVE, lc: LEARN_CONTENT };
}

function firstLine(s: string): string {
  const t = s.trimStart();
  if (!t) return '';
  const nl = /\r\n|\r|\n/.exec(t);
  const line = nl ? t.slice(0, nl.index) : t;
  return line.trimEnd();
}

/** B列先頭の [[…]]（画像タグ等）を除いたうえで1行目を取る。同一深掘り本文で [[image:]] あり／なしが混在しても兄弟判定できるようにする */
function stripLeadingDeepdiveTags(s: string): string {
  let t = s.trimStart();
  for (;;) {
    const m = t.match(/^\[\[[^\]]+\]\][\s\n]*/);
    if (!m) break;
    t = t.slice(m[0].length).trimStart();
  }
  return t;
}

/** 兄弟行の件数が多く、かつ1行が極端に長いB列で文字列比較とメモリが爆発しないよう上限 */
const SIBLING_TITLE_KEY_MAX = 640;

function siblingTitleForDeepdive(body: string): string {
  const line = firstLine(stripLeadingDeepdiveTags(body));
  if (line.length <= SIBLING_TITLE_KEY_MAX) return line;
  return line.slice(0, SIBLING_TITLE_KEY_MAX);
}

/** B列各行の「兄弟判定用タイトル」。deepdiveColumn が変わらない間は useMemo して再利用し、民法など長文B列の科目でカード切替が軽くなる */
export function buildDeepdiveSiblingTitles(deepdiveColumn: string[] | undefined): string[] | undefined {
  if (!deepdiveColumn?.length) return undefined;
  return deepdiveColumn.map((cell) => {
    const b = (cell || '').trim();
    return b ? siblingTitleForDeepdive(b) : '';
  });
}

/** 見て聞いて覚えるの科目ごとの「問番号→自動画像キー」 */
function resolveLearnAutoProblemImageKey(learnSubject: string | undefined, problemNum1Based: number): string | undefined {
  /** 本編「憲法」と別シート。多肢選択憲法／行政法は調整用であり kenpou の自動問番号は付けない */
  if (learnSubject === '多肢選択憲法' || learnSubject === '多肢選択行政法') {
    return undefined;
  }
  if (learnSubject === '民法物権') {
    return resolveMinpoBukkenLearnImageKey(problemNum1Based);
  }
  if (learnSubject && learnSubject.startsWith('民法')) {
    const k = resolveMinpoLearnFolderByQuestionNumber(problemNum1Based);
    if (k) return k;
    return undefined;
  }
  if (learnSubject === '債権総論') {
    return resolveSaikensouronLearnImageKey(problemNum1Based);
  }
  /** 債権各論・家族法は learn/minnpou/（bukken 以外）の N-… のみ。憲法 kenpou に落とさない */
  if (learnSubject === '債権各論' || learnSubject === '家族法') {
    const k = resolveMinpoLearnFolderByQuestionNumber(problemNum1Based);
    if (k) return k;
    return undefined;
  }
  if (learnSubject === '国家賠償法') {
    return resolveKokubaiLearnImageKey(problemNum1Based);
  }
  /** kenpou/N-230 は本編「憲法」のみ。「多肢選択」単独で問番号を付けると多肢選択・憲法と混ざるので付けない */
  if (learnSubject === '憲法') {
    if (problemNum1Based === 218) {
      const alias184 = resolveKenpouProblemImageKey(184);
      if (alias184 && resolveImageAsset(alias184)) return alias184;
    }
    return resolveKenpouProblemImageKey(problemNum1Based);
  }
  return undefined;
}

/** 憲法 90〜93問目: 共通の補助図を既存 kenpou/N-230 と併記する（見出し: 人権の制約態様） */
const KENPOU_PARALLEL_SUPPLEMENT_90_93 = 'kenpou/90-230-2';

export function kenpouParallelSupplementImageKey(problemNum1Based: number): string | undefined {
  if (problemNum1Based < 90 || problemNum1Based > 93) return undefined;
  if (!resolveImageAsset(KENPOU_PARALLEL_SUPPLEMENT_90_93)) return undefined;
  return KENPOU_PARALLEL_SUPPLEMENT_90_93;
}

/** 見て聞いて覚える: 問番号（0始まり）だけで自動画像キーを返す（兄弟走査なし） */
export function resolveLearnDeepdiveAutoImageByCardIndex(
  learnSubject: string | undefined,
  contentIndex0: number
): string | undefined {
  if (!learnSubject?.trim() || contentIndex0 < 0) return undefined;
  const key = resolveLearnAutoProblemImageKey(learnSubject.trim(), contentIndex0 + 1);
  if (key && resolveImageAsset(key)) return key;
  return undefined;
}

export function mergedDeepdiveHasResolvableImage(merged: string): boolean {
  if (!merged.trim()) return false;
  if (!merged.includes('[[image:')) return false;
  const re = /\[\[image:([^\]]+)\]\]/g;
  let m;
  while ((m = re.exec(merged)) !== null) {
    if (resolveDeepdiveImageTagInner(m[1])) return true;
  }
  return false;
}

/**
 * B列に [[image:…]] がなくても、① 当該カード番号の科目別自動キー（憲法のみ kenpou、民法・債権各論等は learn/minnpou 等）、② 同一深掘り（先頭行一致）、③ 兄弟の [[image:…]]、④ 兄弟の自動キー、⑤ 兄弟の A列 [[image:…]] を順に試す。
 *
 * ① は **B列に本文の見出しがあるときだけ**（空行・タグのみの場合はスキップ）。未入力のままでも問番号で kenpou 画像だけ付くのを防ぐ。
 * @param contentIndex0 カードの0始まりインデックス。null のときは①をスキップ（深掘りページなど本文だけ渡す場合）。
 */
export function pickAutoLearnDeepdiveImageKey(
  contentIndex0: number | null,
  deepdiveBodyTrimmed: string,
  deepdiveColumn: string[] | undefined,
  learnContentColumn: string[] | undefined,
  learnSubject?: string,
  /** 事前計算済みなら兄弟走査で各行の長文を再パースしない */
  siblingTitles?: string[]
): string | undefined {
  if (!deepdiveColumn?.length) return undefined;

  const useTitles = !!(siblingTitles && siblingTitles.length === deepdiveColumn.length);

  const title = siblingTitleForDeepdive(deepdiveBodyTrimmed);

  if (typeof contentIndex0 === 'number' && contentIndex0 >= 0 && title) {
    const n = contentIndex0 + 1;
    const selfKey = resolveLearnAutoProblemImageKey(learnSubject, n);
    if (selfKey && resolveImageAsset(selfKey)) return selfKey;
  }

  if (!title) return undefined;

  const siblings: number[] = [];
  for (let i = 0; i < deepdiveColumn.length; i++) {
    const b = (deepdiveColumn[i] || '').trim();
    if (!b) continue;
    const rowTitle = useTitles ? siblingTitles![i] : siblingTitleForDeepdive(b);
    if (rowTitle === title) siblings.push(i);
  }
  const sorted = [...new Set(siblings)].sort((a, b) => a - b);

  for (const i of sorted) {
    const b = (deepdiveColumn[i] || '').trim();
    const imgMatch = b.match(/\[\[image:([^\]]+)\]\]/);
    if (imgMatch) {
      const k = resolveDeepdiveImageTagInner(imgMatch[1]);
      if (k) return k;
    }
  }

  for (const i of sorted) {
    const key = resolveLearnAutoProblemImageKey(learnSubject, i + 1);
    if (key && resolveImageAsset(key)) return key;
  }

  if (learnContentColumn && learnContentColumn.length === deepdiveColumn.length) {
    for (const i of sorted) {
      const m = (learnContentColumn[i] || '').match(/\[\[image:([^\]]+)\]\]/);
      if (m) {
        const k = resolveDeepdiveImageTagInner(m[1]);
        if (k) return k;
      }
    }
  }

  return undefined;
}

/**
 * 見て聞いて覚えるの LEARN_DEEPDIVE から、同一深掘り本文の兄弟で使われている共通画像キーを1つ返す。
 * @param learnSubject 指定時は当該キーの列のみ検索。options.fromLearn true でキー欠落時は全科目走査しない（フリーズ防止）。
 */
export function pickLearnDeepdiveSharedImageKey(
  bodyTrimmed: string,
  learnSubject?: string | null,
  options?: { fromLearn?: boolean; /** クイズ復元など。未指定時は全科目走査しない */ allowGlobalSubjectScan?: boolean }
): string | undefined {
  const b = bodyTrimmed.trim();
  if (!b) return undefined;
  const fromLearn = options?.fromLearn === true;
  /** 学習画面で本文・画像は既に確定している。深掘りで LEARN_DEEPDIVE 全走査しない */
  if (fromLearn) return undefined;
  const { dd, lc } = getLearnDeepdiveTables();
  const subjNorm = learnSubject != null ? String(learnSubject).trim() : '';
  const subjectList =
    subjNorm && dd[subjNorm]
      ? [subjNorm]
      : options?.allowGlobalSubjectScan === true
        ? Object.keys(dd)
        : [];
  for (const subj of subjectList) {
    const arr = dd[subj];
    if (!Array.isArray(arr)) continue;
    const learnCol = lc[subj];
    const titles = buildDeepdiveSiblingTitles(arr);
    const key = pickAutoLearnDeepdiveImageKey(
      null,
      b,
      arr,
      Array.isArray(learnCol) && learnCol.length === arr.length ? learnCol : undefined,
      subj,
      titles
    );
    if (key) return key;
  }
  return undefined;
}
