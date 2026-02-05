import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function YawataSteelIncidentScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '八幡製鉄事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>八幡製鉄事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：会社が政党に献金！</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            八幡製鉄という会社の代表者が、自民党に350万円の政治献金をしました。これに対して、一部の株主が「会社は鉄を作るのが目的の組織だ。政治家に金を配るのは会社の目的（定款）から外れているし、株主の権利を侵害している！」と怒って裁判を起こしました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：会社に「政治の自由」はあるか？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            争点は2つ。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            1. 会社という「法人」に、人間と同じように政治活動をする自由があるのか？
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            2. 会社が政治献金をすることは、会社の目的の範囲内といえるのか？
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                「法人」は実体のない組織ですが、法律上は人間と同じように権利を持てます。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁「法人も社会の一員だ」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁はこう言いました。「憲法の人権保障は、性質上可能な限り、法人にも適用される。政治活動の自由もその一つだ。会社は単に営利を追及するだけでなく、社会の一員として、国政を良くするために寄付をする自由も持っている。」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「献金はOK！」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、「政治献金は、会社の目的の範囲内（社会的に期待される行為）であり、代表者の行為は有効である」と判断されました。
                        </ThemedText>
                        <View style={styles.pointBox}>
                            <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                            <ThemedText style={styles.pointText}>
                                これにより、企業の政治献金にお墨付きが与えられる形となりました。
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
