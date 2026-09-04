import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  CHOKKI_SUBJECTS,
  figuresForChokkiSubject,
  type ChokkiTrack,
} from '@/src/chokkiFinalCheckImages';
import { useTheme } from '@/src/context/ThemeContext';
import { getDeepdiveImageSource } from '@/src/deepdiveImages';

function isChokkiTrack(value: string | undefined): value is ChokkiTrack {
  return !!value && (CHOKKI_SUBJECTS as string[]).includes(value);
}

export default function ChokkiGalleryScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { track: trackParam } = useLocalSearchParams<{ track: string }>();
  const track = Array.isArray(trackParam) ? trackParam[0] : trackParam;
  const [zoomKey, setZoomKey] = useState<string | null>(null);
  const imageHeight = Math.round(Math.min(width - 32, 920) * (9 / 16));
  const zoomSource = zoomKey ? getDeepdiveImageSource(zoomKey) : undefined;

  const items = useMemo(() => {
    if (!isChokkiTrack(track)) return [];
    return figuresForChokkiSubject(track).map((item) => ({
      ...item,
      source: getDeepdiveImageSource(item.imageKey),
    }));
  }, [track]);

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="title" style={[styles.headerTitle, { color: colors.text }]}>
          {isChokkiTrack(track) ? track : '直前期はこれ！'}
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {!isChokkiTrack(track) ? (
          <Text style={[styles.lead, { color: colors.subText }]}>科目が見つからない。戻って選び直してほしい。</Text>
        ) : (
          <Text style={[styles.lead, { color: colors.subText }]}>
            {track}の比較図 {items.length} 枚。タップで拡大。原文・誌面は転載していない。
          </Text>
        )}

        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.subject, { color: colors.primary }]}>{item.subject}</Text>
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.axis, { color: colors.subText }]}>{item.axis}</Text>
            {item.source ? (
              <Pressable onPress={() => setZoomKey(item.imageKey)} accessibilityLabel={`${item.title}を拡大`}>
                <Image
                  source={item.source}
                  style={StyleSheet.flatten({ width: '100%' as const, height: imageHeight, borderRadius: 8 })}
                  contentFit="contain"
                />
                <Text style={[styles.hint, { color: colors.subText }]}>タップで拡大</Text>
              </Pressable>
            ) : (
              <View style={[styles.pending, { borderColor: colors.border }]}>
                <Text style={[styles.pendingText, { color: colors.subText }]}>
                  図は生成待ち。保存先: {item.imageKey}.png
                </Text>
              </View>
            )}
          </View>
        ))}

        <Text style={[styles.note, { color: colors.subText }]}>
          法令・判例・官公庁資料に基づき独自に再構成。原文・誌面は転載していない。
        </Text>
      </ScrollView>

      <Modal visible={!!zoomSource} transparent animationType="fade" onRequestClose={() => setZoomKey(null)}>
        <Pressable style={styles.zoomBackdrop} onPress={() => setZoomKey(null)}>
          {zoomSource ? (
            <Image source={zoomSource} style={styles.zoomImage} contentFit="contain" />
          ) : null}
          <Text style={styles.zoomClose}>閉じる</Text>
        </Pressable>
      </Modal>
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
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 48 },
  lead: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  subject: { fontSize: 12, fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700' },
  axis: { fontSize: 13, lineHeight: 20, marginBottom: 8 },
  hint: { fontSize: 12, textAlign: 'center', marginTop: 6 },
  pending: {
    minHeight: 88,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  pendingText: { fontSize: 13, textAlign: 'center' },
  note: { fontSize: 12, lineHeight: 18, marginTop: 8 },
  zoomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  zoomImage: { width: '100%', height: '88%' },
  zoomClose: { color: '#fff', marginTop: 8, fontSize: 16 },
});
