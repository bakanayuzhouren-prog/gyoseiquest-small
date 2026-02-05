import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function MonthlyPenScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '月刊ペン事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>月刊ペン事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：宗教団体トップのスキャンダル</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            雑誌『月刊ペン』の編集長が、ある巨大宗教団体のトップとその女性信者たちの関係について、「女性関係が乱れている」といった内容の記事を掲載しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            これに対し、名誉毀損だとして刑事告訴されました。
                        </ThemedText>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 2 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『私生活』は公共の関心事か？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            被告人（編集長）は、「この記事は、社会的に大きな影響力を持つ宗教指導者の資質を問うものであり、公共の利害に関わる事実だ。だから刑法230条の2（名誉毀損の特例）が適用され、無罪になるはずだ！」と主張しました。
                        </ThemedText>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 3 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：『公共の利害』の拡大</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最大の争点は、「個人のプライベート（男女関係）が、公共の利害にあたるのか？」です。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            最高裁は画期的な判断を下しました。「その人物の社会的な地位や、社会に与える影響力の強さによっては、<ThemedText type="defaultSemiBold">例え私生活上の出来事であっても、公共の利害に関する事実に当たり得る</ThemedText>」と述べたのです。
                        </ThemedText>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 4 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「差し戻し（基準の提示）」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、「私生活だから即アウト」とするのではなく、<ThemedText type="defaultSemiBold">「その記事が、社会的な批判を受けるべき立場にある人の公的な側面と深く関わっているなら、公共性があると言える」</ThemedText>という基準を示しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            その上で、具体的な事実の真実性をさらに調べるよう、審理をやり直させました。
                        </ThemedText>
                    </View>
                </View>

                {/* Exam Checkpoint Section */}
                <View style={[styles.panelContainer, { marginTop: 24 }]}>
                    <View style={[styles.panelHeader, { backgroundColor: '#ff6b6b' }]}>
                        <ThemedText type="subtitle" style={[styles.panelTitle, { color: '#fff' }]}>📝 行政書士試験に向けたチェックポイント</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 私生活上の事実も公共の利害に当たり得る</ThemedText>{'\n'}
                            社会的地位や影響力の強さによっては、私生活上の出来事も公共の利害に関する事実となる。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 公共性の判断基準</ThemedText>{'\n'}
                            記事が社会的批判を受けるべき立場にある人の公的側面と深く関わっているかで判断される。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 刑法230条の2（名誉毀損の特例）</ThemedText>{'\n'}
                            公共の利害に関する事実で、公益目的があり、真実であれば名誉毀損罪は成立しない。
                        </ThemedText>
                    </View>
                </View>

                <Pressable style={[styles.backButton, { backgroundColor: '#0a7ea4' }]} onPress={handleBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    <ThemedText style={styles.backButtonText}>学習に戻る</ThemedText>
                </Pressable>

            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        marginBottom: 24,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    panelContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    panelHeader: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    panelContent: {
        padding: 16,
    },
    text: {
        fontSize: 16,
        lineHeight: 26,
        marginBottom: 8,
        color: '#333',
    },
    criteriaText: {
        backgroundColor: '#fff9e6',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#ffa500',
    },
    arrowContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 32,
        gap: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
