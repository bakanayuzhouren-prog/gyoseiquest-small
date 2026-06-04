import { applyTTSRules } from '@/utils/tts-rules';

import type { TextbookBlock, TextbookChapter, TextbookQuiz } from '@/src/content/shouhouTextbookContent';

export type TextbookTtsSegment = {
  chapterId: string;
  text: string;
};

function stripMarkup(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
}

function toSpeech(text: string): string {
  const cleaned = stripMarkup(text);
  if (!cleaned) return '';
  return applyTTSRules(cleaned);
}

function blockToLines(block: TextbookBlock): string[] {
  switch (block.type) {
    case 'p':
      return [block.text];
    case 'bullets':
      return block.items;
    case 'tip': {
      const head = block.title ? `${block.title}。` : '';
      return [`${head}${block.text}`];
    }
    case 'table': {
      const header = block.headers.join('、');
      const rows = block.rows.map((row) => row.join('、'));
      return [`表です。${header}。`, ...rows.map((r) => `。${r}`)];
    }
    default:
      return [];
  }
}

function quizToLine(quiz: TextbookQuiz): string {
  return `確認問題。${quiz.label}。${quiz.statement}。正しいか誤りか、考えてみてください。`;
}

export function buildTextbookTtsSegments(
  title: string,
  subtitle: string | undefined,
  chapters: TextbookChapter[]
): TextbookTtsSegment[] {
  const segments: TextbookTtsSegment[] = [];

  const opening = [title, subtitle].filter(Boolean).join('。');
  if (opening) {
    segments.push({ chapterId: chapters[0]?.id ?? 'intro', text: toSpeech(opening) });
  }

  for (const chapter of chapters) {
    const heading = [chapter.title, chapter.subtitle].filter(Boolean).join('。');
    if (heading) {
      segments.push({ chapterId: chapter.id, text: toSpeech(heading) });
    }

    if (chapter.intro) {
      segments.push({ chapterId: chapter.id, text: toSpeech(chapter.intro) });
    }

    for (const block of chapter.blocks) {
      for (const line of blockToLines(block)) {
        const spoken = toSpeech(line);
        if (spoken) segments.push({ chapterId: chapter.id, text: spoken });
      }
    }

    for (const quiz of chapter.quizzes ?? []) {
      const spoken = toSpeech(quizToLine(quiz));
      if (spoken) segments.push({ chapterId: chapter.id, text: spoken });
    }
  }

  return segments.filter((s) => s.text.length > 0);
}

/** 章の先頭セグメント（見出し）から再生するときの index */
export function findFirstSegmentIndexForChapter(
  segments: TextbookTtsSegment[],
  chapterId: string,
): number {
  const idx = segments.findIndex((s) => s.chapterId === chapterId);
  return idx >= 0 ? idx : 0;
}
