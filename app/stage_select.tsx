import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { debugForceUnlock, hasSeenBonusReveal, isBonusUnlocked, markBonusRevealSeen } from '@/utils/progress';

export default function StageSelectScreen() {
    const params = useLocalSearchParams<{ subject?: string; field?: string }>();
    const subject = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const field = Array.isArray(params.field) ? params.field[0] : params.field;

    // Display Title: Field if available, else Subject
    const displayTitle = field || subject;

    const [isBonusAvailable, setIsBonusAvailable] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [debugTapCount, setDebugTapCount] = useState(0);

    const loadStatus = async () => {
        if (!subject) return;

        const unlocked = await isBonusUnlocked(subject, field || '');
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

    return (
        <ThemedView style={styles.container}>
            <Pressable onPress={handleDebugUnlock}>
                <ThemedText type="title">{displayTitle}</ThemedText>
            </Pressable>
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

            {isBonusAvailable && (
                <Link
                    href={{
                        pathname: '/question',
                        params: { subject, field, mode: 'bonus' },
                    }}
                    asChild>
                    <Pressable style={[styles.button, styles.bonusButton]}>
                        <ThemedText type="defaultSemiBold" style={[styles.text, styles.bonusText]}>
                            ② ボーナスステージ ★
                        </ThemedText>
                    </Pressable>
                </Link>
            )}

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
    subtitle: {
        opacity: 0.7,
    },
    button: {
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#5A9BD5',
        backgroundColor: '#E9F2FB',
    },
    bonusButton: {
        borderColor: '#E91E63', // Pinkish
        backgroundColor: '#FCE4EC',
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
