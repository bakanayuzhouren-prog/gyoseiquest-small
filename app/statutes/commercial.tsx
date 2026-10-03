import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CommercialLawScreen() {
    const articles = useStatuteBucket('sho_kai');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="商法・会社法" searchPlaceholder="検索 (例: 設立, 取締役)" />;
}
