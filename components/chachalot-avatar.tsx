import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  /** 読み上げ中は口パクループ */
  active: boolean;
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * 下端付近を軸に scaleY で開閉し、話しているように見せる（単一PNG用）。
 */
export function ChachalotAvatar({ active, source, size = 32, style }: Props) {
  const mouthY = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      mouthY.stopAnimation();
      mouthY.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(mouthY, {
          toValue: 0.82,
          duration: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(mouthY, {
          toValue: 1,
          duration: 110,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(35),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
    };
  }, [active, mouthY]);

  const pivot = size * 0.42;

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          transform: [{ translateY: pivot }, { scaleY: mouthY }, { translateY: -pivot }],
        },
        style,
      ]}
    >
      <Image source={source} style={{ width: size, height: size }} resizeMode="contain" />
    </Animated.View>
  );
}
