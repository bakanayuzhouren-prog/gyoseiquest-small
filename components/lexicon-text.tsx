import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BEGINNER_GLOSSARY_SORTED } from '@/utils/beginner-glossary';

export type LexiconSegment =
  | { kind: 'plain'; text: string }
  | { kind: 'dict'; word: string; def: string };

/** @deprecated BEGINNER_GLOSSARY を使う。互換のため残す */
export const LEARN_AUTO_GLOSSARY = BEGINNER_GLOSSARY_SORTED;

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

function splitPlainByAutoGlossary(text: string): LexiconSegment[] {
  const out: LexiconSegment[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    let best: { index: number; term: (typeof BEGINNER_GLOSSARY_SORTED)[number] } | null = null;
    for (const term of BEGINNER_GLOSSARY_SORTED) {
      const index = text.indexOf(term[0], cursor);
      if (index < 0) continue;
      if (!best || index < best.index || (index === best.index && term[0].length > best.term[0].length)) {
        best = { index, term };
      }
    }
    if (!best) {
      const tail = text.slice(cursor);
      if (tail) out.push({ kind: 'plain', text: tail });
      break;
    }
    if (best.index > cursor) out.push({ kind: 'plain', text: text.slice(cursor, best.index) });
    out.push({ kind: 'dict', word: best.term[0], def: best.term[1] });
    cursor = best.index + best.term[0].length;
  }
  return out;
}

function applyAutoGlossary(segments: LexiconSegment[], enabled?: boolean): LexiconSegment[] {
  if (!enabled) return segments;
  return segments.flatMap((seg) => (seg.kind === 'plain' ? splitPlainByAutoGlossary(seg.text) : [seg]));
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
  onDictionaryPress?: (word: string, definition: string) => void;
  /** true のとき既知用語を自動でクリック化し、下に短い定義を出す */
  autoGlossaryTerms?: boolean;
  /** true のときモーダルではなく本文下にポツンと出す（既定 true） */
  inlineGlossaryBubble?: boolean;
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
  autoGlossaryTerms = true,
  inlineGlossaryBubble = true,
  linkColor = '#007BFF',
}: Props) {
  const segments = useMemo(
    () => applyAutoGlossary(parseLexiconMarkup(text), autoGlossaryTerms),
    [text, autoGlossaryTerms],
  );
  const [activeGlossary, setActiveGlossary] = useState<{ word: string; def: string } | null>(null);

  useEffect(() => {
    setActiveGlossary(null);
  }, [text]);

  if (!text) return null;

  const handleDictPress = (word: string, def: string) => {
    if (inlineGlossaryBubble) {
      setActiveGlossary((prev) => (prev && prev.word === word ? null : { word, def }));
      return;
    }
    onDictionaryPress?.(word, def);
  };

  const hasDict = segments.some((s) => s.kind === 'dict');
  if (!hasDict) {
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
          </ThemedText>,
        );
      }
      if (relReadEnd < s.length) {
        children.push(
          <ThemedText key={k++} style={[lineStyle, unreadStyle]}>
            {applyNames(s.slice(relReadEnd))}
          </ThemedText>,
        );
      }
    } else {
      const w = seg.word;
      plainCursor += w.length;
      children.push(
        <ThemedText
          key={k++}
          onPress={() => handleDictPress(seg.word, seg.def)}
          accessibilityRole="button"
          accessibilityLabel={`${seg.word}の意味を表示`}
          style={[
            lineStyle,
            {
              color: linkColor,
              textDecorationLine: 'underline',
              textDecorationStyle: 'dotted',
              fontWeight: '600',
            },
          ]}
        >
          {applyNames(w)}
        </ThemedText>,
      );
    }
  }

  return (
    <View style={{ width: '100%', gap: 8 }}>
      <ThemedText style={[lineStyle, { width: '100%' }]}>{children}</ThemedText>
      {inlineGlossaryBubble && activeGlossary ? (
        <View
          style={{
            alignSelf: 'flex-start',
            borderLeftWidth: 3,
            borderLeftColor: '#007BFF',
            backgroundColor: '#F0F7FF',
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 10,
            maxWidth: '100%',
          }}
        >
          <ThemedText style={{ color: '#1E3A5F', fontSize: 14, lineHeight: 21 }}>
            {activeGlossary.def}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}
