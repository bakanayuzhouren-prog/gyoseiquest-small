import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Simple number to Kanji converter for 1-99
const numberToKanji = (num: number): string => {
    if (num <= 0 || num >= 100) return num.toString();

    const kanji = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    if (num < 10) return kanji[num];

    const tens = Math.floor(num / 10);
    const ones = num % 10;

    let res = '';
    if (tens === 1) res += '十';
    else if (tens > 1) res += kanji[tens] + '十';

    if (ones > 0) res += kanji[ones];

    return res;
};

interface StatuteArticle {
    title: string;
    content: string;
    order: number;
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

    // State to track search position for "Find Next" functionality
    const lastSearchIndex = useRef(-1);
    const lastSearchQuery = useRef('');

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        const query = searchQuery.trim();
        let startIndex = 0;

        // If searching for the same thing, start after the last found index
        if (query === lastSearchQuery.current) {
            startIndex = lastSearchIndex.current + 1;
        } else {
            // New search, reset
            startIndex = 0;
        }

        // Helper to check if an item matches the query
        const isMatch = (item: any) => {
            // 1. Article Number Match (e.g. "40" or "40条")
            const numMatch = query.match(/^(\d+)条?$/);
            if (numMatch) {
                const num = parseInt(numMatch[1], 10);
                const kanjiNum = numberToKanji(num);
                const searchPattern = `第${kanjiNum}条`;
                if (item.title && item.title.includes(searchPattern)) return true;
            }

            // 2. Text Match (Title or Content)
            return (item.title && item.title.includes(query)) ||
                (item.content && item.content.includes(query));
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
                scrollViewRef.current.scrollTo({ y: y, animated: true });
            }
        } else {
            // Not found anywhere
            Alert.alert("見つかりませんでした", "該当する条文が見つかりませんでした。");
            // Reset search state so next try starts from top if user wants
            lastSearchQuery.current = '';
            lastSearchIndex.current = -1;
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: title }} />

            <ThemedView style={styles.stickyHeader}>
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
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>検索</ThemedText>
                    </TouchableOpacity>
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
                            style={styles.articleContainer}
                            onLayout={(event) => {
                                const layout = event.nativeEvent.layout;
                                itemsY.current[index] = layout.y;
                            }}
                        >
                            {item.title ? (
                                <ThemedText type="subtitle" style={styles.articleTitle}>
                                    {item.title}
                                </ThemedText>
                            ) : null}
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
    articleTitle: {
        marginBottom: 8,
        color: '#5A9BD5',
    },
    articleContent: {
        lineHeight: 24,
    }
});
