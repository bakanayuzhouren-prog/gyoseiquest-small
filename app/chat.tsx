import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { searchKnowledge, SearchResult } from '@/utils/chatSearch';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    results?: SearchResult[];
};

const SUGGESTIONS = [
    "行政手続法について",
    "朝日訴訟とは",
    "国家賠償法1条",
    "理由の提示",
    "信義則",
];

export default function ChatScreen() {
    const { theme } = useTheme();
    const colors = Themes[theme]; // Get actual colors based on theme key
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '0', text: 'こんにちは！行政書士試験の学習アシスタントです。\n判例や条文知識について質問してください。（例：「朝日訴訟とは」「行政手続法の定義」）', sender: 'bot' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleSend = (text: string = input) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        // Add User Message
        const userMsg: Message = { id: Date.now().toString(), text: trimmed, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate Network/Processing Delay
        setTimeout(() => {
            const results = searchKnowledge(trimmed);
            let botText = '';

            if (results.length > 0) {
                const topMatch = results[0];
                if (topMatch.type === 'case') {
                    botText = `【${topMatch.title}】\n\n${topMatch.content}`;
                } else if (topMatch.type === 'memory') {
                    botText = `【関連する記憶】\n\n${topMatch.content}`;
                } else {
                    botText = `【条文・知識】\n\n${topMatch.content}`;
                }

                if (results.length > 1) {
                    botText += `\n\n他にも「${results[1].title}」などが関連しているかもしれません。`;
                }
            } else {
                botText = '申し訳ありません。そのキーワードに関する情報は知識ベースに見つかりませんでした。\n別の言い回しや、重要語句（例：「処分」「行政指導」など）で試してみてください。';
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                results
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    useEffect(() => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 200);
    }, [messages, isTyping]);

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessageContainer : styles.botMessageContainer
            ]}>
                {!isUser && (
                    <View style={styles.avatarContainer}>
                        <Image source={require('@/assets/images/icon.png')} style={styles.avatar} />
                    </View>
                )}
                <View style={[
                    styles.bubble,
                    isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.card },
                    isUser ? styles.userBubble : styles.botBubble
                ]}>
                    <ThemedText style={{ color: isUser ? '#fff' : colors.text }}>
                        {item.text}
                    </ThemedText>
                </View>
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.header, { borderBottomColor: colors.choiceBorder }]}>
                <ThemedText type="subtitle">AI学習アシスタント</ThemedText>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={
                    isTyping ? (
                        <View style={styles.typingContainer}>
                            <View style={styles.avatarContainer}>
                                <Image source={require('@/assets/images/icon.png')} style={styles.avatar} />
                            </View>
                            <View style={[styles.bubble, styles.botBubble, { backgroundColor: colors.card }]}>
                                <ActivityIndicator size="small" color={colors.subText} />
                            </View>
                        </View>
                    ) : null
                }
            />

            <View style={styles.suggestionsContainer}>
                <FlatList
                    horizontal
                    data={SUGGESTIONS}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Pressable
                            style={[styles.chip, { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder }]}
                            onPress={() => handleSend(item)}
                        >
                            <ThemedText style={{ color: colors.choiceText, fontSize: 12 }}>{item}</ThemedText>
                        </Pressable>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <View style={[styles.inputContainer, { backgroundColor: colors.card, borderTopColor: colors.choiceBorder }]}>
                    <TextInput
                        style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
                        value={input}
                        onChangeText={setInput}
                        placeholder="質問を入力..."
                        placeholderTextColor={colors.subText}
                        onSubmitEditing={() => handleSend()}
                    />
                    <Pressable onPress={() => handleSend()} style={[styles.sendButton, { backgroundColor: colors.primary }]}>
                        <Ionicons name="send" size={20} color="#fff" />
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
    header: {
        padding: 16,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        maxWidth: '85%',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
    },
    avatarContainer: {
        marginRight: 8,
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    bubble: {
        padding: 12,
        borderRadius: 18,
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    botBubble: {
        borderBottomLeftRadius: 4,
    },
    typingContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginLeft: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    suggestionsContainer: {
        height: 50,
        marginBottom: 8,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        marginRight: 8,
        alignSelf: 'center', // Center vertically in the container
    }
});
