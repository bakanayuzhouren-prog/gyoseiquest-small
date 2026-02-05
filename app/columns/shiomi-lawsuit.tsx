import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function ShiomiLawsuitScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '塩見訴訟', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>塩見訴訟 4コマ物語</ThemedText>

                {/* Panel 1 */}
                <View style={styles.panelContainer}>
                    <View style={styles.panelHeader}>
                        <ThemedText type="subtitle" style={styles.panelTitle}>第1コマ：障害年金の申請と却下</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            日本に住む在日韓国人の塩見さんは、幼少期に失明し、障害を持っていました。20歳になったので障害福祉年金を申請しようとしましたが、当時の法律には「日本国民であること」という国籍条項がありました。塩見さんは外国人だったため、申請を却下されてしまいます。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第2コマ：帰化しても認められない？</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            塩見さんはその後、日本国籍を取得（帰化）して、改めて申請しました。しかし、当局は「障害を負った時点（または20歳の時点）で日本国民でなければならない」として、再び拒否しました。
                        </ThemedText>
                        <ThemedText style={styles.text}>
                            塩見さんは「これは憲法14条（平等）や25条（生存権）に反する！」と裁判を起こします。
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第3コマ：最高裁「生存権は国の裁量」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            最高裁は、生存権（25条）の性格について触れました。「国が限られた予算の中で、誰にどのような福祉給付を行うかは、国の広い裁量に任されている。自国民を外国人より優先的に保護することも、許されないわけではない。」
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
                        <ThemedText type="subtitle" style={styles.panelTitle}>第4コマ：結論「国籍制限は合憲」</ThemedText>
                    </View>
                    <View style={styles.panelContent}>
                        <ThemedText style={styles.text}>
                            結論として、当時の国籍条項は<ThemedText type="defaultSemiBold">「憲法に違反しない」</ThemedText>と判断されました。外国人を調査対象から外すなどの区別には合理的な理由がある、とされたのです。
                        </ThemedText>
                    </View>
                </View>

                {/* Aftermath Box */}
                <View style={styles.noteBox}>
                    <ThemedText type="defaultSemiBold" style={styles.noteTitle}>その後の展開：</ThemedText>
                    <ThemedText style={styles.noteText}>
                        この訴訟などをきっかけに社会的な議論が高まり、現在、国民年金法などの国籍条項は撤廃されています。
                    </ThemedText>
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
    arrowContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    noteBox: {
        marginTop: 24,
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#757575',
    },
    noteTitle: {
        fontSize: 16,
        marginBottom: 8,
        color: '#424242',
    },
    noteText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#616161',
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
