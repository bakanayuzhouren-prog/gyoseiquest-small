import { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { getDeepdiveParams } from '@/src/deepdiveState';
import { LEARN_DEEPDIVE } from '@/src/learn';
import { resolveImageAsset } from '@/src/resolveImageAsset';
import { applyTTSRules } from '@/utils/tts-rules';
import * as Speech from 'expo-speech';

const CHACHALOT_IMG = require('@/assets/images/characters/chachalot.png');

export default function DeepdiveScreen() {
  const params = useLocalSearchParams<{
    content?: string;
    choiceLabel?: string;
  }>();
  const { colors } = useTheme();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [choiceLabel, setChoiceLabel] = useState('');
  useEffect(() => {
    const stored = getDeepdiveParams();
    const paramContent = params.content;
    const fromParams = typeof paramContent === 'string' ? paramContent : Array.isArray(paramContent) ? paramContent[0] : '';
    let raw = stored.content || fromParams || '';
    const paramLabel = params.choiceLabel;
    const fromParamLabel =
      typeof paramLabel === 'string' ? paramLabel : Array.isArray(paramLabel) ? paramLabel[0] : '';
    if (!raw) {
      setContent('');
      setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
      return;
    }
    if (raw.length < 150) {
      for (const arr of Object.values(LEARN_DEEPDIVE as Record<string, string[]>)) {
        if (!Array.isArray(arr)) continue;
        const found = arr.find((d) => d && d.length > 200 && d.includes(raw));
        if (found) {
          raw = found;
          break;
        }
      }
    }
    setContent(raw);
    setChoiceLabel(stored.choiceLabel || fromParamLabel || '');
  }, []);
  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);
  const [isChachalotPlaying, setIsChachalotPlaying] = useState(false);

  useEffect(() => {
    return () => { Speech.stop(); };
  }, []);

  const parts: Array<{ type: 'text' | 'image'; value: string }> = [];
  if (content) {
    const re = /\[\[image:([^\]]+)\]\]/g;
    let lastIdx = 0;
    let m;
    while ((m = re.exec(content)) !== null) {
      if (m.index > lastIdx) {
        const text = content.slice(lastIdx, m.index).trim();
        if (text) parts.push({ type: 'text', value: content.slice(lastIdx, m.index) });
      }
      parts.push({ type: 'image', value: m[1].trim() });
      lastIdx = re.lastIndex;
    }
    if (lastIdx < content.length) {
      const text = content.slice(lastIdx).trim();
      if (text) parts.push({ type: 'text', value: content.slice(lastIdx) });
    }
  }

  /** 番号付きセクション（1. 2. 3. 等、または 1：2： 等）で分割してカード化 */
  const splitIntoCards = (text: string): string[] => {
    const sections = text.split(/(?:\n|^)(?=\d+[\.．：:]\s?)/).filter(Boolean);
    return sections.length >= 2 ? sections : [text];
  };

  /** カードの1行目をタイトル、残りを本文に分離 */
  const splitCardTitle = (cardText: string): { title: string; body: string } => {
    const firstNewline = cardText.indexOf('\n');
    if (firstNewline >= 0) {
      return { title: cardText.slice(0, firstNewline).trim(), body: cardText.slice(firstNewline).trim() };
    }
    return { title: cardText.trim(), body: '' };
  };

  const cardStyle = {
    backgroundColor: '#E2E8F0',
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  };

  const handleHighlightPress = (title: string, body: string) => {
    setHighlightModal({ title, body });
  };

  const handleChachalotToggle = () => {
    if (isChachalotPlaying) {
      Speech.stop();
      setIsChachalotPlaying(false);
      return;
    }
    const textForTTS = content
      .replace(/\[\[image:[^\]]+\]\]/g, '')
      .replace(/\[\[section:[^\]]+\]\]/g, '')
      .replace(/\[\[[^\]]+\]\]/g, '')
      .trim();
    if (!textForTTS) return;
    const spokenText = applyTTSRules(textForTTS);
    if (!spokenText.trim()) return;
    setIsChachalotPlaying(true);
    Speech.speak(spokenText, {
      language: 'ja-JP',
      rate: 1.0,
      onDone: () => setIsChachalotPlaying(false),
      onError: () => setIsChachalotPlaying(false),
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
      <ScrollView style={[styles.scroll, { backgroundColor: colors.card }]}>
        <ThemedView style={[styles.content, { backgroundColor: colors.card }]}>
          {choiceLabel ? (
            <ThemedText style={{ marginBottom: 12, color: colors.subText, fontSize: 14 }}>
              {choiceLabel}
            </ThemedText>
          ) : null}
          {parts.length > 0 ? (
            <View style={{ gap: 4 }}>
              {parts.map((p, i) =>
                p.type === 'text' ? (
                  <View key={i} style={{ gap: 0 }}>
                    {splitIntoCards(p.value.trim()).map((cardText, j) => {
                      const { title, body } = splitCardTitle(cardText);
                      return (
                        <ThemedView key={j} style={cardStyle}>
                          {title ? <ThemedText style={{ fontSize: 16, lineHeight: 24, color: colors.text, fontWeight: 'bold', marginBottom: body ? 8 : 0 }}>{title}</ThemedText> : null}
                          {body ? <MarkdownText text={body} style={{ fontSize: 16, lineHeight: 24, color: colors.text }} onHighlightPress={handleHighlightPress} /> : null}
                        </ThemedView>
                      );
                    })}
                  </View>
                ) : (
                  (() => {
                    const src = resolveImageAsset(p.value);
                    return src ? (
                      <Image key={i} source={src} style={{ width: '100%', maxHeight: 500, borderRadius: 12, marginBottom: 12 }} resizeMode="contain" />
                    ) : (
                      <ThemedView key={i} style={{ padding: 12, marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.choiceBorder }}>
                        <ThemedText style={{ color: colors.subText, fontSize: 14 }}>
                          画像を読み込めません（キー: {p.value}）。imageMap / deepdiveImages / chunkImages を確認してください。
                        </ThemedText>
                      </ThemedView>
                    );
                  })()
                )
              )}
            </View>
          ) : content ? (
            <View style={{ gap: 0 }}>
              {splitIntoCards(content).map((cardText, j) => {
                const { title, body } = splitCardTitle(cardText);
                return (
                  <ThemedView key={j} style={cardStyle}>
                    {title ? <ThemedText style={{ fontSize: 16, lineHeight: 24, color: colors.text, fontWeight: 'bold', marginBottom: body ? 8 : 0 }}>{title}</ThemedText> : null}
                    {body ? <MarkdownText text={body} style={{ fontSize: 16, lineHeight: 24, color: colors.text }} onHighlightPress={handleHighlightPress} /> : null}
                  </ThemedView>
                );
              })}
            </View>
          ) : (
            <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
          )}
          <View style={[styles.buttonRow, { marginTop: 24 }]}>
            {content ? (
              <Pressable
                style={[styles.chachalotButton, { borderColor: colors.primary }]}
                onPress={handleChachalotToggle}
              >
                <Image source={CHACHALOT_IMG} style={styles.chachalotIcon} resizeMode="contain" />
                <ThemedText style={[styles.chachalotButtonText, { color: colors.primary }]}>
                  {isChachalotPlaying ? '停止' : 'おしえてちゃちゃロット'}
                </ThemedText>
              </Pressable>
            ) : null}
            <Pressable
              style={[styles.backButton, { backgroundColor: colors.accent }]}
              onPress={() => { Speech.stop(); router.back(); }}
            >
              <ThemedText style={styles.backButtonText}>解説ページに戻る</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ScrollView>

      {isChachalotPlaying ? (
        <ThemedView style={[styles.chachalotBar, { borderTopColor: colors.choiceBorder, backgroundColor: colors.background }]}>
          <Image source={CHACHALOT_IMG} style={styles.chachalotBarAvatar} resizeMode="contain" />
          <ThemedText style={[styles.chachalotBarText, { color: colors.text }]}>読み上げ中…</ThemedText>
          <Pressable onPress={handleChachalotToggle} style={[styles.chachalotStopButton, { backgroundColor: colors.accent }]}>
            <ThemedText style={styles.chachalotStopText}>停止</ThemedText>
          </Pressable>
        </ThemedView>
      ) : null}

      <Modal visible={!!highlightModal} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setHighlightModal(null)}>
          <Pressable style={[styles.highlightModal, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]} onPress={(e) => e.stopPropagation()}>
            {highlightModal ? (
              <>
                <ThemedText style={[styles.highlightModalTitle, { color: colors.primary }]}>{highlightModal.title}</ThemedText>
                <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator>
                  <MarkdownText text={highlightModal.body} style={{ fontSize: 15, lineHeight: 24, color: colors.text }} />
                </ScrollView>
                <Pressable style={[styles.highlightModalClose, { backgroundColor: colors.accent }]} onPress={() => setHighlightModal(null)}>
                  <ThemedText style={styles.highlightModalCloseText}>閉じる</ThemedText>
                </Pressable>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { flex: 1, padding: 20 },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  chachalotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  chachalotIcon: {
    width: 32,
    height: 32,
  },
  chachalotButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chachalotBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 8 },
      web: { boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' },
    }),
  },
  chachalotBarAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  chachalotBarText: {
    flex: 1,
    fontSize: 15,
  },
  chachalotStopButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  chachalotStopText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  highlightModal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  highlightModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  highlightModalClose: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  highlightModalCloseText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
