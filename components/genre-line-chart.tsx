import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type Props = {
  points: number[];
  color: string;
};

/** 正答率の折れ線。ジャンルを縦に積む画面用。 */
export function GenreLineChart({ points, color }: Props) {
  const width = 220;
  const height = 56;
  const pad = 6;
  if (points.length === 0) {
    return <ThemedText style={styles.empty}>未測定</ThemedText>;
  }
  if (points.length === 1) {
    return <ThemedText style={[styles.empty, { color }]}>{points[0]}%</ThemedText>;
  }
  const coords = points.map((value, index) => ({
    x: pad + (index * (width - pad * 2)) / (points.length - 1),
    y: pad + (1 - Math.max(0, Math.min(100, value)) / 100) * (height - pad * 2),
  }));
  return (
    <View style={[styles.chart, { width, height }]}>
      <View style={[styles.guide, { top: pad, width: width - pad * 2, left: pad }]} />
      <View style={[styles.guide, { top: height - pad, width: width - pad * 2, left: pad }]} />
      {coords.slice(0, -1).map((start, index) => {
        const end = coords[index + 1]!;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <View
            key={`line-${index}`}
            style={{
              position: 'absolute',
              left: (start.x + end.x) / 2 - length / 2,
              top: (start.y + end.y) / 2 - 1,
              width: length,
              height: 2,
              backgroundColor: color,
              transform: [{ rotate: `${angle}deg` }],
            }}
          />
        );
      })}
      {coords.map((point, index) => (
        <View
          key={`dot-${index}`}
          style={{
            position: 'absolute',
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    position: 'relative',
  },
  guide: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  empty: {
    fontSize: 13,
    opacity: 0.7,
  },
});
