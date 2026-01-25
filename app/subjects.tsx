import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SUBJECTS } from '@/src/questions';

export default function SubjectsScreen() {
  const router = useRouter();
  const subjects = Object.keys(SUBJECTS);

  const handlePress = (subject: string) => {
    const fields = Object.keys((SUBJECTS as any)[subject] || {});

    // If Admin Law (has sub-categories) or explicitly any subject with multiple fields
    // User requested "If Administrative Law is selected, show 1-6 subcategories"
    // Other subjects might just go to question if they have 1 field or if user didn't ask for subcats?
    // Let's assume > 1 fields means sub-categories needed.
    // '行政法' definitely has > 1.
    // '憲法' has 1 (itself).

    // Actually, user explicitly listed "1-9" for top level.
    // And for Admin Law, "1-6" sub-categories.
    // Let's check fields count.

    if (subject === '行政法' || fields.length > 1) {
      router.push({ pathname: '/subcategories', params: { subject } });
    } else {
      // Direct to stage select with the single field
      const singleField = fields[0] || subject; // Fallback to subject name if no field key (though usually 1 exist or empty)
      router.push({ pathname: '/stage_select', params: { subject, field: singleField } });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">科目一覧</ThemedText>
      <ThemedText style={styles.subtitle}>受けたい科目を選択してください。</ThemedText>
      <ScrollView contentContainerStyle={styles.list}>
        {subjects.map((subject, index) => (
          <Pressable
            key={subject}
            style={styles.subjectButton}
            onPress={() => handlePress(subject)}
          >
            <ThemedText type="defaultSemiBold" style={styles.subjectText}>
              {index + 1}. {subject}
            </ThemedText>
          </Pressable>
        ))}
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
  list: {
    gap: 12,
    paddingBottom: 40,
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
});
