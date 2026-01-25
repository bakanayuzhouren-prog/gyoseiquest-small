import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function CivilGeneralScreen() {
    const articles = STATUTES.minpo_sosoku || [];
    return <StatuteViewer data={articles} title="民法 総則" searchPlaceholder="検索 (例: 95条, 錯誤)" />;
}
