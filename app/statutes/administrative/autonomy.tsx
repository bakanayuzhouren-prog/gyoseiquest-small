import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function LocalAutonomyScreen() {
    const articles = STATUTES.jichi || [];
    return <StatuteViewer data={articles} title="地方自治法" searchPlaceholder="検索 (例: 40条, 国地方係争処理委員会)" />;
}
