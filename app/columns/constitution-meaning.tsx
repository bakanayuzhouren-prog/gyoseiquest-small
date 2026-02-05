import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';

export default function ConstitutionMeaningScreen() {
    const { colors } = useTheme();

    const handleBack = () => {
        router.back();
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '憲法の意味', headerBackTitle: '戻る' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>実質的意味の憲法</ThemedText>

                <View style={styles.section}>
                    <ThemedText style={styles.text}>
                        「実質的意味の憲法」ですね。試験勉強、特に行政書士試験の憲法科目でも基本中の基本となる概念です。
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        簡単に言うと、「形式（法典の名前）」ではなく、<ThemedText type="defaultSemiBold">「中身（規定されている内容）」</ThemedText>に着目した憲法の捉え方のことです。
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        大きく分けて、以下の2つの視点があります。
                    </ThemedText>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/column_constitution_meaning.png')}
                        style={styles.image}
                        contentFit="contain"
                    />
                    <ThemedText style={styles.caption}>外見（形式）より中身（実質）が大事！</ThemedText>
                </View>

                <View style={styles.card}>
                    <ThemedText type="subtitle" style={styles.subtitle}>1. 固有の意味の憲法</ThemedText>
                    <ThemedText style={styles.text}>
                        国家の統治機構（国会、内閣、裁判所など）の仕組みを定めたルールです。
                    </ThemedText>
                    <View style={styles.pointRow}>
                        <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                        <ThemedText style={styles.pointDescription}>
                            「国家があるところには必ず存在する」と言われます。
                        </ThemedText>
                    </View>
                    <View style={styles.pointRow}>
                        <ThemedText style={styles.pointLabel}>歴史：</ThemedText>
                        <ThemedText style={styles.pointDescription}>
                            古代ギリシャの都市国家でも、絶対王政の時代でも、国家を運営する仕組みさえあれば、それは「固有の意味の憲法」を持っていることになります。
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.card}>
                    <ThemedText type="subtitle" style={styles.subtitle}>2. 立憲的意味の憲法</ThemedText>
                    <ThemedText style={styles.text}>
                        国家権力を制限して、国民の基本的人権を守ることを目的としたルールです。
                    </ThemedText>
                    <View style={styles.pointRow}>
                        <ThemedText style={styles.pointLabel}>ポイント：</ThemedText>
                        <ThemedText style={styles.pointDescription}>
                            「近代憲法」とも呼ばれます。単なる統治の仕組みではなく、「権力の暴走を止めるための縛り」という性格が強いものです。
                        </ThemedText>
                    </View>
                    <View style={styles.pointRow}>
                        <ThemedText style={styles.pointLabel}>有名な言葉：</ThemedText>
                        <ThemedText style={styles.pointDescription}>
                            フランス人権宣言16条の「権利の保障が確保されず、権力の分立が定められていない社会は、憲法を持つものではない」という考え方がこれにあたります。
                        </ThemedText>
                    </View>
                </View>

                <ThemedText type="subtitle" style={styles.sectionTitle}>「形式的意味の憲法」との違い</ThemedText>
                <ThemedText style={styles.text}>比較するとより分かりやすくなります。</ThemedText>

                <View style={styles.comparisonContainer}>
                    <View style={[styles.comparisonBox, { borderLeftColor: '#4CAF50' }]}>
                        <ThemedText style={[styles.comparisonTitle, { color: '#4CAF50' }]}>形式的意味の憲法</ThemedText>
                        <ThemedText style={styles.text}>
                            「日本国憲法」という名前がついた成文化された法典そのものを指します。
                        </ThemedText>
                    </View>

                    <View style={[styles.comparisonBox, { borderLeftColor: '#FF9800' }]}>
                        <ThemedText style={[styles.comparisonTitle, { color: '#FF9800' }]}>実質的意味の憲法</ThemedText>
                        <ThemedText style={styles.text}>
                            名前が「憲法」でなくても、内容が統治機構や人権に関するものであれば含まれます（例：国会法、公職選挙法、裁判所法など）。
                        </ThemedText>
                    </View>
                </View>

                <Pressable style={[styles.backButton, { backgroundColor: colors.tint }]} onPress={handleBack}>
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
        marginBottom: 20,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 12,
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    subtitle: {
        marginBottom: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        fontSize: 16,
        lineHeight: 26,
        marginBottom: 8,
    },
    pointRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    pointLabel: {
        fontWeight: 'bold',
        width: 90,
        fontSize: 16,
    },
    pointDescription: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    comparisonContainer: {
        marginTop: 8,
        gap: 12,
    },
    comparisonBox: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderLeftWidth: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    comparisonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    caption: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        fontStyle: 'italic',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginTop: 32,
        gap: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
