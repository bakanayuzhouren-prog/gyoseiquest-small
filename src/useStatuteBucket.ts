import { useEffect, useState } from 'react';

import { ensureStatuteBucket } from '@/src/studyCache';

export function useStatuteBucket(bucket: string): Array<{ title: string; content: string }> | null {
  const [rows, setRows] = useState<Array<{ title: string; content: string }> | null>(null);
  useEffect(() => {
    let cancel = false;
    ensureStatuteBucket(bucket).then((data) => {
      if (!cancel) setRows(data);
    });
    return () => {
      cancel = true;
    };
  }, [bucket]);
  return rows;
}
