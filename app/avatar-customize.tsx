import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AvatarWithHeldItem } from '@/components/AvatarWithHeldItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { useUser } from '@/src/context/UserContext';
import { AVATAR_AURA_LIST, type AvatarAuraId } from '@/src/data/avatarAuras';
import { AVATAR_BACKGROUND_LIST } from '@/src/data/avatarBackgrounds';
import {
    AVATAR_ITEMS,
    ITEM_ICON_SOURCES,
    SHOP_ITEMS,
    STARTER_ITEMS,
    formatItemPrice,
    type AvatarItemId,
} from '@/src/data/avatarItems';
import { getPoints, spendPoints } from '@/utils/points';

type CustomizeTab = 'shop' | 'items' | 'background';
type ShopKind = 'item' | 'polish';
type CommandId = 'buy_items';

const TABS: { id: CustomizeTab; label: string }[] = [
    { id: 'shop', label: 'ショップ' },
    { id: 'items', label: 'アイテム' },
    { id: 'background', label: '背景' },
];

const COMMANDS: { id: CommandId; label: string }[] = [
    { id: 'buy_items', label: 'アイテムを買いに行く' },
];

function ItemGlyph({ itemId, size = 64 }: { itemId: AvatarItemId; size?: number }) {
    const source = ITEM_ICON_SOURCES[itemId];
    if (source) {
        return <Image source={source} style={{ width: size, height: size }} resizeMode="contain" />;
    }
    return <ThemedText style={{ fontSize: Math.round(size * 0.72), lineHeight: size }}>{AVATAR_ITEMS[itemId].emoji}</ThemedText>;
}

