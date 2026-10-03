import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function ConstitutionScreen() {
    const articles = useStatuteBucket('kenpo');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="日本国憲法" searchPlaceholder="検索 (例: 9条, 平和)" />;
}
