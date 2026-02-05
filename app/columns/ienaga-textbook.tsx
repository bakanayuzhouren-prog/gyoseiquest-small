import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function IenagaTextbookScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '第一次家永教科書訴訟', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>第一次家永教科書訴訟 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：教科書が不合格？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            家永教授が執筆した日本史の教科書に対し、文部省（当時）の検定で「記述が偏っている」として修正を命じられたり、不合格とされたりしました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            教授は「これは国による思想統制であり、表現の自由を侵すものだ！」と提訴しました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『検閲』の定義ふたたび</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最大の争点は、教科書検定が憲法21条2項の「検閲」にあたるかです。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            教授側は「発表前に内容をチェックして不適当なものを排除しているのだから、まさに検閲だ！」と主張しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            これに対し最高裁は、「北方ジャーナル事件」と同じく、検閲の定義を非常に狭くとらえました。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：『検閲ではない』理由</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁はこう述べました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            「教科書検定は、あくまで『教科書』として認めるかどうかの審査にすぎない。不合格になっても、一般図書として出版することは自由だから、<ThemedText type="defaultSemiBold">発表そのものを禁止するものではない。</ThemedText>したがって、検閲にはあたらない」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「検定制度は合憲」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、検定制度そのものは<ThemedText type="defaultSemiBold">合憲</ThemedText>とされました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            また、「旭川学テ事件」のロジックを引き継ぎ、<ThemedText type="defaultSemiBold">「国も、子供の教育内容について適切な配慮をする権能を持っている」</ThemedText>とされ、検定という形で内容に介入することも、合理的範囲内であれば許されると判断されました。
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
                            <ThemedText type="defaultSemiBold">✓ 教科書検定は「検閲」にあたらない</ThemedText>{'\n'}
                            不合格でも一般図書として出版可能なため、発表そのものを禁止するものではない。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 検定制度は合憲</ThemedText>{'\n'}
                            国は子供の教育内容について適切な配慮をする権能を持っており、検定による介入は合理的範囲内で許される。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 憲法23条（学問の自由）との関係</ThemedText>{'\n'}
                            教科書検定制度は学問の自由を規制した憲法23条に違反しない。
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
