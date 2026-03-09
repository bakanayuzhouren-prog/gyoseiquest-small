import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Themes, ThemeType, useTheme } from '@/src/context/ThemeContext';

export default function SettingsScreen() {
    const { theme, setTheme } = useTheme();

    const handleSelect = (t: ThemeType) => {
        setTheme(t);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.header}>設定</ThemedText>

            <ThemedText type="subtitle" style={styles.sectionTitle}>デザインテーマ</ThemedText>

            <View style={styles.list}>
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
                        <ThemedText type="defaultSemiBold">モダン・テック (標準)</ThemedText>
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
});
