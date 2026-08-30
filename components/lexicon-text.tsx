import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BEGINNER_GLOSSARY_SORTED } from '@/utils/beginner-glossary';
import { splitPlainByStatuteRefs, type LearnStatuteLinkSeg } from '@/utils/learnStatuteInline';

export type LexiconSegment =
  | { kind: 'plain'; text: string }
  | { kind: 'dict'; word: string; def: string }
  | {
      kind: 'statute';
      label: string;
      lawName: string;
      articleNum: number;
      articleOf?: number;
      paragraphNum?: number;
    };

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

function applyStatuteLinks(segments: LexiconSegment[], enabled?: boolean): LexiconSegment[] {
  if (!enabled) return segments;
  return segments.flatMap((seg) => {
    if (seg.kind !== 'plain') return [seg];
    return splitPlainByStatuteRefs(seg.text).map((s: LearnStatuteLinkSeg): LexiconSegment => {
      if (s.kind === 'plain') return { kind: 'plain', text: s.text };
      return {
        kind: 'statute',
        label: s.label,
        lawName: s.lawName,
        articleNum: s.articleNum,
        articleOf: s.articleOf,
        paragraphNum: s.paragraphNum,
      };
    });
  });
}

function applyAutoGlossary(segments: LexiconSegment[], enabled?: boolean): LexiconSegment[] {
  if (!enabled) return segments;
  return segments.flatMap((seg) => (seg.kind === 'plain' ? splitPlainByAutoGlossary(seg.text) : [seg]));
}

/** TTS・読了インデックス用（タグを外し、表示語だけ残す） */
export function stripLexiconMarkupForPlain(source: string): string {
  return source.replace(/\[\[dict:(.+?)::[\s\S]*?\]\]/g, '$1');
}

function nowMs(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

/**
 * TTS の onBoundary は飛び飛びなので、推定速度で補間してカラオケを滑らかにする。
 * LexiconText 内のローカル状態のみ更新し、Context 全体の再描画は増やさない。
 */
function useSmoothSpokenIndex(targetIndex: number, textLength: number, playbackRate = 1, enabled = true) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const displayRef = useRef(0);
  const targetRef = useRef(targetIndex);
  const textLengthRef = useRef(textLength);
  const lastBoundaryTimeRef = useRef(nowMs());
  const lastBoundaryIndexRef = useRef(targetIndex);
  const velocityRef = useRef(Math.max(8, 12 * playbackRate));
  const playbackRateRef = useRef(playbackRate);
  const enabledRef = useRef(enabled);
  const rafRunningRef = useRef(false);
  const ensureRafRef = useRef<() => void>(() => {});

  useEffect(() => {
    playbackRateRef.current = playbackRate;
    velocityRef.current = Math.max(8, Math.min(56, velocityRef.current * 0.7 + 12 * playbackRate * 0.3));
  }, [playbackRate]);

  useEffect(() => {
    textLengthRef.current = textLength;
  }, [textLength]);

  useEffect(() => {
    enabledRef.current = enabled;
    if (!enabled) {
      displayRef.current = 0;
      lastBoundaryIndexRef.current = 0;
      targetRef.current = 0;
      setDisplayIndex(0);
    }
  }, [enabled]);

  useEffect(() => {
    let alive = true;
    let lastFrame = nowMs();
    let rafId = 0;

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.048, Math.max(0, (now - lastFrame) / 1000));
      lastFrame = now;

      const target = targetRef.current;
      const len = textLengthRef.current;

      if (!enabledRef.current || target <= 0) {
        if (displayRef.current !== 0) {
          displayRef.current = 0;
          setDisplayIndex(0);
        } else {
          displayRef.current = 0;
        }
        rafRunningRef.current = false;
        rafId = 0;
        return;
      }

      const elapsed = (now - lastBoundaryTimeRef.current) / 1000;
      const coast = lastBoundaryIndexRef.current + velocityRef.current * elapsed;
      const goal =
        len > 0 && target >= len
          ? len
          : Math.min(len, Math.max(target, coast));

      let cur = displayRef.current;
      const follow = 1 - Math.exp(-dt * 16);
      cur += (goal - cur) * follow;
      if (cur < target - 0.75) cur = target - 0.2;
      cur = Math.max(0, Math.min(len, cur));

      const nextInt = Math.floor(cur + 1e-6);
      const prevInt = Math.floor(displayRef.current + 1e-6);
      displayRef.current = cur;
      if (nextInt !== prevInt) {
        setDisplayIndex(nextInt);
      }

      const animating =
        len > 0 &&
        target > 0 &&
        (target < len || Math.abs(goal - cur) > 0.4);

      if (animating) {
        rafRunningRef.current = true;
        rafId = requestAnimationFrame(tick);
      } else {
        rafRunningRef.current = false;
        rafId = 0;
      }
    };

    ensureRafRef.current = () => {
      if (!alive || rafRunningRef.current) return;
      if (!enabledRef.current || targetRef.current <= 0) return;
      lastFrame = nowMs();
      rafRunningRef.current = true;
      rafId = requestAnimationFrame(tick);
    };

    ensureRafRef.current();

    return () => {
      alive = false;
      rafRunningRef.current = false;
      ensureRafRef.current = () => {};
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [textLength]);

  useEffect(() => {
    const now = nowMs();
    const prevTarget = targetRef.current;
    targetRef.current = targetIndex;

    if (!enabledRef.current || targetIndex <= 0) {
      displayRef.current = 0;
      lastBoundaryIndexRef.current = 0;
      setDisplayIndex(0);
      return;
    }

    // 明確な巻き戻しだけスナップ。小さな後退は点滅の原因になる
    if (targetIndex < displayRef.current - 24) {
      displayRef.current = targetIndex;
      lastBoundaryIndexRef.current = targetIndex;
      lastBoundaryTimeRef.current = now;
      setDisplayIndex(targetIndex);
      velocityRef.current = Math.max(8, 12 * playbackRateRef.current);
      ensureRafRef.current();
      return;
    }

    if (targetIndex > lastBoundaryIndexRef.current) {
      const dt = Math.max(0.05, (now - lastBoundaryTimeRef.current) / 1000);
      const jumped = targetIndex - lastBoundaryIndexRef.current;
      const instant = jumped / dt;
      velocityRef.current = Math.max(
        6,
        Math.min(56, velocityRef.current * 0.5 + instant * 0.5),
      );
      lastBoundaryIndexRef.current = targetIndex;
      lastBoundaryTimeRef.current = now;
    } else if (targetIndex !== prevTarget) {
      lastBoundaryIndexRef.current = targetIndex;
      lastBoundaryTimeRef.current = now;
    }

    if (textLength > 0 && targetIndex >= textLength) {
      displayRef.current = textLength;
      setDisplayIndex(textLength);
    }

    ensureRafRef.current();
  }, [targetIndex, textLength]);

  return enabled ? displayIndex : 0;
}

