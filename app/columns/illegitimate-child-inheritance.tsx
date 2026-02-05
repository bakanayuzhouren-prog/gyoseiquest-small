import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function IllegitimateChildInheritanceScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '非嫡出子相続差別違憲決定', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>非嫡出子相続差別違憲決定 4コマ解説</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：民法900条の壁</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            当時の民法には、「結婚していない男女の間に生まれた子供（非嫡出子）の相続分は、結婚している夫婦の子供（嫡出子）の半分とする」という規定がありました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            ある相続の現場で、この差別に納得がいかない当事者が「これは不当な差別だ！」と声を上げました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『家族形態』と『個人の尊厳』</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            かつての最高裁は「法律婚を尊重し、家族の秩序を守るために、この差別には合理的な理由がある」として合憲としていました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            しかし、今回は「子供は自分の生まれてくる環境を選べない。それなのに不利益を負わせるのは、個人の尊厳に反するのではないか？」と厳しく問われました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：社会情勢の変化と『違憲』判断</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、日本国内での家族観の変化や、国際的に見ても子供の権利を重視する流れが強まっていることを指摘しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            「もはや、この差別を正当化する合理的な根拠は失われた。したがって、民法900条の規定は憲法14条1項に違反する」と結論づけました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論と『遡及（そきゅう）制限』</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            この判決により、非嫡出子の相続分を半分とする規定は無効となりました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            ただし、過去に終わった全ての相続をやり直すと大混乱が起きるため、「すでに決着がついた相続には影響しない」という配慮（遡及制限）も示されました。
                        </ThemedText>
                    </View>
                </View>

                {/* Key Points */}
                <View style={styles.keyPointsContainer}>
                    <ThemedText type="subtitle" style={styles.keyPointsTitle}>行政書士試験のポイント</ThemedText>
                    <View style={styles.listItem}>
                        <ThemedText style={styles.bulletPoint}>•</ThemedText>
                        <ThemedText style={styles.listText}>昭和から平成への変化：かつては合憲とされていたが、社会情勢の変化によって違憲になった</ThemedText>
                    </View>
                    <View style={styles.listItem}>
                        <ThemedText style={styles.bulletPoint}>•</ThemedText>
                        <ThemedText style={styles.listText}>『合理的根拠の欠如』：差別が許されるかどうかは、そこに「合理的な理由があるか」で決まる</ThemedText>
                    </View>
                    <View style={styles.listItem}>
                        <ThemedText style={styles.bulletPoint}>•</ThemedText>
                        <ThemedText style={styles.listText}>14条1項（平等権）：性別や社会的身分による差別を禁じる条文の具体的適用例</ThemedText>
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
    pointText: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#0a7ea4',
    },
    keyPointsContainer: {
        backgroundColor: '#fff9e6',
        borderRadius: 12,
        padding: 16,
        marginTop: 24,
        borderWidth: 2,
        borderColor: '#ffd700',
    },
    keyPointsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingLeft: 8,
    },
    bulletPoint: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#0a7ea4',
    },
    listText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
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
