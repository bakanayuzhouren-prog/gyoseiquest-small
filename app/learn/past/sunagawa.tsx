import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/src/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

export default function SunagawaPast() {
    const { colors } = useTheme();

    const questions = [
        {
            id: 1,
            title: '【問1】憲法と条約の関係（平成22年度 問3 改変）',
            text: '砂川事件の判決に関する次の記述のうち、妥当なものはどれか。',
            choices: [
                '1. 最高裁判所は、条約は憲法よりも上位にあるため、いかなる場合も裁判所がその合憲性を審査することはできないと判断した。',
                '2. 最高裁判所は、日米安全保障条約のような高度の政治性を有するものは、一見してきわめて明白に違憲無効であると認められない限り、司法審査の範囲外にあると判断した。',
                '3. 最高裁判所は、安保条約は憲法9条2項が禁止する「戦力」に該当するため、違憲であるとの判断を下した。'
            ],
            answer: '正解：2',
            explanation: 'これが有名な「統治行為論」です。「一見して明白に違憲無効」でない限り、裁判所は判断を避け、政治（内閣や国会）の判断に委ねるという立場です。'
        },
        {
            id: 2,
            title: '【問2】憲法前文と自衛権（令和元年度 問1 改変）',
            text: '砂川事件の判決における憲法前文の解釈に関する次の記述のうち、正しいものはどれか。',
            choices: [
                '1. 憲法前文の「平和のうちに生存する権利（平和的生存権）」は、あくまで理念であり、国家の自衛の措置を肯定する根拠にはなり得ないとした。',
                '2. 憲法前文は「諸国民の公正と信義に信頼」することを掲げているため、自国の安全を他国に委ねるような安保条約は憲法違反であるとした。',
                '3. 憲法は、前文において平和主義を宣言しているが、自国が直接の攻撃を受けた場合に自衛の措置をとることは、国家固有の権能として当然に認められるとした。'
            ],
            answer: '正解：3',
            explanation: '前回解説した通り、前文を根拠に「無防備・無抵抗を強いるものではない」と結論づけています。'
        },
        {
            id: 3,
            title: '【問3】司法権の限界（平成27年度 問1 肢）',
            text: '最高裁判所の判決によれば、安保条約は、主権国としての存立の基礎に重大な関係を持つ高度の政治性を有するものであるから、その合憲性の判断は、純司法的機能をその使命とする司法裁判所の審査にはなじまない。',
            choices: ['◯ または ×'],
            answer: '正解：◯',
            explanation: '砂川事件の核心部分です。安保条約のような国全体の進路を決めるような問題は、裁判所（少数の裁判官）が決めるのではなく、国民から選ばれた国会や内閣、そして最終的には国民の判断に委ねるべきだという理屈です。'
        }
    ];

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <ThemedView style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <ThemedText type="title" style={styles.headerTitle}>砂川事件 過去問演習</ThemedText>
            </ThemedView>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {questions.map((q) => (
                    <ThemedView key={q.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <ThemedText type="defaultSemiBold" style={styles.questionTitle}>{q.title}</ThemedText>
                        <ThemedText style={styles.questionText}>{q.text}</ThemedText>

                        <ThemedView style={styles.choiceContainer}>
                            {q.choices.map((choice, idx) => (
                                <ThemedText key={idx} style={styles.choiceText}>{choice}</ThemedText>
                            ))}
                        </ThemedView>

                        <ThemedView style={styles.answerBox}>
                            <ThemedText type="defaultSemiBold" style={styles.answerLabel}>{q.answer}</ThemedText>
                            <ThemedText style={styles.explanationText}>{q.explanation}</ThemedText>
                        </ThemedView>
                    </ThemedView>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        marginLeft: 15,
        fontSize: 20,
    },
    backButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 20,
        gap: 20,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    questionTitle: {
        fontSize: 16,
        marginBottom: 8,
        color: '#007BFF',
    },
    questionText: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 12,
    },
    choiceContainer: {
        marginBottom: 15,
        gap: 8,
    },
    choiceText: {
        fontSize: 14,
        color: '#444',
    },
    answerBox: {
        marginTop: 10,
        padding: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    answerLabel: {
        color: '#D32F2F',
        marginBottom: 4,
    },
    explanationText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#666',
    },
});
