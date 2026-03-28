import type { ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { Pressable } from 'react-native';
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

export function MarkdownText({ text, style, onHighlightPress, uniformWeight }: Props) {
    if (!text) return null;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;

    const lines = text.split('\n');
    const lineGap = uniformWeight ? 4 : 8;

    return (
        <View style={{ gap: lineGap }}>
            {lines.map((line, lineIndex) => {
                const parsed = parseLine(line);
                return (
                    <View key={lineIndex} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 0 }}>
                        {renderLineParts(parsed, lineStyle, onHighlightPress, `L${lineIndex}`, uniformWeight)}
                    </View>
                );
            })}
        </View>
    );
}
