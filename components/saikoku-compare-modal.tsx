import { Image, Modal, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { MarkdownText } from '@/components/markdown-text';
import { ThemedText } from '@/components/themed-text';
import { SAIKOKU_COMPARE_BODY, SAIKOKU_COMPARE_CAPTION } from '@/src/compareTables';

export function SaikokuCompareModal({
  visible,
  onClose,
  imageSource,
  title = '催告の比較表',
  body = SAIKOKU_COMPARE_BODY,
  caption = SAIKOKU_COMPARE_CAPTION,
}: {
  visible: boolean;
  onClose: () => void;
  imageSource: number | undefined;
  title?: string;
  body?: string;
  caption?: string;
}) {
  const { width } = useWindowDimensions();
  const imageWidth = Math.min(width - 48, 560);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <ThemedText style={styles.closeBtnText}>閉じる</ThemedText>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.scrollBody}>
            {imageSource ? (
              <Image
                source={imageSource}
                style={{ width: imageWidth, height: imageWidth * 0.72, resizeMode: 'contain' }}
                accessibilityLabel={caption}
              />
            ) : (
              <ThemedText style={styles.empty}>比較表画像を読み込めません</ThemedText>
            )}
            <MarkdownText text={body} style={styles.body} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    maxHeight: '92%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 18 },
  closeBtn: {
    backgroundColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeBtnText: { color: '#fff', fontWeight: 'bold' },
  scrollBody: {
    padding: 16,
    alignItems: 'center',
  },
  body: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 22,
    alignSelf: 'stretch',
  },
  empty: {
    padding: 32,
    color: '#888',
    textAlign: 'center',
  },
});
