import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CivilFamilyScreen() {
    const articles = STATUTES.minpo_kazoku || [];
    return <StatuteViewer data={articles} title="民法 家族法" searchPlaceholder="検索 (例: 731条, 婚姻)" />;
}
