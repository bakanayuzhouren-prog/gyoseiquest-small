import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CivilClaimsParticularScreen() {
    const articles = STATUTES.minpo_saiken_kakuron || [];
    return <StatuteViewer data={articles} title="民法 債権各論" searchPlaceholder="検索 (例: 555条, 売買)" />;
}
