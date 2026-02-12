
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCharacter } from '@/src/context/CharacterContext';
import { useTheme } from '@/src/context/ThemeContext';
import { LEARN_CONTENT } from '@/src/learn';
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
    const [selectedImageSource, setSelectedImageSource] = useState<any>(null);

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
            const trimmedLine = line.trim();
            const parsedLine = parseRichText(line);

            // Detection Patterns for auto-card splitting
            // 1. [[section:Title]] tag
            const sectionTag = parsedLine.find(p => p.type === 'section');

            // 2. Automated detection: "1. ", "①", "Q1. ", etc.
            const isNumericHeader = /^[0-9]+[\.．]/.test(trimmedLine);
            const isCircledNumber = /^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmedLine);
            const isQAHeader = /^[Qq](＆|&)[Aa]|^[Qq][0-9]*[\.．]/.test(trimmedLine);
            const isCaseHeader = /^【?[0-9]*[\.．]?事例/.test(trimmedLine);

            const isNewSection = sectionTag || isNumericHeader || isCircledNumber || isQAHeader || isCaseHeader;

            if (isNewSection) {
                // If the previous block was empty/plain and only had whitespace, we can replace it
                // otherwise start a new one.
                const title = sectionTag ? sectionTag.content : trimmedLine;
                currentBlock = { type: 'section', title: title, content: [] };
                blocks.push(currentBlock);

                // If it was a tag, we continue without adding this line specifically if it's just the tag
                if (sectionTag) {
                    const filteredLine = parsedLine.filter(p => p.type !== 'section');
                    if (filteredLine.length > 0) {
                        currentBlock.content.push(filteredLine);
                    }
                } else {
                    // It was an auto-detected header, we don't add the header itself to content if it's the title
                    // But usually "1. Title" - so we keep it if it's just plain text.
                    // Actually, let's keep the line in the card content but maybe style it differently?
                    // No, using it as title is cleaner.
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
                        <View style={styles.cardBody}>
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

                                // Special handling for lines that are JUST an image
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
                {foundQuestion?.title && (
                    <ThemedView style={styles.titleCard}>
                        <ThemedText style={styles.titleText}>{foundQuestion.title}</ThemedText>
                    </ThemedView>
                )}
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
        backgroundColor: '#F7FAFC', // Slightly softer white/gray
    },
    scrollContent: {
        padding: 12,
        paddingBottom: 60,
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
    zoomImageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomImage: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.8,
    },
    zoomHint: {
        color: '#fff',
        marginTop: 20,
        fontSize: 14,
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
    titleCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        borderLeftWidth: 6,
        borderLeftColor: '#3498db', // Using a primary color or similar blue
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
