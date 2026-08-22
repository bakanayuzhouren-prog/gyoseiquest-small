import { DbMarkdownTextbook } from '@/components/textbook/DbMarkdownTextbook';
import { getDbTextbookBundle } from '@/src/content/dbTextbookBundles';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function MinpouKijutsuTextbookScreen() {
  const bundle = getDbTextbookBundle('minpou-kijutsu');
  if (!bundle) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Stack.Screen options={{ title: '民法記述' }} />
        <Text>DBバンドルが見つかりません。npm run bundle:db-textbooks を実行してください。</Text>
      </View>
    );
  }
  return <DbMarkdownTextbook bundle={bundle} />;
}
