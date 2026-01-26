import { View } from 'react-native';
import { ThemedText } from './themed-text';

type Props = {
    text: string;
};

export function MarkdownText({ text }: Props) {
    if (!text) return null;

    // Split by newlines first
    const lines = text.split('\n');

    return (
        <View style={{ gap: 8 }}>
            {lines.map((line, lineIndex) => {
                // Simple parser for **bold**
                // Split by **
                const parts = line.split(/(\*\*.*?\*\*)/g);

                return (
                    <ThemedText key={lineIndex} style={{ lineHeight: 28, fontSize: 16 }}>
                        {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                // Remove ** and render bold
                                return (
                                    <ThemedText key={partIndex} type="defaultSemiBold" style={{ fontWeight: 'bold', color: '#D32F2F' }}>
                                        {part.slice(2, -2)}
                                    </ThemedText>
                                );
                            }
                            return part;
                        })}
                    </ThemedText>
                );
            })}
        </View>
    );
}
