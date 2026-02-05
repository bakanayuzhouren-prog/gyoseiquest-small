import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function NishiyamaReporterScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '西山記者事件（沖縄密約事件）', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>西山記者事件（沖縄密約事件） 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：密約を暴いた特ダネ</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            1972年の沖縄返還の際、毎日新聞の西山記者は、日本政府がアメリカ側が支払うべき費用（土地復旧費など）を肩代わりするという「密約」があることを察知しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            西山記者は、外務省の女性職員から機密文書を持ち出させ、この密約をスクープしました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『取材の自由』か『法律違反』か</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            国は、文書を持ち出した女性職員と西山記者を「国家公務員法（守秘義務）」違反で起訴しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            西山記者は「真実を国民に知らせるための取材活動（表現の自由）であり、正当な業務だ！」と主張しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            <ThemedText type="defaultSemiBold">ポイント:</ThemedText> 国家の秘密を暴くためなら、法律を破ってでも情報を得ていいのか？が争点です。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：『報道・取材の自由』の承認</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁はまず、報道の重要性を認めました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            「報道の自由は21条が保障する精神。そのための<ThemedText type="defaultSemiBold">『取材の自由』も、憲法の精神に照らして十分尊重されるべきだ</ThemedText>」
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            しかし、ここからが重要な「ただし書き」です。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「手段が不相当（有罪）」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、西山記者が女性職員と不適切な関係を持ち、それを利用して文書を持ち出させた点を重視しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            <ThemedText type="defaultSemiBold">「取材の目的が正しくても、手段が法秩序を乱し、社会通念上認められないほど不相当である場合は、正当な取材活動とは言えない」</ThemedText>
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            と結論づけ、有罪としました。
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
                            <ThemedText type="defaultSemiBold">✓ 取材の自由は憲法上尊重される</ThemedText>{'\n'}
                            報道の自由は憲法21条が保障する精神であり、そのための取材の自由も憲法の精神に照らして十分尊重される。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 取材手段の相当性</ThemedText>{'\n'}
                            取材の目的が正しくても、手段が法秩序を乱し、社会通念上認められないほど不相当である場合は、正当な取材活動とは言えない。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 国家公務員法との関係</ThemedText>{'\n'}
                            取材の自由も無制限ではなく、国家公務員法の守秘義務違反を教唆する行為は処罰される。
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
    pointText: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#0a7ea4',
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
