import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function SarufutsuMeguroIncidentsScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '公務員の政治活動', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>

                {/* Story 1: Sarufutsu Incident */}
                <ThemedText type="title" style={styles.title}>1. 猿払事件 4コマ物語</ThemedText>
                <ThemedText style={styles.description}>（戦後、公務員の政治活動を厳しく制限したリーディングケースです）</ThemedText>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：勤務時間外のポスター貼り</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            北海道の猿払郵便局の局員が、勤務時間外に、職場の外で衆議院議員選挙の候補者のポスターを貼るなどの政治活動をしました。これが「国家公務員法」で禁止されている行為として起訴されました。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：一審・二審は「無罪」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            地裁と高裁は、「勤務時間外に、地位を利用せずに行った活動まで罰するのは、表現の自由を侵害しており違憲だ」と判断しました。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁「公務員の中立性が大事」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            ところが最高裁は逆転有罪。「公務員が特定の政党に肩入れすると、行政の中立性が疑われる。国民の信頼を守るためには、たとえ勤務時間外であっても政治活動を禁止することはやむを得ない」と述べました。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「全面禁止は合憲」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、禁止によって得られる利益（行政の中立性）が、失われる利益（自由）よりも大きいと判断しました。こうして、公務員の政治活動の一律禁止に「合憲」の判決が出ました。
                        </ThemedText>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Story 2: Meguro Incident */}
                <ThemedText type="title" style={styles.title}>2. 目黒事件 4コマ物語</ThemedText>
                <ThemedText style={styles.description}>（猿払事件から数十年後、少し判断が柔軟になったケースです）</ThemedText>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：休日・私服でのビラ配り</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            社会保険庁の目黒社会保険事務所の職員が、休日に、職務とは全く関係ない場所で、政党の機関紙（ビラ）を配りました。これが再び国家公務員法違反として問われました。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：争点は「猿払基準」の維持</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            かつての猿払事件では「一律禁止OK」でしたが、時代は変わり、「管理職でもない職員が、こっそりプライベートで配るのもダメなのか？」が争われました。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁「実質的な影響があるか？」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は言いました。「単に公務員だからダメなのではない。その行為が<ThemedText type="defaultSemiBold">『公務の非政治性や中立性を損なう実質的な恐れ』</ThemedText>があるかどうかで判断すべきだ」。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.arrowContainer}>
                    <MaterialIcons name="arrow-downward" size={32} color={colors.text} style={{ opacity: 0.5 }} />
                </View>

                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「この程度なら無罪」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            今回の職員は管理職ではなく、職務の権限も使っていません。そのため「中立性を損なう恐れはない」と判断され、猿払事件とは対照的に無罪（処罰されない）となりました。
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
        marginTop: 16,
        marginBottom: 8,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    description: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
        fontSize: 14,
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
    arrowContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 32,
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
