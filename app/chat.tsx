import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { answerChatFromContext } from '@/src/utils/geminiService';
import { searchKnowledgeFull } from '@/utils/chatSearch';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

const GEMINI_API_KEY =
  (typeof Constants?.expoConfig?.extra !== 'undefined' && (Constants.expoConfig.extra as { geminiApiKey?: string })?.geminiApiKey) ||
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_GEMINI_API_KEY) ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
  '';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  useMarkdown?: boolean;
  sources?: string[];
};

const SUGGESTIONS = ['行政手続法について', '朝日訴訟とは', '国家賠償法1条', '理由の提示', '信義則'];

export default function ChatScreen() {
  const { theme } = useTheme();
  const colors = Themes[theme];
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text:
        'こんにちは！このアプリに入っている**学習データ・条文・過去問・MD**から検索して答えます。\n' +
        (GEMINI_API_KEY
          ? '（Gemini で要約します。根拠はアプリ内テキストのみです。）'
          : '（**APIキー未設定**：検索結果の抜粋をそのまま表示します。.env に EXPO_PUBLIC_GEMINI_API_KEY を設定すると要約できます。）'),
      sender: 'bot',
      useMarkdown: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const chunks = await searchKnowledgeFull(trimmed);
      const sourceLabels = [...new Set(chunks.map((c) => `${c.source}: ${c.title}`))].slice(0, 8);

      let botText: string;
      let useMarkdown = false;

      if (GEMINI_API_KEY) {
        botText = await answerChatFromContext(GEMINI_API_KEY, {
          userQuery: trimmed,
          contextChunks: chunks,
        });
        useMarkdown = true;
      } else if (chunks.length > 0) {
        botText =
          '【アプリ内検索の上位ヒット】\n\n' +
          chunks
            .slice(0, 5)
            .map((c, i) => `■ ${i + 1}. ${c.source} / ${c.title}\n${c.text.slice(0, 900)}${c.text.length > 900 ? '…' : ''}`)
            .join('\n\n---\n\n');
      } else {
        botText =
          '該当するキーワードをアプリ内データで見つけられませんでした。\n別の言い回しや、条文番号・判例名・科目名で試してください。';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        useMarkdown,
        sources: sourceLabels.length > 0 ? sourceLabels : undefined,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: `エラー: ${msg}`,
          sender: 'bot',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [messages, isTyping]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    const bubble = (
      <View
        style={[
          styles.bubble,
          isUser ? { backgroundColor: colors.primary } : { backgroundColor: colors.card },
          isUser ? styles.userBubble : styles.botBubble,
        ]}>
        {item.useMarkdown ? (
          <MarkdownText text={item.text} style={{ color: isUser ? '#fff' : colors.text, lineHeight: 22, fontSize: 15 }} uniformWeight />
        ) : (
          <ThemedText style={{ color: isUser ? '#fff' : colors.text }}>{item.text}</ThemedText>
        )}
        {item.sources && item.sources.length > 0 && (
          <ThemedText style={{ color: colors.subText, fontSize: 11, marginTop: 8 }}>
            参照: {item.sources.join(' / ')}
          </ThemedText>
        )}
      </View>
    );
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
        {!isUser && (
          <View style={styles.avatarContainer}>
            <Image source={require('@/assets/images/avatar_suit.png')} style={styles.avatar} />
          </View>
        )}
        {isUser ? bubble : <View style={styles.botBubbleGrow}>{bubble}</View>}
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
        style={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={false}
        ListFooterComponent={
          isTyping ? (
            <View style={styles.typingContainer}>
              <View style={styles.avatarContainer}>
                <Image source={require('@/assets/images/avatar_suit.png')} style={styles.avatar} />
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
          keyExtractor={(item) => item}
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
  messageList: {
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
    maxWidth: '92%',
  },
  botBubbleGrow: {
    flex: 1,
    minWidth: 0,
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
    alignSelf: 'center',
  },
});
