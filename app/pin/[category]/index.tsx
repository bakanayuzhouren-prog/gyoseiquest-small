import { Link, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PIN_CASES } from '@/src/pinData';

const SUBJECT_TITLES: Record<string, string> = {
    kenpo: '憲法',
    gyosei: '行政法',
    minpo: '民法',
};

export default function CategoryScreen() {
    const { category } = useLocalSearchParams<{ category: string }>();

    // Filter cases by the current category
    const cases = PIN_CASES.filter(c => c.category === category);
    const subjectTitle = SUBJECT_TITLES[category || ''] || category;

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{subjectTitle} 判例一覧</ThemedText>
            <ThemedText style={styles.subtitle}>
                {cases.length}件の判例が見つかりました。
            </ThemedText>

            <ScrollView contentContainerStyle={styles.list}>
                {cases.map((item) => (
                    <Link key={item.id} href={`/pin/${category}/${item.id}`} asChild>
                        <Pressable style={styles.caseButton}>
                            <ThemedText type="defaultSemiBold" style={styles.caseTitle}>
                                {item.title}
                            </ThemedText>
                            <ThemedView style={styles.tagContainer}>
                                {item.tags.map(tag => (
                                    <ThemedText key={tag} style={styles.tag}>{tag}</ThemedText>
                                ))}
                            </ThemedView>
                        </Pressable>
                    </Link>
                ))}

                {cases.length === 0 && (
                    <ThemedView style={styles.emptyState}>
                        <ThemedText>この科目の判例はまだ登録されていません。</ThemedText>
                    </ThemedView>
                )}

                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <ThemedText type="defaultSemiBold">科目選択に戻る</ThemedText>
                </Pressable>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        gap: 16,
    },
    subtitle: {
        opacity: 0.7,
    },
    list: {
        gap: 16,
        paddingBottom: 40,
    },
    caseButton: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5A9BD5',
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    caseTitle: {
        fontSize: 18,
        marginBottom: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        fontSize: 12,
        color: '#666',
        backgroundColor: '#eee',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
    },
    backButton: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
});
