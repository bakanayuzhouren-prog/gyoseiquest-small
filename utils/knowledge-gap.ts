import { KNOWLEDGE_GAP_INDEX, type KnowledgeGapEntry } from '@/src/generated/knowledgeGapIndex';
import { genreKey } from '@/utils/genre-eval';

export type KnowledgeGap = {
  id: string;
  title: string;
  genre: string;
  missing: string[];
};

function haystackOf(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join('\n');
}

const GENERIC_TAGS = new Set(['民法', '憲法', '行政法', '商法', '会社法', '基礎知識', '基礎法学']);

function scoreEntry(entry: KnowledgeGapEntry, haystack: string, genre: string): number {
  let score = 0;
  if (entry.genre && entry.genre === genre) score += 3;
  for (const tag of entry.tags) {
    if (tag.length < 2 || GENERIC_TAGS.has(tag)) continue;
    if (haystack.includes(tag)) score += Math.min(tag.length, 8);
  }
  const title = entry.title.replace(/\s+/g, '');
  if (title.length >= 4 && haystack.includes(title.slice(0, Math.min(8, title.length)))) score += 6;
  for (const bullet of entry.bullets) {
    const head = bullet.slice(0, 10);
    if (head.length >= 6 && haystack.includes(head)) score += 4;
  }
  return score;
}

function missingBullets(entry: KnowledgeGapEntry, correctText: string, selectedText: string): string[] {
  const ranked = entry.bullets
    .map((bullet) => {
      let score = 0;
      for (const token of correctText.split(/[、。・\s]/).filter((part) => part.length >= 2)) {
        if (bullet.includes(token)) score += token.length;
      }
      if (selectedText && bullet.includes(selectedText.slice(0, 12))) score -= 4;
      return { bullet, score };
    })
    .sort((a, b) => b.score - a.score);
  const picked = ranked.filter((item) => item.score > 0).slice(0, 2).map((item) => item.bullet);
  if (picked.length > 0) return picked;
  return entry.bullets.slice(0, 1);
}

/** 正本の題名と結論から、この問がどの知識で、どの命題が抜けているかを返す。 */
export function matchKnowledgeGap(input: {
  subject?: string;
  field?: string;
  questionText?: string;
  selectedText?: string;
  correctText?: string;
  explain?: string;
}): KnowledgeGap | null {
  const genre = genreKey(input.subject, input.field);
  const haystack = haystackOf([input.questionText, input.explain, input.correctText, input.field, input.subject]);
  if (!haystack.trim()) return null;
  let best: KnowledgeGapEntry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE_GAP_INDEX) {
    const score = scoreEntry(entry, haystack, genre);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  if (!best || bestScore < 6) return null;
  return {
    id: best.id,
    title: best.title,
    genre: best.genre || genre,
    missing: missingBullets(best, input.correctText || input.questionText || '', input.selectedText || ''),
  };
}
