import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function AumDissolutionScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'オウム真理教解散命令事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>オウム真理教解散命令事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：解散命令の発出</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            地下鉄サリン事件などの凶悪犯罪を引き起こしたオウム真理教に対し、東京都知事と検察官が、宗教法人法に基づいて「解散命令」を裁判所に請求しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            これに対し教団側は、「解散命令は信教の自由を侵害する違憲なものだ！」と激しく反発しました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『宗教的活動』への制約か？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            争点は、解散命令が「信教の自由（20条）」を不当に制限していないかという点です。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            解散命令が出ると、教団は法人格を失い、お寺（施設）などの財産を清算しなければなりません。教団側は「施設がなくなれば、お祈りや修行ができなくなる」と主張しました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：『世俗的側面』への着目</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は言いました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            「解散命令は、宗教団体としての『法人格』を奪うだけの処置であり、信者個人の信仰そのものを禁じるものではない。財産を失うなどの不利益はあるが、それは<ThemedText type="defaultSemiBold">世俗的な側面（法律上の地位）</ThemedText>の話である」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「合憲・適法」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、解散命令は<ThemedText type="defaultSemiBold">「公共の福祉」</ThemedText>のために必要やむを得ない措置であり、信教の自由を侵害するものではないと判断されました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            <ThemedText type="defaultSemiBold">ポイント:</ThemedText> 宗教団体であっても、反社会的な行為を行えば、法人としての特権（税制優遇など）を剥奪されるのは当然である、という厳しい姿勢が示されました。
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
