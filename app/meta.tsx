import { GameCenter } from '@/components/GameCenter';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { AvatarWithHeldItem } from '@/components/AvatarWithHeldItem';
import { getAvatarSource, useUser } from '@/src/context/UserContext';
import {
    formatOfficeLabel,
    getPrefectureFromLocation,
    getPrefectureOfficeLocation,
    JAPAN_REGIONS,
    JapanRegion,
    MUNICIPALITIES,
    Prefecture,
    PREFECTURE_CAPITALS,
    PREFECTURES,
} from '@/src/data/japan_geo';
import { getPrefectureDesign } from '@/src/data/prefecture_designs';
import { addComment, getComments, GuestbookEntry } from '@/src/utils/comment_storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, PanResponder, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

// --- Game Constants ---
const MAP_SIZE = 1200; // Size of the virtual world
const PLAYER_SIZE = 60;
/** 元マップの CITY SEAL 位置（1200x1200 基準・入口付近） */
const SEAL_SIZE = 150;
const SEAL_LEFT = MAP_SIZE * 0.5 - SEAL_SIZE / 2;
const SEAL_TOP = MAP_SIZE * 0.705;
const BANNER_TOP = MAP_SIZE * 0.02;

// Screen Dimensions (roughly, dynamic in component)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function isDarkHex(hex: string): boolean {
    const h = hex.replace('#', '');
    if (h.length < 6) return false;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

// --- Types ---
type Position = { x: number; y: number };

