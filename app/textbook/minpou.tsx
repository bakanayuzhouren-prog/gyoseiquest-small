import { TextbookReader } from '@/components/textbook/TextbookReader';
import { MINPOU_TEXTBOOK_CHAPTERS, MINPOU_TEXTBOOK_META } from '@/src/content/minpouTextbookContent';

export default function MinpouTextbookScreen() {
  return (
    <TextbookReader
      title={MINPOU_TEXTBOOK_META.title}
      subtitle={MINPOU_TEXTBOOK_META.subtitle}
      chapters={MINPOU_TEXTBOOK_CHAPTERS}
      footerNote={MINPOU_TEXTBOOK_META.footerNote}
    />
  );
}
