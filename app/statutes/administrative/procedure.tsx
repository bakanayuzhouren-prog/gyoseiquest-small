import StatuteViewer from '@/components/StatuteViewer';
// @ts-ignore
import { STATUTES } from '@/src/questions';

export default function AdministrativeProcedureScreen() {
    const articles = STATUTES.gyote || [];
    return <StatuteViewer data={articles} title="行政手続法" />;
}
