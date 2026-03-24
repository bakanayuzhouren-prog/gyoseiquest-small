import { useMemo, type ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export type LexiconSegment =
  | { kind: 'plain'; text: string }
  | { kind: 'dict'; word: string; def: string };

/** 見て聞いて覚える用: [[dict:表示する語句::辞典の説明文]] */
export function parseLexiconMarkup(source: string): LexiconSegment[] {
  const segments: LexiconSegment[] = [];
  let last = 0;
  const re = /\[\[dict:(.+?)::([\s\S]*?)\]\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    if (m.index > last) {
      segments.push({ kind: 'plain', text: source.slice(last, m.index) });
    }
    segments.push({ kind: 'dict', word: m[1], def: m[2] });
    last = m.index + m[0].length;
  }
  if (last < source.length) {
    segments.push({ kind: 'plain', text: source.slice(last) });
  }
  return segments;
}

/** TTS・読了インデックス用（タグを外し、表示語だけ残す） */
export function stripLexiconMarkupForPlain(source: string): string {
  return source.replace(/\[\[dict:(.+?)::[\s\S]*?\]\]/g, '$1');
}

type Props = {
  text: string;
  lineStyle: StyleProp<TextStyle>;
  readStyle: StyleProp<TextStyle>;
  unreadStyle?: StyleProp<TextStyle>;
  /** stripLexiconMarkupForPlain 後の文字位置までを「読了」表示 */
  spokenIndex: number;
  applyNames: (s: string) => string;
  onDictionaryPress: (word: string, definition: string) => void;
  linkColor?: string;
};

/**
 * 1 つの Text 内に子 Text を並べ、段落の折り返し・textAlign（中央寄せ等）を自然に揃える。
 * （View + flexWrap だと行ごとにブロックが分かれバランスが崩れる）
 */
export function LexiconText({
  text,
  lineStyle,
  readStyle,
  unreadStyle,
  spokenIndex,
  applyNames,
  onDictionaryPress,
  linkColor = '#007BFF',
}: Props) {
  const segments = useMemo(() => parseLexiconMarkup(text), [text]);

  if (!text) return null;

  if (segments.length === 0) {
    return (
      <ThemedText style={[lineStyle, { width: '100%' }]}>
        {applyNames(text)}
      </ThemedText>
    );
  }

  const children: ReactNode[] = [];
  let plainCursor = 0;
  let k = 0;

  for (const seg of segments) {
    if (seg.kind === 'plain') {
      const s = seg.text;
      const start = plainCursor;
      plainCursor += s.length;
      const relReadEnd = Math.max(0, Math.min(spokenIndex - start, s.length));
      if (relReadEnd > 0) {
        children.push(
          <ThemedText key={k++} style={[lineStyle, readStyle]}>
            {applyNames(s.slice(0, relReadEnd))}
          </ThemedText>
        );
      }
      if (relReadEnd < s.length) {
        children.push(
          <ThemedText key={k++} style={[lineStyle, unreadStyle]}>
            {applyNames(s.slice(relReadEnd))}
          </ThemedText>
        );
      }
    } else {
      const w = seg.word;
      plainCursor += w.length;
      children.push(
        <ThemedText
          key={k++}
          onPress={() => onDictionaryPress(seg.word, seg.def)}
          style={[
            lineStyle,
            { color: linkColor, textDecorationLine: 'underline', fontWeight: '600' },
          ]}
        >
          {applyNames(w)}
        </ThemedText>
      );
    }
  }

  return (
    <ThemedText style={[lineStyle, { width: '100%' }]}>
      {children}
    </ThemedText>
  );
}
