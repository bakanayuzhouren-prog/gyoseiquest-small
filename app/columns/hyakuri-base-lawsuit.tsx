import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function HyakuriBaseLawsuitScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '百里基地訴訟', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>百里基地訴訟 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：基地反対派 vs 防衛庁</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            茨城県の百里基地建設をめぐり、地主の男性が自分の土地を基地反対派のグループに売る契約をしました。しかし、その後気が変わり、その土地を国（防衛庁）に二重に売ってしまいました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            国は「これは国の土地だ」と主張し、反対派グループと裁判になりました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：憲法9条違反ではないか？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            反対派は「自衛隊は憲法9条が禁じる『戦力』だ。その戦力のために国が土地を買う契約は、憲法9条に反するから無効（公序良俗違反）だ！」と主張しました。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                国と個人の「契約」というプライベートな出来事に、憲法9条を持ち込めるかが争われました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：私人間効力と9条の関係</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は言いました。「憲法の人権規定は、基本的に国と個人の関係を定めたもの。国が国民と同じ立場で土地を買うような『私経済活動』には、憲法9条は直接適用されない（<ThemedText type="defaultSemiBold">私人間効力の法理</ThemedText>）。」
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            「また、明らかに違憲といえない限り、裁判所は判断を避けるべきだ（<ThemedText type="defaultSemiBold">統治行為論的考え</ThemedText>）。」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「契約は有効」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結局、国が土地を買った契約は憲法9条に反して無効になることはなく、有効であると判断されました。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                裁判所は「自衛隊が合憲か違憲か」という核心部分への明快な判断を避け、契約の有効性を認めた形です。
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
        marginTop: 8,
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
