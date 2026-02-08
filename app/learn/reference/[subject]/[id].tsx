
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { SUBJECTS } from '@/src/questions';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function ReferencePage() {
    const { subject, id } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();

    const questionIndex = parseInt(Array.isArray(id) ? id[0] : id || '0', 10);
    const subjectName = Array.isArray(subject) ? subject[0] : subject || '';

    // Find the question data
    let foundQuestion = null;
    if (subjectName) {
        for (const category of Object.values(SUBJECTS as any)) {
            if ((category as any)[subjectName]) {
                foundQuestion = (category as any)[subjectName]?.[questionIndex];
                break;
            }
        }
    }

    const explainText = foundQuestion?.explain || '解説が見つかりませんでした。';

    // Parse rich text
    const parseRichText = (text: string) => {
        // Regex for custom tags: [[tag:content]]
        const regex = /\[\[(red|big|bold|marker):(.+?)\]\]/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index),
                });
            }

            // Add the matched tag part
            parts.push({
                type: match[1], // red, big, bold, marker
                content: match[2],
            });

            lastIndex = regex.lastIndex;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex),
            });
        }

        return parts;
    };

    const renderContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, lineIndex) => {
            const parsedLine = parseRichText(line);
            return (
                <ThemedText key={lineIndex} style={styles.line}>
                    {parsedLine.map((part, partIndex) => {
                        switch (part.type) {
                            case 'red':
                                return (
                                    <ThemedText key={partIndex} style={{ color: colors.primary, fontWeight: 'bold' }}>
                                        {part.content}
                                    </ThemedText>
                                );
                            case 'big':
                                return (
                                    <ThemedText key={partIndex} style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 32 }}>
                                        {part.content}
                                    </ThemedText>
                                );
                            case 'bold':
                                return (
                                    <ThemedText key={partIndex} style={{ fontWeight: 'bold' }}>
                                        {part.content}
                                    </ThemedText>
                                );
                            case 'marker':
                                return (
                                    <ThemedText key={partIndex} style={{ backgroundColor: colors.primary + '40', color: colors.text }}>
                                        {part.content}
                                    </ThemedText>
                                );
                            default:
                                return <ThemedText key={partIndex}>{part.content}</ThemedText>;
                        }
                    })}
                </ThemedText>
            );
        });
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedView style={[styles.paper, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                    {renderContent(explainText)}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    paper: {
        padding: 24,
        borderRadius: 8,
        borderWidth: 1,
    },
    line: {
        fontSize: 18,
        lineHeight: 32,
        marginBottom: 8,
        textAlign: 'justify',
    },
});
