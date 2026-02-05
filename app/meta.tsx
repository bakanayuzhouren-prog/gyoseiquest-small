import { GameCenter } from '@/components/GameCenter';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { AVATARS, useUser } from '@/src/context/UserContext';
import { getRegionTheme, MUNICIPALITIES, Prefecture, PREFECTURES, REGION_MODIFIERS } from '@/src/data/japan_geo';
import { addComment, getComments, GuestbookEntry } from '@/src/utils/comment_storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, PanResponder, Pressable, StyleSheet, TextInput, View } from 'react-native';
import ChatScreen from './chat';

// --- Game Constants ---
const MAP_SIZE = 1200; // Size of the virtual world
const PLAYER_SIZE = 60;
const NPC_SIZE = 50;
const INTERACTION_RADIUS = 100;

// Screen Dimensions (roughly, dynamic in component)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// --- Types ---
type Position = { x: number; y: number };
type NPC = { id: string; name: string; pos: Position; icon: any; message: string };

// --- NPC Data ---
const NPCS: NPC[] = [
    { id: 'chiba', name: 'ちばみほこ', pos: { x: 600, y: 600 }, icon: null, message: '勉強進んでる？' },
    { id: 'mami', name: 'まみさん', pos: { x: 300, y: 400 }, icon: null, message: '有益費の知識、定着してる？' },
    { id: 'kumachan', name: 'くまちゃん', pos: { x: 900, y: 800 }, icon: null, message: 'がおー' },
];

