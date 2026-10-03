import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function StateRedressScreen() {
    const articles = useStatuteBucket('kokubai');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="国家賠償法" searchPlaceholder="検索 (例: 1条, 不可抗力)" />;
}
