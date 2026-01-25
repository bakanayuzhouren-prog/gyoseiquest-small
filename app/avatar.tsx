import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getPoints } from '@/utils/points';
import { USER_KEY } from './login';

export default function AvatarScreen() {
    const [points, setPoints] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setPoints(getPoints());
        const user = localStorage.getItem(USER_KEY);
        if (user) setUsername(user);
    }, []);

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">マイページ</ThemedText>
            </View>

            <View style={styles.card}>
                <View style={styles.avatarContainer}>
                    {/* Placeholder Avatar */}
                    <View style={styles.avatarPlaceholder}>
                        <ThemedText style={styles.avatarText}>{username.charAt(0) || 'U'}</ThemedText>
                    </View>
                </View>

                <ThemedText type="subtitle" style={styles.username}>
                    {username || 'ゲストユーザー'}
                </ThemedText>

                <View style={styles.statsContainer}>
                    <ThemedText style={styles.statsLabel}>現在のポイント</ThemedText>
                    <ThemedText style={styles.statsValue}>{points} pt</ThemedText>
                </View>
            </View>

            <Pressable style={styles.backButton} onPress={() => router.replace('/')}>
                <ThemedText type="defaultSemiBold">ホームに戻る</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        marginTop: 40,
        marginBottom: 40,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        padding: 30,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E1E1E1',
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#0a7ea4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    username: {
        marginBottom: 30,
        fontSize: 24,
    },
    statsContainer: {
        alignItems: 'center',
        gap: 8,
    },
    statsLabel: {
        fontSize: 16,
        color: '#666',
    },
    statsValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#0a7ea4',
    },
    backButton: {
        marginTop: 60,
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#DDDDDD',
        borderRadius: 12,
    }
});
