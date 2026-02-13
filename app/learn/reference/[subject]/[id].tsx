
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { SUBJECTS } from '@/src/questions';
import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const IMAGE_RESOURCES_MAP: Record<string, any> = {
    'summary_diagram': require('@/assets/images/summary_diagram_v4.jpg'),
    'chachalot': require('@/assets/images/characters/chachalot.png'),
    'task': require('@/assets/images/characters/task_turtle.png'),
    'kachadokuro': require('@/assets/images/characters/kachadokuro.png'),
    'king_kachadokuro': require('@/assets/images/characters/king_kachadokuro.png'),
    'princess_kachadokuro': require('@/assets/images/characters/princess_kachadokuro.png'),
    'pitchi': require('@/assets/images/characters/pitchi.png'),
    'agency_diagram': require('@/assets/images/agency_diagram.jpg'),
    'rigid_constitution': require('@/assets/images/rigid_v2.jpg'),
    'flexible_constitution': require('@/assets/images/flexible_v2.jpg'),
    'yahata_steel': require('@/assets/images/yahata_steel.png'),
};

export default function ReferencePage() {
    const { subject, id, originSubject, originId, originIndex } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { applyCharacterNames } = useCharacter();

    const [currentChunkIndex, setCurrentChunkIndex] = useState<number | null>(null);

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

    // Dynamic chunks from synchronized data
    const chunks = foundQuestion?.chunks || [];

    const initialExplain = foundQuestion?.explain || '解説が見つかりませんでした。';

    // Choose between main explanation and chunk/dig-deeper content
    const explainText = currentChunkIndex !== null ? chunks[currentChunkIndex].explain : initialExplain;
    const currentTitle = currentChunkIndex !== null ? chunks[currentChunkIndex].title : foundQuestion?.title;

    // Mini Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImageSource, setSelectedImageSource] = useState<any>(null);

    useEffect(() => {
        return () => { Speech.stop(); };
    }, []);

    const handleTogglePlay = () => {
        if (isPlaying) {
            Speech.stop();
            setIsPlaying(false);
        } else {
            // Read current text (either main explain or chunk explain)
            let contentToRead = explainText;

            // Remove tags
            contentToRead = contentToRead.replace(/\[\[.*?\]\]/g, '');
            contentToRead = applyCharacterNames(contentToRead);
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

        if (nextQuestion) {
            setCurrentChunkIndex(null);
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
            setCurrentChunkIndex(null);
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
        const regex = /\[\[(red|big|bold|marker|image|gift|gift_arrow|arrow|section|point):?(.+?)?\]\]/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index),
                });
            }

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
                    type: type,
                    content: rawContent,
                });
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex),
            });
        }

        return parts;
    };

    const renderContent = (text: string) => {
        // 1. Pre-process text to ensure ■ and 💡 start on new lines
        const processedText = applyCharacterNames(text)
            .replace(/([^\n])\s*([■💡])/g, '$1\n$2');

        const lines = processedText.split('\n');

        const blocks: { type: 'section' | 'plain', title?: string, content: any[][] }[] = [];
        let currentBlock: { type: 'section' | 'plain', title?: string, content: any[][] } | null = null;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return; // Skip empty lines to prevent empty cards

            const parsedLine = parseRichText(line);

            const sectionTag = parsedLine.find(p => p.type === 'section');
            const isNumericHeader = /^[0-9]+[\.．]/.test(trimmedLine);
            const isCircledNumber = /^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmedLine);
            const isQAHeader = /^[Qq](＆|&)[Aa]|^[Qq][0-9]*[\.．]/.test(trimmedLine);
            const isCaseHeader = /^【?[0-9]*[\.．]?事例/.test(trimmedLine);
            const isBlockSymbol = /^[■💡]/.test(trimmedLine);

            const isNewSection = sectionTag || isNumericHeader || isCircledNumber || isQAHeader || isCaseHeader || isBlockSymbol;

            if (isNewSection) {
                // If it's a block symbol (■/💡), treat it as content in a new card
                // Otherwise, treat it as a title
                const title = (sectionTag ? sectionTag.content : (isBlockSymbol ? undefined : trimmedLine));

                currentBlock = { type: 'section', title: title, content: [] };
                blocks.push(currentBlock);

                if (sectionTag) {
                    const filteredLine = parsedLine.filter(p => p.type !== 'section');
                    if (filteredLine.length > 0) {
                        currentBlock.content.push(filteredLine);
                    }
                } else if (isBlockSymbol) {
                    // Add the line as content immediately
                    currentBlock.content.push(parsedLine);
                }
            } else {
                if (!currentBlock) {
                    currentBlock = { type: 'plain', content: [] };
                    blocks.push(currentBlock);
                }
                currentBlock.content.push(parsedLine);
            }
        });

        const isModern = theme === 'modern';
        const cardBg = isModern ? ['#EBF8FF', '#F0F9FF'] : [colors.card, colors.card];
        const borderCol = isModern ? '#BEE3F8' : 'rgba(0,0,0,0.03)';
        const mainTextCol = isModern ? '#2C5282' : '#2c3e50';

        return blocks.map((block, blockIndex) => {
            return (
                <View key={blockIndex} style={styles.cardWrapper}>
                    <LinearGradient
                        colors={cardBg as any}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                            styles.sectionCard,
                            { borderColor: borderCol },
                            block.type === 'plain' ? { borderWidth: 0, elevation: 0, shadowOpacity: 0, backgroundColor: 'transparent' } : {},
                        ]}
                    >
                        {block.title && (
                            <View style={styles.sectionHeader}>
                                <ThemedText style={[styles.sectionTitle, { color: mainTextCol }]}>{block.title}</ThemedText>
                            </View>
                        )}
                        <View style={[styles.cardBody, !block.title && block.type === 'section' && { paddingTop: 20 }]}>
                            {block.content.map((lineParts, lineIndex) => {
                                const isPoint = lineParts.some(p => p.type === 'point');
                                if (isPoint) {
                                    const pointPart = lineParts.find(p => p.type === 'point');
                                    return (
                                        <View key={lineIndex} style={[styles.pointBox, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                                <MaterialIcons name="stars" size={22} color={colors.primary} />
                                                <ThemedText style={{ color: colors.primary, fontWeight: 'bold', fontSize: 13, letterSpacing: 1 }}>CHECK / ポイント</ThemedText>
                                            </View>
                                            <ThemedText style={styles.pointText}>{pointPart?.content}</ThemedText>
                                        </View>
                                    );
                                }

                                if (lineParts.length === 1 && lineParts[0].type === 'image') {
                                    const part = lineParts[0];
                                    const imageSource = IMAGE_RESOURCES_MAP[part.content];
                                    if (imageSource) {
                                        return (
                                            <View key={lineIndex} style={{ width: '100%', alignItems: 'center', marginVertical: 15 }}>
                                                <View style={styles.imageContainer}>
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
                                                        return <ThemedText key={partIndex} style={{ color: '#e74c3c', fontWeight: 'bold' }}>{part.content}</ThemedText>;
                                                    case 'big':
                                                        return <ThemedText key={partIndex} style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 30, color: mainTextCol }}>{part.content}</ThemedText>;
                                                    case 'bold':
                                                        return <ThemedText key={partIndex} style={{ fontWeight: 'bold', color: mainTextCol }}>{part.content}</ThemedText>;
                                                    case 'marker':
                                                        return <ThemedText key={partIndex} style={styles.markerText}>{part.content}</ThemedText>;
                                                    default:
                                                        return <ThemedText key={partIndex} style={{ color: mainTextCol }}>{part.content}</ThemedText>;
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
                                                    return <ThemedText key={partIndex} style={[styles.line, { color: '#e74c3c', fontWeight: 'bold' }]}>{part.content}</ThemedText>;
                                                case 'big':
                                                    return <ThemedText key={partIndex} style={[styles.line, { fontSize: 20, fontWeight: 'bold', lineHeight: 30, color: mainTextCol }]}>{part.content}</ThemedText>;
                                                case 'bold':
                                                    return <ThemedText key={partIndex} style={[styles.line, { fontWeight: 'bold', color: mainTextCol }]}>{part.content}</ThemedText>;
                                                case 'marker':
                                                    return <ThemedText key={partIndex} style={[styles.line, styles.markerText]}>{part.content}</ThemedText>;
                                                case 'image':
                                                    const img = IMAGE_RESOURCES_MAP[part.content];
                                                    if (img) {
                                                        const isLargeImage = part.content.includes('rigid_constitution') || part.content.includes('flexible_constitution');
                                                        const size = isLargeImage ? 150 : 70;
                                                        return (
                                                            <Pressable
                                                                key={partIndex}
                                                                onPress={() => setSelectedImageSource(img)}
                                                                style={{ alignItems: 'center', marginHorizontal: 5, marginVertical: isLargeImage ? 15 : 5 }}
                                                            >
                                                                {part.label ? (
                                                                    <View style={{ backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 6 }}>
                                                                        <ThemedText style={{ fontSize: 11, color: '#fff', fontWeight: 'bold' }}>{part.label}</ThemedText>
                                                                    </View>
                                                                ) : <View style={{ height: isLargeImage ? 0 : 20 }} />}
                                                                <View style={[styles.avatarFrame, { width: size, height: size, borderRadius: isLargeImage ? 16 : size / 2, borderColor: colors.primary + '40' }]}>
                                                                    <Image source={img} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                                                                </View>
                                                            </Pressable>
                                                        );
                                                    }
                                                    return <ThemedText key={partIndex} style={styles.line}>[画像なし]</ThemedText>;
                                                case 'gift_arrow':
                                                    const isRight = part.content === 'right';
                                                    return (
                                                        <View key={partIndex} style={styles.arrowWrapper}>
                                                            {part.or && <ThemedText style={styles.orLabel}>or</ThemedText>}
                                                            <View style={[styles.arrowLine, { backgroundColor: colors.primary }]} />
                                                            <View style={[styles.arrowHead, { [isRight ? 'right' : 'left']: -2, [isRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary, [isRight ? 'borderLeftWidth' : 'borderRightWidth']: 12 }]} />
                                                            <View style={[styles.giftIcon, { borderColor: colors.primary }]}><ThemedText style={{ fontSize: 18 }}>🎁</ThemedText></View>
                                                        </View>
                                                    );
                                                case 'arrow':
                                                    const isArrowRight = part.content === 'right';
                                                    return (
                                                        <View key={partIndex} style={styles.smallArrowWrapper}>
                                                            <View style={[styles.arrowLine, { backgroundColor: colors.primary }]} />
                                                            <View style={[styles.arrowHead, { [isArrowRight ? 'right' : 'left']: -2, [isArrowRight ? 'borderLeftColor' : 'borderRightColor']: colors.primary, [isArrowRight ? 'borderLeftWidth' : 'borderRightWidth']: 12 }]} />
                                                        </View>
                                                    );
                                                default:
                                                    return <ThemedText key={partIndex} style={[styles.line, { color: mainTextCol }]}>{part.content}</ThemedText>;
                                            }
                                        })}
                                    </View>
                                );
                            })}
                        </View>
                    </LinearGradient>
                </View>
            );
        });
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {currentTitle && (
                    <ThemedView style={styles.titleCard}>
                        <ThemedText style={styles.titleText}>{currentTitle}</ThemedText>
                    </ThemedView>
                )}

                {renderContent(explainText)}

                {/* Back to learning button */}
                <Pressable
                    onPress={() => {
                        if (originSubject) {
                            router.replace({
                                pathname: `/learn/[subject]` as any,
                                params: { subject: originSubject, index: originIndex || '0' }
                            });
                        } else {
                            router.back();
                        }
                    }}
                    style={styles.backButton}
                >
                    <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>学習へ戻る</ThemedText>
                </Pressable>
            </ScrollView>

            {/* Chunk (∞) buttons - Horizontal overlay or bottom? Let's use floating or pre-player area */}
            <View style={{ position: 'absolute', right: 20, bottom: 100, gap: 10 }}>
                {chunks.map((chunk, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.chunkButton,
                            {
                                backgroundColor: currentChunkIndex === index ? colors.primary : '#fff',
                                borderColor: colors.primary
                            }
                        ]}
                        onPress={() => setCurrentChunkIndex(currentChunkIndex === index ? null : index)}
                    >
                        <ThemedText style={{ color: currentChunkIndex === index ? '#fff' : colors.primary, fontSize: 24, fontWeight: 'bold' }}>
                            ∞
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>

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

            {/* Image Zoom Modal */}
            <Modal
                visible={!!selectedImageSource}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedImageSource(null)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setSelectedImageSource(null)}
                >
                    <View style={styles.zoomImageContainer}>
                        <Image source={selectedImageSource} style={styles.zoomImage} resizeMode="contain" />
                        <ThemedText style={styles.zoomHint}>タップして閉じる</ThemedText>
                    </View>
                </TouchableOpacity>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
    },
    scrollContent: {
        padding: 12,
        paddingBottom: 150, // Space for chunks and player
    },
    line: {
        fontSize: 16,
        lineHeight: 26,
    },
    lineWrapper: {
        fontSize: 16,
        lineHeight: 26,
        marginBottom: 10,
    },
    lineWrapperRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        paddingVertical: 2,
        marginBottom: 6,
    },
    cardWrapper: {
        marginBottom: 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 2 },
            web: { boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
        })
    },
    sectionCard: {
        borderRadius: 20,
        borderWidth: 1.5,
        overflow: 'hidden',
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
        lineHeight: 26,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    pointBox: {
        marginTop: 12,
        marginBottom: 6,
        padding: 18,
        borderRadius: 20,
        borderLeftWidth: 6,
    },
    pointText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#2d3748',
        fontWeight: '500',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1.2,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#edf2f7',
        padding: 10,
    },
    markerText: {
        backgroundColor: '#fff176',
        paddingHorizontal: 2,
    },
    avatarFrame: {
        backgroundColor: '#fff',
        borderWidth: 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowWrapper: {
        width: 70,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    smallArrowWrapper: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    orLabel: {
        position: 'absolute',
        top: -16,
        color: '#e74c3c',
        fontSize: 14,
        fontWeight: '900',
        fontStyle: 'italic',
    },
    arrowLine: {
        width: '100%',
        height: 2.5,
    },
    arrowHead: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    giftIcon: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1.5,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    backButton: {
        alignSelf: 'center',
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    chunkButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomImageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomImage: {
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').height * 0.85,
    },
    zoomHint: {
        color: '#fff',
        marginTop: 20,
        fontSize: 14,
    },
    miniPlayer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        gap: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
    titleCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: '#3498db',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
    },
});
