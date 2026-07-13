import { TextbookReader } from '@/components/textbook/TextbookReader';
import {
  SHOUHOU_TEXTBOOK_CHAPTERS,
  SHOUHOU_TEXTBOOK_META,
} from '@/src/content/shouhouTextbookContent';

export default function ShouhouTextbookScreen() {
  return (
    <TextbookReader
      title={SHOUHOU_TEXTBOOK_META.title}
      subtitle={SHOUHOU_TEXTBOOK_META.subtitle}
      chapters={SHOUHOU_TEXTBOOK_CHAPTERS}
      footerNote={SHOUHOU_TEXTBOOK_META.footerNote}
    />
  );
}
