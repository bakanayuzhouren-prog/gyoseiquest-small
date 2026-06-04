import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/src/context/ThemeContext';
import { Pressable } from 'react-native';

type Props = {
  label?: string;
  onPress: () => void;
};

/** 13条図の下に置く「602条チャンク」専用ボタン（画像上のホットスポットは使わない） */
export function DeepdiveChunkLinkButton({
  label = '602条の期間表をチャンクで見る',
  onPress,
}: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        marginTop: 10,
        marginBottom: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: pressed ? colors.accent : 'rgba(37, 99, 235, 0.12)',
        borderWidth: 1,
        borderColor: colors.accent,
        alignItems: 'center',
      })}
    >
      {({ pressed }) => (
        <ThemedText style={{ fontSize: 15, fontWeight: '700', color: pressed ? '#fff' : colors.accent }}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}
