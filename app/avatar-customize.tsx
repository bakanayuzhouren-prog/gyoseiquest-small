import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AvatarWithHeldItem } from '@/components/AvatarWithHeldItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { useUser } from '@/src/context/UserContext';
import { AVATAR_BACKGROUND_LIST } from '@/src/data/avatarBackgrounds';
import { ITEM_ICON_SOURCES, STARTER_ITEMS, type AvatarItemId } from '@/src/data/avatarItems';
import { getPoints } from '@/utils/points';

type CustomizeTab = 'shop' | 'items' | 'background';

const TABS: { id: CustomizeTab; label: string }[] = [
    { id: 'shop', label: 'ショップ' },
    { id: 'items', label: 'アイテム' },
    { id: 'background', label: '背景' },
];

export default function AvatarCustomizeScreen() {
    const { avatarId, heldItemId, setHeldItemId, avatarBackgroundId, setAvatarBackgroundId } = useUser();
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [tab, setTab] = useState<CustomizeTab>('items');
    const points = getPoints();
    const bg = AVATAR_BACKGROUND_LIST.find((b) => b.id === avatarBackgroundId) ?? AVATAR_BACKGROUND_LIST[0];

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">カスタマイズ</ThemedText>
            </View>

            <View style={[styles.preview, { backgroundColor: bg.color, borderColor: colors.choiceBorder }]}>
                <AvatarWithHeldItem avatarId={avatarId} heldItemId={heldItemId} size={120} avatarStyle={styles.previewAvatar} />
            </View>

            <View style={[styles.tabRow, { borderColor: colors.choiceBorder }]}>
                {TABS.map((t) => {
                    const selected = tab === t.id;
                    return (
                        <Pressable
                            key={t.id}
                            accessibilityRole="button"
                            accessibilityLabel={t.label}
                            onPress={() => setTab(t.id)}
                            style={[
                                styles.tab,
                                selected && { backgroundColor: colors.choiceBg, borderColor: colors.accent },
                            ]}
                        >
                            <ThemedText type="defaultSemiBold" style={{ color: selected ? colors.accent : colors.text }}>
                                {t.label}
                            </ThemedText>
                        </Pressable>
                    );
                })}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {tab === 'shop' && (
                    <>
                        <ThemedText style={[styles.hint, { color: colors.subText }]}>
                            所持ポイント {points} pt。交換できる新アイテムは準備中です。初期文房具はアイテムタブで持てます。
                        </ThemedText>
                        <View style={styles.grid}>
                            {STARTER_ITEMS.map((item) => (
                                <View key={item.id} style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                                    <Image source={ITEM_ICON_SOURCES[item.id]} style={styles.tileImage} resizeMode="contain" />
                                    <ThemedText style={styles.tileLabel}>{item.label}</ThemedText>
                                    <ThemedText style={[styles.tileMeta, { color: colors.subText }]}>初期所持</ThemedText>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {tab === 'items' && (
                    <>
                        <ThemedText style={[styles.hint, { color: colors.subText }]}>
                            手に持つ文房具を選びます。もう一度タップで外せます。
                        </ThemedText>
                        <View style={styles.grid}>
                            {STARTER_ITEMS.map((item) => {
                                const selected = heldItemId === item.id;
                                return (
                                    <Pressable
                                        key={item.id}
                                        accessibilityRole="button"
                                        accessibilityLabel={item.label}
                                        style={[
                                            styles.tile,
                                            { backgroundColor: colors.card, borderColor: selected ? colors.accent : colors.choiceBorder },
                                            selected && { borderWidth: 3 },
                                        ]}
                                        onPress={() => {
                                            const next: AvatarItemId | null = selected ? null : item.id;
                                            setHeldItemId(next);
                                        }}
                                    >
                                        <Image source={ITEM_ICON_SOURCES[item.id]} style={styles.tileImage} resizeMode="contain" />
                                        <ThemedText style={styles.tileLabel}>{item.label}</ThemedText>
                                        {selected && (
                                            <View style={[styles.checkBadge, { backgroundColor: colors.accent }]}>
                                                <ThemedText style={{ color: '#fff', fontSize: 10 }}>✓</ThemedText>
                                            </View>
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>
                    </>
                )}

                {tab === 'background' && (
                    <>
                        <ThemedText style={[styles.hint, { color: colors.subText }]}>
                            プレビューの背景を選びます。
                        </ThemedText>
                        <View style={styles.grid}>
                            {AVATAR_BACKGROUND_LIST.map((option) => {
                                const selected = avatarBackgroundId === option.id;
                                return (
                                    <Pressable
                                        key={option.id}
                                        accessibilityRole="button"
                                        accessibilityLabel={option.label}
                                        style={[
                                            styles.tile,
                                            { backgroundColor: colors.card, borderColor: selected ? colors.accent : colors.choiceBorder },
                                            selected && { borderWidth: 3 },
                                        ]}
                                        onPress={() => setAvatarBackgroundId(option.id)}
                                    >
                                        <View style={[styles.bgSwatch, { backgroundColor: option.color, borderColor: colors.choiceBorder }]} />
                                        <ThemedText style={styles.tileLabel}>{option.label}</ThemedText>
                                        {selected && (
                                            <View style={[styles.checkBadge, { backgroundColor: colors.accent }]}>
                                                <ThemedText style={{ color: '#fff', fontSize: 10 }}>✓</ThemedText>
                                            </View>
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>
                    </>
                )}
            </ScrollView>

            <Pressable style={[styles.backButton, { backgroundColor: colors.choiceBg }]} onPress={() => router.back()}>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text }}>戻る</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 12,
        alignItems: 'center',
    },
    preview: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    previewAvatar: {
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tabRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 80,
    },
    hint: {
        fontSize: 13,
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
    },
    tile: {
        width: 100,
        paddingTop: 10,
        paddingBottom: 8,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    tileImage: {
        width: 64,
        height: 64,
    },
    tileLabel: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    tileMeta: {
        marginTop: 2,
        fontSize: 11,
    },
    bgSwatch: {
        width: 64,
        height: 64,
        borderRadius: 12,
        borderWidth: 1,
    },
    checkBadge: {
        position: 'absolute',
        top: 6,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        elevation: 5,
    },
});
