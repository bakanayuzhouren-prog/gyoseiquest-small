
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { LEARN_CONTENT } from '@/src/learn';
import { SUBJECTS } from '@/src/questions';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';

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

    // Mini Player State
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return () => { Speech.stop(); };
    }, []);

    const handleTogglePlay = () => {
        if (isPlaying) {
            Speech.stop();
            setIsPlaying(false);
        } else {
            // Get original learn content for TTS (not the Deep Dive explanation)
            let contentToRead = '解説が見つかりませんでした。';

            if (subjectName && (LEARN_CONTENT as any)[subjectName]) {
                const subjectContent = (LEARN_CONTENT as any)[subjectName];
                // id is the index, same as question index
                if (Array.isArray(subjectContent) && subjectContent[questionIndex]) {
                    contentToRead = subjectContent[questionIndex];
                }
            }

            // Remove [[LINK:...]] and everything after it
            // Using a more robust regex to catch variations and ensure split works
            contentToRead = contentToRead.split(/\[\[LINK:/)[0];

            // Just in case, clean up any remaining potential tags
            contentToRead = contentToRead.replace(/\[\[.*?\]\]/g, '');

            // Apply TTS rules
            const spokenText = applyTTSRules(contentToRead);

            let count = 0;
            const speak = () => {
                if (count >= 3) {
                    setIsPlaying(false);
                    return;
                }
                count++;
                Speech.speak(spokenText, {
                    language: 'ja',
                    rate: 2.0,
                    onDone: speak,
                    onError: () => setIsPlaying(false),
                });
            };

            setIsPlaying(true);
            speak();
        }
    };

    const handleNext = () => {
        Speech.stop();
        setIsPlaying(false);
        // Navigate to next question if exists
        // This requires knowing the max index for the subject.
        // We can check if the next index exists in the data.
        const nextIndex = questionIndex + 1;

        let nextQuestion = null;
        if (subjectName) {
            for (const category of Object.values(SUBJECTS as any)) {
                if ((category as any)[subjectName]) {
                    nextQuestion = (category as any)[subjectName]?.[nextIndex];
                    break;
                }
            }
        }

        if (nextQuestion && nextQuestion.explain) {
            router.replace({
                pathname: `/learn/reference/[subject]/[id]` as any,
                params: { subject: subjectName, id: nextIndex }
            });
        } else {
            alert('次の解説はありません。');
        }
    };

    const handlePrev = () => {
        Speech.stop();
        setIsPlaying(false);
        if (questionIndex > 0) {
            const prevIndex = questionIndex - 1;
            // Check if strict existence is needed or just navigate?
            // Assuming previous index exists and has explanation is safer? 
            // Just navigating back to 0 is safe.
            router.replace({
                pathname: `/learn/reference/[subject]/[id]` as any,
                params: { subject: subjectName, id: prevIndex }
            });
        } else {
            alert('前の解説はありません。');
        }
    };

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

            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>学習へ戻る</ThemedText>
            </Pressable>

            {/* Mini Player */}
            <ThemedView style={[styles.miniPlayer, { borderTopColor: colors.choiceBorder, backgroundColor: colors.background }]}>
                <Pressable onPress={handlePrev} style={styles.controlButton}>
                    <MaterialIcons name="skip-previous" size={32} color={colors.primary} />
                </Pressable>

                <Pressable onPress={handleTogglePlay} style={styles.playButton}>
                    <MaterialIcons
                        name={isPlaying ? "stop-circle" : "play-circle-filled"}
                        size={48}
                        color={colors.primary}
                    />
                </Pressable>

                <Pressable onPress={handleNext} style={styles.controlButton}>
                    <MaterialIcons name="skip-next" size={32} color={colors.primary} />
                </Pressable>
            </ThemedView>
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
    backButton: {
        alignSelf: 'center',
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    miniPlayer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        gap: 40,
        // Add shadow for elevation
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
            }
        }),
    },
    controlButton: {
        padding: 8,
    },
    playButton: {
        padding: 0,
    },
});
