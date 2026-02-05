import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function McLeanIncidentScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'マクリーン事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>マクリーン事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：ベトナム反戦運動と更新拒否</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            アメリカ人のマクリーンさんは、語学教師として日本に滞在していました。彼は滞在中、ベトナム戦争に反対する政治活動（デモやビラ配り）に参加しました。その後、滞在期間の更新を申請しましたが、法務大臣は「素行が良くない」として更新を認めませんでした。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：外国人に政治活動の自由はあるか？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            マクリーンさんは「日本国憲法は政治活動の自由を認めているはずだ！更新拒否は憲法違反だ！」と訴えます。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                ここでの争点は、<ThemedText type="defaultSemiBold">「日本にいる外国人にも、憲法の人権保障（表現の自由など）は及ぶのか？」</ThemedText>という点でした。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁の「性質上」論</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁はこう言いました。「憲法の人権保障は、権利の性質上日本国民のみを対象としているものを除き、外国人にも及ぶ。政治活動の自由も、日本の政治に影響を及ぼすようなものを除き、基本的には保障される。」
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                つまり、外国人にも人権はあるけれど、国民と全く同じではない（限定的）というスタンスです。
                            </ThemedText>
                        </View>
                    </View>
                </View>

                {/* Arrow */}
                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                {/* Panel 4 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：法務大臣の広い裁量権</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            しかし、結論は「更新拒否は有効」でした。「国がどの外国人を受け入れるかは自由（在留の権利は憲法上ない）であり、更新を認めるかどうかは法務大臣の広い裁量に任されている。政治活動を理由に拒否しても、それは裁量の範囲内だ」と判断されました。
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
