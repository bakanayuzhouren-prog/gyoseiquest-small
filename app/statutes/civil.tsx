import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CivilLawScreen() {
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '民法' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="title">民法</ThemedText>

                <Link href="/statutes/civil/general" asChild>
                    <Pressable style={styles.menuButton}>
                        <ThemedText type="defaultSemiBold" style={styles.menuText}>
                            総則
                        </ThemedText>
                    </Pressable>
                </Link>

                <Link href="/statutes/civil/rights" asChild>
                    <Pressable style={styles.menuButton}>
                        <ThemedText type="defaultSemiBold" style={styles.menuText}>
                            物権
                        </ThemedText>
                    </Pressable>
                </Link>

                <Link href="/statutes/civil/claims_general" asChild>
                    <Pressable style={styles.menuButton}>
                        <ThemedText type="defaultSemiBold" style={styles.menuText}>
                            債権総論
                        </ThemedText>
                    </Pressable>
                </Link>

                <Link href="/statutes/civil/claims_particular" asChild>
                    <Pressable style={styles.menuButton}>
                        <ThemedText type="defaultSemiBold" style={styles.menuText}>
                            債権各論
                        </ThemedText>
                    </Pressable>
                </Link>

                <Link href="/statutes/civil/family" asChild>
                    <Pressable style={styles.menuButton}>
                        <ThemedText type="defaultSemiBold" style={styles.menuText}>
                            家族法
                        </ThemedText>
                    </Pressable>
                </Link>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        gap: 16,
    },
    menuButton: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5A9BD5',
        backgroundColor: '#E9F2FB',
    },
    menuText: {
        fontSize: 18,
    },
});
