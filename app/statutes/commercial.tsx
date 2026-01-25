import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CommercialLawScreen() {
    const articles = STATUTES.sho_kai || [];
    return <StatuteViewer data={articles} title="商法・会社法" searchPlaceholder="検索 (例: 設立, 取締役)" />;
}
