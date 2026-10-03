import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CivilRightsScreen() {
    const articles = useStatuteBucket('minpo_bukken');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="民法 物権" searchPlaceholder="検索 (例: 177条, 登記)" />;
}
