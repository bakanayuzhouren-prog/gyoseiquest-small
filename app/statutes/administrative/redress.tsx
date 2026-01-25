import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function StateRedressScreen() {
    const articles = STATUTES.kokubai || [];
    return <StatuteViewer data={articles} title="国家賠償法" searchPlaceholder="検索 (例: 1条, 不可抗力)" />;
}
