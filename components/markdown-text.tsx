import type { ReactNode } from 'react';
import { Platform, Pressable, StyleProp, TextStyle, View } from 'react-native';
import { segmentDeepdiveTextForRender } from '@/utils/deepdive-tab-table';
import { ThemedText } from './themed-text';

type Props = {
    text: string;
    style?: StyleProp<TextStyle>;
    /** 赤字部分タップ時のコールバック。**text::tooltip** 形式のとき、tooltip を渡す */
    onHighlightPress?: (displayText: string, tooltip: string) => void;
    /** true のとき **太字**・赤字・ツールチップ表示を通常ウェイトに揃える（もっと深掘る等） */
    uniformWeight?: boolean;
};

const defaultTextStyle = { lineHeight: 28, fontSize: 16 };
const BOLD_STYLE = { fontWeight: 'bold' as const };
const RED_HIGHLIGHT = { fontWeight: 'bold' as const, color: '#D32F2F' };

type LinePart =
    | { type: 'plain'; text: string }
    | { type: 'bold'; text: string }
    | { type: 'red'; text: string }
    | { type: 'tooltip'; text: string; tooltip?: string }
    | { type: 'color'; color: string; bold?: boolean; children: LinePart[] };

function parseLine(line: string): LinePart[] {
    const parts: LinePart[] = [];
    let rest = line;
    while (rest.length > 0) {
        const redMatch = rest.match(/^\[\[red:(.+?)\]\]/);
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
    }
    return parts;
}

function renderLineParts(
    parsed: LinePart[],
    lineStyle: typeof defaultTextStyle | (typeof defaultTextStyle | TextStyle)[],
    onHighlightPress: Props['onHighlightPress'],
    keyPrefix: string,
    uniformWeight?: boolean
): ReactNode[] {
    return parsed.map((p, partIndex) => {
        const key = `${keyPrefix}-${partIndex}`;
        const redOnly = uniformWeight ? { color: RED_HIGHLIGHT.color } : RED_HIGHLIGHT;
        const redType = uniformWeight ? 'default' : 'defaultSemiBold';
        if (p.type === 'red') {
            return (
                <ThemedText key={key} type={redType} style={[lineStyle, redOnly]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'bold') {
            return (
                <ThemedText key={key} type="default" style={uniformWeight ? lineStyle : [lineStyle, BOLD_STYLE]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'tooltip' && p.tooltip && onHighlightPress) {
            return (
                <Pressable
                    key={key}
                    onPress={() => onHighlightPress(p.text, p.tooltip!)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, alignSelf: 'baseline' })}
                >
                    <ThemedText type={redType} style={[lineStyle, redOnly]}>
                        {p.text}
                    </ThemedText>
                </Pressable>
            );
        }
        if (p.type === 'tooltip') {
            return (
                <ThemedText key={key} type={redType} style={[lineStyle, redOnly]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'color') {
            const colorStyle = [lineStyle, { color: p.color }, p.bold && !uniformWeight ? BOLD_STYLE : null].filter(Boolean);
            return (
                <ThemedText key={key} type="default" style={colorStyle as TextStyle[]}>
                    {renderLineParts(p.children, lineStyle, onHighlightPress, `${key}-c`, uniformWeight)}
                </ThemedText>
            );
        }
        return (
            <ThemedText key={key} style={lineStyle}>
                {p.text}
            </ThemedText>
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

function columnFlexWeights(colCount: number): number[] {
    if (colCount === 3) return FLEX_3_COL_PROJECT;
    if (colCount === 2) return FLEX_2_COL;
    return Array(colCount).fill(1);
}

function minWidthForColumn(colCount: number, colIndex: number): number | undefined {
    if (colCount !== 3) return undefined;
    const m = [88, 112, 92];
    return m[colIndex];
}

function MarkdownPlainBlock({
    text,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    keyPrefix,
}: {
    text: string;
    lineStyle: typeof defaultTextStyle | (typeof defaultTextStyle | TextStyle)[];
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    keyPrefix: string;
}) {
    const lines = text.split('\n');
    return (
        <View style={{ gap: lineGap }}>
            {lines.map((line, lineIndex) => {
                const parsed = parseLine(line);
                return (
                    <View
                        key={`${keyPrefix}-${lineIndex}`}
                        style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 0 }}
                    >
                        {renderLineParts(parsed, lineStyle, onHighlightPress, `L${keyPrefix}-${lineIndex}`, uniformWeight)}
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
    keyPrefix,
}: {
    text: string;
    lineStyle: typeof defaultTextStyle | (typeof defaultTextStyle | TextStyle)[];
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    keyPrefix: string;
}) {
    const segments = segmentDeepdiveTextForRender(text);
    return (
        <View style={{ gap: lineGap }}>
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
                            keyPrefix={`${keyPrefix}-p-${si}`}
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
}: {
    rows: string[][];
    lineStyle: typeof defaultTextStyle | (typeof defaultTextStyle | TextStyle)[];
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    keyPrefix: string;
}) {
    if (rows.length === 0) return null;
    const colCount = rows.reduce((m, r) => Math.max(m, r.length), 0);
    const weights = columnFlexWeights(colCount);

    /** 先頭行もデータ行も同一（参照：太字・下線・ヘッダ背景なし）。サイズは親のカード本文に追随 */
    const headerLineStyle = [
        ...(Array.isArray(lineStyle) ? lineStyle : [lineStyle]),
        {
            color: TABLE_TEXT_COLOR,
            fontWeight: '400' as const,
        },
    ] as const;

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
                                        lineStyle={headerLineStyle as typeof lineStyle}
                                        lineGap={Math.min(lineGap, 4)}
                                        onHighlightPress={onHighlightPress}
                                        uniformWeight={uniformWeight}
                                        keyPrefix={`${keyPrefix}-c-${ri}-${ci}`}
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

export function MarkdownText({ text, style, onHighlightPress, uniformWeight }: Props) {
    if (!text) return null;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;
    const lineGap = uniformWeight ? 4 : 8;

    return (
        <DeepdiveRichSegments
            text={text}
            lineStyle={lineStyle}
            lineGap={lineGap}
            onHighlightPress={onHighlightPress}
            uniformWeight={uniformWeight}
            keyPrefix="md"
        />
    );
}
