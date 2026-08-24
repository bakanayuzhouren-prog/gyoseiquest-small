import { DbMarkdownTextbook } from '@/components/textbook/DbMarkdownTextbook';
import { getDbTextbookBundle } from '@/src/content/dbTextbookBundles';
import { getKisochiRoom } from '@/utils/kisochiTextbookRooms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function KisochiRoomScreen() {
  const { room: roomId } = useLocalSearchParams<{ room: string }>();
  const room = getKisochiRoom(Array.isArray(roomId) ? roomId[0] : roomId);
  const bundle = getDbTextbookBundle('kisochi');

  if (!room || !bundle) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Stack.Screen options={{ title: '基礎知識' }} />
        <Text>部屋が見つかりません。</Text>
      </View>
    );
  }

  return (
    <DbMarkdownTextbook
      bundle={bundle}
      screenTitle={room.title}
      subtitle={room.title}
      description={room.description}
      hideSources
      statuteLabel="根拠条文"
      cardFilter={(card) => room.match.test(card.title)}
    />
  );
}
