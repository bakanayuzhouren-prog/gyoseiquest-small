import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function SetagayaSchoolFlyerScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '世田谷区立中学校ビラ配布事件', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>世田谷区立中学校ビラ配布事件 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：校門前でのビラ配布</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            ある市民団体のメンバーが、世田谷区立中学校の卒業式の日に、校門付近の校地内において、特定の教員を批判する内容のビラを保護者や出席者に配布しようとしました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            学校側は「管理権」に基づき、校地から退去するように命じましたが、メンバーはこれに従いませんでした。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：『表現の自由』vs『教育環境の維持』</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            配布者側は「卒業式という開かれた行事の場であり、公共性の高い校門付近での配布は表現の自由（21条）として保障されるべきだ」と主張しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.pointText]}>
                            <ThemedText type="defaultSemiBold">ポイント:</ThemedText> 学校という「教育の場」における管理権は、一般の公園や道路とどう違うのか？が争点です。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：学校管理権の特殊性</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、学校の特殊性に注目しました。
                        </ThemedText>
                        <ThemedText style={[styles.text, styles.criteriaText]}>
                            「学校は、生徒に適切な教育を行うための場所であり、そのための<ThemedText type="defaultSemiBold">平穏な教育環境を維持する必要がある</ThemedText>。学校長は、教育に支障をきたすような行為を制限する強い管理権を持っている」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「退去命令は適法（合憲）」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、卒業式という厳粛な行事の最中に、校地内で無許可でビラを配る行為を制限することは、学校の管理権の正当な行使であると判断されました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            退去命令に従わなかったことは、建造物侵入罪や不退去罪として<ThemedText type="defaultSemiBold">「合憲（適法）」</ThemedText>とされました。
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
                            <ThemedText type="defaultSemiBold">✓ 学校管理権の特殊性</ThemedText>{'\n'}
                            学校は生徒に適切な教育を行うための場所であり、平穏な教育環境を維持する必要がある。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 施設管理権の正当な行使</ThemedText>{'\n'}
                            卒業式という厳粛な行事の最中に、校地内で無許可でビラを配る行為を制限することは、学校の管理権の正当な行使である。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            <ThemedText type="defaultSemiBold">✓ 表現の自由との調整</ThemedText>{'\n'}
                            表現の自由も、教育環境の維持という公共の利益のために、合理的な制限を受ける。
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
