import { Image, StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AVATAR_AURAS, type AvatarAuraId } from '@/src/data/avatarAuras';
import { AVATAR_ITEMS, ITEM_HELD_SOURCES, type AvatarItemId } from '@/src/data/avatarItems';
import { getAvatarSource, useUser, type AvatarType } from '@/src/context/UserContext';

type Props = {
    avatarId: AvatarType;
    heldItemId: AvatarItemId | null;
    auraId?: AvatarAuraId | null;
    size?: number;
    avatarStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
};

export function AvatarWithHeldItem({ avatarId, heldItemId, auraId: auraIdProp, size = 100, avatarStyle, style }: Props) {
    const { auraId: auraFromUser } = useUser();
    const resolvedAuraId = auraIdProp !== undefined ? auraIdProp : auraFromUser;
    const aura = resolvedAuraId ? AVATAR_AURAS[resolvedAuraId] : null;
    const item = heldItemId ? AVATAR_ITEMS[heldItemId] : null;
    const heldSource = heldItemId ? ITEM_HELD_SOURCES[heldItemId] : undefined;
    const holdSize = Math.round(size * 0.62);
    const auraPad = Math.round(size * 0.16);

    return (
        <View style={[{ width: size, height: size }, style]}>
            {aura && (
                <View
                    pointerEvents="none"
                    style={[
                        styles.auraGlow,
                        {
                            width: size + auraPad * 2,
                            height: size + auraPad * 2,
                            borderRadius: (size + auraPad * 2) / 2,
                            top: -auraPad,
                            left: -auraPad,
                            backgroundColor: aura.glow,
                            borderColor: aura.ring,
                        },
                    ]}
                />
            )}
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
    auraGlow: {
        position: 'absolute',
        borderWidth: 3,
    },
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
