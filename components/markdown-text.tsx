import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import {
    BEGINNER_GLOSSARY_SORTED,
    type BeginnerGlossaryEntry,
} from '@/utils/beginner-glossary';
import { segmentDeepdiveTextForRender } from '@/utils/deepdive-tab-table';
import { normalizeMarkupForRender } from '@/utils/markup-tags';
import { ThemedText } from './themed-text';

type Props = {
    text: string;
    style?: StyleProp<TextStyle>;
    /** 登場人物・役割名の表示置換（A/B/C、連帯債務者A 等） */
    applyNames?: (text: string) => string;
    /** 赤字部分タップ時のコールバック。**text::tooltip** 形式のとき、tooltip を渡す */
    onHighlightPress?: (displayText: string, tooltip: string) => void;
    /** true のとき **太字**・赤字・ツールチップ表示を通常ウェイトに揃える（もっと深掘る等） */
    uniformWeight?: boolean;
    /** 行間（px）。未指定時は uniformWeight なら 4、そうでなければ 8 */
    lineGap?: number;
    /** `- 項目` 行を箇条書きとして字下げ・中黒表示 */
    bulletList?: boolean;
    /**
     * 重要語を自動でクリック化し、付近にミニ辞典を出す。
     * 未指定時は true（問題・解説・深掘り・チャンクなど全モード既定ON）。
     */
    autoGlossaryTerms?: boolean;
};

const defaultTextStyle = { lineHeight: 28, fontSize: 16 };
const BOLD_STYLE = { fontWeight: 'bold' as const };
const RED_HIGHLIGHT = { fontWeight: 'bold' as const, color: '#D32F2F' };

type GlossaryTerm = BeginnerGlossaryEntry;
const GLOSSARY_TERMS_SORTED = BEGINNER_GLOSSARY_SORTED;

type LinePart =
    | { type: 'plain'; text: string }
    | { type: 'bold'; text: string }
    | { type: 'red'; text: string }
    | { type: 'tooltip'; text: string; tooltip?: string }
    | { type: 'glossary'; text: string; tooltip: string }
    | { type: 'color'; color: string; bold?: boolean; children: LinePart[] };

