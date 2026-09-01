import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  STUDY_LEVEL_HINT,
  STUDY_LEVEL_LABEL,
  STUDY_LEVELS,
  useStudyLevel,
  type StudyLevel,
} from '@/src/context/StudyLevelContext';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { answerChatFromContext } from '@/src/utils/geminiService';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

type SearchKnowledgeFull = (query: string) => Promise<
  { source: string; title: string; text: string; score: number }[]
>;

let searchKnowledgeFullFn: SearchKnowledgeFull | null = null;

async function loadSearchKnowledgeFull(): Promise<SearchKnowledgeFull> {
  if (!searchKnowledgeFullFn) {
    const mod = await import('@/utils/chatSearch');
    searchKnowledgeFullFn = mod.searchKnowledgeFull;
  }
  return searchKnowledgeFullFn;
}

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

const SUGGESTIONS_BY_LEVEL: Record<StudyLevel, string[]> = {
  beginner: ['二重の基準ってなに', '私人間効力ってなに', '生存権ってなに', '処分性ってなに', '申請と届出の違い'],
  intermediate: [
    '政教分離の判断枠組み',
    '目的効果と総合考慮の違い',
    '薬局と小売市場の審査基準',
    '猿払と堀越の違い',
    '行服法と行訴法の違いをまとめて',
  ],
  advanced: [
    '津と愛媛と空知太',
    '事前抑制の例外要件',
    '規制目的二分論',
    '投票価値と事情判決',
    '公務員の争議権判例の流れ',
  ],
};

function welcomeText(level: StudyLevel): string {
  const label = STUDY_LEVEL_LABEL[level];
  const hint = STUDY_LEVEL_HINT[level];
  const base =
    'こんにちは！このアプリに入っている**学習データ・条文・過去問・MD**から検索して答えます。\n' +
    `いまのレベルは **${label}**（${hint}）。ヘッダーで切り替えできます。\n`;
  return (
    base +
    (GEMINI_API_KEY
      ? '（Gemini **Pro優先**で、レベルに合わせて結論→根拠→ひっかけ→暗記の深さを変えます。根拠はアプリ内テキストのみ。）'
      : '（**APIキー未設定**：検索結果の抜粋を表示します。.env に EXPO_PUBLIC_GEMINI_API_KEY を設定すると要約できます。）')
  );
}

function formatSearchFallback(
  chunks: { source: string; title: string; text: string }[],
  level: StudyLevel
): string {
  const limit = level === 'beginner' ? 2 : level === 'intermediate' ? 3 : 5;
  const sliceLen = level === 'beginner' ? 450 : level === 'intermediate' ? 700 : 900;
  const intro =
    level === 'beginner'
      ? '### まずはここだけ\n見つかった解説の要点です。用語がむずかしければ、ヘッダーを「初級」のまま聞き直してください。\n\n'
      : level === 'intermediate'
        ? '### アプリ内検索ヒット（中級向け抜粋）\n枠組みとひっかけの材料です。\n\n'
        : '### アプリ内検索ヒット（上級向け）\n深い判旨・比較の材料です。\n\n';
  return (
    intro +
    chunks
      .slice(0, limit)
      .map((c, i) => `**${i + 1}. ${c.source} / ${c.title}**\n${c.text.slice(0, sliceLen)}${c.text.length > sliceLen ? '…' : ''}`)
      .join('\n\n---\n\n')
  );
}

export default function ChatScreen() {
  const { theme } = useTheme();
  const colors = Themes[theme];
  const { studyLevel, setStudyLevel } = useStudyLevel();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: welcomeText('beginner'),
      sender: 'bot',
      useMarkdown: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const suggestions = useMemo(() => SUGGESTIONS_BY_LEVEL[studyLevel], [studyLevel]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === '0') {
        return [{ ...prev[0], text: welcomeText(studyLevel) }];
      }
      return prev;
    });
  }, [studyLevel]);

  const handleSend = async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), text: trimmed, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const searchKnowledgeFull = await loadSearchKnowledgeFull();
      const chunks = await searchKnowledgeFull(trimmed);
      const sourceLabels = [...new Set(chunks.map((c) => `${c.source}: ${c.title}`))].slice(0, 8);

      let botText: string;

      if (GEMINI_API_KEY) {
        const history = messages
          .filter((m) => m.id !== '0')
          .slice(-6)
          .map((m) => ({
            role: (m.sender === 'user' ? 'user' : 'bot') as 'user' | 'bot',
            text: m.text,
          }));
        botText = await answerChatFromContext(GEMINI_API_KEY, {
          userQuery: trimmed,
          contextChunks: chunks,
          history,
          studyLevel,
        });
      } else if (chunks.length > 0) {
        botText = formatSearchFallback(chunks, studyLevel);
      } else {
        botText =
          '該当するキーワードをアプリ内データで見つけられませんでした。\n別の言い回しや、条文番号・判例名・科目名で試してください。';
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        useMarkdown: true,
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
          <MarkdownText
            text={item.text}
            style={{ color: isUser ? '#fff' : colors.text, lineHeight: 22, fontSize: 15 }}
            uniformWeight
            bulletList
            autoGlossaryTerms={!isUser}
          />
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
            <Image source={require('@/assets/images/characters/chachalot.png')} style={styles.avatar} />
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
        <View style={styles.levelRow}>
          {STUDY_LEVELS.map((level) => {
            const selected = studyLevel === level;
            return (
              <Pressable
                key={level}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`学習レベル${STUDY_LEVEL_LABEL[level]}`}
                onPress={() => setStudyLevel(level)}
                style={[
                  styles.levelChip,
                  {
                    borderColor: selected ? colors.primary : colors.choiceBorder,
                    backgroundColor: selected ? colors.primary : colors.choiceBg,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: selected ? '#fff' : colors.choiceText,
                    fontSize: 12,
                    fontWeight: selected ? '700' : '500',
                  }}
                >
                  {STUDY_LEVEL_LABEL[level]}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
        <ThemedText style={{ color: colors.subText, fontSize: 11, marginTop: 6, textAlign: 'center' }}>
          {STUDY_LEVEL_HINT[studyLevel]}
        </ThemedText>
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
                <Image source={require('@/assets/images/characters/chachalot.png')} style={styles.avatar} />
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
          data={suggestions}
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
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  levelRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  levelChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
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
