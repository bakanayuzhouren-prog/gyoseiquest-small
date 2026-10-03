import StatuteViewer from '@/components/StatuteViewer';
import { useStatuteBucket } from '@/src/useStatuteBucket';

export default function AdministrativeProcedureScreen() {
    const articles = useStatuteBucket('gyote');
    if (!articles) return null;
    return <StatuteViewer data={articles} title="行政手続法" />;
}
