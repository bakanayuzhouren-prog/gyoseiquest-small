import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function AdministrativeLitigationScreen() {
    const articles = useStatuteBucket('gyoso');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="行政事件訴訟法" searchPlaceholder="検索 (例: 40条, 事情判決)" />;
}