export default function MetaScreen() {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const { avatarId, username, currentLocation, setCurrentLocation, heldItemId } = useUser();

    // --- Local Atmosphere Logic ---
    const currentPref = getPrefectureFromLocation(currentLocation);
    const prefDesign = getPrefectureDesign(currentPref);
    const officeLabel = formatOfficeLabel(currentLocation);
    const sealTextColor = isDarkHex(prefDesign.sealFill) ? '#f8fafc' : '#0f172a';

    // --- Game State ---
    const [playerPos, setPlayerPos] = useState<Position>({ x: 600, y: 700 });

    // Feature States
    const [isTravelOpen, setIsTravelOpen] = useState(false);
    const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
    const [isSayOpen, setIsSayOpen] = useState(false); // Speech input bubble
    const [isGameCenterOpen, setIsGameCenterOpen] = useState(false);

    // Data States
    const [travelRegion, setTravelRegion] = useState<JapanRegion | 'すべて'>('すべて');
    const [selectedPref, setSelectedPref] = useState<Prefecture | null>(null);
    const [comments, setComments] = useState<GuestbookEntry[]>([]);
    const [inputText, setInputText] = useState('');
    const [playerMessage, setPlayerMessage] = useState<string | null>(null); // Ephemeral speech bubble

    const visiblePrefs = useMemo(() => {
        if (travelRegion === 'すべて') return PREFECTURES;
        return JAPAN_REGIONS.find((r) => r.id === travelRegion)?.prefs ?? PREFECTURES;
    }, [travelRegion]);

    // Animation Map View
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Load comments when location changes
    useEffect(() => {
        if (isGuestbookOpen) {
            setComments(getComments(currentLocation || '東京都新宿区'));
        }
    }, [currentLocation, isGuestbookOpen]);

    // Movement Logic
    const [dragging, setDragging] = useState(false);
    const playerResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => setDragging(true),
            onPanResponderMove: (evt, gestureState) => {
                // Immediate feedback logic could go here
            },
            onPanResponderRelease: (evt, gestureState) => {
                setDragging(false);
                setPlayerPos((prev) => ({
                    x: Math.max(0, Math.min(MAP_SIZE - PLAYER_SIZE, prev.x + gestureState.dx)),
                    y: Math.max(0, Math.min(MAP_SIZE - PLAYER_SIZE, prev.y + gestureState.dy)),
                }));
            },
        })
    ).current;

    const travelTo = (fullLoc: string) => {
        setCurrentLocation(fullLoc);
        setIsTravelOpen(false);
        setSelectedPref(null);
        setPlayerPos({ x: 600, y: 700 });
    };

    const handleTravelPrefOffice = (pref: Prefecture) => {
        travelTo(getPrefectureOfficeLocation(pref));
    };

    const handleTravelMuni = (muni: string) => {
        if (!selectedPref) return;
        travelTo(`${selectedPref}${muni}`);
    };

    const closeTravel = () => {
        setIsTravelOpen(false);
        setSelectedPref(null);
    };

    const handlePostComment = () => {
        if (!inputText.trim()) return;
        const updated = addComment(currentLocation || '東京都新宿区', username, avatarId, inputText);
        setComments(updated);
        setInputText('');
    };

    const handleSay = () => {
        if (!inputText.trim()) return;
        setPlayerMessage(inputText);
        setInputText('');
        setIsSayOpen(false);
        setTimeout(() => setPlayerMessage(null), 5000);
    };

    const mapTranslateX = (SCREEN_WIDTH / 2) - playerPos.x;
    const mapTranslateY = (SCREEN_HEIGHT / 2) - playerPos.y;

    return (
        <ThemedView style={styles.container}>
            {/* --- UI Layer: Background (Fixed) --- */}
            <LinearGradient
                colors={theme === 'premium' ? ['#0F172A', '#000000'] : [colors.background, colors.choiceBg]}
                style={StyleSheet.absoluteFill}
            />

            {/* --- Game Layer: The World --- */}
            <View
                style={[
                    styles.worldMap,
                    {
                        width: MAP_SIZE,
                        height: MAP_SIZE,
                        transform: [{ translateX: mapTranslateX }, { translateY: mapTranslateY }]
                    }
                ]}
            >
                <Image
                    source={require('@/assets/images/city_hall_map.png')}
                    style={[StyleSheet.absoluteFill, { width: MAP_SIZE, height: MAP_SIZE, resizeMode: 'cover' }]}
                />
                {/* Prefecture color wash */}
                <View style={[StyleSheet.absoluteFill, { backgroundColor: prefDesign.tint, pointerEvents: 'none' }]} />
                <View
                    style={[
                        styles.cornerWash,
                        { backgroundColor: prefDesign.wash, top: 0, left: 0, borderBottomRightRadius: 180 },
                    ]}
                    pointerEvents="none"
                />
                <View
                    style={[
                        styles.cornerWash,
                        { backgroundColor: prefDesign.wash, top: 0, right: 0, borderBottomLeftRadius: 180 },
                    ]}
                    pointerEvents="none"
                />
                {theme === 'premium' && (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(15, 23, 42, 0.3)' }]} />
                )}

                {/* Prefecture banner */}
                <View
                    style={[
                        styles.prefBanner,
                        {
                            top: BANNER_TOP,
                            backgroundColor: prefDesign.accent,
                            borderColor: prefDesign.sealRing,
                        },
                    ]}
                    pointerEvents="none"
                >
                    <ThemedText style={styles.prefBannerMotif}>{prefDesign.motif}</ThemedText>
                    <ThemedText style={styles.prefBannerText}>{currentPref}の役所</ThemedText>
                    <ThemedText style={styles.prefBannerMotif}>{prefDesign.motif}</ThemedText>
                </View>

                {/* Cover original CITY SEAL with prefecture seal */}
                <View
                    style={[
                        styles.floorSeal,
                        {
                            left: SEAL_LEFT,
                            top: SEAL_TOP,
                            width: SEAL_SIZE,
                            height: SEAL_SIZE,
                            borderColor: prefDesign.sealRing,
                            backgroundColor: prefDesign.sealFill,
                        },
                    ]}
                    pointerEvents="none"
                >
                    <ThemedText style={[styles.sealMark, { color: sealTextColor }]}>{prefDesign.sealMark}</ThemedText>
                    <ThemedText style={[styles.sealPref, { color: sealTextColor }]} numberOfLines={1}>
                        {currentPref === '北海道' ? '北海道' : currentPref.replace(/(都|府|県)$/, '')}
                    </ThemedText>
                    <ThemedText style={[styles.sealLatin, { color: sealTextColor }]}>{prefDesign.sealLatin}</ThemedText>
                </View>

                {/* Entrance plaque */}
                <View
                    style={[
                        styles.entrancePlaque,
                        {
                            left: MAP_SIZE * 0.5 - 110,
                            top: SEAL_TOP + SEAL_SIZE + 8,
                            backgroundColor: prefDesign.accent,
                        },
                    ]}
                    pointerEvents="none"
                >
                    <ThemedText style={styles.entrancePlaqueText}>
                        {prefDesign.motif} {officeLabel}
                    </ThemedText>
                </View>

                {/* Player */}
                <View
                    style={[
                        styles.playerContainer,
                        { left: playerPos.x, top: playerPos.y }
                    ]}
                    {...playerResponder.panHandlers}
                >
                    {/* Speech Bubble */}
                    {playerMessage && (
                        <View style={[styles.speechBubble, { backgroundColor: '#fff', borderColor: colors.primary }]}>
                            <ThemedText style={{ color: '#000', fontSize: 12 }}>{playerMessage}</ThemedText>
                            <View style={[styles.bubbleArrow, { borderTopColor: colors.primary }]} />
                        </View>
                    )}

                    <View style={[styles.playerAvatar, { borderColor: colors.primary, shadowColor: colors.primary }]}>
                        <AvatarWithHeldItem
                            avatarId={avatarId}
                            heldItemId={heldItemId}
                            size={46}
                            avatarStyle={styles.playerImage}
                        />
                    </View>
                    <ThemedText style={styles.playerName}>{username}</ThemedText>
                    {dragging && <ThemedText style={styles.dragHint}>Moving...</ThemedText>}
                </View>

            </View>

            {/* --- UI Layer: HUD --- */}
            <View style={styles.hud} pointerEvents="box-none">
                <View style={[styles.locationBadge, { backgroundColor: colors.card, borderColor: prefDesign.accent }]}>
                    <ThemedText style={[styles.locationEyebrow, { color: colors.subText }]}>
                        {prefDesign.motif} いまいる役所
                    </ThemedText>
                    <ThemedText style={[styles.locationText, { color: colors.text }]} numberOfLines={2}>
                        📍 {officeLabel}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 11, color: colors.subText, marginTop: 4 }}>{prefDesign.message}</ThemedText>
                </View>

                {/* Speech Input Field (When Say is active) */}
                {isSayOpen && (
                    <View style={[styles.sayInputContainer, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                        <TextInput
                            style={[styles.input, { color: colors.text }]}
                            placeholder="何を話しますか？"
                            placeholderTextColor={colors.subText}
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={handleSay}
                            autoFocus
                        />
                        <Pressable onPress={handleSay} style={{ padding: 5 }}>
                            <ThemedText style={{ color: colors.primary, fontWeight: 'bold' }}>発言</ThemedText>
                        </Pressable>
                        <Pressable onPress={() => setIsSayOpen(false)} style={{ padding: 5 }}>
                            <ThemedText style={{ color: colors.subText }}>×</ThemedText>
                        </Pressable>
                    </View>
                )}

                <View style={styles.btnRow}>
                    <Pressable style={[styles.hudBtn, { backgroundColor: prefDesign.accent }]} onPress={() => setIsTravelOpen(true)}>
                        <ThemedText style={styles.btnText}>🌐 移動</ThemedText>
                    </Pressable>
                    <Pressable style={[styles.hudBtn, { backgroundColor: '#10b981' }]} onPress={() => setIsGuestbookOpen(true)}>
                        <ThemedText style={styles.btnText}>📖 掲示板</ThemedText>
                    </Pressable>
                    <Pressable style={[styles.hudBtn, { backgroundColor: '#f59e0b' }]} onPress={() => setIsSayOpen(true)}>
                        <ThemedText style={styles.btnText}>💬 話す</ThemedText>
                    </Pressable>
                    <Pressable style={[styles.hudBtn, { backgroundColor: '#8b5cf6' }]} onPress={() => setIsGameCenterOpen(true)}>
                        <ThemedText style={styles.btnText}>🎮 ゲーム</ThemedText>
                    </Pressable>
                </View>
            </View>

            {/* --- Modals --- */}
            {/* Game Center Modal */}
            <GameCenter visible={isGameCenterOpen} onClose={() => setIsGameCenterOpen(false)} />

            <Modal
                visible={isTravelOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={closeTravel}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.travelContainer, { backgroundColor: colors.background, borderColor: colors.choiceBorder }]}>
                        <View style={[styles.chatHeader, { borderBottomColor: colors.choiceBorder }]}>
                            <View style={{ flex: 1, paddingRight: 8 }}>
                                <ThemedText type="subtitle">47都道府県の役所</ThemedText>
                                <ThemedText style={{ fontSize: 12, color: colors.subText, marginTop: 2 }}>
                                    県庁所在地の役所へワンタップ移動
                                </ThemedText>
                            </View>
                            <Pressable onPress={closeTravel} hitSlop={8}>
                                <ThemedText style={{ color: colors.subText }}>閉じる</ThemedText>
                            </Pressable>
                        </View>

                        <View style={styles.travelContent}>
                            {!selectedPref ? (
                                <>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.regionChips}
                                    >
                                        <Pressable
                                            onPress={() => setTravelRegion('すべて')}
                                            style={[
                                                styles.regionChip,
                                                {
                                                    backgroundColor: travelRegion === 'すべて' ? colors.primary : colors.choiceBg,
                                                    borderColor: travelRegion === 'すべて' ? colors.primary : colors.choiceBorder,
                                                },
                                            ]}
                                        >
                                            <ThemedText style={{ color: travelRegion === 'すべて' ? '#fff' : colors.choiceText, fontSize: 12, fontWeight: '600' }}>
                                                すべて
                                            </ThemedText>
                                        </Pressable>
                                        {JAPAN_REGIONS.map((region) => {
                                            const selected = travelRegion === region.id;
                                            return (
                                                <Pressable
                                                    key={region.id}
                                                    onPress={() => setTravelRegion(region.id)}
                                                    style={[
                                                        styles.regionChip,
                                                        {
                                                            backgroundColor: selected ? colors.primary : colors.choiceBg,
                                                            borderColor: selected ? colors.primary : colors.choiceBorder,
                                                        },
                                                    ]}
                                                >
                                                    <ThemedText style={{ color: selected ? '#fff' : colors.choiceText, fontSize: 12, fontWeight: '600' }}>
                                                        {region.label}
                                                    </ThemedText>
                                                </Pressable>
                                            );
                                        })}
                                    </ScrollView>

                                    <ScrollView contentContainerStyle={styles.prefGrid}>
                                        {visiblePrefs.map((pref) => {
                                            const capital = PREFECTURE_CAPITALS[pref];
                                            const design = getPrefectureDesign(pref);
                                            const isHere = currentLocation === getPrefectureOfficeLocation(pref);
                                            return (
                                                <View
                                                    key={pref}
                                                    style={[
                                                        styles.prefCard,
                                                        {
                                                            backgroundColor: colors.card,
                                                            borderColor: isHere ? design.accent : colors.choiceBorder,
                                                            borderWidth: isHere ? 2 : 1,
                                                        },
                                                    ]}
                                                >
                                                    <View style={styles.prefCardHeader}>
                                                        <ThemedText style={{ fontSize: 16 }}>{design.motif}</ThemedText>
                                                        <ThemedText style={[styles.prefCardTitle, { color: colors.text, flex: 1 }]} numberOfLines={1}>
                                                            {pref}
                                                        </ThemedText>
                                                    </View>
                                                    <View style={[styles.prefAccentBar, { backgroundColor: design.accent }]} />
                                                    <ThemedText style={{ fontSize: 11, color: colors.subText, marginBottom: 10 }} numberOfLines={1}>
                                                        {capital}役所
                                                    </ThemedText>
                                                    <Pressable
                                                        accessibilityRole="button"
                                                        accessibilityLabel={`${pref}の役所へ行く`}
                                                        style={[styles.prefGoBtn, { backgroundColor: design.accent }]}
                                                        onPress={() => handleTravelPrefOffice(pref)}
                                                    >
                                                        <ThemedText style={styles.prefGoBtnText}>役所へ行く</ThemedText>
                                                    </Pressable>
                                                    <Pressable
                                                        style={styles.prefMoreBtn}
                                                        onPress={() => setSelectedPref(pref)}
                                                    >
                                                        <ThemedText style={{ fontSize: 11, color: design.accent }}>市区町村を選ぶ</ThemedText>
                                                    </Pressable>
                                                </View>
                                            );
                                        })}
                                    </ScrollView>
                                </>
                            ) : (
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.travelSubHeader, { borderBottomColor: colors.choiceBorder }]}>
                                        <Pressable onPress={() => setSelectedPref(null)} style={{ paddingVertical: 8, paddingRight: 10 }}>
                                            <ThemedText style={{ color: colors.accent }}>{'< 都道府県に戻る'}</ThemedText>
                                        </Pressable>
                                        <ThemedText type="defaultSemiBold" style={{ flex: 1 }} numberOfLines={1}>
                                            {selectedPref}の市区町村
                                        </ThemedText>
                                    </View>
                                    <Pressable
                                        style={[styles.capitalQuickRow, { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder }]}
                                        onPress={() => handleTravelPrefOffice(selectedPref)}
                                    >
                                        <ThemedText style={{ fontWeight: '700', color: colors.text }}>
                                            ★ 県庁所在地（{PREFECTURE_CAPITALS[selectedPref]}役所）
                                        </ThemedText>
                                        <ThemedText style={{ fontSize: 12, color: colors.accent }}>移動</ThemedText>
                                    </Pressable>
                                    <ScrollView contentContainerStyle={styles.muniList}>
                                        {MUNICIPALITIES[selectedPref].map((muni) => (
                                            <Pressable
                                                key={muni}
                                                style={[styles.muniItem, { borderBottomColor: colors.choiceBorder }]}
                                                onPress={() => handleTravelMuni(muni)}
                                            >
                                                <ThemedText>{muni}役所</ThemedText>
                                            </Pressable>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={isGuestbookOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsGuestbookOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.guestbookContainer, { backgroundColor: colors.background, borderColor: colors.choiceBorder }]}>
                        <View style={[styles.chatHeader, { borderBottomColor: colors.choiceBorder }]}>
                            <ThemedText type="subtitle">📖 {officeLabel} 掲示板</ThemedText>
                            <Pressable onPress={() => setIsGuestbookOpen(false)}>
                                <ThemedText style={{ color: colors.subText }}>閉じる</ThemedText>
                            </Pressable>
                        </View>

                        <Animated.ScrollView style={{ flex: 1, padding: 10 }}>
                            {comments.length === 0 ? (
                                <ThemedText style={{ textAlign: 'center', marginTop: 20, color: colors.subText }}>まだ書き込みはありません。一番乗りしよう！</ThemedText>
                            ) : (
                                comments.map(c => (
                                    <View key={c.id} style={[styles.commentItem, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                                        <Image source={getAvatarSource(c.avatarId)} style={styles.commentAvatar} />
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <ThemedText style={{ fontWeight: 'bold', fontSize: 12 }}>{c.username}</ThemedText>
                                                <ThemedText style={{ fontSize: 10, color: colors.subText }}>{new Date(c.timestamp).toLocaleString()}</ThemedText>
                                            </View>
                                            <ThemedText style={{ marginTop: 4 }}>{c.text}</ThemedText>
                                        </View>
                                    </View>
                                ))
                            )}
                        </Animated.ScrollView>

                        <View style={[styles.commentInputArea, { borderTopColor: colors.choiceBorder, backgroundColor: colors.choiceBg }]}>
                            <TextInput
                                style={[styles.input, { flex: 1, color: colors.text, marginRight: 10 }]}
                                placeholder="旅の思い出を残そう..."
                                placeholderTextColor={colors.subText}
                                value={inputText}
                                onChangeText={setInputText}
                            />
                            <Pressable onPress={handlePostComment} style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 20 }}>
                                <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>送信</ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, overflow: 'hidden' },
    worldMap: {},
    cornerWash: { position: 'absolute', width: 220, height: 180, opacity: 0.9 },
    prefBanner: {
        position: 'absolute',
        alignSelf: 'center',
        left: MAP_SIZE * 0.5 - 160,
        width: 320,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 2,
        zIndex: 6,
        elevation: 4,
    },
    prefBannerMotif: { fontSize: 16, color: '#fff' },
    prefBannerText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
    floorSeal: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 6,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    sealMark: { fontSize: 28, fontWeight: '900', lineHeight: 32 },
    sealPref: { fontSize: 13, fontWeight: '800', marginTop: 2 },
    sealLatin: { fontSize: 9, fontWeight: '700', opacity: 0.85, marginTop: 2, letterSpacing: 1 },
    entrancePlaque: {
        position: 'absolute',
        width: 220,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 6,
    },
    entrancePlaqueText: { color: '#fff', fontSize: 11, fontWeight: '700', textAlign: 'center' },
    playerContainer: { position: 'absolute', alignItems: 'center', width: PLAYER_SIZE, height: PLAYER_SIZE, zIndex: 10 },
    playerAvatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10 },
    playerImage: { width: 46, height: 46, borderRadius: 23 },
    playerName: { fontSize: 10, fontWeight: 'bold', marginTop: 4, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 2 },
    dragHint: { fontSize: 8, color: 'yellow', marginBottom: -10 },
    hud: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'space-between', paddingTop: 56, paddingBottom: 28, paddingHorizontal: 16 },
    coords: { fontFamily: 'monospace', fontSize: 10, marginBottom: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 16 },
    chatHeader: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
    locationBadge: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 16,
        borderWidth: 1,
        elevation: 3,
        maxWidth: '92%',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    locationEyebrow: { fontSize: 10, fontWeight: '600', marginBottom: 2, letterSpacing: 0.4 },
    locationText: { fontSize: 15, fontWeight: 'bold' },
    btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignSelf: 'center', maxWidth: 420 },
    hudBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 24, elevation: 5, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, minWidth: 88, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    // Travel Modal
    travelContainer: { flex: 1, maxHeight: '88%', borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    travelContent: { flex: 1 },
    travelSubHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4, borderBottomWidth: 1 },
    regionChips: { paddingHorizontal: 12, paddingVertical: 10, gap: 8, alignItems: 'center' },
    regionChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 1 },
    prefGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingBottom: 20, gap: 10, justifyContent: 'flex-start' },
    prefCard: {
        width: '47%',
        flexGrow: 1,
        maxWidth: '48%',
        minWidth: 140,
        borderRadius: 14,
        padding: 12,
    },
    prefCardTitle: { fontSize: 15, fontWeight: '700' },
    prefCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
    prefAccentBar: { height: 3, borderRadius: 2, marginBottom: 8, width: '100%' },
    prefGoBtn: { borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
    prefGoBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
    prefMoreBtn: { marginTop: 8, alignItems: 'center', paddingVertical: 2 },
    capitalQuickRow: {
        marginHorizontal: 12,
        marginTop: 10,
        marginBottom: 4,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    muniList: { padding: 10, paddingBottom: 24 },
    muniItem: { paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1 },

    // New Styles
    sayInputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 20, borderWidth: 1, marginBottom: 10, width: '90%' },
    input: { fontSize: 14, padding: 5 },
    speechBubble: { position: 'absolute', bottom: 60, padding: 8, borderRadius: 10, borderWidth: 2, maxWidth: 200, zIndex: 20 },
    bubbleArrow: { position: 'absolute', bottom: -10, left: '50%', marginLeft: -10, width: 0, height: 0, borderLeftWidth: 10, borderRightWidth: 10, borderTopWidth: 10, borderLeftColor: 'transparent', borderRightColor: 'transparent' },
    guestbookContainer: { flex: 1, margin: 20, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    commentItem: { flexDirection: 'row', padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 8, alignItems: 'flex-start' },
    commentAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
    commentInputArea: { padding: 10, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1 },
});
