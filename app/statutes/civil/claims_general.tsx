import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CivilClaimsGeneralScreen() {
    const articles = STATUTES.minpo_saiken_soron || [];
    return <StatuteViewer data={articles} title="民法 債権総論" searchPlaceholder="検索 (例: 415条, 債務不履行)" />;
}
