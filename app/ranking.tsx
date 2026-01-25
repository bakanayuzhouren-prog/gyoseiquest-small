import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getPoints } from '@/utils/points';

// Mock data for ranking
const TOTAL_USERS = 3456;

// Mock function to calculate rank based on points
// In a real app, this would be an API call
const calculateRank = (myPoints: number) => {
    // Simple logic: higher points = higher rank
    // For demo purposes, we'll try to put the user in a realistic position
    // or high up if they have a lot of points.

    if (myPoints === 0) return TOTAL_USERS;

    // Simulate a curve
    const maxPoints = 10000;
    const items = [
        { rank: 1, points: 5000 },
        { rank: 2, points: 4500 },
        { rank: 3, points: 4000 },
        // ... gaps
    ];

    // Just a dummy formula for visual satisfaction
    if (myPoints > 4800) return 1;
    if (myPoints > 4200) return 2;
    if (myPoints > 3800) return 3;

    const rank = Math.floor(TOTAL_USERS - (myPoints / maxPoints) * TOTAL_USERS);
    return Math.max(4, rank);
};

export default function RankingScreen() {
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState(TOTAL_USERS);

    useEffect(() => {
        const p = getPoints();
        setPoints(p);
        setRank(calculateRank(p));
    }, []);

    const { width } = useWindowDimensions();

    const renderCrown = (rank: number) => {
        if (rank > 3) return null;

        let color = '#CD7F32'; // Bronze
        if (rank === 1) color = '#FFD700'; // Gold
        if (rank === 2) color = '#C0C0C0'; // Silver

        return (
            <ThemedText style={{ fontSize: 40, lineHeight: 40, textAlign: 'center' }}>
                <ThemedText style={{ color }}>♛</ThemedText>
            </ThemedText>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '全国ランキング' }} />

            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.headerTitle}>全国ランキング</ThemedText>

                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.rankCard}
                >
                    <ThemedText style={styles.rankLabel}>あなたの順位</ThemedText>

                    {renderCrown(rank)}

                    <ThemedView style={styles.rankRow}>
                        <ThemedText style={styles.rankNumber}>{rank}</ThemedText>
                        <ThemedText style={styles.totalUsers}> / {TOTAL_USERS}位</ThemedText>
                    </ThemedView>

                    <ThemedText style={styles.pointsLabel}>獲得ポイント: {points} pt</ThemedText>
                </LinearGradient>

                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.infoText}>
                        ※ランキングは1日1回更新されます（デモ）
                    </ThemedText>
                </ThemedView>
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
        alignItems: 'center',
    },
    headerTitle: {
        marginBottom: 24,
        textAlign: 'center',
    },
    rankCard: {
        width: '100%',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    rankLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    rankNumber: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    totalUsers: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
    },
    pointsLabel: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        opacity: 0.9,
    },
    infoSection: {
        marginTop: 30,
        padding: 20,
    },
    infoText: {
        color: '#888',
        fontSize: 12,
        textAlign: 'center',
    },
});
