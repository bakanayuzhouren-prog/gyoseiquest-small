import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function SunagawaIncidentScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '砂川事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>砂川事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：基地拡張への抗議</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            1957年、東京都の米軍立川基地の拡張に反対するデモ隊が、立ち入り禁止の境界柵を壊して基地内に数メートル立ち入りました。これにより、彼らは刑事特別法違反で起訴されることになります。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                当時は日米安保条約に基づき、米軍基地への不法侵入は重く罰せられる決まりでした。
                            </ThemedText>
                        </View>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 2 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：一審・伊達判決の衝撃</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            東京地裁の伊達裁判長は、驚きの無罪判決を下します。「そもそも米軍の駐留は、憲法9条が禁じる『戦力』にあたる。だから安保条約は違憲であり、それに基づく刑事特別法で罰することはできない！」という理屈です。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                これを<ThemedText type="defaultSemiBold">「伊達判決」</ThemedText>と呼び、当時の政府に激震が走りました。
                            </ThemedText>
                        </View>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 3 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁へ「跳躍上告」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            政府は中間の高裁を飛ばして、直接最高裁へ判断を仰ぐ「跳躍上告」を行いました。最高裁はどう判断するのか？国民の注目が集まりました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：最高裁の結論（統治行為論）</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は一審を破棄。「日米安保条約のように、国の存立に関わる高度に政治的な問題は、一見して明白に違憲でない限り、裁判所は審査を避けるべきだ」と結論づけました。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                これが<ThemedText type="defaultSemiBold">「統治行為論」</ThemedText>です。結果、安保条約は憲法判断を免れ、被告たちは有罪となりました。
                            </ThemedText>
                        </View>
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
    pointBox: {
        marginTop: 12,
        backgroundColor: '#e3f2fd',
        padding: 12,
        borderRadius: 8,
    },
    pointLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0d47a1',
        marginBottom: 4,
    },
    pointText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#0d47a1',
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
