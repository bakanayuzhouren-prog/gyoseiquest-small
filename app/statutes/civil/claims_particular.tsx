import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function CivilClaimsParticularScreen() {
    const articles = useStatuteBucket('minpo_saiken_kakuron');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="民法 債権各論" searchPlaceholder="検索 (例: 555条, 売買)" />;
}
