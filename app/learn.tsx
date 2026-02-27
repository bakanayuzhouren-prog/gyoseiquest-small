import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getStickyNotes } from '@/utils/sticky-notes';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

type SubCategory = {
  label: string;
  key: string;
};

type Category = {
  id: string;
  label: string;
  key?: string; // If leaf node
  subCategories?: SubCategory[];
};

const CATEGORIES: Category[] = [
  { id: 'foundation', label: '基礎法学', key: '基礎法学' },
  { id: 'constitution', label: '憲法', key: '憲法' },
  {
    id: 'admin',
    label: '行政法',
    subCategories: [
      { label: '総論', key: '行政法総論' },
      { label: '手続法', key: '行政手続法' },
      { label: '不服審査法', key: '行政不服審査法' },
      { label: '事件訴訟法', key: '行政事件訴訟法' },
      { label: '国家賠償法', key: '国家賠償法' },
      { label: '地方自治法', key: '地方自治法' },
      { label: '行政法総合', key: '行政法総合' },
    ]
  },
  {
    id: 'civil',
    label: '民法',
    subCategories: [
      { label: '総論', key: '民法総論' },
      { label: '物権', key: '民法物権' },
      { label: '債権総論', key: '債権総論' },
      { label: '債権各論', key: '債権各論' },
      { label: '家族法', key: '家族法' },
    ]
  },
  { id: 'commercial', label: '商法・会社法', key: '商法・会社法' },
  { id: 'knowledge', label: '基礎知識', key: '基礎知識' },
  { id: 'multi_choice', label: '多肢選択', key: '多肢選択' },
  { id: 'civil_descriptive', label: '民法記述', key: '民法記述' },
  { id: 'admin_descriptive', label: '行政法記述', key: '行政法記述' },
];

export default function LearnScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [stickyCounts, setStickyCounts] = useState<{ [key: string]: number }>({});

  // 画面が表示されるたびに付箋数を更新
  useFocusEffect(
    useCallback(() => {
      const counts: { [key: string]: number } = {};

      const updateCounts = (cats: Category[]) => {
        cats.forEach(cat => {
          if (cat.key) {
            counts[cat.key] = getStickyNotes(cat.key).length;
          }
          if (cat.subCategories) {
            cat.subCategories.forEach(sub => {
              counts[sub.key] = getStickyNotes(sub.key).length;
            });
          }
        });
      };

      updateCounts(CATEGORIES);
      setStickyCounts(counts);
    }, [])
  );

  const handleCategoryPress = (category: Category) => {
    if (category.subCategories) {
      setSelectedCategory(category);
    } else if (category.key) {
      router.push(`/learn/${category.key}`);
    }
  };

  const handleSubCategoryPress = (key: string) => {
    router.push(`/learn/${key}`);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        {selectedCategory ? selectedCategory.label : '見て聞いて覚える'}
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        {selectedCategory ? '学習したい項目を選択してください。' : '学習したい科目を選択してください。'}
      </ThemedText>

      <ScrollView contentContainerStyle={styles.list}>
        {selectedCategory ? (
          <>
            {selectedCategory.subCategories?.map((sub, index) => (
              <Pressable
                key={sub.key}
                style={styles.subjectButton}
                onPress={() => handleSubCategoryPress(sub.key)}>
                <ThemedText type="defaultSemiBold" style={styles.subjectText}>
                  {index + 1} {sub.label}
                  {stickyCounts[sub.key] > 0 && (
                    <ThemedText style={styles.stickyBadge}> (付箋: {stickyCounts[sub.key]})</ThemedText>
                  )}
                </ThemedText>
              </Pressable>
            ))}
            <Pressable style={styles.backButton} onPress={handleBack}>
              <ThemedText type="defaultSemiBold">戻る</ThemedText>
            </Pressable>
          </>
        ) : (
          CATEGORIES.map((category, index) => (
            <Pressable
              key={category.id}
              style={styles.subjectButton}
              onPress={() => handleCategoryPress(category)}>
              <ThemedText type="defaultSemiBold" style={styles.subjectText}>
                {index + 1} {category.label}
                {category.key && stickyCounts[category.key] > 0 && (
                  <ThemedText style={styles.stickyBadge}> (付箋: {stickyCounts[category.key]})</ThemedText>
                )}
              </ThemedText>
            </Pressable>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
    gap: 16,
  },
  subtitle: {
    opacity: 0.7,
  },
  subjectButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#5A9BD5',
    backgroundColor: '#E9F2FB',
  },
  subjectText: {
    fontSize: 18,
  },
  stickyBadge: {
    fontSize: 14,
    color: '#B8860B',
    fontWeight: 'normal',
  },
  list: {
    gap: 16,
    paddingBottom: 40,
  },
  backButton: {
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
});