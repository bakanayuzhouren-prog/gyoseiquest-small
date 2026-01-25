import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AdministrativeLawScreen() {
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '行政法' }} />
            <ThemedText type="title">行政法</ThemedText>

            <Link href="/statutes/administrative/procedure" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        行政手続法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/administrative/appeal" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        行政不服審査法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/administrative/litigation" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        行政事件訴訟法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/administrative/redress" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        国家賠償法
                    </ThemedText>
                </Pressable>
            </Link>

            <Link href="/statutes/administrative/autonomy" asChild>
                <Pressable style={styles.menuButton}>
                    <ThemedText type="defaultSemiBold" style={styles.menuText}>
                        地方自治法
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