export default function AvatarCustomizeScreen() {
    const {
        avatarId,
        heldItemId,
        setHeldItemId,
        ownedItemIds,
        addOwnedItemId,
        ownsItem,
        auraId,
        setAuraId,
        addOwnedAuraId,
        ownsAura,
        avatarBackgroundId,
        setAvatarBackgroundId,
    } = useUser();
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [commandId, setCommandId] = useState<CommandId | null>(null);
    const [tab, setTab] = useState<CustomizeTab>('items');
    const [shopKind, setShopKind] = useState<ShopKind>('item');
    const [points, setPoints] = useState(getPoints);

    const bg = AVATAR_BACKGROUND_LIST.find((b) => b.id === avatarBackgroundId) ?? AVATAR_BACKGROUND_LIST[0];
    const ownedHoldable = useMemo(
        () => [...STARTER_ITEMS, ...SHOP_ITEMS.filter((item) => ownedItemIds.includes(item.id))],
        [ownedItemIds],
    );

    const buyItem = (id: AvatarItemId) => {
        const item = AVATAR_ITEMS[id];
        if (ownsItem(id)) {
            setHeldItemId(heldItemId === id ? null : id);
            return;
        }
        const next = spendPoints(item.price);
        if (next === null) {
            Alert.alert('ポイント不足', `${item.label}は ${formatItemPrice(item.price)} です。所持 ${points.toLocaleString('ja-JP')} pt。`);
            return;
        }
        addOwnedItemId(id);
        setHeldItemId(id);
        setPoints(next);
    };

    const buyAura = (id: AvatarAuraId) => {
        const aura = AVATAR_AURA_LIST.find((a) => a.id === id);
        if (!aura) return;
        if (ownsAura(id)) {
            setAuraId(auraId === id ? null : id);
            return;
        }
        const next = spendPoints(aura.price);
        if (next === null) {
            Alert.alert('ポイント不足', `${aura.label}は ${formatItemPrice(aura.price)} です。所持 ${points.toLocaleString('ja-JP')} pt。`);
            return;
        }
        addOwnedAuraId(id);
        setAuraId(id);
        setPoints(next);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">カスタマイズ</ThemedText>
            </View>

            <View style={[styles.preview, { backgroundColor: bg.color, borderColor: colors.choiceBorder }]}>
                <AvatarWithHeldItem avatarId={avatarId} heldItemId={heldItemId} size={120} avatarStyle={styles.previewAvatar} />
            </View>

            <ThemedText style={[styles.commandLabel, { color: colors.subText }]}>コマンド</ThemedText>
            <View style={styles.commandRow}>
                {COMMANDS.map((cmd) => {
                    const selected = commandId === cmd.id;
                    return (
                        <Pressable
                            key={cmd.id}
                            accessibilityRole="button"
                            accessibilityLabel={cmd.label}
                            onPress={() => setCommandId(selected ? null : cmd.id)}
                            style={[
                                styles.commandChip,
                                { borderColor: selected ? colors.accent : colors.choiceBorder, backgroundColor: colors.card },
                                selected && { borderWidth: 2 },
                            ]}
                        >
                            <ThemedText type="defaultSemiBold" style={{ color: selected ? colors.accent : colors.text }}>
                                {cmd.label}
                            </ThemedText>
                        </Pressable>
                    );
                })}
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
                {tab === 'shop' && commandId !== 'buy_items' && (
                    <ThemedText style={[styles.hint, { color: colors.subText }]}>
                        先に「アイテムを買いに行く」を選んでから、ショップを押してください。
                    </ThemedText>
                )}

                {tab === 'shop' && commandId === 'buy_items' && (
                    <>
                        <ThemedText style={[styles.hint, { color: colors.subText }]}>
                            所持ポイント {points.toLocaleString('ja-JP')} pt。交換すると持てます。一番高いのは黄金のロップ（100万 pt）です。
                        </ThemedText>
                        <View style={styles.kindRow}>
                            {([
                                { id: 'item' as const, label: 'アイテム' },
                                { id: 'polish' as const, label: '自分磨き' },
                            ]).map((kind) => {
                                const selected = shopKind === kind.id;
                                return (
                                    <Pressable
                                        key={kind.id}
                                        accessibilityRole="button"
                                        accessibilityLabel={kind.label}
                                        onPress={() => setShopKind(kind.id)}
                                        style={[
                                            styles.kindChip,
                                            { borderColor: selected ? colors.accent : colors.choiceBorder, backgroundColor: colors.card },
                                        ]}
                                    >
                                        <ThemedText type="defaultSemiBold" style={{ color: selected ? colors.accent : colors.text }}>
                                            {kind.label}
                                        </ThemedText>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {shopKind === 'item' && (
                            <View style={styles.grid}>
                                {SHOP_ITEMS.map((item) => {
                                    const owned = ownsItem(item.id);
                                    const equipped = heldItemId === item.id;
                                    const canBuy = points >= item.price;
                                    return (
                                        <Pressable
                                            key={item.id}
                                            accessibilityRole="button"
                                            accessibilityLabel={`${item.label} ${formatItemPrice(item.price)}`}
                                            style={[
                                                styles.tile,
                                                { backgroundColor: colors.card, borderColor: equipped ? colors.accent : colors.choiceBorder },
                                                equipped && { borderWidth: 3 },
                                            ]}
                                            onPress={() => buyItem(item.id)}
                                        >
                                            <ItemGlyph itemId={item.id} />
                                            <ThemedText style={styles.tileLabel}>{item.label}</ThemedText>
                                            <ThemedText style={[styles.tileMeta, { color: owned ? colors.accent : canBuy ? colors.primary : colors.subText }]}>
                                                {owned ? '所持済み' : formatItemPrice(item.price)}
                                            </ThemedText>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        )}

                        {shopKind === 'polish' && (
                            <>
                                <ThemedText style={[styles.hint, { color: colors.subText }]}>
                                    自分磨きを交換すると、アイコンのまわりにオーラが見えます。もう一度タップで外せます。
                                </ThemedText>
                                <View style={styles.grid}>
                                    {AVATAR_AURA_LIST.map((aura) => {
                                        const owned = ownsAura(aura.id);
                                        const equipped = auraId === aura.id;
                                        const canBuy = points >= aura.price;
                                        return (
                                            <Pressable
                                                key={aura.id}
                                                accessibilityRole="button"
                                                accessibilityLabel={`${aura.label} ${formatItemPrice(aura.price)}`}
                                                style={[
                                                    styles.tile,
                                                    { backgroundColor: colors.card, borderColor: equipped ? colors.accent : colors.choiceBorder },
                                                    equipped && { borderWidth: 3 },
                                                ]}
                                                onPress={() => buyAura(aura.id)}
                                            >
                                                <ThemedText style={{ fontSize: 40 }}>{aura.emoji}</ThemedText>
                                                <ThemedText style={styles.tileLabel}>{aura.label}</ThemedText>
                                                <ThemedText style={[styles.tileMeta, { color: owned ? colors.accent : canBuy ? colors.primary : colors.subText }]}>
                                                    {owned ? '所持済み' : formatItemPrice(aura.price)}
                                                </ThemedText>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </>
                )}

                {tab === 'items' && (
                    <>
                        <ThemedText style={[styles.hint, { color: colors.subText }]}>
                            持っているものを手に持ちます。もう一度タップで外せます。
                        </ThemedText>
                        <View style={styles.grid}>
                            {ownedHoldable.map((item) => {
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
                                        <ItemGlyph itemId={item.id} />
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
        overflow: 'visible',
    },
    previewAvatar: {
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    commandLabel: {
        fontSize: 12,
        marginBottom: 6,
    },
    commandRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    commandChip: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: 1,
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
    kindRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    kindChip: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
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
    tileLabel: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    tileMeta: {
        marginTop: 2,
        fontSize: 11,
        textAlign: 'center',
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
