import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function StoneFishScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '石に泳ぐ魚事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>「石に泳ぐ魚」事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：小説のモデルは私だ！</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            作家の柳美里さんが、実在の知人（在日韓国人の女性）をモデルにした小説『石に泳ぐ魚』を文芸誌に発表しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            その中には、モデルとされた女性の身体的特徴や、非常にプライベートな家庭環境、本人が他人に知られたくないと感じるエピソードが克明に描かれていました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『プライバシー権』の侵害を主張</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            モデルにされた女性は、「この記事は私の私生活を暴き、名誉を著しく傷つけるものだ。単行本としての出版を止めてほしい」と裁判所に訴えました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            柳さん側は「これは芸術作品（表現の自由）であり、モデルを昇華させて描いている。出版を止めるのは検閲に等しい」と反論しました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：差止めの『厳格な基準』</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、北方ジャーナル事件の基準を念頭に置きつつ、<ThemedText type="defaultSemiBold">「名誉権だけでなくプライバシー権の侵害も、出版を差し止める理由になり得る」</ThemedText>と認めました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            その際、「表現の自由による利益」と「侵害されるプライバシーの利益」を比較し、後者が明らかに上回る場合には、出版そのものを差し止めることが許されると判断しました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「出版差止めの確定」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、この小説の内容がモデル女性にとって「他人に知られたくない極めて私的な事柄」であり、出版によって<ThemedText type="defaultSemiBold">「回復困難な損害」</ThemedText>を与えることは明らかであると結論づけました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            結果として、この小説の出版・配布を禁止する判決が確定しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            <ThemedText type="defaultSemiBold">ポイント:</ThemedText> 芸術的価値がある作品であっても、実在の個人のプライバシーを無断で過度に暴くことは許されない、という明確な境界線が示されました。
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
                            <ThemedText type="defaultSemiBold">✓ プライバシー権侵害による出版差止め</ThemedText>{'\n'}
                            名誉権だけでなく、プライバシー権の侵害も出版を差し止める理由になり得る。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 利益衡量の基準</ThemedText>{'\n'}
                            「表現の自由による利益」と「侵害されるプライバシーの利益」を比較し、後者が明らかに上回る場合に差止めが許される。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 回復困難な損害</ThemedText>{'\n'}
                            他人に知られたくない極めて私的な事柄を暴くことで、回復困難な損害を与える場合は出版差止めが認められる。
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
