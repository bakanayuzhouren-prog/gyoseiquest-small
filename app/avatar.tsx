import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { AVATAR_LABELS, AVATARS, AvatarType, getAvatarSource, useUser } from '@/src/context/UserContext';
import { getPoints } from '@/utils/points';

export default function AvatarScreen() {
    const { avatarId, setAvatarId, username, setUsername } = useUser();
    const { theme } = useTheme();
    const colors = Themes[theme];

    const [points, setPoints] = useState(0);
    const [editName, setEditName] = useState(username);

    useEffect(() => {
        setPoints(getPoints());
        setEditName(username);
    }, [username]);

    const handleSaveName = () => {
        setUsername(editName);
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title">アバター設定</ThemedText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.choiceBorder }]}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="カスタマイズを開く"
                        onPress={() => router.push('/avatar-customize')}
                        style={styles.avatarContainer}
                    >
                        <Image source={getAvatarSource(avatarId)} style={styles.currentAvatar} />
                    </Pressable>
                    <ThemedText style={[styles.tapHint, { color: colors.subText }]}>
                        アイコンをタップしてカスタマイズ
                    </ThemedText>

                    <View style={styles.nameContainer}>
                        <TextInput
                            style={[styles.nameInput, { color: colors.text, borderColor: colors.subText }]}
                            value={editName}
                            onChangeText={setEditName}
                            onBlur={handleSaveName}
                            placeholder="名前を入力"
                            placeholderTextColor={colors.subText}
                        />
                    </View>

                    <View style={styles.statsContainer}>
                        <ThemedText style={[styles.statsLabel, { color: colors.subText }]}>現在のポイント</ThemedText>
                        <ThemedText style={[styles.statsValue, { color: colors.primary }]}>{points} pt</ThemedText>
                    </View>
                </View>

                <ThemedText type="subtitle" style={styles.sectionTitle}>アバターを選択</ThemedText>

                <View style={styles.grid}>
                    {(Object.keys(AVATARS) as AvatarType[]).map((key) => (
                        <Pressable
                            key={key}
                            accessibilityRole="button"
                            accessibilityLabel={`アバター${AVATAR_LABELS[key]}`}
                            style={[
                                styles.avatarOption,
                                avatarId === key && { borderColor: colors.accent, borderWidth: 3, backgroundColor: colors.choiceBg }
                            ]}
                            onPress={() => setAvatarId(key)}
                        >
                            <View style={styles.optionImageWrap}>
                                <Image source={AVATARS[key]} style={styles.optionImage} />
                            </View>
                            <ThemedText style={[styles.optionLabel, { color: colors.text }]}>
                                {AVATAR_LABELS[key]}
                            </ThemedText>
                            {avatarId === key && (
                                <View style={[styles.checkBadge, { backgroundColor: colors.accent }]}>
                                    <ThemedText style={{ color: '#fff', fontSize: 10 }}>✓</ThemedText>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <Pressable style={[styles.backButton, { backgroundColor: colors.choiceBg }]} onPress={() => router.replace('/')}>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text }}>ホームに戻る</ThemedText>
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
        marginBottom: 20,
        alignItems: 'center',
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    card: {
        width: '100%',
        maxWidth: 340,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 30,
        elevation: 3,
    },
    avatarContainer: {
        marginBottom: 6,
    },
    currentAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tapHint: {
        fontSize: 12,
        marginBottom: 16,
    },
    nameContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    nameInput: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomWidth: 1,
        width: '80%',
        paddingVertical: 5,
    },
    statsContainer: {
        alignItems: 'center',
        gap: 5,
    },
    statsLabel: {
        fontSize: 14,
    },
    statsValue: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    sectionTitle: {
        marginBottom: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },
    avatarOption: {
        width: 100,
        paddingTop: 10,
        paddingBottom: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    optionImageWrap: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    optionImage: {
        width: 70,
        height: 70,
    },
    optionLabel: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
    },
    checkBadge: {
        position: 'absolute',
        top: 6,
        right: 10,
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
    }
});