export default function MetaScreen() {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const { avatarId, username, currentLocation, setCurrentLocation } = useUser();

    // --- Local Atmosphere Logic ---
    const currentPref = PREFECTURES.find(p => currentLocation?.startsWith(p)) || '東京都';
    const regionTheme = getRegionTheme(currentPref as Prefecture);
    const atmosphere = REGION_MODIFIERS[regionTheme];

    // --- Game State ---
    const [playerPos, setPlayerPos] = useState<Position>({ x: 600, y: 700 });
    const [activeNpc, setActiveNpc] = useState<NPC | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Feature States
    const [isTravelOpen, setIsTravelOpen] = useState(false);
    const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
    const [isSayOpen, setIsSayOpen] = useState(false); // Speech input bubble
    const [isGameCenterOpen, setIsGameCenterOpen] = useState(false);

    // Data States
    const [selectedPref, setSelectedPref] = useState<Prefecture | null>(null);
    const [comments, setComments] = useState<GuestbookEntry[]>([]);
    const [inputText, setInputText] = useState('');
    const [playerMessage, setPlayerMessage] = useState<string | null>(null); // Ephemeral speech bubble

    // Animation Map View
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Load comments when location changes
    useEffect(() => {
        if (isGuestbookOpen) {
            setComments(getComments(currentLocation || '東京都千代田区'));
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

    const handleTravel = (muni: string) => {
        const fullLoc = selectedPref ? `${selectedPref}${muni}` : muni;
        setCurrentLocation(fullLoc);
        setIsTravelOpen(false);
        setSelectedPref(null);
        setPlayerPos({ x: 600, y: 700 });
    };

    const handlePostComment = () => {
        if (!inputText.trim()) return;
        const updated = addComment(currentLocation || '東京都千代田区', username, avatarId, inputText);
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

    // --- Game Loop / Proximity Check ---
    useEffect(() => {
        let closest: NPC | null = null;
        let minDist = INTERACTION_RADIUS;
        NPCS.forEach(npc => {
            const dx = playerPos.x - npc.pos.x;
            const dy = playerPos.y - npc.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                minDist = dist;
                closest = npc;
            }
        });
        setActiveNpc(closest);
    }, [playerPos]);

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
                <View style={[StyleSheet.absoluteFill, { backgroundColor: atmosphere.color, pointerEvents: 'none' }]} />
                {theme === 'premium' && (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(15, 23, 42, 0.3)' }]} />
                )}

                {/* NPCs */}
                {NPCS.map((npc) => (
                    <View key={npc.id} style={[styles.npcContainer, { left: npc.pos.x, top: npc.pos.y }]}>
                        <View style={[styles.npcBody, { backgroundColor: colors.subText }]}>
                            <ThemedText style={{ fontSize: 10, color: '#fff' }}>{npc.name.charAt(0)}</ThemedText>
                        </View>
                        <View style={[styles.npcShadow]} />
                        <ThemedText style={styles.npcName}>{npc.name}</ThemedText>
                    </View>
                ))}

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
                        <Image source={AVATARS[avatarId]} style={styles.playerImage} />
                    </View>
                    <ThemedText style={styles.playerName}>{username}</ThemedText>
                    {dragging && <ThemedText style={styles.dragHint}>Moving...</ThemedText>}
                </View>

            </View>

            {/* --- UI Layer: HUD --- */}
            <View style={styles.hud}>
                <View style={[styles.locationBadge, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                    <ThemedText style={[styles.locationText, { color: colors.text }]}>
                        📍 {currentLocation || '東京都千代田区'} 役所
                    </ThemedText>
                    <ThemedText style={{ fontSize: 10, color: colors.subText, marginTop: 2 }}>{atmosphere.message}</ThemedText>
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

                <ThemedText style={[styles.coords, { color: colors.subText }]}>POS: {Math.floor(playerPos.x)}, {Math.floor(playerPos.y)}</ThemedText>

                <View style={styles.btnRow}>
                    <Pressable style={[styles.hudBtn, { backgroundColor: colors.accent }]} onPress={() => setIsTravelOpen(true)}>
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

                {activeNpc && !isSayOpen && (
                    <Pressable
                        style={[styles.hudBtn, { marginTop: 10, backgroundColor: colors.primary, width: 200, alignItems: 'center' }]}
                        onPress={() => setIsChatOpen(true)}
                    >
                        <ThemedText style={styles.btnText}>話す ({activeNpc.name})</ThemedText>
                    </Pressable>
                )}
            </View>

            {/* --- Modals --- */}
            {/* Game Center Modal */}
            <GameCenter visible={isGameCenterOpen} onClose={() => setIsGameCenterOpen(false)} />

            <Modal
                visible={isChatOpen}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsChatOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.chatContainer, { backgroundColor: colors.background, borderColor: colors.choiceBorder }]}>
                        <View style={[styles.chatHeader, { borderBottomColor: colors.choiceBorder }]}>
                            <ThemedText type="subtitle">{activeNpc?.name}</ThemedText>
                            <Pressable onPress={() => setIsChatOpen(false)}>
                                <ThemedText style={{ color: colors.subText }}>閉じる</ThemedText>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ChatScreen />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={isTravelOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsTravelOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.travelContainer, { backgroundColor: colors.background, borderColor: colors.choiceBorder }]}>
                        <View style={[styles.chatHeader, { borderBottomColor: colors.choiceBorder }]}>
                            <ThemedText type="subtitle">全国自治体への移動</ThemedText>
                            <Pressable onPress={() => { setIsTravelOpen(false); setSelectedPref(null); }}>
                                <ThemedText style={{ color: colors.subText }}>キャンセル</ThemedText>
                            </Pressable>
                        </View>

                        <View style={styles.travelContent}>
                            {!selectedPref ? (
                                <Animated.ScrollView contentContainerStyle={styles.prefGrid}>
                                    {PREFECTURES.map((pref) => (
                                        <Pressable
                                            key={pref}
                                            style={[styles.prefItem, { backgroundColor: colors.choiceBg, borderColor: colors.choiceBorder }]}
                                            onPress={() => setSelectedPref(pref)}
                                        >
                                            <ThemedText style={{ fontSize: 14 }}>{pref}</ThemedText>
                                        </Pressable>
                                    ))}
                                </Animated.ScrollView>
                            ) : (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.travelSubHeader}>
                                        <Pressable onPress={() => setSelectedPref(null)} style={{ padding: 10 }}>
                                            <ThemedText style={{ color: colors.accent }}>{'< 都道府県に戻る'}</ThemedText>
                                        </Pressable>
                                        <ThemedText type="defaultSemiBold">{selectedPref}</ThemedText>
                                    </View>
                                    <Animated.ScrollView contentContainerStyle={styles.muniList}>
                                        {MUNICIPALITIES[selectedPref].map((muni) => (
                                            <Pressable
                                                key={muni}
                                                style={[styles.muniItem, { borderBottomColor: colors.choiceBorder }]}
                                                onPress={() => handleTravel(muni)}
                                            >
                                                <ThemedText>{muni}</ThemedText>
                                            </Pressable>
                                        ))}
                                    </Animated.ScrollView>
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
                            <ThemedText type="subtitle">📖 {currentLocation} 掲示板</ThemedText>
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
                                        <Image source={AVATARS[c.avatarId as any] || AVATARS.default} style={styles.commentAvatar} />
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
    npcContainer: { position: 'absolute', alignItems: 'center', width: NPC_SIZE },
    npcBody: { width: 30, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center', zIndex: 5 },
    npcShadow: { width: 30, height: 10, backgroundColor: 'black', opacity: 0.2, borderRadius: 20, marginTop: -5 },
    npcName: { fontSize: 10, marginTop: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 4, borderRadius: 4, color: '#fff' },
    playerContainer: { position: 'absolute', alignItems: 'center', width: PLAYER_SIZE, height: PLAYER_SIZE, zIndex: 10 },
    playerAvatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10 },
    playerImage: { width: 46, height: 46, borderRadius: 23 },
    playerName: { fontSize: 10, fontWeight: 'bold', marginTop: 4, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 2 },
    dragHint: { fontSize: 8, color: 'yellow', marginBottom: -10 },
    hud: { position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', padding: 20 },
    coords: { fontFamily: 'monospace', fontSize: 10, marginBottom: 8 },
    instructions: { fontSize: 12, opacity: 0.7, marginBottom: 16 },
    talkBtn: { paddingVertical: 12, paddingHorizontal: 32, borderRadius: 30, elevation: 5, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
    talkBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
    chatContainer: { flex: 1, maxHeight: '80%', borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    chatHeader: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
    locationBadge: { position: 'absolute', top: -SCREEN_HEIGHT + 140, left: 20, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, elevation: 3, maxWidth: 300 },
    locationText: { fontSize: 14, fontWeight: 'bold' },
    btnRow: { flexDirection: 'row', gap: 20, marginTop: 10 },
    hudBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, elevation: 5, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    // Travel Modal
    travelContainer: { flex: 1, maxHeight: '70%', borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    travelContent: { flex: 1 },
    travelSubHeader: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
    prefGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'center', gap: 10 },
    prefItem: { width: '30%', paddingVertical: 15, alignItems: 'center', borderRadius: 10, borderWidth: 1, marginBottom: 10 },
    muniList: { padding: 10 },
    muniItem: { paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1 },

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
