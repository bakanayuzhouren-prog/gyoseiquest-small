import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CivilRightsScreen() {
    const articles = STATUTES.minpo_bukken || [];
    return <StatuteViewer data={articles} title="民法 物権" searchPlaceholder="検索 (例: 177条, 登記)" />;
}
