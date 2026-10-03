import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function AdministrativeAppealScreen() {
    const articles = useStatuteBucket('gyoshin');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="行政不服審査法" searchPlaceholder="検索 (例: 40条, 審理員)" />;
}
