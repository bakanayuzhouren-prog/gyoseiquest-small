import { getDescriptiveImageSource } from '@/src/descriptiveImages';
import { getDeepdiveImageSource } from '@/src/deepdiveImages';
import { getChunkImageSource } from '@/src/chunkImages';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';

/** 見て聞いて覚える・もっと深掘るで使う [[image:key]] の解決（imageMap / deepdive / chunk / descriptive） */
export function resolveImageAsset(key: string): number | undefined {
  const k = key.trim();
  if (!k) return undefined;
  const descriptive = getDescriptiveImageSource(k);
  if (descriptive) return descriptive;
  const deepdive = getDeepdiveImageSource(k);
  if (deepdive) return deepdive;
  const chunk = getChunkImageSource(k);
  if (chunk) return chunk;
  return (IMAGE_RESOURCES_MAP as Record<string, number>)[k];
}

/**
 * [[image:…]] タグ内の文字列を実際に解決できるキーへ寄せる。
 * kenpou/14-230 旭川学テ のようにキー自体にスペースが含まれる場合は全文を優先し、
 * 従来どおり「キーの後にメモを書いた」場合のみ先頭トークンにフォールバックする。
 */
export function resolveDeepdiveImageTagInner(inner: string): string | undefined {
  const t = inner.trim();
  if (!t) return undefined;
  if (resolveImageAsset(t)) return t;
  const head = t.split(/\s+/)[0];
  if (head && head !== t && resolveImageAsset(head)) return head;
  return undefined;
}