function parseLine(line: string): LinePart[] {
    const parts: LinePart[] = [];
    let rest = line;
    while (rest.length > 0) {
        const redMatch = rest.match(/^\[\[red:([\s\S]+?)\]\]/);
        if (redMatch) {
            parts.push({ type: 'red', text: redMatch[1] });
            rest = rest.slice(redMatch[0].length);
            continue;
        }
        const colorOpen = rest.match(/^\[\[c:#([0-9a-fA-F]{6})(&b)?\]\]/);
        if (colorOpen) {
            rest = rest.slice(colorOpen[0].length);
            const closeIdx = rest.indexOf('[[/c]]');
            if (closeIdx >= 0) {
                const inner = rest.slice(0, closeIdx);
                rest = rest.slice(closeIdx + '[[/c]]'.length);
                parts.push({
                    type: 'color',
                    color: `#${colorOpen[1].toLowerCase()}`,
                    bold: !!colorOpen[2],
                    children: parseLine(inner),
                });
                continue;
            }
            parts.push({ type: 'plain', text: colorOpen[0] });
            continue;
        }
        const boldMatch = rest.match(/^(\*\*)(.+?)\*\*/);
        if (boldMatch) {
            const inner = boldMatch[2];
            const sep = inner.indexOf('::');
            if (sep >= 0) {
                parts.push({ type: 'tooltip', text: inner.slice(0, sep), tooltip: inner.slice(sep + 2) });
            } else if (/\[\[red:|\[\[c:#/.test(inner)) {
                parts.push(...parseLine(inner));
            } else {
                parts.push({ type: 'bold', text: inner });
            }
            rest = rest.slice(boldMatch[0].length);
            continue;
        }
        const nextRed = rest.indexOf('[[red:');
        const nextColor = rest.indexOf('[[c:#');
        const nextBold = rest.indexOf('**');
        let end = rest.length;
        const candidates = [nextRed, nextColor, nextBold].filter((n) => n >= 0);
        if (candidates.length > 0) end = Math.min(...candidates);
        if (end > 0) parts.push({ type: 'plain', text: rest.slice(0, end) });
        rest = rest.slice(end);
        if (end === 0 && rest.startsWith(']]')) {
            rest = rest.slice(2);
        }
        if (end === 0 && rest.startsWith('[[red:')) {
            rest = rest.slice(6);
        }
        if (end === 0 && rest.startsWith('**')) {
            parts.push({ type: 'plain', text: '**' });
            rest = rest.slice(2);
            continue;
        }
    }
    return parts;
}

function splitTextByGlossary(text: string, plainType: 'plain' | 'bold'): LinePart[] {
    const out: LinePart[] = [];
    let cursor = 0;
    while (cursor < text.length) {
        let best: { index: number; term: GlossaryTerm } | null = null;
        for (const term of GLOSSARY_TERMS_SORTED) {
            const index = text.indexOf(term[0], cursor);
            if (index < 0) continue;
            if (!best || index < best.index || (index === best.index && term[0].length > best.term[0].length)) {
                best = { index, term };
            }
        }
        if (!best) {
            const tail = text.slice(cursor);
            if (tail) out.push({ type: plainType, text: tail });
            break;
        }
        if (best.index > cursor) {
            out.push({ type: plainType, text: text.slice(cursor, best.index) });
        }
        out.push({ type: 'glossary', text: best.term[0], tooltip: best.term[1] });
        cursor = best.index + best.term[0].length;
    }
    return out;
}

function applyGlossaryTerms(parts: LinePart[], enabled?: boolean): LinePart[] {
    if (!enabled) return parts;
    return parts.flatMap((p): LinePart[] => {
        if (p.type === 'plain' || p.type === 'bold') {
            return splitTextByGlossary(p.text, p.type);
        }
        if (p.type === 'color') {
            return [{ ...p, children: applyGlossaryTerms(p.children, enabled) }];
        }
        return [p];
    });
}
function renderLineParts(
    parsed: LinePart[],
    lineStyle: StyleProp<TextStyle>,
    onHighlightPress: Props['onHighlightPress'],
    keyPrefix: string,
    uniformWeight?: boolean,
    onGlossaryPress?: (displayText: string, tooltip: string) => void
): ReactNode[] {
    return parsed.map((p, partIndex) => {
        const key = `${keyPrefix}-${partIndex}`;
        const redOnly = uniformWeight ? { color: RED_HIGHLIGHT.color } : RED_HIGHLIGHT;
        if (p.type === 'red') {
            return (
                <Text key={key} style={redOnly}>
                    {p.text}
                </Text>
            );
        }
        if (p.type === 'bold') {
            return (
                <Text key={key} style={uniformWeight ? undefined : BOLD_STYLE}>
                    {p.text}
                </Text>
            );
        }
        if (p.type === 'glossary') {
            return (
                <Text
                    key={key}
                    onPress={() => onGlossaryPress?.(p.text, p.tooltip)}
                    accessibilityRole="button"
                    accessibilityLabel={`${p.text}の意味を表示`}
                    style={[redOnly, { textDecorationLine: 'underline', textDecorationStyle: 'dotted' }]}
                >
                    {p.text}
                </Text>
            );
        }
        if (p.type === 'tooltip' && p.tooltip && onHighlightPress) {
            return (
                <Pressable
                    key={key}
                    onPress={() => onHighlightPress(p.text, p.tooltip!)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, alignSelf: 'baseline' })}
                >
                    <Text style={redOnly}>
                        {p.text}
                    </Text>
                </Pressable>
            );
        }
        if (p.type === 'tooltip') {
            return (
                <Text key={key} style={redOnly}>
                    {p.text}
                </Text>
            );
        }
        if (p.type === 'color') {
            const colorStyle: StyleProp<TextStyle> = [{ color: p.color }, p.bold && !uniformWeight ? BOLD_STYLE : null];
            return (
                <Text key={key} style={colorStyle}>
                    {renderLineParts(p.children, lineStyle, onHighlightPress, `${key}-c`, uniformWeight, onGlossaryPress)}
                </Text>
            );
        }
        return (
            <Text key={key}>
                {p.text}
            </Text>
        );
    });
}

/** 参照（成田新法事件タイプ）：無罫線・白・列間のみ広げる・ヘッダ行も本文と同じ字 */
const TABLE_ROW_BG = '#FFFFFF';
const TABLE_TEXT_COLOR = '#0F172A';
const TABLE_CELL_PAD = { paddingVertical: 2, paddingHorizontal: 0 };
/** Web・ネイティブ共通の列間（display:table は使わず flex で統一） */
const TABLE_COLUMN_GAP = Platform.OS === 'web' ? 32 : 24;
const TABLE_ROW_GAP_WEB_PX = 2;

/** 3列：左ラベル狭め・中央本文・右は判定（短文〜中くらいまで想定） */
const FLEX_3_COL_PROJECT = [1, 3.35, 1.45];
const FLEX_2_COL = [1, 2.35];
/** 4列（数字・要件表など）：制度・数字・請求先・条文 */
const FLEX_4_COL_NUMBERS = [1.35, 1.1, 0.95, 0.7];

function columnFlexWeights(colCount: number): number[] {
    if (colCount === 4) return FLEX_4_COL_NUMBERS;
    if (colCount === 3) return FLEX_3_COL_PROJECT;
    if (colCount === 2) return FLEX_2_COL;
    return Array(colCount).fill(1);
}

function minWidthForColumn(colCount: number, colIndex: number): number | undefined {
    if (colCount !== 3) return undefined;
    const m = [88, 112, 92];
    return m[colIndex];
}

/** `- item` / `* item` / `• item`（`**太字` 行頭は除外） */
const BULLET_LINE_RE = /^[-*•]\s+(.*)$/;
const HEADING_LINE_RE = /^(#{1,6})\s+(.*)$/;
const HR_LINE_RE = /^(-{3,}|\*{3,}|_{3,})$/;

type ClassifiedLine =
    | { kind: 'empty' }
    | { kind: 'hr' }
    | { kind: 'heading'; level: number; body: string }
    | { kind: 'bullet'; body: string }
    | { kind: 'plain'; body: string };

function classifyMarkdownLine(line: string, forceBulletList?: boolean): ClassifiedLine {
    const trimmed = line.trimEnd();
    if (!trimmed.trim()) return { kind: 'empty' };
    if (HR_LINE_RE.test(trimmed.trim())) return { kind: 'hr' };
    const heading = HEADING_LINE_RE.exec(trimmed);
    if (heading) return { kind: 'heading', level: heading[1].length, body: heading[2] };
    // `**太字**` で始まる行は箇条書きにしない
    if (!trimmed.startsWith('**')) {
        const bullet = BULLET_LINE_RE.exec(trimmed);
        if (bullet) return { kind: 'bullet', body: bullet[1] };
        if (forceBulletList) {
            const dashOnly = /^-\s+(.*)$/.exec(trimmed);
            if (dashOnly) return { kind: 'bullet', body: dashOnly[1] };
        }
    }
    return { kind: 'plain', body: trimmed };
}

function resolveFontSize(style: StyleProp<TextStyle>, fallback = 15): number {
    if (!style) return fallback;
    const list = (Array.isArray(style) ? style.flat(4) : [style]) as (TextStyle | null | undefined | false)[];
    for (let i = list.length - 1; i >= 0; i--) {
        const s = list[i];
        if (s && typeof s === 'object' && typeof s.fontSize === 'number') return s.fontSize;
    }
    return fallback;
}

function headingTextStyle(level: number, lineStyle: StyleProp<TextStyle>, uniformWeight?: boolean): StyleProp<TextStyle> {
    const baseSize = resolveFontSize(lineStyle, 15);
    const sizeBoost = level <= 2 ? 3 : level === 3 ? 2 : 1;
    return [
        lineStyle,
        {
            fontSize: baseSize + sizeBoost,
            lineHeight: (baseSize + sizeBoost) * 1.45,
            marginTop: level <= 3 ? 6 : 2,
            ...(uniformWeight ? null : { fontWeight: '700' as const }),
        },
    ];
}

function MarkdownPlainBlock({
    text,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    bulletList,
    keyPrefix,
    autoGlossaryTerms,
}: {
    text: string;
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    bulletList?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    const lines = normalizeMarkupForRender(text).split('\n');
    const [activeGlossary, setActiveGlossary] = useState<{ lineIndex: number; title: string; body: string } | null>(null);
    const toggleGlossary = (lineIndex: number, title: string, body: string) => {
        setActiveGlossary((prev) =>
            prev && prev.lineIndex === lineIndex && prev.title === title ? null : { lineIndex, title, body }
        );
    };
    const renderGlossaryBubble = (lineIndex: number) =>
        activeGlossary?.lineIndex === lineIndex ? (
            <View style={{ borderLeftWidth: 3, borderLeftColor: '#D32F2F', backgroundColor: '#FFF5F5', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 10 }}>
                <ThemedText type="defaultSemiBold" style={{ color: '#B91C1C', fontSize: 14, lineHeight: 20 }}>{activeGlossary.title}</ThemedText>
                <ThemedText style={{ color: '#3F1F1F', fontSize: 14, lineHeight: 21 }}>{activeGlossary.body}</ThemedText>
            </View>
        ) : null;
    const webBlock =
        Platform.OS === 'web' ? ({ display: 'block' } as unknown as TextStyle) : null;
    return (
        <View style={{ gap: lineGap, width: '100%', alignSelf: 'stretch' }}>
            {lines.map((line, lineIndex) => {
                const classified = classifyMarkdownLine(line, bulletList);
                if (classified.kind === 'empty') return null;
                if (classified.kind === 'hr') {
                    return (
                        <View
                            key={`${keyPrefix}-${lineIndex}`}
                            style={{ height: 1, backgroundColor: '#E2E8F0', marginVertical: 6, alignSelf: 'stretch' }}
                        />
                    );
                }
                const displayLine = classified.body;
                if (!displayLine.trim()) return null;
                const parsed = applyGlossaryTerms(parseLine(displayLine), autoGlossaryTerms);
                const appliedLineStyle =
                    classified.kind === 'heading'
                        ? headingTextStyle(classified.level, lineStyle, uniformWeight)
                        : lineStyle;
                const parts = renderLineParts(
                    parsed,
                    appliedLineStyle,
                    onHighlightPress,
                    `L${keyPrefix}-${lineIndex}`,
                    uniformWeight,
                    autoGlossaryTerms ? (title, body) => toggleGlossary(lineIndex, title, body) : undefined
                );
                if (classified.kind === 'bullet') {
                    return (
                        <View key={`${keyPrefix}-${lineIndex}`} style={{ width: '100%', alignSelf: 'stretch', gap: 6 }}>
                            <ThemedText
                                style={[
                                    lineStyle,
                                    {
                                        width: '100%',
                                        alignSelf: 'stretch',
                                        paddingLeft: 2,
                                        ...webBlock,
                                    },
                                ]}
                            >
                                {'• '}
                                {parts}
                            </ThemedText>
                            {renderGlossaryBubble(lineIndex)}
                        </View>
                    );
                }
                return (
                    <View key={`${keyPrefix}-${lineIndex}`} style={{ width: '100%', alignSelf: 'stretch', gap: 6 }}>
                        <ThemedText
                            style={[
                                appliedLineStyle,
                                {
                                    width: '100%',
                                    alignSelf: 'stretch',
                                    ...webBlock,
                                },
                            ]}
                        >
                            {parts}
                        </ThemedText>
                        {renderGlossaryBubble(lineIndex)}
                    </View>
                );
            })}
        </View>
    );
}

/** セル内のプレーン＋ネスト表（MarkdownText と同等だが循環参照しない） */
function DeepdiveRichSegments({
    text,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    bulletList,
    keyPrefix,
    autoGlossaryTerms,
}: {
    text: string;
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    bulletList?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    const segments = segmentDeepdiveTextForRender(text);
    return (
        <View style={{ gap: lineGap, width: '100%', alignSelf: 'stretch' }}>
            {segments.map((seg, si) => {
                if (seg.type === 'plain') {
                    const t = seg.text;
                    if (!t.trim()) return null;
                    return (
                        <MarkdownPlainBlock
                            key={`${keyPrefix}-p-${si}`}
                            text={t}
                            lineStyle={lineStyle}
                            lineGap={lineGap}
                            onHighlightPress={onHighlightPress}
                            uniformWeight={uniformWeight}
                            bulletList={bulletList}
                            keyPrefix={`${keyPrefix}-p-${si}`}
                            autoGlossaryTerms={autoGlossaryTerms}
                        />
                    );
                }
                return (
                    <MarkdownTabTable
                        key={`${keyPrefix}-t-${si}`}
                        rows={seg.rows}
                        lineStyle={lineStyle}
                        lineGap={lineGap}
                        onHighlightPress={onHighlightPress}
                        uniformWeight={uniformWeight}
                        keyPrefix={`${keyPrefix}-t-${si}`}
                        autoGlossaryTerms={autoGlossaryTerms}
                    />
                );
            })}
        </View>
    );
}

function MarkdownTabTable({
    rows,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    keyPrefix,
    autoGlossaryTerms,
}: {
    rows: string[][];
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    if (rows.length === 0) return null;
    const colCount = rows.reduce((m, r) => Math.max(m, r.length), 0);
    const weights = columnFlexWeights(colCount);

    /** 先頭行もデータ行も同一（参照：太字・下線・ヘッダ背景なし）。サイズは親のカード本文に追随 */
    const headerLineStyle: StyleProp<TextStyle> = [
        lineStyle,
        {
            color: TABLE_TEXT_COLOR,
            fontWeight: '400' as const,
        },
    ];

    /** Web でも display:table は RN Web で不安定なことがあるため、ネイティブと同一の flex 行で描画する */
    return (
        <View
            style={{
                alignSelf: 'stretch',
                width: '100%',
                borderWidth: 0,
                backgroundColor: TABLE_ROW_BG,
                gap: TABLE_ROW_GAP_WEB_PX,
            }}
        >
            {rows.map((cells, ri) => {
                const rowBg = TABLE_ROW_BG;
                return (
                    <View
                        key={`${keyPrefix}-row-${ri}`}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'flex-start',
                            gap: TABLE_COLUMN_GAP,
                            backgroundColor: rowBg,
                        }}
                    >
                        {cells.map((cell, ci) => {
                            const w = weights[ci] ?? 1;
                            const mw = minWidthForColumn(colCount, ci);
                            const isFirstCol = ci === 0;
                            return (
                                <View
                                    key={`${keyPrefix}-cell-${ri}-${ci}`}
                                    style={{
                                        flex: w,
                                        flexBasis: 0,
                                        flexShrink: colCount >= 2 && isFirstCol ? 0 : 1,
                                        minWidth: mw ?? 0,
                                        maxWidth: '100%',
                                        paddingVertical: TABLE_CELL_PAD.paddingVertical,
                                        paddingHorizontal: TABLE_CELL_PAD.paddingHorizontal,
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <DeepdiveRichSegments
                                        text={cell}
                                        lineStyle={headerLineStyle}
                                        lineGap={Math.min(lineGap, 4)}
                                        onHighlightPress={onHighlightPress}
                                        uniformWeight={uniformWeight}
                                        keyPrefix={`${keyPrefix}-c-${ri}-${ci}`}
                                        autoGlossaryTerms={autoGlossaryTerms}
                                    />
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

export function MarkdownText({
    text,
    style,
    applyNames,
    onHighlightPress,
    uniformWeight,
    lineGap: lineGapProp,
    bulletList,
    autoGlossaryTerms = true,
}: Props) {
    if (!text) return null;

    const displayText = applyNames ? applyNames(text) : text;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;
    const lineGap = lineGapProp ?? (uniformWeight ? 4 : 8);

    return (
        <DeepdiveRichSegments
            text={displayText}
            lineStyle={lineStyle}
            lineGap={lineGap}
            onHighlightPress={onHighlightPress}
            uniformWeight={uniformWeight}
            bulletList={bulletList}
            keyPrefix="md"
            autoGlossaryTerms={autoGlossaryTerms}
        />
    );
}
