import { MarkdownText } from '@/components/markdown-text';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { DbTextbookBundle } from '@/src/content/dbTextbookBundles';

const C = {
  bg: '#E4E4E7',
  panel: '#F0F0F2',
  text: '#3F3F46',
  textMuted: '#71717A',
  border: '#D4D4D8',
  accent: '#5A8FA8',
};

type Props = {
  bundle: DbTextbookBundle;
};

export function DbMarkdownTextbook({ bundle }: Props) {
  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: bundle.title,
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={C.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
      >
        {bundle.subtitle ? <Text style={styles.subtitle}>{bundle.subtitle}</Text> : null}
        {bundle.description ? <Text style={styles.description}>{bundle.description}</Text> : null}
        <View style={styles.sourceBox}>
          <Text style={styles.sourceTitle}>取込元（DB）</Text>
          {bundle.sourceFiles.map((file) => (
            <Text key={file} style={styles.sourceLine}>
              ・{file}
            </Text>
          ))}
        </View>
        <View style={styles.body}>
          <MarkdownText text={bundle.markdown} />
        </View>
        <Text style={styles.footer}>
          出典ノートの試験用要約。全文転載なし。条文・判例は六法で確認すること。
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: C.textMuted,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: C.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  sourceBox: {
    backgroundColor: C.panel,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginBottom: 18,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.accent,
    marginBottom: 6,
  },
  sourceLine: {
    fontSize: 12,
    color: C.textMuted,
    lineHeight: 18,
  },
  body: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
  },
  footer: {
    marginTop: 18,
    fontSize: 12,
    color: C.textMuted,
    lineHeight: 18,
  },
});
