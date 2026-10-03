import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CivilClaimsGeneralScreen() {
    const articles = useStatuteBucket('minpo_saiken_soron');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="民法 債権総論" searchPlaceholder="検索 (例: 415条, 債務不履行)" />;
}
