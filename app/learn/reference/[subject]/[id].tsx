
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { LEARN_CONTENT } from '@/src/learn';
import { SUBJECTS } from '@/src/questions';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

// Use import for static assets to ensure bundler resolves it correctly
import agencyDiagram from '@/assets/images/agency_diagram.jpg';
import chachalot from '@/assets/images/characters/chachalot.png';
import kachadokuro from '@/assets/images/characters/kachadokuro.png';
import kingKachadokuro from '@/assets/images/characters/king_kachadokuro.png';
import pitchi from '@/assets/images/characters/pitchi.png';
import princessKachadokuro from '@/assets/images/characters/princess_kachadokuro.png';
import taskTurtle from '@/assets/images/characters/task_turtle.png';
import summaryDiagram from '@/assets/images/summary_diagram_v4.jpg';

const IMAGE_MAP: Record<string, any> = {
    'summary_diagram': summaryDiagram,
    'chachalot': chachalot,
    'task': taskTurtle,
    'kachadokuro': kachadokuro,
    'king_kachadokuro': kingKachadokuro,
    'princess_kachadokuro': princessKachadokuro,
    'pitchi': pitchi,
    'agency_diagram': agencyDiagram,
};

export default function ReferencePage() {
    const { subject, id, originSubject, originId, originIndex } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();
    const { applyCharacterNames } = useCharacter();

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

    // Override for Agency Personation Diagram (Workaround for large questions.js)
    let explainText = foundQuestion?.explain || '解説が見つかりませんでした。';
    if (subjectName === '民法総論' && questionIndex === 54) {
        explainText = "[[image:agency_diagram]]";
    }
    if (subjectName === '民法総論' && questionIndex === 55) {
        explainText = "[[big:復代理人の引渡義務（民法107条2項）]]\n\n[[bold:【1. 復代理人の選任】]]\n[[image:chachalot:本人]] [[arrow:right]] [[image:pitchi:代理人]] [[arrow:right]] [[image:task:復代理人]]\n\n[[bold:【2. 目的物の受領】]]\n[[image:task:復代理人]] [[gift_arrow:left]] [[image:king_kachadokuro:相手方]]\n\n[[bold:【3. 本人または代理人への引渡し】]]\n[[image:chachalot:本人]] [[gift_arrow:left:or]] [[image:task:復代理人]] [[gift_arrow:right:or]] [[image:pitchi:代理人]]\nどちらかに渡せば義務を履行したことになります。\n\n[[big:【結論】]]\n[[marker:復代理人は、本人、代理人のいずれかに目的物を引き渡せば、引渡義務を履行したことになります。]]";
    }

    // Mini Player State
    const [isPlaying, setIsPlaying] = useState(false);

    const chunks = foundQuestion?.chunks || [];

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

            // Apply character name replacements
            contentToRead = applyCharacterNames(contentToRead);

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
        // Regex for custom tags: [[tag:content]] or [[gift]]/[[gift_arrow:direction]]/[[arrow:direction]]
        const regex = /\[\[(red|big|bold|marker|image|gift|gift_arrow|arrow):?(.+?)?\]\]/g;
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
            const type = match[1];
            const rawContent = match[2] || "";

            if (type === 'image') {
                const [content, label] = rawContent.split(':');
                parts.push({ type: 'image', content, label });
            } else if (type === 'gift_arrow') {
                const [content, or] = rawContent.split(':');
                parts.push({ type: 'gift_arrow', content, or: or === 'or' });
            } else {
                parts.push({
                    type: type, // red, big, bold, marker
                    content: rawContent,
                });
            }

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
        // Apply character names before parsing rich text
        const processedText = applyCharacterNames(text);
        const lines = processedText.split('\n');
        return lines.map((line, lineIndex) => {
            const parsedLine = parseRichText(line);

            // Special handling for lines that are JUST an image
            if (parsedLine.length === 1 && parsedLine[0].type === 'image') {
                const part = parsedLine[0];
                const imageSource = IMAGE_MAP[part.content];
                if (imageSource) {
                    let imageStyle: any = { width: '100%', height: '100%' };
                    let wrapperStyle: any = { width: '40%', minHeight: 120, aspectRatio: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginVertical: 5 };

                    // Custom clipping for specific characters
                    if (part.content === 'pitchi') {
                        // Chick: Standard center (Show name)
                        imageStyle = { width: '100%', height: '100%', position: 'absolute' };
                    } else if (part.content === 'task') {
                        // Turtle: Standard center (Show name)
                        imageStyle = { width: '100%', height: '100%', position: 'absolute' };
                    } else if (part.content === 'chachalot') {
                        imageStyle = { width: '100%', height: '100%', position: 'absolute' };
                    } else if (part.content === 'kachadokuro' || part.content === 'king_kachadokuro' || part.content === 'princess_kachadokuro') {
                        imageStyle = { width: '100%', height: '100%', position: 'absolute' };
                    }

                    return (
                        <View key={lineIndex} style={{ width: '100%', alignItems: 'center' }}>
                            <View style={[wrapperStyle, { backgroundColor: colors.background + '80', borderRadius: 15, position: 'relative' }]}>
                                <Image
                                    source={imageSource}
                                    style={imageStyle}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    );
                }
            }

            return (
                <View key={lineIndex} style={[styles.lineWrapper, { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingVertical: 2 }]}>
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
                                    <ThemedText key={partIndex} style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 28 }}>
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
                            case 'image':
                                const imageSource = IMAGE_MAP[part.content];
                                if (imageSource) {
                                    let imageStyle: any = { width: '100%', height: '100%', position: 'absolute' };
                                    let containerSize = 75;

                                    // Reset to standard 100% since names are in images now
                                    imageStyle = { width: '100%', height: '100%', position: 'absolute' };

                                    return (
                                        <View key={partIndex} style={{ alignItems: 'center', marginHorizontal: 3 }}>
                                            {part.label ? (
                                                <View style={{ backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 6, marginBottom: 4, zIndex: 10 }}>
                                                    <ThemedText style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>{part.label}</ThemedText>
                                                </View>
                                            ) : <View style={{ height: 18 }} />}
                                            <View style={{ width: containerSize, height: containerSize, overflow: 'hidden', borderRadius: 25, backgroundColor: '#fff', borderWidth: 3, borderColor: colors.primary + '30', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image
                                                    source={imageSource}
                                                    style={imageStyle}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                        </View>
                                    );
                                }
                                return <ThemedText key={partIndex}>[画像なし]</ThemedText>;
                            case 'gift_arrow':
                                const isRight = part.content === 'right';
                                return (
                                    <View key={partIndex} style={{ width: 80, height: 60, alignItems: 'center', justifyContent: 'center', marginHorizontal: -12 }}>
                                        {/* "or" Indicator */}
                                        {part.or && (
                                            <ThemedText style={{ position: 'absolute', top: -15, color: '#e74c3c', fontSize: 24, fontWeight: 'bold', zIndex: 40, fontFamily: Platform.OS === 'ios' ? 'Marker Felt' : 'monospace' }}>or</ThemedText>
                                        )}

                                        {/* Horizontal Arrow Line */}
                                        <View style={{ width: 80, height: 4, backgroundColor: colors.primary, zIndex: 1 }} />

                                        {/* Arrow Tip */}
                                        <View style={{
                                            position: 'absolute',
                                            [isRight ? 'right' : 'left']: -2,
                                            width: 0,
                                            height: 0,
                                            backgroundColor: 'transparent',
                                            borderStyle: 'solid',
                                            borderLeftWidth: isRight ? 20 : 0,
                                            borderRightWidth: isRight ? 0 : 20,
                                            borderBottomWidth: 14,
                                            borderTopWidth: 14,
                                            borderLeftColor: isRight ? colors.primary : 'transparent',
                                            borderRightColor: isRight ? 'transparent' : colors.primary,
                                            zIndex: 2
                                        }} />

                                        {/* Gift Box centered on line */}
                                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: colors.primary, padding: 2, zIndex: 30, elevation: 5 }}>
                                            <ThemedText style={{ fontSize: 24 }}>🎁</ThemedText>
                                        </View>
                                    </View>
                                );
                            case 'arrow':
                                const isArrowRight = part.content === 'right';
                                return (
                                    <View key={partIndex} style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', marginHorizontal: -5 }}>
                                        {/* Horizontal Arrow Line */}
                                        <View style={{ width: 60, height: 4, backgroundColor: colors.primary, zIndex: 1 }} />

                                        {/* Arrow Tip */}
                                        <View style={{
                                            position: 'absolute',
                                            [isArrowRight ? 'right' : 'left']: -2,
                                            width: 0,
                                            height: 0,
                                            backgroundColor: 'transparent',
                                            borderStyle: 'solid',
                                            borderLeftWidth: isArrowRight ? 16 : 0,
                                            borderRightWidth: isArrowRight ? 0 : 16,
                                            borderBottomWidth: 10,
                                            borderTopWidth: 10,
                                            borderLeftColor: isArrowRight ? colors.primary : 'transparent',
                                            borderRightColor: isArrowRight ? 'transparent' : colors.primary,
                                            zIndex: 2
                                        }} />
                                    </View>
                                );
                            case 'gift':
                                return (
                                    <View key={partIndex} style={{ width: 30, height: 30, backgroundColor: colors.primary + '20', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2 }}>
                                        <ThemedText style={{ fontSize: 18 }}>🎁</ThemedText>
                                    </View>
                                );
                            default:
                                return <ThemedText key={partIndex}>{part.content}</ThemedText>;
                        }
                    })}
                </View>
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


            <Pressable
                onPress={() => {
                    if (originSubject) {
                        router.replace({
                            pathname: `/learn/[subject]` as any,
                            params: {
                                subject: originSubject,
                                index: originIndex || '0'
                            }
                        });
                    } else {
                        router.back();
                    }
                }}
                style={styles.backButton}
            >
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
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    lineWrapper: {
        marginVertical: 2,
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
    chunkButton: {
        alignSelf: 'center',
        marginBottom: 10,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 16,
        padding: 24,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    chunkItem: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },
    chunkItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    chunkItemSubject: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    chunkItemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
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