export type LexiconStatutePressInfo = {
  label: string;
  lawName: string;
  articleNum: number;
  articleOf?: number;
  paragraphNum?: number;
};

type Props = {
  text: string;
  lineStyle: StyleProp<TextStyle>;
  readStyle: StyleProp<TextStyle>;
  unreadStyle?: StyleProp<TextStyle>;
  /** stripLexiconMarkupForPlain 後の文字位置までを「読了」表示 */
  spokenIndex: number;
  applyNames: (s: string) => string;
  onDictionaryPress?: (word: string, definition: string) => void;
  /** true のとき「憲法19条・21条」などをクリック可能にする */
  linkStatutes?: boolean;
  onStatutePress?: (info: LexiconStatutePressInfo) => void;
  /** true のとき既知用語を自動でクリック化し、下に短い定義を出す */
  autoGlossaryTerms?: boolean;
  /** true のときモーダルではなく本文下にポツンと出す（既定 true） */
  inlineGlossaryBubble?: boolean;
  linkColor?: string;
  /** TTS 速度。カラオケ補間の初期速度に使う */
  playbackRate?: number;
  /** false のとき点灯しない（再生前の補間漏れ防止） */
  karaokeActive?: boolean;
};

/** Web で親 Text が幅100%だと子が縦積みになる。子は必ずインラインにする。 */
const webInlineChild: TextStyle | null =
  Platform.OS === 'web' ? ({ display: 'inline' } as TextStyle) : null;

