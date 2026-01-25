import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function AdministrativeLitigationScreen() {
    const articles = STATUTES.gyoso || [];
    return <StatuteViewer data={articles} title="行政事件訴訟法" searchPlaceholder="検索 (例: 40条, 事情判決)" />;
}
