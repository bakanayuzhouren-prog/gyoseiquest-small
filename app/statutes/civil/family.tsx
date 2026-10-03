import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CivilFamilyScreen() {
    const articles = useStatuteBucket('minpo_kazoku');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="民法 家族法" searchPlaceholder="検索 (例: 731条, 婚姻)" />;
}
