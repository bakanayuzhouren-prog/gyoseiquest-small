import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { getDeepdiveImageSource } from '@/src/deepdiveImages';
import { getChunkImageSource } from '@/src/chunkImages';
import { IMAGE_RESOURCES_MAP } from '@/src/imageMap';

function resolveImageSource(key: string): number | undefined {
  const deepdive = getDeepdiveImageSource(key);
  if (deepdive) return deepdive;
  const chunk = getChunkImageSource(key);
  if (chunk) return chunk;
  const mapped = (IMAGE_RESOURCES_MAP as Record<string, number>)[key];
  return mapped;
}

export default function DeepdiveScreen() {
  const params = useLocalSearchParams<{
    content?: string;
    choiceLabel?: string;
  }>();
  const { colors } = useTheme();
  const router = useRouter();
  const content = params.content || '';
  const choiceLabel = params.choiceLabel || '';
  const [highlightModal, setHighlightModal] = useState<{ title: string; body: string } | null>(null);

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

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.choiceBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  };

  const handleHighlightPress = (title: string, body: string) => {
    setHighlightModal({ title, body });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'もっと深掘る', headerBackTitle: '戻る' }} />
      <ScrollView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, padding: 20 }}>
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
                    {splitIntoCards(p.value.trim()).map((cardText, j) => (
                      <ThemedView key={j} style={cardStyle}>
                        <MarkdownText text={cardText} style={{ fontSize: 16, lineHeight: 24, color: colors.text }} onHighlightPress={handleHighlightPress} />
                      </ThemedView>
                    ))}
                  </View>
                ) : (
                  (() => {
                    const src = resolveImageSource(p.value);
                    return src ? (
                      <Image key={i} source={src} style={{ width: '100%', maxHeight: 500, borderRadius: 12, marginBottom: 12 }} resizeMode="contain" />
                    ) : null;
                  })()
                )
              )}
            </View>
          ) : content ? (
            <View style={{ gap: 0 }}>
              {splitIntoCards(content).map((cardText, j) => (
                <ThemedView key={j} style={cardStyle}>
                  <MarkdownText text={cardText} style={{ fontSize: 16, lineHeight: 24, color: colors.text }} onHighlightPress={handleHighlightPress} />
                </ThemedView>
              ))}
            </View>
          ) : (
            <ThemedText style={{ color: colors.subText }}>表示する内容がありません。</ThemedText>
          )}
          <Pressable
            style={[styles.backButton, { backgroundColor: colors.accent, marginTop: 24 }]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backButtonText}>解説ページに戻る</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>

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
