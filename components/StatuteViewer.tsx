import { applyTTSRules } from '@/utils/tts-rules';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Improved number to Kanji converter for 1-9999
const numberToKanji = (num: number): string => {
    if (num <= 0) return num.toString();
    const kanji = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const units = ['', '十', '百', '千'];

    let res = '';
    const digits = num.toString().split('').reverse();

    for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i], 10);
        if (digit === 0) continue;

        let part = '';
        if (i > 0 && digit === 1) {
            // For 10, 100, 1000, "一" is usually omitted
            part = units[i];
        } else {
            part = kanji[digit] + units[i];
        }
        res = part + res;
    }
    return res || '〇';
};

/** 検索欄の全角数字を半角に（「２８１」→「281」） */
const normalizeDigitsToAscii = (s: string) =>
    (s || '').replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));

interface StatuteArticle {
    title: string;
    content: string;
    order?: number;
}

interface StatuteViewerProps {
    data: StatuteArticle[];
    title: string;
    searchPlaceholder?: string;
}

export default function StatuteViewer({ data, title, searchPlaceholder }: StatuteViewerProps) {
    const articles = data || [];
    const [searchQuery, setSearchQuery] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const itemsY = useRef<{ [key: number]: number }>({});
    const { q, returnPath, returnIndex } = useLocalSearchParams<{
        q?: string,
        returnPath?: string,
        returnIndex?: string
    }>();

    // TTS States
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

    // State to track search position for "Find Next" functionality
    const lastSearchIndex = useRef(-1);
    const lastSearchQuery = useRef('');

    // アンマウント時は停止しない（メイン画面の音声を継続させるため）
    useEffect(() => {
        return () => { /* 以前はここで Speech.stop() していたが削除 */ };
    }, []);

    const toggleSpeech = async (index: number) => {
        if (speakingIndex === index) {
            await Speech.stop();
            setSpeakingIndex(null);
        } else {
            await Speech.stop();
            setSpeakingIndex(index);
            const article = articles[index];
            const textToSpeak = applyTTSRules(`${article.title}。${article.content}`);

            Speech.speak(textToSpeak, {
                language: 'ja-JP',
                rate: 1.5,
                onDone: () => setSpeakingIndex(null),
                onError: () => setSpeakingIndex(null),
            });
        }
    };

    // Trigger search from URL param on load
    useEffect(() => {
        if (q && articles.length > 0) {
            setSearchQuery(q);
            // Small delay to ensure onLayout has finished populating itemsY
            const timer = setTimeout(() => {
                executeSearch(q);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [q, articles.length]);

    const executeSearch = (queryText: string) => {
        if (!queryText.trim()) return;

        const query = normalizeDigitsToAscii(queryText.trim());
        let startIndex = 0;

        // If searching for the same thing, start after the last found index
        if (query === lastSearchQuery.current) {
            startIndex = lastSearchIndex.current + 1;
        } else {
            // New search, reset
            startIndex = 0;
        }

        // 「281」「281条」「第281条」「２８１」など → 条番号ジャンプ（本文の偶然の部分一致は使わない）
        const articleJumpMatch = query.match(/^第?(\d+)条?$/);

        // Helper to check if an item matches the query
        const isMatch = (item: any) => {
            if (articleJumpMatch) {
                const num = parseInt(articleJumpMatch[1], 10);
                const kanjiNum = numberToKanji(num);
                const searchPattern = `第${kanjiNum}条`;
                const t = item.title || '';
                if (t.includes(searchPattern)) return true;
                if (t.includes(`第${num}条`)) return true;
                return false;
            }

            const raw = queryText.trim();
            return (item.title && item.title.includes(raw)) ||
                (item.content && item.content.includes(raw));
        };

        let targetIndex = -1;

        // Search from startIndex to end
        for (let i = startIndex; i < articles.length; i++) {
            if (isMatch(articles[i])) {
                targetIndex = i;
                break;
            }
        }

        // If not found and we started midway, wrap around to the beginning (Infinite Search)
        if (targetIndex === -1 && startIndex > 0) {
            for (let i = 0; i < startIndex; i++) {
                if (isMatch(articles[i])) {
                    targetIndex = i;
                    break;
                }
            }
        }

        if (targetIndex !== -1) {
            // Found a match
            lastSearchQuery.current = query;
            lastSearchIndex.current = targetIndex;

            const y = itemsY.current[targetIndex];
            if (y !== undefined && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: y - 50, animated: false }); // Margin at top
            }
        } else if (!q) { // Only alert if NOT coming from an automatic jump
            // Not found anywhere
            Alert.alert("見つかりませんでした", "該当する条文が見つかりませんでした。");
            lastSearchQuery.current = '';
            lastSearchIndex.current = -1;
        }
    };

    const handleSearch = () => executeSearch(searchQuery);

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: title }} />

            <ThemedView style={styles.stickyHeader}>
                {returnPath ? (
                    <Pressable
                        style={styles.returnButton}
                        onPress={() => {
                            router.push({
                                pathname: returnPath as any,
                                params: { index: returnIndex }
                            });
                        }}
                    >
                        <MaterialIcons name="arrow-back" size={20} color="#fff" />
                        <ThemedText style={styles.returnButtonText}>問題に戻る</ThemedText>
                    </Pressable>
                ) : null}
                <ThemedView style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={searchPlaceholder || "検索 (例: 40条, 聴聞)"}
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <Pressable onPress={handleSearch} style={styles.searchButton}>
                        <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>検索</ThemedText>
                    </Pressable>
                </ThemedView>
            </ThemedView>

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.contentContainer}
                automaticallyAdjustKeyboardInsets={true}
            >
                <ThemedText type="title" style={styles.pageTitle}>{title}</ThemedText>

                {articles.length === 0 ? (
                    <ThemedText>条文データが見つかりませんでした。</ThemedText>
                ) : (
                    articles.map((item: any, index: number) => (
                        <ThemedView
                            key={index}
                            style={[
                                styles.articleContainer,
                                speakingIndex === index && styles.articleContainerActive
                            ]}
                            onLayout={(event) => {
                                const layout = event.nativeEvent.layout;
                                itemsY.current[index] = layout.y;
                            }}
                        >
                            <View style={styles.articleHeader}>
                                {item.title ? (
                                    <ThemedText type="subtitle" style={styles.articleTitle}>
                                        {item.title}
                                    </ThemedText>
                                ) : null}
                                <Pressable
                                    onPress={() => toggleSpeech(index)}
                                    style={styles.speakerButton}
                                >
                                    <MaterialIcons
                                        name={speakingIndex === index ? "stop-circle" : "play-circle-filled"}
                                        size={28}
                                        color={speakingIndex === index ? "#DC3545" : "#5A9BD5"}
                                    />
                                </Pressable>
                            </View>
                            <ThemedText style={styles.articleContent}>
                                {item.content}
                            </ThemedText>
                        </ThemedView>
                    ))
                )}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    contentContainer: {
        padding: 20,
        gap: 16,
        paddingBottom: 40,
    },
    pageTitle: {
        marginBottom: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'transparent',
    },
    searchInput: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
    },
    searchButton: {
        height: 48,
        paddingHorizontal: 20,
        backgroundColor: '#5A9BD5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    articleContainer: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: '#eee',
    },
    articleContainerActive: {
        borderColor: '#5A9BD5',
        backgroundColor: 'rgba(90, 155, 213, 0.05)',
        borderWidth: 2,
    },
    articleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    articleTitle: {
        flex: 1,
        color: '#5A9BD5',
    },
    articleContent: {
        lineHeight: 24,
    },
    speakerButton: {
        marginLeft: 8,
        padding: 2,
    },
    returnButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6c757d',
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 12,
        gap: 6,
    },
    returnButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
