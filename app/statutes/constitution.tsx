import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function ConstitutionScreen() {
    const articles = STATUTES.kenpo || [];
    return <StatuteViewer data={articles} title="日本国憲法" searchPlaceholder="検索 (例: 9条, 平和)" />;
}
