
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
import rigidConstitutionAngry from '@/assets/images/rigid_constitution_angry.jpg';
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
    'rigid_constitution': rigidConstitutionAngry,
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
        const regex = /\[\[(red|big|bold|marker|image|gift|gift_arrow|arrow|section|point):?(.+?)?\]\]/g;
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
                    type: type, // red, big, bold, marker, section, point
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
        const processedText = applyCharacterNames(text);
        const lines = processedText.split('\n');

        const blocks: { type: 'section' | 'plain', title?: string, content: any[][] }[] = [];
        let currentBlock: { type: 'section' | 'plain', title?: string, content: any[][] } | null = null;

        lines.forEach(line => {
            const parsedLine = parseRichText(line);
            const sectionTag = parsedLine.find(p => p.type === 'section');

            if (sectionTag) {
                // Start a new section block
                currentBlock = { type: 'section', title: sectionTag.content, content: [] };
                blocks.push(currentBlock);
                // Filter out the section tag from the line content if it has other content
                const filteredLine = parsedLine.filter(p => p.type !== 'section');
                if (filteredLine.length > 0) {
                    currentBlock.content.push(filteredLine);
                }
            } else {
                if (!currentBlock) {
                    currentBlock = { type: 'plain', content: [] };
                    blocks.push(currentBlock);
                }
                currentBlock.content.push(parsedLine);
            }
        });

        return blocks.map((block, blockIndex) => (
            <View key={blockIndex} style={[
                block.type === 'section' ? styles.sectionCard : {},
                { backgroundColor: block.type === 'section' ? colors.background : 'transparent' }
            ]}>
                {block.title && (
                    <ThemedText style={styles.sectionTitle}>{block.title}</ThemedText>
                )}
                {block.content.map((lineParts, lineIndex) => {
                    const isPoint = lineParts.some(p => p.type === 'point');
                    if (isPoint) {
                        const pointPart = lineParts.find(p => p.type === 'point');
                        return (
                            <View key={lineIndex} style={[styles.pointBox, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <MaterialIcons name="lightbulb" size={20} color={colors.primary} />
                                    <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>POINT / まとめ</ThemedText>
                                </View>
                                <ThemedText style={styles.line}>{pointPart?.content}</ThemedText>
                            </View>
                        );
                    }

                    // Special handling for lines that are JUST an image
                    if (lineParts.length === 1 && lineParts[0].type === 'image') {
                        const part = lineParts[0];
                        const imageSource = IMAGE_MAP[part.content];
                        if (imageSource) {
                            return (
                                <View key={lineIndex} style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
                                    <View style={[{ width: '60%', aspectRatio: 1, backgroundColor: colors.background + '80', borderRadius: 15, position: 'relative', overflow: 'hidden' }]}>
                                        <Image source={imageSource} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                    </View>
                                </View>
                            );
                        }
                    }

                    const hasLayoutTag = lineParts.some(p => ['image', 'gift_arrow', 'arrow'].includes(p.type));

                    if (!hasLayoutTag) {
                        return (
                            <ThemedText key={lineIndex} style={styles.lineWrapper}>
                                {lineParts.map((part, partIndex) => {
                                    switch (part.type) {
                                        case 'red':
                                            return <ThemedText key={partIndex} style={{ color: colors.primary, fontWeight: 'bold' }}>{part.content}</ThemedText>;
                                        case 'big':
                                            return <ThemedText key={partIndex} style={{ fontSize: 22, fontWeight: 'bold', lineHeight: 32 }}>{part.content}</ThemedText>;
                                        case 'bold':
                                            return <ThemedText key={partIndex} style={{ fontWeight: 'bold' }}>{part.content}</ThemedText>;
                                        case 'marker':
                                            return <ThemedText key={partIndex} style={{ backgroundColor: colors.primary + '30' }}>{part.content}</ThemedText>;
                                        default:
                                            return <ThemedText key={partIndex}>{part.content}</ThemedText>;
                                    }
                                })}
                            </ThemedText>
                        );
                    }

                    return (
                        <View key={lineIndex} style={styles.lineWrapperRow}>
                            {lineParts.map((part, partIndex) => {
                                switch (part.type) {
                                    case 'red':
                                        return <ThemedText key={partIndex} style={[styles.line, { color: colors.primary, fontWeight: 'bold' }]}>{part.content}</ThemedText>;
                                    case 'big':
                                        return <ThemedText key={partIndex} style={[styles.line, { fontSize: 22, fontWeight: 'bold', lineHeight: 32 }]}>{part.content}</ThemedText>;
                                    case 'bold':
                                        return <ThemedText key={partIndex} style={[styles.line, { fontWeight: 'bold' }]}>{part.content}</ThemedText>;
                                    case 'marker':
                                        return <ThemedText key={partIndex} style={[styles.line, { backgroundColor: colors.primary + '30' }]}>{part.content}</ThemedText>;
                                    case 'image':
                                        const img = IMAGE_MAP[part.content];
                                        if (img) {
                                            const isRigid = part.content === 'rigid_constitution';
                                            const size = isRigid ? 150 : 70;
                                            return (
                                                <View key={partIndex} style={{ alignItems: 'center', marginHorizontal: 3, marginVertical: isRigid ? 10 : 0 }}>
                                                    {part.label ? (
                                                        <View style={{ backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginBottom: 4 }}>
                                                            <ThemedText style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>{part.label}</ThemedText>
                                                        </View>
                                                    ) : <View style={{ height: isRigid ? 0 : 18 }} />}
                                                    <View style={{ width: size, height: size, borderRadius: isRigid ? 12 : size / 2, backgroundColor: '#fff', borderWidth: 2, borderColor: colors.primary + '30', overflow: 'hidden' }}>
                                                        <Image source={img} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                                    </View>
                                                </View>
                                            );
                                        }
                                        return <ThemedText key={partIndex} style={styles.line}>[画像なし]</ThemedText>;
                                    case 'gift_arrow':
                                        const isRight = part.content === 'right';
                                        return (
                                            <View key={partIndex} style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                                {part.or && <ThemedText style={{ position: 'absolute', top: -14, color: '#e74c3c', fontSize: 16, fontWeight: 'bold' }}>or</ThemedText>}
                                                <View style={{ width: '100%', height: 3, backgroundColor: colors.primary }} />
                                                <View style={{ position: 'absolute', [isRight ? 'right' : 'left']: -2, width: 0, height: 0, borderTopWidth: 8, borderBottomWidth: 8, [isRight ? 'borderLeftWidth' : 'borderRightWidth']: 12, borderTopColor: 'transparent', borderBottomColor: 'transparent', [isRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary }} />
                                                <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: colors.primary, padding: 1 }}><ThemedText style={{ fontSize: 16 }}>🎁</ThemedText></View>
                                            </View>
                                        );
                                    case 'arrow':
                                        const isArrowRight = part.content === 'right';
                                        return (
                                            <View key={partIndex} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: '100%', height: 3, backgroundColor: colors.primary }} />
                                                <View style={{ position: 'absolute', [isArrowRight ? 'right' : 'left']: -2, width: 0, height: 0, borderTopWidth: 8, borderBottomWidth: 8, [isArrowRight ? 'borderLeftWidth' : 'borderRightWidth']: 12, borderTopColor: 'transparent', borderBottomColor: 'transparent', [isArrowRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary }} />
                                            </View>
                                        );
                                    default:
                                        return <ThemedText key={partIndex} style={styles.line}>{part.content}</ThemedText>;
                                }
                            })}
                        </View>
                    );
                })}
            </View>
        ));
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {renderContent(explainText)}
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
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    line: {
        fontSize: 16,
        lineHeight: 28,
    },
    lineWrapper: {
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 12,
    },
    lineWrapperRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingVertical: 4,
        marginBottom: 8,
    },
    sectionCard: {
        padding: 24,
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
            android: { elevation: 4 },
            web: { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }
        })
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        paddingBottom: 10,
        color: '#333',
    },
    pointBox: {
        marginTop: 16,
        marginBottom: 8,
        padding: 20,
        borderRadius: 16,
        borderLeftWidth: 8,
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
