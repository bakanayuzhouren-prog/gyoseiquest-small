import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { FlatList, Image, LayoutChangeEvent, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CONSTITUTION_MARKDOWN } from '../src/constitutionContent';
import { DEEPDIVE_IMAGES } from '../src/deepdiveImages';
import { useTheme } from '../src/context/ThemeContext';

import AsahiLawsuitImage from '../assets/images/asahi_lawsuit.png';
import AsahikawaTestImage from '../assets/images/asahikawa_test.png';

/** legacy {{diagram:}} → kenpou 深掘り画像（assets/images/*.png 未配置分） */
const DIAGRAM_KENPOU_FALLBACK: Record<string, string> = {
    constitution_overview: 'kenpou/1-230',
    patricide_unconstitutionality: 'kenpou/13-230',
    mitsubishi_resin: 'kenpou/19-230',
    tsu_groundbreaking: 'kenpou/20-230 yodogou',
    customs_inspection: 'kenpou/78-230',
    pharmacy_distance: 'kenpou/62-230',
    retail_market_distance: 'kenpou/63-230',
    overseas_voters: 'kenpou/40-230',
    police_reserve: 'kenpou/5-230',
    horiki_lawsuit: 'kenpou/121-230',
    forest_act: 'kenpou/64-230',
    showa_womens_univ: 'kenpou/51-230',
    kaji_kito: 'kenpou/35-230',
    illegitimate_child: 'kenpou/52-230',
    remarriage_ban: 'kenpou/184-230',
    lockheed_scandal: 'kenpou/222-230',
    zennorin_strike: 'kenpou/70-230',
};

const LEGACY_DIAGRAM_MAP: Record<string, ReturnType<typeof require>> = {
    asahi_lawsuit: AsahiLawsuitImage,
    asahikawa_test: AsahikawaTestImage,
};

const DIAGRAM_CAPTIONS: Record<string, string> = {
    constitution_overview: '図解：憲法全体マップ',
    mitsubishi_resin: '図解：三菱樹脂事件',
    patricide_unconstitutionality: '図解：尊属殺重罰規定違憲判決',
    tsu_groundbreaking: '図解：津地鎮祭訴訟',
    customs_inspection: '図解：税関検査事件',
    showa_womens_univ: '図解：昭和女子大事件',
    kaji_kito: '図解：加持祈祷事件',
    police_reserve: '図解：警察予備隊訴訟',
    pharmacy_distance: '図解：薬局距離制限事件',
    retail_market_distance: '図解：小売市場距離制限事件',
    asahi_lawsuit: '図解：朝日訴訟',
    horiki_lawsuit: '図解：堀木訴訟',
    asahikawa_test: '図解：旭川学テ事件',
    forest_act: '図解：森林法共有林分割制限事件',
    overseas_voters: '図解：在外邦人選挙権訴訟',
    illegitimate_child: '図解：非嫡出子相続差別訴訟',
    remarriage_ban: '図解：再婚禁止期間訴訟',
    lockheed_scandal: '図解：ロッキード事件',
    zennorin_strike: '図解：全農林警職法事件',
};

function resolveImageSource(key: string): ReturnType<typeof require> | undefined {
    return LEGACY_DIAGRAM_MAP[key] ?? DEEPDIVE_IMAGES[key];
}

function resolveDiagramSource(name: string): ReturnType<typeof require> | undefined {
    const legacy = LEGACY_DIAGRAM_MAP[name];
    if (legacy) return legacy;
    const kenpouKey = DIAGRAM_KENPOU_FALLBACK[name];
    if (kenpouKey) return DEEPDIVE_IMAGES[kenpouKey];
    return undefined;
}

function isTableSeparator(line: string): boolean {
    return /^\|[\s\-:|]+\|$/.test(line.trim());
}

type TOCItem = {
    id: string;
    title: string;
    level: 'h1' | 'h2' | 'item';
    lineIndex: number;
};

