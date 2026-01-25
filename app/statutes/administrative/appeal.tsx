import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function AdministrativeAppealScreen() {
    const articles = STATUTES.gyoshin || [];
    return <StatuteViewer data={articles} title="行政不服審査法" searchPlaceholder="検索 (例: 40条, 審理員)" />;
}
