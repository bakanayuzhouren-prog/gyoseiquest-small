import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import type { Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const C = {
  bg: '#E4E4E7',
  panel: '#F0F0F2',
  text: '#3F3F46',
  textMuted: '#71717A',
  border: '#D4D4D8',
  accent: '#5A8FA8',
  inner: '#EAF6FB',
};

const SUBJECTS = [
  {
    href: '/textbook/kimi' as Href,
    title: '君の教科書！',
    description: '誤答・付箋・TAC模試の新知識から、いま読むべき自分用の教科書を生成。',
    icon: 'auto-stories' as const,
  },
  {
    href: '/textbook/kenpou' as Href,
    title: '憲法',
    description: '条文・判例・比較表付き。概念章（硬性/軟性）から統治・司法まで。',
    icon: 'gavel' as const,
  },
  {
    href: '/textbook/shouhou' as Href,
    title: '商法・会社法',
    description: '初学者向け12点教科書。考え方→必殺5本柱→過去問型。',
    icon: 'business-center' as const,
  },
  {
    href: '/textbook/minpou-kijutsu' as Href,
    title: '民法記述',
    description: '出題形式・条文順。聞かれる型→答案の芯。原典は言い換え済み。',
    icon: 'description' as const,
  },
  {
    href: '/textbook/gyosei-kijutsu' as Href,
    title: '行政法記述',
    description: '出題形式。手続→不服→行訴→国賠→自治の条文クラスタ順。',
    icon: 'rule' as const,
  },
  {
    href: '/textbook/kisochi' as Href,
    title: '基礎知識',
    description: '個情法を○×出題形式・条文順で。足切り向け。',
    icon: 'school' as const,
  },
];

export default function TextbookHubScreen() {
  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: '教科書',
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lead}>
          得点に直結する論点を、目に優しい資料で読み進められます。
        </Text>

        {SUBJECTS.map((item) => (
          <Link key={item.title} href={item.href} asChild>
            <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
              <View style={styles.cardIcon}>
                <MaterialIcons name={item.icon} size={28} color={C.accent} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={C.textMuted} />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  lead: {
    fontSize: 15,
    color: C.textMuted,
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.panel,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
  },
  cardPressed: {
    opacity: 0.92,
    backgroundColor: '#E8E8EB',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: C.inner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: C.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: C.textMuted,
    lineHeight: 20,
  },
});
