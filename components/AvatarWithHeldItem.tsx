import { Image, StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AVATAR_ITEMS, ITEM_HELD_SOURCES, type AvatarItemId } from '@/src/data/avatarItems';
import { getAvatarSource, type AvatarType } from '@/src/context/UserContext';

type Props = {
    avatarId: AvatarType;
    heldItemId: AvatarItemId | null;
    size?: number;
    avatarStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
};

export function AvatarWithHeldItem({ avatarId, heldItemId, size = 100, avatarStyle, style }: Props) {
    const item = heldItemId ? AVATAR_ITEMS[heldItemId] : null;
    const heldSource = heldItemId ? ITEM_HELD_SOURCES[heldItemId] : undefined;
    const holdSize = Math.round(size * 0.62);

    return (
        <View style={[{ width: size, height: size }, style]}>
            <Image
                source={getAvatarSource(avatarId)}
                style={[{ width: size, height: size, borderRadius: size / 2 }, avatarStyle]}
            />
            {item && (
                <View
                    pointerEvents="none"
                    style={[
                        styles.heldWrap,
                        {
                            width: holdSize,
                            height: holdSize,
                            right: -Math.round(holdSize * 0.08),
                            bottom: -Math.round(holdSize * 0.04),
                        },
                    ]}
                >
                    {heldSource ? (
                        <Image source={heldSource} style={styles.heldImage} resizeMode="contain" />
                    ) : (
                        <ThemedText style={[styles.heldEmoji, { fontSize: Math.round(holdSize * 0.72) }]}>
                            {item.emoji}
                        </ThemedText>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    heldWrap: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heldImage: {
        width: '100%',
        height: '100%',
    },
    heldEmoji: {
        lineHeight: undefined,
        textAlign: 'center',
    },
});
