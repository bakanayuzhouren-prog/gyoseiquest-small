import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function StageSelectScreen() {
    const params = useLocalSearchParams<{ subject?: string; field?: string }>();
    const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const field = Array.isArray(params.field) ? params.field[0] : params.field;

    // Display Title: Field if available, else Subject
    const displayTitle = field || subject;

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{displayTitle}</ThemedText>
            <ThemedText style={styles.subtitle}>ステージを選択してください。</ThemedText>

            <Link
                href={{
                    pathname: '/question',
                    params: { subject, field, mode: 'past' },
                }}
                asChild>
                <Pressable style={styles.button}>
                    <ThemedText type="defaultSemiBold" style={styles.text}>
                        ① 過去問
                    </ThemedText>
                </Pressable>
            </Link>

            <Link
                href={{
                    pathname: '/question',
                    params: { subject, field, mode: 'bonus' },
                }}
                asChild>
                <Pressable style={styles.button}>
                    <ThemedText type="defaultSemiBold" style={styles.text}>
                        ② ボーナスステージ
                    </ThemedText>
                </Pressable>
            </Link>
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
    },
    button: {
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5A9BD5',
        backgroundColor: '#E9F2FB',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
});
