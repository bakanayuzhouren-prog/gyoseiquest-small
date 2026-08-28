import { TextbookReader } from '@/components/textbook/TextbookReader';
import { GYOSEI_TEXTBOOK_CHAPTERS, GYOSEI_TEXTBOOK_META } from '@/src/content/gyoseiTextbookContent';

export default function GyoseiTextbookScreen() {
  return (
    <TextbookReader
      title={GYOSEI_TEXTBOOK_META.title}
      subtitle={GYOSEI_TEXTBOOK_META.subtitle}
      chapters={GYOSEI_TEXTBOOK_CHAPTERS}
      footerNote={GYOSEI_TEXTBOOK_META.footerNote}
      confusingTopicMode="gyosei"
    />
  );
}
