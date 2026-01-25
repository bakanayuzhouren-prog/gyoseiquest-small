import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function StatutesScreen() {
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '条文' }} />
            <ThemedText type="title">条文</ThemedText>

            <Link href="/statutes/constitution" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        １. 憲法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/administrative" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        ２. 行政法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/civil" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        ３. 民法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/commercial" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        ４. 商法・会社法
                    </ThemedText>
                </Pressable>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
