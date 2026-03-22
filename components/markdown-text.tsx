import { StyleProp, TextStyle, View } from 'react-native';
import { Pressable } from 'react-native';
import { ThemedText } from './themed-text';

type Props = {
    text: string;
    style?: StyleProp<TextStyle>;
    /** 赤字部分タップ時のコールバック。**text::tooltip** 形式のとき、tooltip を渡す */
    onHighlightPress?: (displayText: string, tooltip: string) => void;
};

const defaultTextStyle = { lineHeight: 28, fontSize: 16 };
const BOLD_STYLE = { fontWeight: 'bold' as const };
const RED_HIGHLIGHT = { fontWeight: 'bold' as const, color: '#D32F2F' };

function parseLine(line: string): Array<{ type: 'plain' | 'bold' | 'red' | 'tooltip'; text: string; tooltip?: string }> {
    const parts: Array<{ type: 'plain' | 'bold' | 'red' | 'tooltip'; text: string; tooltip?: string }> = [];
    let rest = line;
    while (rest.length > 0) {
        const redMatch = rest.match(/^\[\[red:(.+?)\]\]/);
        if (redMatch) {
            parts.push({ type: 'red', text: redMatch[1] });
            rest = rest.slice(redMatch[0].length);
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
        const nextBold = rest.indexOf('**');
        let end = rest.length;
        if (nextRed >= 0 && (nextBold < 0 || nextRed < nextBold)) end = nextRed;
        else if (nextBold >= 0) end = nextBold;
        if (end > 0) parts.push({ type: 'plain', text: rest.slice(0, end) });
        rest = rest.slice(end);
    }
    return parts;
}

export function MarkdownText({ text, style, onHighlightPress }: Props) {
    if (!text) return null;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;

    const lines = text.split('\n');

    return (
        <View style={{ gap: 8 }}>
            {lines.map((line, lineIndex) => {
                const parsed = parseLine(line);
                return (
                    <View key={lineIndex} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 0 }}>
                        {parsed.map((p, partIndex) => {
                            if (p.type === 'red') {
                                return (
                                    <ThemedText key={partIndex} type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                        {p.text}
                                    </ThemedText>
                                );
                            }
                            if (p.type === 'bold') {
                                return (
                                    <ThemedText key={partIndex} type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                        {p.text}
                                    </ThemedText>
                                );
                            }
                            if (p.type === 'tooltip' && p.tooltip && onHighlightPress) {
                                return (
                                    <Pressable
                                        key={partIndex}
                                        onPress={() => onHighlightPress(p.text, p.tooltip!)}
                                        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, alignSelf: 'baseline' })}
                                    >
                                        <ThemedText type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                            {p.text}
                                        </ThemedText>
                                    </Pressable>
                                );
                            }
                            if (p.type === 'tooltip') {
                                return (
                                    <ThemedText key={partIndex} type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                        {p.text}
                                    </ThemedText>
                                );
                            }
                            return (
                                <ThemedText key={partIndex} style={lineStyle}>
                                    {p.text}
                                </ThemedText>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}
