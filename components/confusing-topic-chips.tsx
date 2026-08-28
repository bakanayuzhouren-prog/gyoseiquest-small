import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ConfusingTopicChipItem = {
  key: string;
  label: string;
  axis: string;
  onPress: () => void;
};

export function ConfusingTopicChips({
  items,
  accent = '#2563EB',
  title = '紛らわしい論点',
}: {
  items: ConfusingTopicChipItem[];
  accent?: string;
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <View style={styles.box} accessibilityRole="summary">
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {items.map((item) => (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}（${item.axis}）`}
            style={({ pressed }) => [styles.chip, { borderColor: accent, opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.chipLabel, { color: accent }]}>{item.label}</Text>
            <Text style={styles.chipAxis}>{item.axis}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: 8,
    marginTop: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    maxWidth: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
    backgroundColor: '#FFFFFF',
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  chipAxis: {
    fontSize: 11,
    color: '#6B7280',
  },
});