/** 子に渡すと行が割れるレイアウトだけ落とす（中央寄せ・幅は親だけ）。 */
function childLineStyle(lineStyle: StyleProp<TextStyle>): TextStyle {
  const flat = { ...(StyleSheet.flatten(lineStyle) || {}) } as TextStyle;
  delete flat.width;
  delete flat.textAlign;
  delete flat.alignSelf;
  return flat;
}

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
  linkStatutes = false,
  onStatutePress,
  autoGlossaryTerms = true,
  inlineGlossaryBubble = true,
  linkColor = '#007BFF',
  playbackRate = 1,
  karaokeActive = false,
}: Props) {
  const segments = useMemo(
    () =>
      applyAutoGlossary(
        applyStatuteLinks(parseLexiconMarkup(text), linkStatutes),
        autoGlossaryTerms,
      ),
    [text, autoGlossaryTerms, linkStatutes],
  );
  const plainLength = useMemo(
    () =>
      segments.reduce((n, seg) => {
        if (seg.kind === 'plain') return n + seg.text.length;
        if (seg.kind === 'statute') return n + seg.label.length;
        return n + seg.word.length;
      }, 0),
    [segments],
  );
  const smoothedSpokenIndex = useSmoothSpokenIndex(
    karaokeActive ? spokenIndex : 0,
    plainLength,
    playbackRate,
    karaokeActive,
  );
  const displaySpokenIndex =
    karaokeActive && spokenIndex > 0 ? smoothedSpokenIndex : 0;
  const [activeGlossary, setActiveGlossary] = useState<{ word: string; def: string } | null>(null);

  useEffect(() => {
    setActiveGlossary(null);
  }, [text]);

  const handleDictPress = useCallback(
    (word: string, def: string) => {
      if (inlineGlossaryBubble) {
        setActiveGlossary((prev) => (prev && prev.word === word ? null : { word, def }));
        return;
      }
      onDictionaryPress?.(word, def);
    },
    [inlineGlossaryBubble, onDictionaryPress],
  );

  const children = useMemo(() => {
    if (!text) return null;

    const nodes: ReactNode[] = [];
    let plainCursor = 0;
    const innerLine = childLineStyle(lineStyle);
    const dictBase = {
      textDecorationLine: 'underline' as const,
      textDecorationStyle: 'dotted' as const,
      fontWeight: '600' as const,
    };

    segments.forEach((seg, segIndex) => {
      if (seg.kind === 'plain') {
        const s = seg.text;
        const start = plainCursor;
        plainCursor += s.length;
        const relReadEnd = Math.max(0, Math.min(displaySpokenIndex - start, s.length));
        if (relReadEnd > 0) {
          nodes.push(
            <ThemedText key={`p${segIndex}r`} style={[innerLine, webInlineChild, readStyle]}>
              {applyNames(s.slice(0, relReadEnd))}
            </ThemedText>,
          );
        }
        if (relReadEnd < s.length) {
          nodes.push(
            <ThemedText key={`p${segIndex}u`} style={[innerLine, webInlineChild, unreadStyle]}>
              {applyNames(s.slice(relReadEnd))}
            </ThemedText>,
          );
        }
        return;
      }

      if (seg.kind === 'statute') {
        const w = seg.label;
        plainCursor += w.length;
        nodes.push(
          <ThemedText
            key={`s${segIndex}`}
            onPress={() =>
              onStatutePress?.({
                label: seg.label,
                lawName: seg.lawName,
                articleNum: seg.articleNum,
                articleOf: seg.articleOf,
                paragraphNum: seg.paragraphNum,
              })
            }
            accessibilityRole="button"
            accessibilityLabel={`${seg.lawName}${seg.articleNum}条の条文を表示`}
            style={[
              innerLine,
              webInlineChild,
              {
                textDecorationLine: 'underline',
                fontWeight: '700',
                color: linkColor,
              },
            ]}
          >
            {applyNames(w)}
          </ThemedText>,
        );
        return;
      }

      const w = seg.word;
      plainCursor += w.length;
      nodes.push(
        <ThemedText
          key={`d${segIndex}`}
          onPress={() => handleDictPress(seg.word, seg.def)}
          accessibilityRole="button"
          accessibilityLabel={`${seg.word}の意味を表示`}
          style={[innerLine, webInlineChild, dictBase, { color: linkColor }]}
        >
          {applyNames(w)}
        </ThemedText>,
      );
    });

    return nodes;
  }, [
    text,
    segments,
    displaySpokenIndex,
    lineStyle,
    readStyle,
    unreadStyle,
    applyNames,
    linkColor,
    handleDictPress,
    onStatutePress,
  ]);

  if (!text) return null;

  const hasDict = segments.some((s) => s.kind === 'dict');
  const hasStatute = segments.some((s) => s.kind === 'statute');
  const textBlock = (
    <View style={{ width: '100%' }}>
      <ThemedText style={lineStyle}>{children}</ThemedText>
    </View>
  );

  if (!hasDict && !hasStatute) {
    return textBlock;
  }

  return (
    <View style={{ width: '100%', gap: 8 }}>
      {textBlock}
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
