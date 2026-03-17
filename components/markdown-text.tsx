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
const RED_HIGHLIGHT = { fontWeight: 'bold' as const, color: '#D32F2F' };

export function MarkdownText({ text, style, onHighlightPress }: Props) {
    if (!text) return null;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;

    const lines = text.split('\n');

    return (
        <View style={{ gap: 8 }}>
            {lines.map((line, lineIndex) => {
                const parts = line.split(/(\*\*.*?\*\*)/g);

                return (
                    <View key={lineIndex} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 0 }}>
                        {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                const inner = part.slice(2, -2);
                                const sep = inner.indexOf('::');
                                const hasTooltip = sep >= 0 && onHighlightPress;
                                const displayText = hasTooltip ? inner.slice(0, sep) : inner;
                                const tooltip = hasTooltip ? inner.slice(sep + 2) : '';

                                if (hasTooltip && tooltip) {
                                    return (
                                        <Pressable
                                            key={partIndex}
                                            onPress={() => onHighlightPress(displayText, tooltip)}
                                            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, alignSelf: 'baseline' })}
                                        >
                                            <ThemedText type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                                {displayText}
                                            </ThemedText>
                                        </Pressable>
                                    );
                                }
                                return (
                                    <ThemedText key={partIndex} type="defaultSemiBold" style={[lineStyle, RED_HIGHLIGHT]}>
                                        {displayText}
                                    </ThemedText>
                                );
                            }
                            return (
                                <ThemedText key={partIndex} style={lineStyle}>
                                    {part}
                                </ThemedText>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}
