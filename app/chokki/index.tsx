import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CHOKKI_SUBJECTS, figuresForChokkiSubject } from '@/src/chokkiFinalCheckImages';
import { useTheme } from '@/src/context/ThemeContext';

const isLightBg = (hex: string) => {
  if (!hex || hex.startsWith('rgba')) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export default function ChokkiSubjectScreen() {
  const { colors } = useTheme();
  const textOnButton = isLightBg(colors.choiceBg) ? '#000000' : colors.choiceText;

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
          直前期はこれ！
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.list}>
        <ThemedText style={[styles.lead, { color: colors.subText }]}>
          科目を選ぶと、比較図が出る。直前期パックの図は、該当科目にも入れてある。
        </ThemedText>
        {CHOKKI_SUBJECTS.map((subject, index) => {
          const count = figuresForChokkiSubject(subject).length;
          return (
            <Pressable
              key={subject}
              style={StyleSheet.flatten([
                styles.subjectButton,
                { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder },
              ])}
              onPress={() =>
                router.push({ pathname: '/chokki/[track]', params: { track: subject } })
              }
            >
              <ThemedText
                type="defaultSemiBold"
                style={StyleSheet.flatten([styles.subjectText, { color: textOnButton }])}
              >
                {index + 1}. {subject}（{count}）
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: { padding: 8, marginRight: 4 },
  headerTitle: { flex: 1, fontSize: 18 },
  list: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  lead: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  subjectButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  subjectText: { fontSize: 18 },
});
