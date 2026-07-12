import { router } from 'expo-router';
import { Pressable, Switch, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useDescriptiveScope } from '@/src/context/DescriptiveScopeContext';
import {
    STUDY_LEVEL_HINT,
    STUDY_LEVEL_LABEL,
    STUDY_LEVELS,
    useStudyLevel,
    type StudyLevel,
} from '@/src/context/StudyLevelContext';
import { Themes, ThemeType, useTheme } from '@/src/context/ThemeContext';

export default function SettingsScreen() {
    const { theme, setTheme } = useTheme();
    const { descriptiveScopeEnabled, setDescriptiveScopeEnabled } = useDescriptiveScope();
    const { studyLevel, setStudyLevel } = useStudyLevel();

    const handleSelect = (t: ThemeType) => {
        setTheme(t);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.header}>設定</ThemedText>

            <ThemedText type="subtitle" style={styles.sectionTitle}>質問モードのレベル</ThemedText>
            <View style={styles.list}>
                {STUDY_LEVELS.map((level: StudyLevel) => {
                    const selected = studyLevel === level;
                    return (
                        <Pressable
                            key={level}
                            style={[styles.item, selected && styles.selectedItem]}
                            onPress={() => setStudyLevel(level)}
                        >
                            <View style={styles.info}>
                                <ThemedText type="defaultSemiBold">{STUDY_LEVEL_LABEL[level]}</ThemedText>
                                <ThemedText style={styles.desc}>{STUDY_LEVEL_HINT[level]}</ThemedText>
                            </View>
                            {selected && <ThemedText style={[styles.check, { color: Themes[theme].primary }]}>✓</ThemedText>}
                        </Pressable>
                    );
                })}
            </View>

            <ThemedText type="subtitle" style={[styles.sectionTitle, { marginTop: 20 }]}>記述スコープ（院機能）</ThemedText>
            <View style={styles.list}>
                <View style={[styles.item, styles.scopeRow]}>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold">記述スコープを有効にする</ThemedText>
                        <ThemedText style={styles.desc}>
                            問題画面の「記述スコープ」は常時表示。ONにして肢を選ぶと、その肢をベースに記述問題へ変換して解けます。
                        </ThemedText>
                    </View>
                    <Switch
                        value={descriptiveScopeEnabled}
                        onValueChange={setDescriptiveScopeEnabled}
                        trackColor={{ false: '#ccc', true: '#5A9BD5' }}
                        thumbColor="#fff"
                    />
                </View>
            </View>

            <ThemedText type="subtitle" style={styles.sectionTitle}>UIモード</ThemedText>

            <View style={styles.list}>
                {/* 六法モード（標準） */}
                <Pressable
                    style={[styles.item, theme === 'rouhou' && styles.selectedItem]}
                    onPress={() => handleSelect('rouhou')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.rouhou.background }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.rouhou.choiceBg, borderColor: Themes.rouhou.choiceBorder }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.rouhou.choiceText }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold">六法モード（標準）</ThemedText>
                        <ThemedText style={styles.desc}>条文・判例・論点の深掘り向け。てらしぃの行政書士特訓UI。</ThemedText>
                    </View>
                    {theme === 'rouhou' && <ThemedText style={[styles.check, { color: Themes.rouhou.primary }]}>✓</ThemedText>}
                </Pressable>

                {/* Modern Tech */}
                <Pressable
                    style={[styles.item, theme === 'modern' && styles.selectedItem]}
                    onPress={() => handleSelect('modern')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.modern.background }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.modern.choiceBg, borderColor: Themes.modern.choiceBorder }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.modern.choiceText }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold">モダン・テック</ThemedText>
                        <ThemedText style={styles.desc}>青とグレーを基調とした、知的で集中しやすいデザイン。</ThemedText>
                    </View>
                    {theme === 'modern' && <ThemedText style={styles.check}>✓</ThemedText>}
                </Pressable>

                {/* Paper Style */}
                <Pressable
                    style={[styles.item, theme === 'paper' && styles.selectedItem]}
                    onPress={() => handleSelect('paper')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.paper.background }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.paper.choiceBg, borderColor: Themes.paper.choiceBorder }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.paper.choiceText, fontFamily: 'serif' }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold">参考書風</ThemedText>
                        <ThemedText style={styles.desc}>紙のような質感と明朝体で、長時間でも疲れにくい。</ThemedText>
                    </View>
                    {theme === 'paper' && <ThemedText style={styles.check}>✓</ThemedText>}
                </Pressable>

                {/* High Contrast */}
                <Pressable
                    style={[styles.item, theme === 'contrast' && styles.selectedItem]}
                    onPress={() => handleSelect('contrast')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.contrast.background, borderWidth: 1, borderColor: '#eee' }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.contrast.choiceBg, borderColor: Themes.contrast.choiceBorder, borderWidth: 1 }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.contrast.choiceText, fontWeight: 'bold' }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold">ハイコントラスト</ThemedText>
                        <ThemedText style={styles.desc}>白黒はっきり。文字も見やすく視認性重視。</ThemedText>
                    </View>
                    {theme === 'contrast' && <ThemedText style={styles.check}>✓</ThemedText>}
                </Pressable>

                {/* Premium Dark */}
                <Pressable
                    style={[styles.item, theme === 'premium' && styles.selectedItem, theme === 'premium' && { borderColor: Themes.premium.choiceBorder, backgroundColor: '#0F172A' }]}
                    onPress={() => handleSelect('premium')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.premium.background }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.premium.choiceBg, borderColor: Themes.premium.choiceBorder, borderWidth: 1 }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.premium.choiceText }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold" style={{ color: theme === 'premium' ? Themes.premium.text : undefined }}>プレミアム・ダーク</ThemedText>
                        <ThemedText style={[styles.desc, { color: theme === 'premium' ? Themes.premium.subText : undefined }]}>
                            近未来的な高級感。集中力を高める深淵なダークモード。
                        </ThemedText>
                    </View>
                    {theme === 'premium' && <ThemedText style={[styles.check, { color: Themes.premium.accent }]}>✓</ThemedText>}
                </Pressable>

                {/* Cyberpunk */}
                <Pressable
                    style={[styles.item, theme === 'cyberpunk' && styles.selectedItem, theme === 'cyberpunk' && { borderColor: Themes.cyberpunk.choiceBorder, backgroundColor: '#0d0221' }]}
                    onPress={() => handleSelect('cyberpunk')}
                >
                    <View style={[styles.previewBox, { backgroundColor: Themes.cyberpunk.background }]}>
                        <View style={[styles.previewBtn, { backgroundColor: Themes.cyberpunk.choiceBg, borderColor: Themes.cyberpunk.choiceBorder, borderWidth: 1 }]}>
                            <ThemedText style={{ fontSize: 10, color: Themes.cyberpunk.choiceText }}>あ</ThemedText>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <ThemedText type="defaultSemiBold" style={{ color: theme === 'cyberpunk' ? Themes.cyberpunk.text : undefined }}>サイバーパンク</ThemedText>
                        <ThemedText style={[styles.desc, { color: theme === 'cyberpunk' ? Themes.cyberpunk.subText : undefined }]}>
                            ネオンシアン×マゼンタ。近未来の夜を彩るダークテーマ。
                        </ThemedText>
                    </View>
                    {theme === 'cyberpunk' && <ThemedText style={[styles.check, { color: Themes.cyberpunk.accent }]}>✓</ThemedText>}
                </Pressable>
            </View>

            <Pressable style={styles.closeBtn} onPress={() => router.back()}>
                <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>閉じる</ThemedText>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        marginBottom: 10,
    },
    list: {
        gap: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    selectedItem: {
        borderColor: '#5A9BD5',
        backgroundColor: '#E9F2FB',
    },
    previewBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    previewBtn: {
        width: 24,
        height: 16,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
    },
    desc: {
        fontSize: 12,
        color: '#666',
    },
    check: {
        fontSize: 18,
        color: '#3182CE',
        fontWeight: 'bold',
    },
    closeBtn: {
        marginTop: 30,
        backgroundColor: '#666',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    scopeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
