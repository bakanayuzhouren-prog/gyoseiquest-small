import {
  resolveKenpouProblemImageKey,
  resolveMinpoBukkenLearnImageKey,
  resolveMinpoLearnFolderByQuestionNumber,
  resolveSaikensouronLearnImageKey,
} from '@/src/deepdiveImages';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '@/src/learn';

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
  /** kenpou/N-230 は本編「憲法」のみ。「多肢選択」単独で問番号を付けると多肢選択・憲法と混ざるので付けない */
  if (learnSubject === '憲法') {
    return resolveKenpouProblemImageKey(problemNum1Based);
  }
  return undefined;
}

export function mergedDeepdiveHasResolvableImage(merged: string): boolean {
  if (!merged.trim()) return false;
  if (!merged.includes('[[image:')) return false;
  const re = /\[\[image:([^\]]+)\]\]/g;
  let m;
  while ((m = re.exec(merged)) !== null) {
    const key = m[1].trim().split(/\s+/)[0];
    if (resolveImageAsset(key)) return true;
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
      const k = imgMatch[1].trim().split(/\s+/)[0];
      if (resolveImageAsset(k)) return k;
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
        const k = m[1].trim().split(/\s+/)[0];
        if (resolveImageAsset(k)) return k;
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
  options?: { fromLearn?: boolean }
): string | undefined {
  const b = bodyTrimmed.trim();
  if (!b) return undefined;
  const fromLearn = options?.fromLearn === true;
  const dd = LEARN_DEEPDIVE as Record<string, string[] | undefined>;
  const lc = LEARN_CONTENT as Record<string, string[] | undefined>;
  const subjNorm = learnSubject != null ? String(learnSubject).trim() : '';
  const subjectList =
    subjNorm && dd[subjNorm]
      ? [subjNorm]
      : fromLearn
        ? []
        : Object.keys(dd);
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