export default function ConstitutionScreen() {
    const { colors } = useTheme();
    const scrollRef = useRef<ScrollView>(null);
    const [tocVisible, setTocVisible] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [currentZoomImage, setCurrentZoomImage] = useState<any>(null);
    const [layoutMap, setLayoutMap] = useState<{ [key: string]: number }>({});

    // Parse Markdown to build TOC structure and Content
    const { lines, tocItems } = useMemo(() => {
        const rawLines = CONSTITUTION_MARKDOWN.split('\n');
        const items: TOCItem[] = [];

        rawLines.forEach((line, index) => {
            const id = `line-${index}`;

            if (line.startsWith('# ')) {
                items.push({ id, title: line.replace('# ', ''), level: 'h1', lineIndex: index });
            } else if (line.startsWith('## ')) {
                items.push({ id, title: line.replace('## ', ''), level: 'h2', lineIndex: index });
            } else if (line.trim().startsWith('- ')) {
                // Extract bold text as key term
                const match = line.match(/\*\*(.*?)\*\*/);
                if (match) {
                    items.push({ id, title: match[1], level: 'item', lineIndex: index });
                }
            }
        });

        return { lines: rawLines, tocItems: items };
    }, []);

    const handleLayout = (id: string, event: LayoutChangeEvent) => {
        const y = event.nativeEvent.layout.y;
        setLayoutMap(prev => ({ ...prev, [id]: y }));
    };

    const scrollToItem = (id: string) => {
        const y = layoutMap[id];
        if (y !== undefined && scrollRef.current) {
            setTocVisible(false);
            setTimeout(() => {
                scrollRef.current?.scrollTo({ y: y - 20, animated: true });
            }, 100);
        }
    };

    const renderMarkdownLine = (line: string, index: number) => {
        const id = `line-${index}`;

        const renderZoomableImage = (imageSource: ReturnType<typeof require>, caption: string) => (
            <ThemedView key={index} style={styles.diagramContainer} onLayout={(e) => handleLayout(id, e)}>
                <TouchableOpacity onPress={() => { setCurrentZoomImage(imageSource); setZoomVisible(true); }} activeOpacity={0.9}>
                    <Image source={imageSource as any} style={styles.diagramImage} resizeMode="contain" />
                </TouchableOpacity>
                <ThemedText style={styles.diagramCaption}>{caption}</ThemedText>
                <ThemedText style={styles.diagramHint}>※タップで拡大</ThemedText>
            </ThemedView>
        );

        // [[image:kenpou/N-230]]
        const imageTagMatch = line.trim().match(/^\[\[image:([^\]]+)\]\]$/);
        if (imageTagMatch) {
            const imageKey = imageTagMatch[1];
            const imageSource = resolveImageSource(imageKey);
            if (imageSource) {
                return renderZoomableImage(imageSource, `図解：${imageKey}`);
            }
            return null;
        }

        // Diagram Tag {{diagram:name}}
        if (line.trim().startsWith('{{diagram:') && line.trim().endsWith('}}')) {
            const diagramName = line.trim().replace('{{diagram:', '').replace('}}', '');
            const imageSource = resolveDiagramSource(diagramName);
            if (imageSource) {
                return renderZoomableImage(imageSource, DIAGRAM_CAPTIONS[diagramName] ?? '図解');
            }
            return null;
        }

        // Markdown table row
        if (line.trim().startsWith('|')) {
            if (isTableSeparator(line)) {
                return null;
            }
            const cells = line
                .trim()
                .replace(/^\|/, '')
                .replace(/\|$/, '')
                .split('|')
                .map((c) => c.trim());
            const isHeaderRow = index + 1 < lines.length && isTableSeparator(lines[index + 1] ?? '');
            return (
                <View
                    key={index}
                    style={[styles.tableRow, isHeaderRow && styles.tableHeaderRow]}
                    onLayout={(e) => handleLayout(id, e)}
                >
                    {cells.map((cell, ci) => (
                        <ThemedText
                            key={ci}
                            style={[
                                styles.tableCell,
                                { color: colors.text, flex: ci === 0 ? 1.2 : 1 },
                                isHeaderRow && styles.tableHeaderCell,
                            ]}
                        >
                            {parseBold(cell, colors.primary)}
                        </ThemedText>
                    ))}
                </View>
            );
        }

        // H1 Header (# Title)
        if (line.startsWith('# ')) {
            return (
                <ThemedText
                    key={index}
                    type="title"
                    style={[styles.h1, { color: colors.primary }]}
                    onLayout={(e) => handleLayout(id, e)}
                >
                    {line.replace('# ', '')}
                </ThemedText>
            );
        }
        // H2 Header (## Title)
        if (line.startsWith('## ')) {
            return (
                <ThemedText
                    key={index}
                    type="subtitle"
                    style={[styles.h2, { color: colors.text, borderLeftColor: colors.primary }]}
                    onLayout={(e) => handleLayout(id, e)}
                >
                    {line.replace('## ', '')}
                </ThemedText>
            );
        }
        // Bullet Point (- Item)
        if (line.trim().startsWith('- ')) {
            const content = line.trim().replace('- ', '');
            return (
                <View
                    key={index}
                    style={styles.listItem}
                    onLayout={(e) => handleLayout(id, e)}
                >
                    <ThemedText style={{ color: colors.primary, marginRight: 8 }}>•</ThemedText>
                    <ThemedText style={{ color: colors.text, flex: 1, lineHeight: 28 }}>
                        {parseBold(content, colors.primary)}
                    </ThemedText>
                </View>
            );
        }
        // Empty line
        if (line.trim() === '') {
            return <View key={index} style={{ height: 12 }} />;
        }
        // Normal Text (points, simple paragraphs)
        return (
            <ThemedText key={index} style={[styles.paragraph, { color: colors.text }]}>
                {parseBold(line, colors.primary)}
            </ThemedText>
        );
    };

    // Helper to standard bold text parsing (**bold**)
    const parseBold = (text: string, highlightColor: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <ThemedText key={i} type="defaultSemiBold" style={{ color: highlightColor }}>
                        {part.slice(2, -2)}
                    </ThemedText>
                );
            }
            return <ThemedText key={i}>{part}</ThemedText>;
        });
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <Link href={'/textbook' as Href} asChild>
                    <Pressable style={styles.backButton}>
                        <ThemedText type="defaultSemiBold" style={{ color: '#007BFF' }}>
                            ← 教科書一覧へ
                        </ThemedText>
                    </Pressable>
                </Link>
                <View style={styles.headerTitleRow}>
                    <ThemedText type="title">憲法学習メモ</ThemedText>
                    <TouchableOpacity
                        style={[styles.tocButton, { borderColor: colors.primary }]}
                        onPress={() => setTocVisible(true)}
                    >
                        <MaterialIcons name="list" size={20} color={colors.primary} />
                        <ThemedText style={{ color: colors.primary, fontWeight: 'bold', marginLeft: 4 }}>
                            目次 ({tocItems.length})
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>

            <ScrollView
                ref={scrollRef}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                {lines.map((line, index) => renderMarkdownLine(line, index))}
                <ThemedView style={{ height: 80 }} />
            </ScrollView>

            {/* Table of Contents Modal */}
            <Modal
                visible={tocVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setTocVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ThemedView style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <ThemedText type="subtitle">目次</ThemedText>
                            <TouchableOpacity onPress={() => setTocVisible(false)} style={styles.closeButton}>
                                <MaterialIcons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={tocItems}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.tocItem,
                                        {
                                            borderBottomColor: colors.choiceBorder,
                                            paddingLeft: item.level === 'h1' ? 0 : item.level === 'h2' ? 16 : 32
                                        }
                                    ]}
                                    onPress={() => scrollToItem(item.id)}
                                >
                                    <ThemedText
                                        type={item.level === 'h1' ? 'defaultSemiBold' : 'default'}
                                        style={{
                                            color: item.level === 'item' ? colors.text : colors.primary,
                                            fontSize: item.level === 'item' ? 14 : 16
                                        }}
                                        numberOfLines={1}
                                    >
                                        {item.level === 'item' ? '• ' : ''}{item.title}
                                    </ThemedText>
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </ThemedView>
                </View>
            </Modal>
            {/* Zoom Modal */}
            <Modal
                visible={zoomVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setZoomVisible(false)}
            >
                <View style={styles.zoomModalOverlay}>
                    <TouchableOpacity style={styles.zoomCloseArea} onPress={() => setZoomVisible(false)}>
                        <View style={styles.zoomCloseButton}>
                            <MaterialIcons name="close" size={28} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.zoomContent}>
                        {currentZoomImage && (
                            <Image source={currentZoomImage} style={styles.zoomedImage} resizeMode="contain" />
                        )}
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: 'transparent',
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    backButton: {
        marginBottom: 4,
    },
    tocButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 80,
    },
    h1: {
        fontSize: 24,
        marginTop: 32,
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea',
    },
    h2: {
        fontSize: 18,
        marginTop: 24,
        marginBottom: 12,
        paddingLeft: 12,
        borderLeftWidth: 4,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 8,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingLeft: 4,
    },
    diagramContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
    },
    diagramImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    diagramCaption: {
        marginTop: 8,
        fontSize: 12,
        opacity: 0.7,
        textAlign: 'center',
    },
    diagramHint: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingVertical: 6,
        gap: 4,
    },
    tableHeaderRow: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
    tableCell: {
        fontSize: 13,
        lineHeight: 20,
        flex: 1,
    },
    tableHeaderCell: {
        fontWeight: '600',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    closeButton: {
        padding: 4,
    },
    tocItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    // Zoom Modal Styles
    zoomModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomCloseArea: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    zoomCloseButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 5,
    },
    zoomContent: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomedImage: {
        width: '100%',
        height: '100%',
    }
});
