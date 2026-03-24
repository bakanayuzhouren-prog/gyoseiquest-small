import { resolveKenpouProblemImageKey } from '@/src/deepdiveImages';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { LEARN_CONTENT, LEARN_DEEPDIVE } from '@/src/learn';

function firstLine(s: string): string {
  return (s.trim().split(/\r?\n/)[0] || '').trim();
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

function siblingTitleForDeepdive(body: string): string {
  return firstLine(stripLeadingDeepdiveTags(body));
}

export function mergedDeepdiveHasResolvableImage(merged: string): boolean {
  if (!merged.trim()) return false;
  const re = /\[\[image:([^\]]+)\]\]/g;
  let m;
  while ((m = re.exec(merged)) !== null) {
    const key = m[1].trim().split(/\s+/)[0];
    if (resolveImageAsset(key)) return true;
  }
  return false;
}

/**
 * B列に [[image:…]] がなくても、① 当該カード番号の kenpou/N-230、② 同一深掘り（先頭行一致・先頭 [[image:]] は無視）、③ 兄弟に明示された [[image:…]]、④ 兄弟の kenpou、⑤ 兄弟の A列 [[image:…]] を順に試す。
 * @param contentIndex0 カードの0始まりインデックス。null のときは①をスキップ（深掘りページなど本文だけ渡す場合）。
 */
export function pickAutoLearnDeepdiveImageKey(
  contentIndex0: number | null,
  deepdiveBodyTrimmed: string,
  deepdiveColumn: string[] | undefined,
  learnContentColumn: string[] | undefined
): string | undefined {
  if (!deepdiveColumn?.length) return undefined;

  if (typeof contentIndex0 === 'number' && contentIndex0 >= 0) {
    const n = contentIndex0 + 1;
    const selfKey = resolveKenpouProblemImageKey(n);
    if (selfKey && resolveImageAsset(selfKey)) return selfKey;
  }

  const title = siblingTitleForDeepdive(deepdiveBodyTrimmed);
  if (!title) return undefined;

  const siblings: number[] = [];
  for (let i = 0; i < deepdiveColumn.length; i++) {
    const b = (deepdiveColumn[i] || '').trim();
    if (!b) continue;
    if (siblingTitleForDeepdive(b) === title) siblings.push(i);
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
    const key = resolveKenpouProblemImageKey(i + 1);
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

/** 見て聞いて覚えるの LEARN_DEEPDIVE 全体から、同一深掘り本文の兄弟で使われている共通画像キーを1つ返す */
export function pickLearnDeepdiveSharedImageKey(bodyTrimmed: string): string | undefined {
  const b = bodyTrimmed.trim();
  if (!b) return undefined;
  const dd = LEARN_DEEPDIVE as Record<string, string[] | undefined>;
  const lc = LEARN_CONTENT as Record<string, string[] | undefined>;
  for (const subj of Object.keys(dd)) {
    const arr = dd[subj];
    if (!Array.isArray(arr)) continue;
    const learnCol = lc[subj];
    const key = pickAutoLearnDeepdiveImageKey(
      null,
      b,
      arr,
      Array.isArray(learnCol) && learnCol.length === arr.length ? learnCol : undefined
    );
    if (key) return key;
  }
  return undefined;
}
