import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { unhideAllInField } from '@/utils/question-hidden';
import { debugForceUnlock, getLoopCount, hasSeenBonusReveal, markBonusRevealSeen } from '@/utils/progress';

const isLightBg = (hex: string) => {
    if (!hex || hex.startsWith('rgba')) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
};

export default function StageSelectScreen() {
    const params = useLocalSearchParams<{ subject?: string; field?: string }>();
    const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const field = Array.isArray(params.field) ? params.field[0] : params.field;
    const router = useRouter();

    // Display Title: Field if available, else Subject
    const displayTitle = field || subject;

    const [isBonusAvailable, setIsBonusAvailable] = useState(false);
    const [bonusLoopCount, setBonusLoopCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [debugTapCount, setDebugTapCount] = useState(0);
    const { colors } = useTheme();

    const loadStatus = async () => {
        if (!subject) return;

        const loops = await getLoopCount(subject, field || '');
        setBonusLoopCount(loops);

        const unlocked = loops >= 3;
        if (unlocked) {
            setIsBonusAvailable(true);
            const alreadySeen = await hasSeenBonusReveal();
            if (!alreadySeen && !showUnlockModal) { // Prevent double trigger
                // First time unlock! Show fanfare
                setShowConfetti(true);
                setShowUnlockModal(true);
                await markBonusRevealSeen();
            }
        } else {
            setIsBonusAvailable(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadStatus();
        }, [subject, field])
    );

    const handleDebugUnlock = async () => {
        const newCount = debugTapCount + 1;
        setDebugTapCount(newCount);
        if (newCount >= 5) {
            if (subject) {
                await debugForceUnlock(subject, field || '');
                setDebugTapCount(0);
                setIsBonusAvailable(false); // Reset UI momentarily
                setTimeout(() => loadStatus(), 100);
            }
        }
    };

    const handleUnhideAll = async () => {
        if (!subject || !field) {
            Alert.alert('非表示を解除', '分野が指定されていません。');
            return;
        }
        await unhideAllInField(subject, field);
        Alert.alert('非表示を解除', 'このステージで非表示にした問題が、再び出題されるようになりました。');
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.titleRow}>
                <Pressable onPress={handleDebugUnlock} style={{ flex: 1 }}>
                    <ThemedText type="title">{displayTitle}</ThemedText>
                </Pressable>
                <Pressable style={styles.unhideButton} onPress={handleUnhideAll}>
                    <ThemedText style={styles.unhideText}>非表示を解除</ThemedText>
                </Pressable>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <Pressable
                    style={styles.shuffleButton}
                    onPress={() => router.push({
                        pathname: '/question',
                        params: { subject, field, mode: 'past', shuffle: '1' },
                    })}
                >
                    <ThemedText style={styles.shuffleText}>🔀 シャッフル</ThemedText>
                </Pressable>
                <Pressable
                    style={[styles.shuffleButton, { backgroundColor: '#7E57C2' }]}
                    onPress={() => router.push({
                        pathname: '/question',
                        params: { subject, field, mode: 'shisho', shuffle: '1' },
                    })}
                >
                    <ThemedText style={styles.shuffleText}>🔀 師匠シャッフル</ThemedText>
                </Pressable>
                </View>
            </View>
            <ThemedText style={styles.subtitle}>ステージを選択してください。</ThemedText>

            <Link
                href={{
                    pathname: '/question',
                    params: { subject, field, mode: 'past' },
                }}
                asChild>
                <Pressable style={styles.button}>
                    <ThemedText type="defaultSemiBold" style={styles.text}>
                        ① 過去問
                    </ThemedText>
                </Pressable>
            </Link>

            {isBonusAvailable ? (
                <Link
                    href={{
                        pathname: '/question',
                        params: { subject, field, mode: 'bonus' },
                    }}
                    asChild>
                    <Pressable style={StyleSheet.flatten([styles.button, styles.bonusButton])}>
                        <ThemedText type="defaultSemiBold" style={StyleSheet.flatten([styles.text, styles.bonusText])}>
                            ② ボーナスステージ ★
                        </ThemedText>
                    </Pressable>
                </Link>
            ) : (
                <Pressable
                    style={StyleSheet.flatten([styles.button, styles.bonusLockedButton])}
                    onPress={() =>
                        Alert.alert(
                            'ボーナスステージ',
                            `過去問モードでこの分野を最後まで1周すると1カウントされます（現在 ${Math.min(bonusLoopCount, 3)}/3周）。3周で解禁されます。`,
                        )}
                >
                    <View>
                        <ThemedText type="defaultSemiBold" style={StyleSheet.flatten([styles.text, styles.bonusLockedText])}>
                            ② ボーナスステージ ★
                        </ThemedText>
                        <ThemedText style={{ fontSize: 14, textAlign: 'center', marginTop: 6, color: '#546E7A' }}>
                            解放まで あと{Math.max(0, 3 - bonusLoopCount)}周（過去問）
                        </ThemedText>
                    </View>
                </Pressable>
            )}

            <Link
                href={{
                    pathname: '/question',
                    params: { subject, field, mode: 'shisho' },
                }}
                asChild>
                <Pressable style={StyleSheet.flatten([styles.button, styles.shishoButton])}>
                    <ThemedText type="defaultSemiBold" style={StyleSheet.flatten([styles.text, styles.shishoText])}>
                        ③ 🎓 師匠モード
                    </ThemedText>
                </Pressable>
            </Link>

            {showConfetti && (
                <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    fadeOut={true}
                />
            )}

            <Modal
                transparent={true}
                visible={showUnlockModal}
                animationType="fade"
                onRequestClose={() => setShowUnlockModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ThemedText type="title" style={{ color: '#E91E63', marginBottom: 10 }}>
                            🎉 解禁！ 🎉
                        </ThemedText>
                        <ThemedText style={{ textAlign: 'center', marginBottom: 20, fontSize: 16 }}>
                            おめでとうございます！{'\n'}
                            問題を3周クリアしたため、{'\n'}
                            <ThemedText type="defaultSemiBold">「ボーナスステージ」</ThemedText>
                            が解放されました！
                        </ThemedText>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setShowUnlockModal(false)}
                        >
                            <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>閉じる</ThemedText>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        gap: 24,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    unhideButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#607D8B',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unhideText: {
        color: '#607D8B',
        fontWeight: 'bold',
        fontSize: 13,
    },
    shuffleButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FF9800',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shuffleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    subtitle: {
        opacity: 0.7,
    },
    button: {
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 1,
    },
    bonusButton: {
        borderColor: '#E91E63',
        backgroundColor: '#FCE4EC',
    },
    bonusLockedButton: {
        borderColor: '#CFD8DC',
        backgroundColor: '#ECEFF1',
        opacity: 0.95,
    },
    bonusLockedText: {
        color: '#546E7A',
    },
    shishoButton: {
        borderColor: '#7E57C2',
        backgroundColor: '#EDE7F6',
    },
    shishoText: {
        color: '#4527A0',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    bonusText: {
        color: '#C2185B',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        elevation: 5,
    },
    modalButton: {
        backgroundColor: '#E91E63',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
});
