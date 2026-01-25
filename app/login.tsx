import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export const USER_KEY = 'gq_user';

export default function LoginScreen() {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim()) {
            if (Platform.OS === 'web') {
                localStorage.setItem(USER_KEY, username.trim());
            }
            router.replace('/');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Gyosei Quest Login</ThemedText>
            <ThemedText style={styles.subtitle}>学習を開始するには名前を入力してください</ThemedText>

            <TextInput
                style={styles.input}
                placeholder="ユーザー名 (例: ユーザーA)"
                value={username}
                onChangeText={setUsername}
                autoFocus
                onSubmitEditing={handleLogin}
                returnKeyType="done"
            />

            <Pressable style={styles.button} onPress={handleLogin}>
                <ThemedText type="defaultSemiBold" style={{ color: 'white' }}>開始する</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
    },
    input: {
        width: '100%',
        maxWidth: 300,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    }
});
