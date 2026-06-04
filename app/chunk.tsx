import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { getChunkImageSource } from '@/src/chunkImages';
import { takeChunkNavigationPayload } from '@/src/chunkSessionState';

const SOUSOKU602_IMAGE = 'minnpou/sousoku/sousoku602';

export default function ChunkScreen() {
  const params = useLocalSearchParams<{
    subject?: string;
    field?: string;
    questionIndex?: string;
    choiceIndex?: string;
    statuteTitle?: string;
    statuteContent?: string;
    chunkImage?: string;
    correctCountSession?: string;
    wrongCounts?: string;
    mode?: string;
    shuffle?: string;
  }>();
  const { colors } = useTheme();
  const router = useRouter();
  const [navPayload] = useState(() => takeChunkNavigationPayload());
  const statuteTitle = (params.statuteTitle as string) || navPayload.statuteTitle || '';
  const statuteContent = params.statuteContent || '';
  const chunkMarkdownBody = navPayload.body;
  let chunkImage = (params.chunkImage as string) || navPayload.chunkImage || '';

  // 命名規則フォールバック
  if (!chunkImage && params.subject === '民法' && params.field === '民法総則') {
    const q = parseInt(params.questionIndex || '0', 10);
    const c = parseInt(params.choiceIndex || '0', 10);
    if (q === 0 && [1, 2, 3].includes(c) && /保佐人|第十三条/.test(statuteTitle)) chunkImage = 'sousoku1-2.3.4';
    if (q === 5 && [0, 1, 2, 3, 4].includes(c)) chunkImage = 'minnpou/sousoku/sousoku6-1.2.3.4.5';
    if (/114条|催告/.test(statuteTitle + statuteContent)) chunkImage = 'minnpou/sousoku/sousoku11-2';
  }

  // 深掘り（13条9号・602条）からの遷移
  if (
    !chunkImage &&
    /602|六百二|短期賃貸|13条.*9|9号.*602/.test(statuteTitle + chunkMarkdownBody + statuteContent)
  ) {
    chunkImage = SOUSOKU602_IMAGE;
  }

  const imageSource = getChunkImageSource(chunkImage);

  return (
    <>
      <Stack.Screen options={{ title: 'チャンク', headerBackTitle: '戻る' }} />
      <ScrollView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, padding: 20 }}>
          <ThemedText type="subtitle" style={{ marginBottom: 12, color: colors.text }}>
            関連知識
          </ThemedText>
          {statuteTitle ? (
            <ThemedText style={{ marginBottom: 8, color: colors.subText }}>{statuteTitle}</ThemedText>
          ) : null}
          {statuteContent ? (
            <View style={{ marginBottom: 16 }}>
              <MarkdownText text={statuteContent} style={{ fontSize: 16, lineHeight: 24 }} />
            </View>
          ) : null}
          {imageSource ? (
            <Image
              source={imageSource}
              style={{ width: '100%', maxHeight: 800, marginLeft: -30, marginRight: -30, marginBottom: 16 }}
              resizeMode="contain"
              accessibilityLabel="民法602条の期間表"
            />
          ) : null}
          {chunkMarkdownBody ? (
            <View style={{ marginBottom: 16 }}>
              <MarkdownText text={chunkMarkdownBody} style={{ fontSize: 16, lineHeight: 24 }} />
            </View>
          ) : null}
          {chunkImage && !imageSource ? (
            <ThemedText style={{ marginBottom: 16, color: colors.subText, fontSize: 14 }}>
              ※ 画像「{chunkImage}」は src/chunkImages.ts に登録してください。
            </ThemedText>
          ) : null}
          {!imageSource && !chunkImage && !chunkMarkdownBody ? (
            <ThemedText style={{ color: colors.subText, fontSize: 14 }}>
              スプレッドシートのY列に画像ファイル名または解説本文を記入すると表示されます。
            </ThemedText>
          ) : null}
          <Pressable
            style={StyleSheet.flatten([styles.backToQuestionButton, { backgroundColor: colors.accent }])}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backToQuestionText}>← 戻る</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backToQuestionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  backToQuestionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
