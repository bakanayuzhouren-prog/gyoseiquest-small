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
