import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

export default function ChatScreen() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ id: string, text: string, sender: 'user' | 'bot' }[]>([
        { id: '1', text: 'こんにちは！何か質問はありますか？', sender: 'bot' }
    ]);

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMsg = { id: Date.now().toString(), text: message, sender: 'user' as const };
        setMessages(prev => [...prev, newMsg]);
        setMessage('');

        // Simple mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: '質問ありがとうございます。現在、回答機能を準備中です。', sender: 'bot' }]);
        }, 1000);
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '質問する' }} />
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messageList}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageBubble,
                        item.sender === 'user' ? styles.userBubble : styles.botBubble
                    ]}>
                        <ThemedText style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</ThemedText>
                    </View>
                )}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="質問を入力..."
                        placeholderTextColor="#999"
                        onSubmitEditing={sendMessage}
                        returnKeyType="send"
                    />
                    <Pressable onPress={sendMessage} style={styles.sendButton}>
                        <ThemedText style={styles.sendButtonText}>送信</ThemedText>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageList: {
        padding: 16,
        paddingBottom: 80,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF', // Blue for user
        borderBottomRightRadius: 4,
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA', // Light gray for bot
        borderBottomLeftRadius: 4,
    },
    userText: {
        color: '#FFFFFF',
    },
    botText: {
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        backgroundColor: '#FFF', // Ensure background is white
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
