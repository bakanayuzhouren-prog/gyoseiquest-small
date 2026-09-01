import { Image, Platform, StyleSheet, Text, View } from 'react-native';

import { resolveImageAsset } from '@/src/resolveImageAsset';

export function PinRelatedImages({
  keys,
  notes,
}: {
  keys?: string[];
  notes?: string[];
}) {
  const resolved: { key: string; source: number }[] = [];
  const seen = new Set<string>();
  for (const key of keys || []) {
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const source = resolveImageAsset(key);
    if (source != null) resolved.push({ key, source });
  }
  const lines = (notes || []).map((s) => s.trim()).filter(Boolean);

  if (!resolved.length && !lines.length) return null;

  return (
    <View style={styles.wrap}>
      {resolved.map(({ key, source }) => (
        <Image
          key={key}
          source={source}
          style={[styles.image, Platform.OS === 'web' ? { height: 'auto' as unknown as number } : null]}
          resizeMode="contain"
          accessibilityLabel={`解説図 ${key}`}
        />
      ))}
      {lines.map((line) => (
        <Text key={line} style={styles.note}>
          {line}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  image: { width: '100%', aspectRatio: 16 / 9, marginBottom: 12, borderRadius: 8 },
  note: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1a202c',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
});
