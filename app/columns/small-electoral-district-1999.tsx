import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function SmallElectoralDistrict1999Screen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '平成11年小選挙区判決', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>平成11年小選挙区判決 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：選挙制度の大転換</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            1994年、それまでの中選挙区制から「小選挙区比例代表並立制」へ制度が大きく変わりました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            これに対し、有権者たちが「小選挙区制は死票（落選者に投じられた票）が多くなりすぎ、国民の意見を正しく反映しない！憲法違反だ！」と訴えを起こしました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『投票価値の平等』の限界</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            争点の一つは「1票の格差」でした。最高裁は「憲法は1票の価値の平等を要求しているが、同時に、国会には<ThemedText type="defaultSemiBold">『どのような選挙制度にするか』という広い裁量</ThemedText>がある。小選挙区制そのものが不平等を生む仕組みだとは言い切れない」と述べました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：比例代表との『並立』の評価</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、小選挙区制のデメリット（死票の多さ）を、比例代表制が補っているという点に着目しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            「二つの制度を組み合わせることで、政治の安定と多様な意見の反映を両立させようとする今の仕組みは、合理的な理由がある」と判断したのです。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「合憲（ただし、格差是正は必要）」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、小選挙区比例代表並立制そのものは<ThemedText type="defaultSemiBold">「合憲」</ThemedText>とされました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            ただし、格差については「常に是正する努力をしなければ、将来的に違憲になる可能性がある」という強いメッセージ（警告）を国会に送りました。
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
