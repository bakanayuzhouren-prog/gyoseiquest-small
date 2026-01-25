import { Link, router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const SUBJECTS = [
    { id: 'kenpo', title: '憲法', icon: '📜', description: '人権、統治機構などの重要判例' },
    { id: 'gyosei', title: '行政法', icon: '🏛️', description: '行政処分、訴訟、国家賠償など' },
    { id: 'minpo', title: '民法', icon: '🏠', description: '総則、物権、債権、家族法など' },
];

export default function PinScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">判例図解ライブラリ</ThemedText>
            <ThemedText style={styles.subtitle}>
                科目を選択して、図解で判例を学びましょう。
            </ThemedText>

            <ThemedView style={styles.list}>
                {SUBJECTS.map((subject) => (
                    <Link key={subject.id} href={`/pin/${subject.id}`} asChild>
                        <Pressable style={styles.subjectButton}>
                            <ThemedText style={styles.icon}>{subject.icon}</ThemedText>
                            <ThemedView style={styles.textContainer}>
                                <ThemedText type="defaultSemiBold" style={styles.subjectTitle}>
                                    {subject.title}
                                </ThemedText>
                                <ThemedText style={styles.subjectDescription}>
                                    {subject.description}
                                </ThemedText>
                            </ThemedView>
                            <ThemedText style={styles.arrow}>›</ThemedText>
                        </Pressable>
                    </Link>
                ))}
            </ThemedView>

            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <ThemedText type="defaultSemiBold">戻る</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        gap: 24,
    },
    subtitle: {
        opacity: 0.7,
        marginBottom: 10,
    },
    list: {
        gap: 16,
    },
    subjectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        fontSize: 32,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    subjectTitle: {
        fontSize: 18,
        marginBottom: 4,
    },
    subjectDescription: {
        fontSize: 12,
        color: '#666',
    },
    arrow: {
        fontSize: 24,
        color: '#ccc',
        marginLeft: 10,
    },
    backButton: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 40,
    },
});
