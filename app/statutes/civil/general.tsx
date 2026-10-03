import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CivilGeneralScreen() {
    const articles = useStatuteBucket('minpo_sosoku');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="民法 総則" searchPlaceholder="検索 (例: 95条, 錯誤)" />;
}
