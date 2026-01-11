import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SUBJECTS } from '@/src/questions';

export default function SubCategoriesScreen() {
    const params = useLocalSearchParams<{ subject?: string }>();
    const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const subjectData = subject ? (SUBJECTS as any)[subject] : {};
    const fields = Object.keys(subjectData) || [];

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{subject}</ThemedText>
            <ThemedText style={styles.subtitle}>分野を選択してください。</ThemedText>
            <ScrollView contentContainerStyle={styles.list}>
                {fields.map((field) => (
                    <Link
                        key={field}
                        href={{
                            pathname: '/question',
                            params: { subject, field },
                        }}
                        asChild>
                        <Pressable style={styles.button}>
                            <ThemedText type="defaultSemiBold" style={styles.text}>
                                {field}
                            </ThemedText>
                        </Pressable>
                    </Link>
                ))}
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
        gap: 12,
        paddingBottom: 40,
    },
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5A9BD5',
        backgroundColor: '#E9F2FB',
    },
    text: {
        fontSize: 18,
    },
});
