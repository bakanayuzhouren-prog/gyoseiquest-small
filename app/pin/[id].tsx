import { router, useLocalSearchParams } from 'expo-router';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PinCaseScreen } from '@/components/pin/PinCaseScreen';
import { PIN_CASES } from '@/src/pinData';

export default function CaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const caseData = PIN_CASES.find((c) => c.id === id);

  if (!caseData) {
    return (
      <ThemedView style={{ flex: 1, padding: 24 }}>
        <ThemedText>Case not found</ThemedText>
        <Pressable onPress={() => router.back()}>
          <ThemedText>Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return <PinCaseScreen caseData={caseData} backLabel="戻る" />;
}
