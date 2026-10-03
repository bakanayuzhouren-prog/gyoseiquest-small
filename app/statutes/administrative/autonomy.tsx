import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function LocalAutonomyScreen() {
    const articles = useStatuteBucket('jichi');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="地方自治法" searchPlaceholder="検索 (例: 40条, 国地方係争処理委員会)" />;
}
